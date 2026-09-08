#!/usr/bin/env python3
"""UIS Korea pre-deploy technical audit.

Checks source HTML, sitemap/robots, internal routes/assets, metadata, JSON-LD,
and optionally live preview URLs via LIVE_BASE.
"""
from __future__ import annotations

import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
PROD = "https://uis-korea.netlify.app"
LIVE_BASE = os.environ.get("LIVE_BASE", "").rstrip("/")

HARD = []
WARN = []
INFO = []


def hard(msg): HARD.append(msg)
def warn(msg): WARN.append(msg)
def info(msg): INFO.append(msg)


class PageParser(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title_parts = []
        self.in_title = False
        self.h1 = 0
        self.ids = set()
        self.hrefs = []
        self.srcs = []
        self.metas = []
        self.links = []
        self.images = []
        self.html_lang = None
        self._jsonld = False
        self._jsonld_buf = []
        self.jsonld_blocks = []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.html_lang = a.get("lang")
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if "id" in a: self.ids.add(a["id"])
        if tag == "a" and a.get("href"):
            self.hrefs.append((a.get("href"), a))
        if tag in ("img", "script", "iframe", "source", "video") and a.get("src"):
            self.srcs.append((a.get("src"), tag, a))
        if tag == "img": self.images.append(a)
        if tag == "meta": self.metas.append(a)
        if tag == "link": self.links.append(a)
        if tag == "script" and a.get("type", "").lower() == "application/ld+json":
            self._jsonld = True
            self._jsonld_buf = []

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script" and self._jsonld:
            self.jsonld_blocks.append("".join(self._jsonld_buf).strip())
            self._jsonld = False

    def handle_data(self, data):
        if self.in_title: self.title_parts.append(data)
        if self._jsonld: self._jsonld_buf.append(data)


def parse_page(path: Path):
    text = path.read_text(encoding="utf-8")
    p = PageParser(); p.feed(text)
    return text, p


def route_for(path: Path):
    rel = path.relative_to(ROOT).as_posix()
    return "/" if rel == "index.html" else "/" + rel


def file_for_url_path(url_path: str, current: Path | None = None):
    parsed = urllib.parse.urlsplit(url_path)
    pth = parsed.path
    if pth.startswith("/"):
        rel = pth.lstrip("/") or "index.html"
    else:
        base = current.parent.relative_to(ROOT) if current else Path(".")
        rel = (base / pth).as_posix()
    if rel.endswith("/"): rel += "index.html"
    return ROOT / rel, parsed.fragment


def get_meta(parser, name=None, prop=None):
    for a in parser.metas:
        if name and a.get("name", "").lower() == name.lower(): return a.get("content", "").strip()
        if prop and a.get("property", "").lower() == prop.lower(): return a.get("content", "").strip()
    return ""


def canonical(parser):
    for a in parser.links:
        rel = a.get("rel", "")
        rels = rel if isinstance(rel, list) else str(rel).split()
        if "canonical" in [x.lower() for x in rels]: return a.get("href", "").strip()
    return ""


def is_local(ref: str):
    if ref.startswith(("mailto:", "tel:", "javascript:", "data:")): return False
    if ref.startswith("#"): return True
    u = urllib.parse.urlsplit(ref)
    if not u.scheme and not u.netloc: return True
    return u.scheme in ("http", "https") and u.netloc == "uis-korea.netlify.app"


def audit_source():
    html_files = sorted(ROOT.glob("*.html")) + sorted(ROOT.glob("news/*.html")) + sorted(ROOT.glob("outcomes/*.html"))
    info(f"HTML pages checked: {len(html_files)}")
    parsed_pages = {}
    for f in html_files:
        text, p = parse_page(f); parsed_pages[f.resolve()] = p
        rel = f.relative_to(ROOT).as_posix()
        title = "".join(p.title_parts).strip()
        desc = get_meta(p, name="description")
        robots = get_meta(p, name="robots").lower()
        can = canonical(p)
        if not title: hard(f"{rel}: missing <title>")
        elif not (18 <= len(title) <= 75): warn(f"{rel}: title length {len(title)}")
        if not desc: hard(f"{rel}: missing meta description")
        elif not (50 <= len(desc) <= 180): warn(f"{rel}: meta description length {len(desc)}")
        if p.h1 != 1: hard(f"{rel}: H1 count is {p.h1}, expected 1")
        if p.html_lang != "ko": warn(f"{rel}: html lang is {p.html_lang!r}, expected 'ko'")
        if "noindex" in robots: hard(f"{rel}: page is noindex")
        expected_can = PROD + route_for(f)
        if can != expected_can: hard(f"{rel}: canonical {can!r} != {expected_can!r}")
        for i, block in enumerate(p.jsonld_blocks, 1):
            if not block: hard(f"{rel}: empty JSON-LD block #{i}")
            else:
                try: json.loads(block)
                except Exception as e: hard(f"{rel}: invalid JSON-LD #{i}: {e}")
        for img in p.images:
            if "alt" not in img: warn(f"{rel}: image missing alt ({img.get('src','')})")
        for href, attrs in p.hrefs:
            if attrs.get("target") == "_blank" and "noopener" not in attrs.get("rel", "").split():
                warn(f"{rel}: target=_blank without rel=noopener: {href}")
            if not is_local(href) or href.startswith("#"):
                if href.startswith("#") and href[1:] and href[1:] not in p.ids:
                    hard(f"{rel}: broken same-page fragment {href}")
                continue
            u = urllib.parse.urlsplit(href)
            ref = u.path + (("#" + u.fragment) if u.fragment else "") if u.netloc else href
            target, frag = file_for_url_path(ref, f)
            if not target.exists():
                hard(f"{rel}: broken internal link {href} -> {target.relative_to(ROOT) if target.is_relative_to(ROOT) else target}")
            elif frag:
                tp = parsed_pages.get(target.resolve())
                if not tp and target.suffix.lower() == ".html":
                    _, tp = parse_page(target); parsed_pages[target.resolve()] = tp
                if tp and frag not in tp.ids:
                    hard(f"{rel}: fragment not found {href}")
        for src, tag, attrs in p.srcs:
            if not is_local(src) or src.startswith("data:"): continue
            u = urllib.parse.urlsplit(src)
            ref = u.path if u.netloc else src
            target, _ = file_for_url_path(ref, f)
            if not target.exists(): hard(f"{rel}: missing local {tag} asset {src}")

    # Sitemap
    sm = ROOT / "sitemap.xml"
    try:
        tree = ET.parse(sm)
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [x.text.strip() for x in tree.findall("s:url/s:loc", ns) if x.text]
    except Exception as e:
        hard(f"sitemap.xml parse error: {e}"); locs = []
    if len(locs) != len(set(locs)): hard("sitemap.xml contains duplicate URLs")
    for u in locs:
        if not u.startswith(PROD + "/") and u != PROD + "/": hard(f"sitemap non-production URL: {u}")
        pth = urllib.parse.urlsplit(u).path
        target, _ = file_for_url_path(pth)
        if not target.exists(): hard(f"sitemap URL has no file: {u}")
    expected_urls = {PROD + route_for(f) for f in html_files}
    missing = sorted(expected_urls - set(locs)); extra = sorted(set(locs) - expected_urls)
    for u in missing: hard(f"indexable HTML missing from sitemap: {u}")
    for u in extra: hard(f"sitemap URL not matched to indexable HTML: {u}")
    info(f"Sitemap URLs checked: {len(locs)}")

    # Robots
    robots_path = ROOT / "robots.txt"
    txt = robots_path.read_text(encoding="utf-8") if robots_path.exists() else ""
    if "User-agent: *" not in txt or "Allow: /" not in txt: hard("robots.txt is not clearly crawlable")
    if f"Sitemap: {PROD}/sitemap.xml" not in txt: hard("robots.txt sitemap directive missing/wrong")

    # Edge-function injected internal routes
    edge_dir = ROOT / "netlify/edge-functions"
    link_re = re.compile(r'href=\\?["\']([^"\']+)')
    for js in sorted(edge_dir.glob("*.js")):
        text = js.read_text(encoding="utf-8")
        for href in link_re.findall(text):
            if href.startswith(("/", PROD)):
                u = urllib.parse.urlsplit(href if href.startswith("http") else PROD + href)
                target, frag = file_for_url_path(u.path + (("#"+u.fragment) if u.fragment else ""))
                if not target.exists(): hard(f"{js.relative_to(ROOT)}: injected broken internal link {href}")
                elif frag and target.suffix == ".html":
                    tp = parsed_pages.get(target.resolve())
                    if not tp:
                        _, tp = parse_page(target); parsed_pages[target.resolve()] = tp
                    if frag not in tp.ids: hard(f"{js.relative_to(ROOT)}: injected fragment not found {href}")


def fetch_url(url, attempts=3):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 TNS-Predeploy-Audit/1.0"})
    last = None
    for n in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=20) as r:
                return r.status, r.headers.get("content-type", ""), r.read(2_000_000)
        except Exception as e:
            last = e
            if n + 1 < attempts: time.sleep(5)
    raise last


