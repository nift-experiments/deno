import {extractYaml} from '@std/front-matter';
import {markdown} from './markdown.ts';
const fixtures=JSON.parse(await Deno.readTextFile('compatibility/fixtures.json'));
const expected=JSON.parse(await Deno.readTextFile('../deno-baseline/evidence/expected-bodies.json'));
await Deno.mkdir('.generated/proof',{recursive:true});
for(const f of fixtures){
 if(!f.sourcePath.endsWith('.md'))continue;
 const raw=await Deno.readTextFile('authored/'+f.sourcePath.replace(/^\//,''));
 const {body,attrs}=extractYaml(raw);
 const html=markdown.render(body,{filename:f.sourcePath,data:attrs});
 const match=html===expected[f.url];
 await Deno.writeTextFile('.generated/proof/'+f.url.replaceAll('/','_')+'.html',html);
 console.log(JSON.stringify({route:f.url,source:f.sourcePath,match,bytes:html.length,expected:expected[f.url]?.length}));
 if(!match)throw Error('Real-source Markdown body parity failed: '+f.url);
}
