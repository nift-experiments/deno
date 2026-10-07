"""Raw composition with explicit dependencies and an owned-output retirement ledger."""
from pathlib import Path
import hashlib
import json
import subprocess

ROOT = Path(__file__).resolve().parents[1]


def changed(path, text):
    path = ROOT / path
    path.parent.mkdir(parents=True, exist_ok=True)
    if not path.exists() or path.read_text() != text:
        path.write_text(text)


def emit(path):
    return '@dep(' + json.dumps(path) + ')$[rawHtml(' + json.dumps(path) + ')]'


def compose(model):
    tracked, owned = [], []
    for page in model:
        name = page['route'].strip('/') + '/index'
        wrapper = ''.join('@dep(' + json.dumps(p) + ')' for p in page['dependencies'])
        wrapper += ''.join(emit(page[k]) for k in ('prefix', 'body', 'suffix'))
        changed('.generated/content/' + name + '.html', wrapper)
        tracked.append({'name': name, 'title': page['title'] or '', 'template': 'templates/template.html'})
        owned.append('public/' + name + '.html')
    changed('.nift/tracked.json', json.dumps({'tracked': tracked}, indent=2) + '\n')
    ledger = ROOT / '.generated/owned.json'
    old = json.loads(ledger.read_text()) if ledger.exists() else []
    for stale in set(old) - set(owned):
        # Only retire files explicitly owned by this builder, never arbitrary assets.
        (ROOT / stale).unlink(missing_ok=True)
        (ROOT / (stale + '.info.json')).unlink(missing_ok=True)
    changed('.generated/owned.json', json.dumps(owned, indent=2) + '\n')
    if not (ROOT / 'templates/template.html').exists():
        changed('templates/template.html', '@script { fn(rawHtml(path)) { f := file(path); f.open(); value := f.read_all(); f.close(); return value; } }@content')
    subprocess.run(['nift', 'build'], cwd=ROOT, check=True)


def split(html):
    start = html.index('<main ')
    stop = html.index('</main>', start) + len('</main>')
    return html[:start], html[start:stop], html[stop:]


def human():
    model = []
    compiler_inputs={}
    for directory in ('compatibility','authored/_includes','authored/_components','authored/reference','authored/reference_gen','authored/examples/_components'):
        for p in sorted((ROOT/directory).rglob('*')):
            if p.is_file() and p.suffix in ('.ts','.tsx','.jsx','.json','.yaml') and 'reference-warnings.log' not in p.name:
                compiler_inputs[p.relative_to(ROOT).as_posix()]=hashlib.sha256(p.read_bytes()).hexdigest()
    for p in sorted((ROOT/'authored').rglob('_data.ts')):
        compiler_inputs[p.relative_to(ROOT).as_posix()]=hashlib.sha256(p.read_bytes()).hexdigest()
    changed('.generated/compiler-inputs.json',json.dumps(compiler_inputs,sort_keys=True)+'\n')
    for f in json.loads((ROOT / 'data/routes.json').read_text()):
        html = (ROOT / ('.generated/pages/' + f['url'].replace('/', '_') + '.html')).read_text()
        row = {'route': f['url'], 'title': f['url'], 'dependencies': ['.generated/compiler-inputs.json','data/routes.json','scripts/compose.py','compatibility/render.ts', 'compatibility/markdown.ts', 'compatibility/jsx.ts', 'data/page-metadata.json', 'data/shared-metadata.json']}
        if f['sourcePath'].endswith(('.md', '.mdx')):
            row['dependencies'].append('authored/' + f['sourcePath'].lstrip('/'))
        for key, fragment in zip(('prefix', 'body', 'suffix'), split(html)):
            digest = hashlib.sha256(fragment.encode()).hexdigest()
            path = '.generated/fragments/' + digest + '.html'
            changed(path, fragment)
            row[key] = path
        model.append(row)
    compose(model)


if __name__ == '__main__':
    human()
