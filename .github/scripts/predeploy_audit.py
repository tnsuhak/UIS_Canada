#!/usr/bin/env python3
"""UIS Korea pre-deploy SEO/link audit (stdlib only)."""
from __future__ import annotations

import concurrent.futures
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
LIVE = os.environ.get("LIVE_BASE", "").rstrip("/")
ERRORS, WARNINGS, INFOS = [], [], []
EXTERNAL = set()


def error(x): ERRORS.append(x)
def warn(x): WARNINGS.append(x)
def info(x): INFOS.append(x)


class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title, self.in_title = [], False
        self.h1, self.lang = 0, None
        self.ids, self.hrefs, self.srcs = set(), [], []
        self.metas, self.links, self.images = [], [], []
        self.in_jsonld, self.buf, self.jsonlds = False, [], []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "html": self.lang = a.get("lang")
        if tag == "title": self.in_title = True
        if tag == "h1": self.h1 += 1
        if a.get("id"): self.ids.add(a["id"])
        if tag == "a" and a.get("href"): self.hrefs.append((a["href"], a))
        if tag in ("img", "script", "iframe", "source", "video") and a.get("src"):
            self.srcs.append((a["src"], tag, a))
        if tag == "img": self.images.append(a)
        if tag == "meta": self.metas.append(a)
        if tag == "link": self.links.append(a)
        if tag == "script" and a.get("type", "").lower() == "application/ld+json":
            self.in_jsonld, self.buf = True, []

    def handle_endtag(self, tag):
        if tag == "title": self.in_title = False
        if tag == "script" and self.in_jsonld:
            self.jsonlds.append("".join(self.buf).strip())
            self.in_jsonld = False

    def handle_data(self, data):
        if self.in_title: self.title.append(data)
        if self.in_jsonld: self.buf.append(data)


def parse(text):
    p = P(); p.feed(text); return p


def meta(p, name):
    for a in p.metas:
        if a.get("name", "").lower() == name.lower(): return a.get("content", "").strip()
    return ""


def canonical(p):
    for a in p.links:
        rel = str(a.get("rel", "")).lower().split()
        if "canonical" in rel: return a.get("href", "").strip()
    return ""


def html_files():
    return sorted(ROOT.glob("*.html")) + sorted(ROOT.glob("news/*.html")) + sorted(ROOT.glob("outcomes/*.html"))


def route(f):
    r = f.relative_to(ROOT).as_posix()
    return "/" if r == "index.html" else "/" + r


def source_target(ref, current=None):
    u = urllib.parse.urlsplit(ref)
    pth = u.path
    if pth.startswith("/"):
        rel = pth.lstrip("/") or "index.html"
    else:
        base = current.parent.relative_to(ROOT) if current else Path(".")
        rel = (base / pth).as_posix()
    if rel.endswith("/"): rel += "index.html"
    return ROOT / rel, u.fragment


def local_ref(ref):
    if ref.startswith(("mailto:", "tel:", "javascript:", "data:")): return False
    if ref.startswith("#"): return True
    u = urllib.parse.urlsplit(ref)
    return (not u.scheme and not u.netloc) or (u.scheme in ("http", "https") and u.netloc == "uis-korea.netlify.app")


def add_external(ref):
    u = urllib.parse.urlsplit(ref)
    if u.scheme in ("http", "https") and u.netloc and u.netloc != "uis-korea.netlify.app":
        EXTERNAL.add(urllib.parse.urlunsplit((u.scheme, u.netloc, u.path, u.query, "")))


def validate_page(p, label, expected_canonical):
    title = "".join(p.title).strip()
    desc = meta(p, "description")
    robots = meta(p, "robots").lower()
    can = canonical(p)
    if not title: error(f"{label}: missing title")
    elif not 18 <= len(title) <= 75: warn(f"{label}: title length {len(title)}")
    if not desc: error(f"{label}: missing meta description")
    elif not 50 <= len(desc) <= 180: warn(f"{label}: description length {len(desc)}")
    if p.h1 != 1: error(f"{label}: H1 count {p.h1}, expected 1")
    if p.lang != "ko": warn(f"{label}: html lang {p.lang!r}, expected ko")
    if "noindex" in robots: error(f"{label}: noindex detected")
    if can != expected_canonical: error(f"{label}: canonical {can!r} != {expected_canonical!r}")
    for i, block in enumerate(p.jsonlds, 1):
        try: json.loads(block)
        except Exception as e: error(f"{label}: invalid JSON-LD #{i}: {e}")


