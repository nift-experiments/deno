"""Maintained Markdown/MDX/reference JSON -> standalone rendering -> Nift."""
from pathlib import Path
import json
import os
import subprocess
import time
from compose import human, changed
from measure import run_phase
import sys
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from publication.publish import publish

root=Path(__file__).resolve().parents[1]
os.chdir(root)
started=time.perf_counter()
phases={}
phases['render']=run_phase('render',[os.environ.get('DENO_BIN','deno'),'run','--config','compatibility/deno.json',
                '--lock','compatibility/deno.lock','--allow-read','--allow-write',
                '--allow-env','--allow-sys','compatibility/render.ts'])
render_s=time.perf_counter()-started
compose_start=time.perf_counter()
human()
compose_s=time.perf_counter()-compose_start
deno=os.environ.get('DENO_BIN','deno')
flags=['--config',str(root/'compatibility/deno.json'),'--lock',str(root/'compatibility/deno.lock'),'--allow-read','--allow-write','--allow-env','--allow-sys']
(root/'.generated/search').mkdir(parents=True,exist_ok=True)
search_start=time.perf_counter()
phases['search_generation']=run_phase('search-generation',[deno,'run',*flags,'orama/generate_orama_index_full.ts',str(root/'.generated/search')],cwd=root/'authored')
phases['search_clock']=run_phase('search-clock',[deno,'run',*flags,'publication/search-clock.ts'])
search_s=time.perf_counter()-search_start
llms_start=time.perf_counter()
phases['llms']=run_phase('llms',[deno,'run',*flags,'publication/llms.ts'])
llms_s=time.perf_counter()-llms_start
publication=publish(root,'deno')
changed('.generated/build-metrics.json',json.dumps({'model':'maintained Markdown/MDX/structured references -> standalone renderer -> transient HTML -> Nift -> publication/search','render_s':render_s,'render_components':json.loads((root/'.generated/render-metrics.json').read_text()),'phases':phases,'nift_process':json.loads((root/'.generated/nift-metrics.json').read_text()),'nift_preparation_and_composition_s':compose_s,'search_s':search_s,'llms_s':llms_s,'og_generation_s':0,'og_model':'maintained static publication assets; explicit updates outside routine builds',**publication,'complete_s':time.perf_counter()-started},indent=2)+'\n')
