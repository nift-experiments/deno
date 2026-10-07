"""Maintained Markdown/MDX/reference JSON -> standalone rendering -> Nift."""
from pathlib import Path
import json
import os
import subprocess
import time
from compose import human, changed

root=Path(__file__).resolve().parents[1]
os.chdir(root)
started=time.perf_counter()
subprocess.run([os.environ.get('DENO_BIN','deno'),'run','--config','compatibility/deno.json',
                '--lock','compatibility/deno.lock','--allow-read','--allow-write',
                '--allow-env','--allow-sys','compatibility/render.ts'],check=True)
render_s=time.perf_counter()-started
compose_start=time.perf_counter()
human()
changed('.generated/build-metrics.json',json.dumps({'model':'maintained Markdown/MDX/structured references -> standalone renderer -> transient HTML -> Nift','render_s':render_s,'nift_preparation_and_composition_s':time.perf_counter()-compose_start,'complete_s':time.perf_counter()-started},indent=2)+'\n')