def audit_source():
    pages = html_files()
    parsed = {}
    info(f"HTML pages checked: {len(pages)}")
    for f in pages:
        text = f.read_text(encoding="utf-8")
        p = parse(text); parsed[f.resolve()] = p
        rel = f.relative_to(ROOT).as_posix()
        validate_page(p, rel, PROD + route(f))
        for img in p.images:
            if "alt" not in img: warn(f"{rel}: image missing alt: {img.get('src','')}")
        for href, attrs in p.hrefs:
            add_external(href)
            if attrs.get("target") == "_blank" and "noopener" not in str(attrs.get("rel", "")).split():
                warn(f"{rel}: target=_blank without noopener: {href}")
            if href.startswith("#"):
                if href[1:] and href[1:] not in p.ids: error(f"{rel}: missing same-page fragment {href}")
                continue
            if not local_ref(href): continue
            u = urllib.parse.urlsplit(href)
            ref = (u.path or "/") + (("#" + u.fragment) if u.fragment else "") if u.netloc else href
            target, frag = source_target(ref, f)
            # Raw repository links should normally target real files. Netlify may later pretty-print them.
            if not target.exists(): error(f"{rel}: broken source internal link {href}")
            elif frag and target.suffix == ".html":
                tp = parsed.get(target.resolve()) or parse(target.read_text(encoding="utf-8"))
                parsed[target.resolve()] = tp
                if frag not in tp.ids: error(f"{rel}: missing target fragment {href}")
        for src, tag, attrs in p.srcs:
            if not local_ref(src) or src.startswith("data:"): continue
            u = urllib.parse.urlsplit(src)
            ref = u.path if u.netloc else src
            target, _ = source_target(ref, f)
            if not target.exists(): error(f"{rel}: missing local {tag} asset {src}")

    # sitemap.xml
    try:
        tree = ET.parse(ROOT / "sitemap.xml")
        ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
        locs = [x.text.strip() for x in tree.findall("s:url/s:loc", ns) if x.text]
    except Exception as e:
        error(f"sitemap parse error: {e}"); locs = []
    if len(locs) != len(set(locs)): error("sitemap has duplicate URLs")
    expected = {PROD + route(f) for f in pages}
    for u in sorted(expected - set(locs)): error(f"HTML missing from sitemap: {u}")
    for u in sorted(set(locs) - expected): error(f"unexpected sitemap URL: {u}")
    for u in locs:
        if not u.startswith(PROD + "/"): error(f"sitemap non-production URL: {u}")
        target, _ = source_target(urllib.parse.urlsplit(u).path)
        if not target.exists(): error(f"sitemap target missing: {u}")
    info(f"Sitemap URLs checked: {len(locs)}")

    # robots.txt
    robots = (ROOT / "robots.txt").read_text(encoding="utf-8") if (ROOT / "robots.txt").exists() else ""
    if "User-agent: *" not in robots or "Allow: /" not in robots: error("robots.txt not clearly crawlable")
    if f"Sitemap: {PROD}/sitemap.xml" not in robots: error("robots.txt sitemap directive missing/wrong")

    # Edge Function injected hrefs
    link_re = re.compile(r'href=\\?["\']([^"\']+)')
    for js in sorted((ROOT / "netlify/edge-functions").glob("*.js")):
        text = js.read_text(encoding="utf-8")
        for href in link_re.findall(text):
            add_external(href)
            if href.startswith(("/", PROD)):
                u = urllib.parse.urlsplit(href if href.startswith("http") else PROD + href)
                target, frag = source_target(u.path + (("#" + u.fragment) if u.fragment else ""))
                if not target.exists(): error(f"{js.relative_to(ROOT)}: injected target missing {href}")
                elif frag and target.suffix == ".html":
                    tp = parsed.get(target.resolve()) or parse(target.read_text(encoding="utf-8"))
                    if frag not in tp.ids: error(f"{js.relative_to(ROOT)}: injected fragment missing {href}")

    searchable = "\n".join(
        x.read_text(encoding="utf-8", errors="ignore")
        for x in list(ROOT.glob("*.html")) + list((ROOT / "netlify/edge-functions").glob("*.js"))
    )
    info("Google verification marker in repository: " + ("found" if "google-site-verification" in searchable else "not found"))
    info("Naver verification marker in repository: " + ("found" if "naver-site-verification" in searchable else "not found"))
    info(f"Unique external HTTP links discovered: {len(EXTERNAL)}")


def fetch(url, timeout=20, max_bytes=2_000_000):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 TNS-Predeploy-Audit/1.0"})
    last = None
    for n in range(3):
        try:
            with urllib.request.urlopen(req, timeout=timeout) as r:
                return r.status, r.headers.get("content-type", ""), r.read(max_bytes), r.geturl()
        except Exception as e:
            last = e
            if n < 2: time.sleep(3)
    raise last


