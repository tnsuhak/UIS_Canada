#!/usr/bin/env python3
"""Audit the actual Netlify Deploy Preview as served to users/search bots."""
from __future__ import annotations
import concurrent.futures, json, os, re, sys, time, urllib.error, urllib.parse, urllib.request
from html.parser import HTMLParser
from pathlib import Path

ROOT=Path(__file__).resolve().parents[2]
PROD="https://uis-korea.netlify.app"
LIVE=os.environ.get("LIVE_BASE","https://deploy-preview-2--uis-korea.netlify.app").rstrip("/")
ERR=[]; WARN=[]; INFO=[]

def err(x): ERR.append(x)
def warn(x): WARN.append(x)
def info(x): INFO.append(x)

class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.title=[]; self.it=False; self.h1=0; self.lang=None; self.ids=set(); self.hrefs=[]; self.metas=[]; self.links=[]; self.j=False; self.buf=[]; self.jsonlds=[]
    def handle_starttag(self,t,attrs):
        a=dict(attrs)
        if t=="html": self.lang=a.get("lang")
        if t=="title": self.it=True
        if t=="h1": self.h1+=1
        if a.get("id"): self.ids.add(a["id"])
        if t=="a" and a.get("href"): self.hrefs.append((a["href"],a))
        if t=="meta": self.metas.append(a)
        if t=="link": self.links.append(a)
        if t=="script" and a.get("type","").lower()=="application/ld+json": self.j=True; self.buf=[]
    def handle_endtag(self,t):
        if t=="title": self.it=False
        if t=="script" and self.j: self.jsonlds.append("".join(self.buf).strip()); self.j=False
    def handle_data(self,d):
        if self.it:self.title.append(d)
        if self.j:self.buf.append(d)

def parse(s): p=P(); p.feed(s); return p

def meta(p,n):
    for a in p.metas:
        if a.get("name","").lower()==n.lower(): return a.get("content","").strip()
    return ""

def canonical(p):
    for a in p.links:
        if "canonical" in str(a.get("rel","")).lower().split(): return a.get("href","").strip()
    return ""

def get(url, limit=2_000_000, attempts=3):
    last_error=None
    for n in range(attempts):
        req=urllib.request.Request(url,headers={"User-Agent":"Mozilla/5.0 (compatible; TNS-Predeploy-Audit/1.0)"})
        try:
            with urllib.request.urlopen(req,timeout=20) as r: return r.status,r.geturl(),r.headers.get("content-type",""),r.read(limit),None
        except urllib.error.HTTPError as e:
            return e.code,e.geturl(),e.headers.get("content-type","") if e.headers else "",b"",None
        except Exception as e:
            last_error=e
            if n+1<attempts: time.sleep(2*(n+1))
    return None,None,"",b"",str(last_error)

def local(h):
    if h.startswith(("mailto:","tel:","javascript:","data:")):return False
    if h.startswith("#"):return True
    u=urllib.parse.urlsplit(h)
    return (not u.scheme and not u.netloc) or (u.scheme in ("http","https") and u.netloc=="uis-korea.netlify.app")

def live_url(base,h):
    u=urllib.parse.urlsplit(h)
    if u.netloc=="uis-korea.netlify.app": return LIVE+(u.path or "/")+(("#"+u.fragment) if u.fragment else "")
    return urllib.parse.urljoin(base,h)

def check_page(url,path):
    status,final,ctype,body,e=get(url)
    if e: err(f"{path}: request failed {e}"); return None
    if status!=200: err(f"{path}: HTTP {status}"); return None
    p=parse(body.decode("utf-8","replace"))
    title="".join(p.title).strip(); desc=meta(p,"description"); robots=meta(p,"robots").lower(); can=canonical(p)
    if not title:err(f"{path}: missing title")
    if not desc:err(f"{path}: missing description")
    if p.h1!=1:err(f"{path}: H1 count {p.h1}")
    if p.lang!="ko":warn(f"{path}: html lang {p.lang!r}")
    if "noindex" in robots:err(f"{path}: noindex")
    expected=PROD+path
    if can!=expected:err(f"{path}: canonical {can!r} != {expected!r}")
    for i,b in enumerate(p.jsonlds,1):
        try:json.loads(b)
        except Exception as ex:err(f"{path}: invalid JSON-LD #{i}: {ex}")
    return p

def main():
    sm=(ROOT/"sitemap.xml").read_text(encoding="utf-8")
    paths=[x or "/" for x in re.findall(r"<loc>"+re.escape(PROD)+r"([^<]*)</loc>",sm)]
    internal=set(); external=set(); page_cache={}
    core_ok=0
    for path in paths:
        url=LIVE+path; p=check_page(url,path)
        if not p:continue
        core_ok+=1; page_cache[path]=p
        for h,a in p.hrefs:
            if h.startswith("#"):
                if h[1:] and h[1:] not in p.ids:err(f"{path}: same-page fragment missing {h}")
            elif local(h): internal.add(live_url(url,h))
            else:
                u=urllib.parse.urlsplit(h)
                if u.scheme in ("http","https"): external.add(urllib.parse.urldefrag(h)[0])
    for extra in ("/robots.txt","/sitemap.xml"):
        st,final,ct,b,e=get(LIVE+extra,100000)
        if e or st!=200:err(f"{extra}: HTTP check failed ({e or st})")
        else:core_ok+=1
    info(f"Preview core URLs: {core_ok}/{len(paths)+2} reachable")

    def check_internal(x):
        nofrag,frag=urllib.parse.urldefrag(x); st,final,ct,b,e=get(nofrag)
        return x,frag,st,ct,b,e
    int_ok=0
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for x,frag,st,ct,b,e in pool.map(check_internal,sorted(internal)):
            if e:err(f"Internal link failed: {x} ({e})")
            elif st is None or not 200<=st<400:err(f"Internal link HTTP {st}: {x}")
            else:
                int_ok+=1
                if frag and "html" in ct.lower():
                    pp=parse(b.decode("utf-8","replace"))
                    if frag not in pp.ids:err(f"Internal target fragment missing: {x}")
    info(f"Served internal links: {int_ok}/{len(internal)} reachable")

    def check_external(x):
        st,final,ct,b,e=get(x,4096); return x,st,e
    ext_ok=ext_un=0
    with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
        for x,st,e in pool.map(check_external,sorted(external)):
            if e:warn(f"External unverifiable: {x} ({e})"); ext_un+=1
            elif st in (404,410):err(f"External broken HTTP {st}: {x}")
            elif st is not None and 200<=st<400:ext_ok+=1
            elif st in (401,403,405,429):warn(f"External bot-blocked HTTP {st}: {x}"); ext_un+=1
            else:warn(f"External unexpected HTTP {st}: {x}"); ext_un+=1
    info(f"External links: {ext_ok}/{len(external)} reachable; {ext_un} bot-blocked/unverifiable")

    print("\n=== UIS Live Preview Audit ===")
    for x in INFO:print("INFO:",x)
    for x in WARN:print("WARN:",x)
    for x in ERR:print("ERROR:",x)
    print(f"RESULT: {len(ERR)} errors, {len(WARN)} warnings")
    return 1 if ERR else 0

if __name__=="__main__":sys.exit(main())
