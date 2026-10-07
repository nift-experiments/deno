"""Reuse deterministic search/LLM outputs only after input and output verification."""
import hashlib,json,sys

def state(root,keys):
 inputs={'page_keys':keys}
 for p in sorted((root/'publication').glob('*.ts')):inputs[p.name]=hashlib.sha256(p.read_bytes()).hexdigest()
 inputs['cache_implementation']=hashlib.sha256(__import__('pathlib').Path(__file__).read_bytes()).hexdigest()
 key=hashlib.sha256(json.dumps(inputs,sort_keys=True).encode()).hexdigest()
 path=root/'.generated/export-cache.json'
 try:old=json.loads(path.read_text()) if path.exists() else {}
 except (ValueError,OSError):old={}
 if not isinstance(old,dict):old={}
 valid=old.get('key')==key and bool(old.get('outputs')) and '--force' not in sys.argv
 for name,value in old.get('outputs',{}).items():
  p=root/name
  if not p.exists() or hashlib.sha256(p.read_bytes()).hexdigest()!=value:valid=False;break
 return key,valid

def save(root,key):
 outputs={p.relative_to(root).as_posix():hashlib.sha256(p.read_bytes()).hexdigest()for folder in ['search','llms']for p in (root/'.generated'/folder).glob('*')if p.is_file()}
 (root/'.generated/export-cache.json').write_text(json.dumps({'key':key,'outputs':outputs},sort_keys=True)+'\n')
