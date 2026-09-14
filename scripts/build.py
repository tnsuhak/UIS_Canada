"""Publish only public assets; add server-side noindex headers on previews."""
from pathlib import Path
import shutil, os
root=Path(__file__).resolve().parents[1];out=root/'dist'
if out.exists():shutil.rmtree(out)
out.mkdir()
for pattern in ['*.html','favicon.svg','robots.txt','sitemap.xml']:
 for p in root.glob(pattern):shutil.copy2(p,out/p.name)
for folder in ['assets','news','outcomes']:
 shutil.copytree(root/folder,out/folder)
if os.environ.get('CONTEXT')!='production':
 (out/'_headers').write_text('/*\n  X-Robots-Tag: noindex, nofollow\n')
 (out/'robots.txt').write_text('User-agent: *\nDisallow: /\n')
print('Built',len(list(out.rglob('*.html'))),'static pages; context:',os.environ.get('CONTEXT','local-preview'))
# Preview-only viewport harness for visual checks; never included in production.
if os.environ.get('CONTEXT')!='production':
 (out/'_review.html').write_text('''<!doctype html><html><head><meta name="robots" content="noindex,nofollow"><title>UIS preview viewport checks</title><style>body{background:#ddd;margin:20px;display:flex;gap:20px;align-items:start}iframe{border:0;flex-shrink:0;background:white;height:1500px}</style></head><body><iframe title="UIS mobile 390" width="390" src="/"></iframe><iframe title="UIS tablet 768" width="768" src="/"></iframe></body></html>''')
