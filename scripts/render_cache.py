"""Content-verified transient page cache with conservative shared-input invalidation."""
from pathlib import Path
import hashlib,json,os,subprocess,time

def digest(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def prepare(root):
 started=time.perf_counter();routes=json.loads((root/'data/routes.json').read_text())
 source_paths={root/'authored'/r['sourcePath'].lstrip('/') for r in routes if r['sourcePath'].endswith(('.md','.mdx'))}
 shared={};discovery=time.perf_counter()
 files=sorted(p for directory in ['authored','compatibility','data'] for p in (root/directory).rglob('*') if p.is_file() and not any(x in p.parts for x in ['node_modules','.git','__pycache__']))
 discovery_s=time.perf_counter()-discovery
 hashing=time.perf_counter()
 for p in files:
  if p in source_paths:
   raw=p.read_bytes();parts=raw.split(b'---',2)
   # All frontmatter participates in cross-page metadata/navigation queries.
   value=parts[1] if raw.startswith(b'---') and len(parts)==3 else b''
   shared[p.relative_to(root).as_posix()]=hashlib.sha256(value).hexdigest()
  else:shared[p.relative_to(root).as_posix()]=digest(p)
 tool=os.environ.get('DENO_BIN','deno')
 shared['deno_version']=subprocess.check_output([tool,'--version'],text=True)
 shared['cache_implementation']=digest(Path(__file__))
 global_key=hashlib.sha256(json.dumps(shared,sort_keys=True).encode()).hexdigest()
 keys={r['url']:hashlib.sha256((global_key+(digest(root/'authored'/r['sourcePath'].lstrip('/')) if r['sourcePath'].endswith(('.md','.mdx')) else '')).encode()).hexdigest() for r in routes}
 old_path=root/'.generated/render-cache.json'
 try:old=json.loads(old_path.read_text()) if old_path.exists() else {}
 except (ValueError,OSError):old={}
 if not isinstance(old,dict):old={}
 reusable=[]
 for r in routes:
  url=r['url'];p=root/'.generated/pages'/ (url.replace('/','_')+'.html');entry=old.get(url,{})
  if entry.get('key')==keys[url] and p.exists() and digest(p)==entry.get('output_sha256'):reusable.append(url)
 ancillary=old.get('__ancillary__',{})
 if '--force' in __import__('sys').argv or not all((root/path).exists() and digest(root/path)==ancillary.get(path) for path in ['.generated/og-data.json','.generated/api-redirects.json','.generated/redirects.json']):reusable=[]
 (root/'.generated').mkdir(exist_ok=True)
 (root/'.generated/render-cache-plan.json').write_text(json.dumps({'keys':keys,'reusable':reusable}))
 return keys,reusable,{'source_discovery_s':discovery_s,'input_hashing_and_validation_s':time.perf_counter()-hashing,'cache_preparation_s':time.perf_counter()-started}

def save(root,keys):
 entries={url:{'key':key,'output_sha256':digest(root/'.generated/pages'/(url.replace('/','_')+'.html'))} for url,key in keys.items()}
 entries['__ancillary__']={path:digest(root/path) for path in ['.generated/og-data.json','.generated/api-redirects.json','.generated/redirects.json']}
 (root/'.generated/render-cache.json').write_text(json.dumps(entries,sort_keys=True)+'\n')