def audit_live():
    if not LIVE_BASE:
        info("LIVE_BASE not set; live HTTP audit skipped")
        return
    sm_text = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    locs = re.findall(r"<loc>" + re.escape(PROD) + r"([^<]*)</loc>", sm_text)
    urls = [LIVE_BASE + (p or "/") for p in locs]
    # robots/sitemap plus all indexable pages
    urls += [LIVE_BASE + "/robots.txt", LIVE_BASE + "/sitemap.xml"]
    seen = set(); urls = [u for u in urls if not (u in seen or seen.add(u))]
    ok = 0
    for u in urls:
        try:
            status, ctype, body = fetch_url(u)
            if status != 200: hard(f"LIVE {u}: HTTP {status}")
            else: ok += 1
            if u.endswith(".html") or u.rstrip("/") == LIVE_BASE:
                txt = body.decode("utf-8", "replace")
                if "<title" not in txt.lower(): hard(f"LIVE {u}: missing title in served HTML")
                if re.search(r'<meta[^>]+name=["\']robots["\'][^>]+noindex', txt, re.I): hard(f"LIVE {u}: served noindex")
        except Exception as e:
            hard(f"LIVE {u}: request failed: {e}")
    info(f"Live Preview URLs returning 200: {ok}/{len(urls)}")


def main():
    audit_source()
    audit_live()
    print("\n=== UIS Korea Pre-deploy Audit ===")
    for x in INFO: print("INFO:", x)
    for x in WARN: print("WARN:", x)
    for x in HARD: print("ERROR:", x)
    print(f"RESULT: {len(HARD)} errors, {len(WARN)} warnings")
    return 1 if HARD else 0


if __name__ == "__main__":
    sys.exit(main())
