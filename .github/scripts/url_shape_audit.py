#!/usr/bin/env python3
"""Check that sitemap/canonical URL paths do not redirect under Netlify routing."""
import os,re,sys,urllib.parse,urllib.request,urllib.error
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
PROD='https://uis-korea.netlify.app'
LIVE=os.environ.get('LIVE_BASE','https://deploy-preview-2--uis-korea.netlify.app').rstrip('/')

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl): return None
opener=urllib.request.build_opener(NoRedirect)

def raw_status(url):
    req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0 TNS-URL-Shape-Audit/1.0'})
    try:
        with opener.open(req,timeout=15) as r:return r.status,r.headers.get('Location')
    except urllib.error.HTTPError as e:return e.code,e.headers.get('Location')
    except Exception as e:return None,str(e)

sm=(ROOT/'sitemap.xml').read_text(encoding='utf-8')
paths=[p or '/' for p in re.findall(r'<loc>'+re.escape(PROD)+r'([^<]*)</loc>',sm)]
errors=[]; redirects=[]; alternates=[]
for p in paths:
    st,loc=raw_status(LIVE+p)
    if st in (301,302,307,308):
        redirects.append((p,st,loc)); errors.append(f'Canonical/sitemap path redirects: {p} -> {loc} ({st})')
    elif st!=200: errors.append(f'Canonical/sitemap path HTTP {st}: {p} ({loc})')
    if p.endswith('.html'):
        pretty=p[:-5]
        st2,loc2=raw_status(LIVE+pretty)
        if st2==200:alternates.append((p,pretty,'200'))
        elif st2 in (301,302,307,308):alternates.append((p,pretty,f'{st2}->{loc2}'))
print('=== URL shape audit ===')
print(f'Sitemap/canonical paths checked: {len(paths)}')
print(f'Canonical paths redirecting: {len(redirects)}')
print(f'Extensionless alternate routes responding/redirecting: {len(alternates)}')
for x in redirects[:30]:print('REDIRECT:',x)
for x in alternates[:30]:print('ALT:',x)
for e in errors:print('ERROR:',e)
print(f'RESULT: {len(errors)} errors')
sys.exit(1 if errors else 0)
