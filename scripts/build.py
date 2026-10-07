"""Maintained Markdown/MDX/reference JSON -> standalone rendering -> Nift."""
from pathlib import Path
import json
import os
import subprocess
import time
from compose import human, changed
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from publication.publish import publish

root=Path(__file__).resolve().parents[1]
os.chdir(root)
started=time.perf_counter()
subprocess.run([os.environ.get('DENO_BIN','deno'),'run','--config','compatibility/deno.json',
                '--lock','compatibility/deno.lock','--allow-read','--allow-write',
                '--allow-env','--allow-sys','compatibility/render.ts'],check=True)
render_s=time.perf_counter()-started
compose_start=time.perf_counter()
human()
compose_s=time.perf_counter()-compose_start
deno=os.environ.get('DENO_BIN','deno')
flags=['--config',str(root/'compatibility/deno.json'),'--lock',str(root/'compatibility/deno.lock'),'--allow-read','--allow-write','--allow-env','--allow-sys']
(root/'.generated/search').mkdir(parents=True,exist_ok=True)
search_start=time.perf_counter()
subprocess.run([deno,'run',*flags,'orama/generate_orama_index_full.ts',str(root/'.generated/search')],cwd=root/'authored',check=True)
subprocess.run([deno,'run',*flags,'publication/search-clock.ts'],check=True)
search_s=time.perf_counter()-search_start
llms_start=time.perf_counter()
subprocess.run([deno,'run',*flags,'publication/llms.ts'],check=True)
llms_s=time.perf_counter()-llms_start
og_start=time.perf_counter()
subprocess.run([deno,'run',*flags,'--allow-ffi','publication/og.ts'],check=True)
og_s=time.perf_counter()-og_start
publication=publish(root,'deno')
changed('.generated/build-metrics.json',json.dumps({'model':'maintained Markdown/MDX/structured references -> standalone renderer -> transient HTML -> Nift -> publication/search','render_s':render_s,'nift_preparation_and_composition_s':compose_s,'search_s':search_s,'llms_s':llms_s,'og_s':og_s,**publication,'complete_s':time.perf_counter()-started},indent=2)+'\n')
