import {extractYaml} from '@std/front-matter';
import {toFileUrl} from '@std/path';
import {markdown,markdownMetrics} from './markdown.ts';
import {components,render,helpers} from './jsx.ts';
import {MDXEngine} from 'lume/plugins/mdx.ts';
import {remarkGfm} from 'lume/deps/mdx.ts';
import {stringToDocument,documentToString} from 'lume/core/utils/dom.ts';
const started=performance.now();
const timing={generator_s:0,component_binding_s:0,body_s:0,mdx_s:0,layout_s:0,dom_s:0};
const fixtures=JSON.parse(await Deno.readTextFile(Deno.args.includes('--fixtures')?'compatibility/fixtures.json':'data/routes.json'));
await Deno.mkdir('.generated/pages',{recursive:true});
const seeds=JSON.parse(await Deno.readTextFile('data/page-metadata.json'));
const shared=JSON.parse(await Deno.readTextFile('data/shared-metadata.json'));
const revive=(v:unknown):unknown=>{
 if(!v||typeof v!=='object')return v;
 if('$shared' in v)return revive(shared[v.$shared]);
 if('$function' in v)return undefined;
 return Array.isArray(v)?v.map(revive):Object.fromEntries(Object.entries(v).map(([k,x])=>[k,revive(x)]));
};
const metadata=Object.fromEntries(Object.entries(seeds).map(([k,v])=>[k,revive(v)]));
// Cross-page queries read maintained frontmatter, not the migration seed.
for (const f of fixtures) {
 if (!/\.mdx?$/.test(f.sourcePath)) continue;
 const raw = await Deno.readTextFile('authored/'+f.sourcePath.replace(/^\//,''));
 if (raw.startsWith('---')) Object.assign(metadata[f.url] ??= {}, extractYaml(raw).attrs);
}
const globalData=JSON.parse(await Deno.readTextFile('authored/_data.json'));
const denoCategories=JSON.parse(await Deno.readTextFile('authored/reference_gen/deno-categories.json'));
const webCategories=JSON.parse(await Deno.readTextFile('authored/reference_gen/web-categories.json'));
const nodeRewriteMap=JSON.parse(await Deno.readTextFile('authored/reference_gen/node-rewrite-map.json'));
globalData.apiCategories={
 deno:{title:'Deno APIs',categories:Object.keys(denoCategories),descriptions:denoCategories},
 web:{title:'Web APIs',categories:Object.keys(webCategories),descriptions:webCategories},
 node:{title:'Node APIs',categories:Object.keys(nodeRewriteMap),descriptions:{}},
};
const scopes:Record<string,Record<string,unknown>>={};
for(const dir of ['runtime','deploy','deploy/classic','sandbox','subhosting','examples','styleguide','lint']){
 scopes['/'+dir+'/']=await import(toFileUrl(Deno.cwd()+'/authored/'+dir+'/_data.ts').href);
}
const inherited=(source:string)=>Object.assign({},...Object.entries(scopes).filter(([prefix])=>source.startsWith(prefix)).sort(([a],[b])=>a.length-b.length).map(([,values])=>values));
const search={data:(url:string)=>({...globalData,...metadata[url],...inherited(url),apiCategories:globalData.apiCategories}),pages:(query:string)=>{
 if(query!=='url^=/examples/')throw Error('Unsupported corpus search query: '+query);
 return Object.entries(metadata).filter(([url])=>url.startsWith('/examples/')).map(([url,d])=>({...d,url}));
}};
const mdx=new MDXEngine(Deno.cwd()+'/authored',{includes:'_includes',remarkPlugins:[remarkGfm],components:{}});
const root=Deno.cwd();
const generated=new Map();
const ogPages=[];
const generatorStart=performance.now();
for(const source of ['examples/index.examples.page.tsx','examples/index.page.tsx','lint/lint_rule.page.tsx','reference/reference.page.ts']){
 const module=await import(toFileUrl(root+'/authored/'+source).href);
 const base={search};await components(base,source.startsWith('reference/'),source.startsWith('examples/'));
 Deno.chdir(root+'/authored');
 try{for(const item of module.default(base,helpers)){
  if(item.url==='/api/_redirects.json'){await Deno.writeTextFile(root+'/.generated/api-redirects.json',item.content);continue;}
  const url=item.url.replace(/\/index\.html$/,'/').replace(/\/?$/,'/');
  generated.set(url,{...item,layout:item.layout??module.layout,url});
 }}finally{Deno.chdir(root);}
}
timing.generator_s=(performance.now()-generatorStart)/1000;
for(const f of fixtures){
 const gen=generated.get(f.url);
 let body='',attrs={};
 if(/\.mdx?$/.test(f.sourcePath)){
  const raw=await Deno.readTextFile('authored/'+f.sourcePath.replace(/^\//,''));
  if(raw.startsWith('---'))({body,attrs}=extractYaml(raw));else body=raw;
 }else if(!gen&&f.sourcePath!=='/lint/index.page.tsx')throw Error('Unsupported fixture source: '+f.sourcePath);
 const data={...globalData,...metadata[f.url],...inherited(f.sourcePath),...attrs,url:f.url,search};
 data.apiCategories=globalData.apiCategories;
 if(gen)Object.assign(data,gen);
 data.lastModified=data.last_modified?new Date(data.last_modified):undefined;
 data.page={sourcePath:f.sourcePath,data};
 const bindingStart=performance.now();
 await components(data,f.url.startsWith('/api/'),f.url.startsWith('/examples/'));
 timing.component_binding_s+=(performance.now()-bindingStart)/1000;
 if(attrs.templateEngine){
  if(f.sourcePath!=='/runtime/reference/node_apis.md'||JSON.stringify(attrs.templateEngine)!=='["vto","md"]')throw Error('Unsupported corpus templateEngine: '+f.sourcePath);
  const marker='{{ await generateNodeCompatibility() }}';
  if(body.split(marker).length!==2)throw Error('Unexpected Node compatibility expression count');
  body=body.replace(marker,await data.generateNodeCompatibility());
 }
 for(const [kind,c]of Object.entries(data.apiCategories??{}))c.getCategoryHref=(name:string)=>kind==='node'?`/api/node/${name}/`:`/api/${kind}/${name==='I/O'?'io':name.toLowerCase().replace(/\s+/g,'-')}`;
 const bodyStart=performance.now();
 let html=gen?gen.content?await render(gen.content,data):'':f.sourcePath==='/lint/index.page.tsx'?await render((await import(toFileUrl(root+'/authored/lint/index.page.tsx').href)).default,data):f.sourcePath.endsWith('.mdx')?await mdx.render(body,data,f.sourcePath):markdown.render(body,{filename:f.sourcePath,data});
 timing.body_s+=(performance.now()-bodyStart)/1000;
 if(f.sourcePath.endsWith('.mdx'))timing.mdx_s+=(performance.now()-bodyStart)/1000;
 const layoutStart=performance.now();
 for(let name=attrs.layout??gen?.layout??f.layout??'doc.tsx';name;){
  const m=await import(toFileUrl(Deno.cwd()+'/authored/_includes/'+name).href);
  html=await render(m.default,{...data,children:html,content:html});name=m.layout;
 }
 timing.layout_s+=(performance.now()-layoutStart)/1000;
 const domStart=performance.now();
 const doc=stringToDocument('<!DOCTYPE html>\n'+html);
 for(const table of doc.querySelectorAll('table')){
  if(table.parentElement?.classList.contains('table-wrapper'))continue;
  const wrap=doc.createElement('div');wrap.className='table-wrapper';table.replaceWith(wrap);wrap.append(table);
 }
 html=documentToString(doc);
 timing.dom_s+=(performance.now()-domStart)/1000;
 ogPages.push({route:f.url,title:data.title,description:data.description,openGraphLayout:data.openGraphLayout??'/open_graph/default.jsx',openGraphTitle:data.openGraphTitle,openGraphColor:data.openGraphColor});
 const expected=Deno.args.includes('--verify')?await Deno.readTextFile('../deno-baseline/site/'+f.outputPath.replace(/^\//,'')):html;
 const out='.generated/pages/'+f.url.replaceAll('/','_')+'.html';await Deno.writeTextFile(out,html);
 console.log(JSON.stringify({route:f.url,match:html===expected,bytes:html.length,expected:expected.length}));
 if(html!==expected){await Deno.writeTextFile('.generated/proof/expected.html',expected);throw Error('Layout parity failed: '+f.url);}
}

await Deno.writeTextFile('.generated/render-metrics.json',JSON.stringify({render_s:(performance.now()-started)/1000,pages:fixtures.length,...timing,...markdownMetrics,counter_boundaries:'Prism is a subset of inclusive Markdown; MDX is a subset of body; Markdown helpers also occur in layout/generator work. Do not add overlapping counters.'}));
await Deno.writeTextFile('.generated/og-data.json',JSON.stringify(ogPages));
