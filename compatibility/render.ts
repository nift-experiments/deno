import {extractYaml} from '@std/front-matter';
import {toFileUrl} from '@std/path';
import {markdown} from './markdown.ts';
import {components,render,helpers} from './jsx.ts';
import {MDXEngine} from 'lume/plugins/mdx.ts';
import {remarkGfm} from 'lume/deps/mdx.ts';
import {stringToDocument,documentToString} from 'lume/core/utils/dom.ts';
const started=performance.now();
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
const globalData=JSON.parse(await Deno.readTextFile('authored/_data.json'));
globalData.apiCategories=metadata['/runtime/'].apiCategories;
const scopes:Record<string,Record<string,unknown>>={};
for(const dir of ['runtime','deploy','deploy/classic','sandbox','subhosting','examples','styleguide','lint']){
 scopes['/'+dir+'/']=await import(toFileUrl(Deno.cwd()+'/authored/'+dir+'/_data.ts').href);
}
const inherited=(source:string)=>Object.assign({},...Object.entries(scopes).filter(([prefix])=>source.startsWith(prefix)).sort(([a],[b])=>a.length-b.length).map(([,values])=>values));
const search={data:(url:string)=>({...globalData,...metadata[url],...inherited(url)}),pages:(query:string)=>{
 if(query!=='url^=/examples/')throw Error('Unsupported corpus search query: '+query);
 return Object.entries(metadata).filter(([url])=>url.startsWith('/examples/')).map(([url,d])=>({...d,url}));
}};
const mdx=new MDXEngine(Deno.cwd()+'/authored',{includes:'_includes',remarkPlugins:[remarkGfm],components:{}});
const root=Deno.cwd();
const generated=new Map();
for(const source of ['examples/index.examples.page.tsx','lint/lint_rule.page.tsx','reference/reference.page.ts']){
 const module=await import(toFileUrl(root+'/authored/'+source).href);
 const base={search};await components(base,source.startsWith('reference/'),source.startsWith('examples/'));
 Deno.chdir(root+'/authored');
 try{for(const item of module.default(base,helpers)){
  const url=item.url.replace(/\/index\.html$/,'/').replace(/\/?$/,'/');
  generated.set(url,{...item,layout:item.layout??module.layout,url});
 }}finally{Deno.chdir(root);}
}
for(const f of fixtures){
 const gen=generated.get(f.url);
 let body='',attrs={};
 if(/\.mdx?$/.test(f.sourcePath)){
  const raw=await Deno.readTextFile('authored/'+f.sourcePath.replace(/^\//,''));
  if(raw.startsWith('---'))({body,attrs}=extractYaml(raw));else body=raw;
 }else if(!gen)throw Error('Unsupported fixture source: '+f.sourcePath);
 const data={...globalData,...metadata[f.url],...inherited(f.sourcePath),...attrs,url:f.url,search};
 if(gen)Object.assign(data,gen);
 data.lastModified=data.last_modified?new Date(data.last_modified):undefined;
 data.page={sourcePath:f.sourcePath,data};
 await components(data,f.url.startsWith('/api/'),f.url.startsWith('/examples/'));
 if(attrs.templateEngine){
  if(f.sourcePath!=='/runtime/reference/node_apis.md'||JSON.stringify(attrs.templateEngine)!=='["vto","md"]')throw Error('Unsupported corpus templateEngine: '+f.sourcePath);
  const marker='{{ await generateNodeCompatibility() }}';
  if(body.split(marker).length!==2)throw Error('Unexpected Node compatibility expression count');
  body=body.replace(marker,await data.generateNodeCompatibility());
 }
 for(const [kind,c]of Object.entries(data.apiCategories??{}))c.getCategoryHref=(name:string)=>kind==='node'?`/api/node/${name}/`:`/api/${kind}/${name==='I/O'?'io':name.toLowerCase().replace(/\s+/g,'-')}`;
 let html=gen?gen.content?await render(gen.content,data):'':f.sourcePath.endsWith('.mdx')?await mdx.render(body,data,f.sourcePath):markdown.render(body,{filename:f.sourcePath,data});
 for(let name=attrs.layout??gen?.layout??f.layout??'doc.tsx';name;){
  const m=await import(toFileUrl(Deno.cwd()+'/authored/_includes/'+name).href);
  html=await render(m.default,{...data,children:html,content:html});name=m.layout;
 }
 const doc=stringToDocument('<!DOCTYPE html>\n'+html);
 for(const table of doc.querySelectorAll('table')){
  if(table.parentElement?.classList.contains('table-wrapper'))continue;
  const wrap=doc.createElement('div');wrap.className='table-wrapper';table.replaceWith(wrap);wrap.append(table);
 }
 html=documentToString(doc);
 const expected=Deno.args.includes('--verify')?await Deno.readTextFile('../deno-baseline/site/'+f.outputPath.replace(/^\//,'')):html;
 const out='.generated/pages/'+f.url.replaceAll('/','_')+'.html';await Deno.writeTextFile(out,html);
 console.log(JSON.stringify({route:f.url,match:html===expected,bytes:html.length,expected:expected.length}));
 if(html!==expected){await Deno.writeTextFile('.generated/proof/expected.html',expected);throw Error('Layout parity failed: '+f.url);}
}

await Deno.writeTextFile('.generated/render-metrics.json',JSON.stringify({render_s:(performance.now()-started)/1000,pages:fixtures.length}));