def one_http(url, timeout=12):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (compatible; TNS-Link-Audit/1.0)", "Range": "bytes=0-4095"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            body = r.read(4096)
            return url, r.status, r.geturl(), r.headers.get("content-type", ""), body, None
    except urllib.error.HTTPError as e:
        return url, e.code, e.geturl(), e.headers.get("content-type", "") if e.headers else "", b"", None
    except Exception as e:
        return url, None, None, "", b"", str(e)


def audit_live():
    if not LIVE:
        info("LIVE_BASE not set; live audit skipped")
        info("External HTTP check skipped outside live-preview job")
        return

    sm = (ROOT / "sitemap.xml").read_text(encoding="utf-8")
    paths = [p or "/" for p in re.findall(r"<loc>" + re.escape(PROD) + r"([^<]*)</loc>", sm)]
    urls = [LIVE + p for p in paths] + [LIVE + "/robots.txt", LIVE + "/sitemap.xml"]
    internal_live = set()
    ok = 0

    for u in urls:
        try:
            status, ctype, body, final = fetch(u)
            if status != 200: error(f"LIVE {u}: HTTP {status}")
            else: ok += 1
            path = urllib.parse.urlsplit(u).path or "/"
            if path == "/" or path.endswith(".html"):
                p = parse(body.decode("utf-8", "replace"))
                validate_page(p, f"LIVE {path}", PROD + path)
                for href, attrs in p.hrefs:
                    add_external(href)
                    if href.startswith("#"):
                        if href[1:] and href[1:] not in p.ids: error(f"LIVE {path}: missing same-page fragment {href}")
                        continue
                    if not local_ref(href): continue
                    # Resolve served links against the Preview origin. Netlify Pretty URLs may remove .html.
                    hu = urllib.parse.urlsplit(href)
                    if hu.netloc == "uis-korea.netlify.app":
                        resolved = LIVE + (hu.path or "/") + (("#" + hu.fragment) if hu.fragment else "")
                    else:
                        resolved = urllib.parse.urljoin(u, href)
                    internal_live.add(resolved)
        except Exception as e:
            error(f"LIVE {u}: request failed: {e}")
    info(f"Live Preview core URLs returning 200: {ok}/{len(urls)}")

    # Verify every internal href exactly as served, including Netlify extensionless Pretty URLs.
    checks = {}
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(one_http, urllib.parse.urldefrag(x)[0]): x for x in sorted(internal_live)}
        for fut in concurrent.futures.as_completed(futs):
            original = futs[fut]
            url, status, final, ctype, body, exc = fut.result()
            checks[original] = (status, final, ctype, body, exc)
    internal_ok = 0
    for original, (status, final, ctype, body, exc) in checks.items():
        if exc: error(f"LIVE internal link request failed: {original} ({exc})"); continue
        if status == 404 or status == 410: error(f"LIVE broken internal link HTTP {status}: {original}"); continue
        if status is None or not (200 <= status < 400): error(f"LIVE internal link HTTP {status}: {original}"); continue
        internal_ok += 1
        frag = urllib.parse.urlsplit(original).fragment
        if frag and "html" in ctype.lower():
            pp = parse(body.decode("utf-8", "replace"))
            if frag not in pp.ids: error(f"LIVE target fragment missing: {original}")
    info(f"Served internal links reachable: {internal_ok}/{len(checks)}")

    # Verify all external hrefs. 404/410 is a real broken-link failure; bot blocks are warnings.
    ext_ok = ext_unver = 0
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as ex:
        for url, status, final, ctype, body, exc in ex.map(one_http, sorted(EXTERNAL)):
            if exc: warn(f"EXTERNAL unverifiable: {url} ({exc})"); ext_unver += 1
            elif status in (404, 410): error(f"EXTERNAL broken HTTP {status}: {url}")
            elif status is not None and 200 <= status < 400: ext_ok += 1
            elif status in (401, 403, 405, 429): warn(f"EXTERNAL bot-blocked HTTP {status}: {url}"); ext_unver += 1
            else: warn(f"EXTERNAL unexpected HTTP {status}: {url}"); ext_unver += 1
    info(f"External links reachable: {ext_ok}/{len(EXTERNAL)}; bot-blocked/unverifiable: {ext_unver}")


def main():
    audit_source(); audit_live()
    print("\n=== UIS Korea Pre-deploy Audit ===")
    for x in INFOS: print("INFO:", x)
    for x in WARNINGS: print("WARN:", x)
    for x in ERRORS: print("ERROR:", x)
    print(f"RESULT: {len(ERRORS)} errors, {len(WARNINGS)} warnings")
    return 1 if ERRORS else 0


if __name__ == "__main__":
    sys.exit(main())
