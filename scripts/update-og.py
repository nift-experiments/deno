"""Explicit maintained OG asset update; never invoked by routine builds."""
from pathlib import Path
import argparse, hashlib, json, os, subprocess, time
root=Path(__file__).resolve().parents[1]
os.chdir(root)
p=argparse.ArgumentParser(description=__doc__)
g=p.add_mutually_exclusive_group(required=True)
g.add_argument('--route',action='append',help='Published route, including surrounding slashes')
g.add_argument('--all',action='store_true',help='Explicitly regenerate every maintained image')
a=p.parse_args()
deno=os.environ.get('DENO_BIN','deno')
flags=['--config','compatibility/deno.json','--lock','compatibility/deno.lock','--allow-read','--allow-write','--allow-env','--allow-sys','--allow-ffi']
started=time.perf_counter()
subprocess.run([deno,'run',*flags,'compatibility/render.ts'],check=True)
args=['--all'] if a.all else sum((['--route',route] for route in a.route),[])
subprocess.run([deno,'run',*flags,'publication/og.ts',*args],check=True)
rows=json.loads((root/'.generated/og-data.json').read_text())
assets={item['route']:item for item in json.loads((root/'data/og-assets.json').read_text())}
for row in rows:
 if not a.all and row['route'] not in a.route: continue
 route=row['route']; source='assets/og'+route+'index.png'
 assets[route]={'route':route,'source':source,'output':route.lstrip('/')+'index.png','accepted_sha256':hashlib.sha256((root/source).read_bytes()).hexdigest(),'metadata_sha256':hashlib.sha256(json.dumps(row,sort_keys=True).encode()).hexdigest()}
(root/'data/og-assets.json').write_text(json.dumps(list(assets.values()),indent=2)+'\n')
(root/'.generated/og-maintenance-metrics.json').write_text(json.dumps({'explicit_update_s':time.perf_counter()-started,'images':len(rows) if a.all else len(a.route),'included_in_normal_publication':False},indent=2)+'\n')
