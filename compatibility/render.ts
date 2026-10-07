import {extractYaml} from '@std/front-matter';
import {toFileUrl} from '@std/path';
import {markdown,markdownMetrics} from './markdown.ts';
import {components,render,helpers,jsxMetrics} from './jsx.ts';
import {MDXEngine} from 'lume/plugins/mdx.ts';
import {remarkGfm} from 'lume/deps/mdx.ts';
import {NormalizerPool} from './normalize-pool.ts';
const started=performance.now();
const timing={frontmatter_s:0,metadata_s:0,page_metadata_s:0,redirect_generation_subset_s:0,generators:{},generator_s:0,component_binding_s:0,body_s:0,mdx_s:0,layout_s:0,dom_s:0};
const fixtures=JSON.parse(await Deno.readTextFile(Deno.args.includes('--fixtures')?'compatibility/fixtures.json':'data/routes.json'));
await Deno.mkdir('.generated/pages',{recursive:true});
const metadataStart=performance.now();
const seeds=JSON.parse(await Deno.readTextFile('data/page-metadata.json'));
const shared=JSON.parse(await Deno.readTextFile('data/shared-metadata.json'));
const revivedShared=new Map();
const revive=(v:unknown):unknown=>{
 if(!v||typeof v!=='object')return v;
 if('$shared' in v){if(!revivedShared.has(v.$shared))revivedShared.set(v.$shared,revive(shared[v.$shared]));return revivedShared.get(v.$shared);}
 if('$function' in v)return undefined;
 return Array.isArray(v)?v.map(revive):Object.fromEntries(Object.entries(v).map(([k,x])=>[k,revive(x)]));
};
const metadata=Object.fromEntries(Object.entries(seeds).map(([k,v])=>[k,revive(v)]));
const frontmatterOwnership=JSON.parse(await Deno.readTextFile('data/frontmatter-ownership.json'));
const sourceFrontmatter=new Map();
// Cross-page queries read maintained frontmatter, not the migration seed.
for (const f of fixtures) {
 if (!/\.mdx?$/.test(f.sourcePath)) continue;
 const raw = await Deno.readTextFile('authored/'+f.sourcePath.replace(/^\//,''));
 const yamlStart=performance.now();
 const parsed=raw.startsWith('---')?extractYaml(raw).attrs:{};
 sourceFrontmatter.set(f.sourcePath,parsed);
 for(const key of frontmatterOwnership[f.url]??[]){if(!(key in parsed)&&metadata[f.url])delete metadata[f.url][key];}
 if (raw.startsWith('---')) Object.assign(metadata[f.url] ??= {}, parsed);
 timing.frontmatter_s+=(performance.now()-yamlStart)/1000;
}
const redirectStart=performance.now();
const redirects=JSON.parse(await Deno.readTextFile('data/redirects.json'));
const wanted=new Map<string,Set<string>>();
const aliasList=(value:any)=>value==null?[]:Array.isArray(value)?value:[value];
for(const f of fixtures){
 let aliases:any=[];
 if(/\.mdx?$/.test(f.sourcePath)){
  aliases=sourceFrontmatter.get(f.sourcePath)?.oldUrl;
 }else if(f.sourcePath==='/lint/index.page.tsx'){aliases=(await import(toFileUrl(Deno.cwd()+'/authored/lint/index.page.tsx').href)).oldUrl;}
 for(const from of aliasList(aliases)){if(typeof from!=='string')throw Error('Unsupported source alias shape');if(!wanted.has(from))wanted.set(from,new Set());wanted.get(from)!.add(f.url);}
}
const initialAliases=new Set(Object.values(seeds).flatMap((row:any)=>aliasList(row.oldUrl)));
for(const from of initialAliases){
 const targets=wanted.get(from as string);
 if(!targets?.size){delete redirects[from as string];continue;}
 if(!targets.has(redirects[from as string])){if(targets.size!==1)throw Error('Ambiguous changed source alias: '+from);redirects[from as string]=[...targets][0];}
}
for(const [from,targets]of wanted){if(from in redirects)continue;if(targets.size!==1)throw Error('Ambiguous source alias: '+from);redirects[from]=[...targets][0];}
await Deno.writeTextFile('.generated/redirects.json',JSON.stringify(redirects,null,2));
timing.redirect_generation_subset_s+=(performance.now()-redirectStart)/1000;
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
timing.metadata_s=(performance.now()-metadataStart)/1000;
const generated=new Map();
let previousOG=[];
try{previousOG=JSON.parse(await Deno.readTextFile('.generated/og-data.json'));}catch{/* Derived metadata is rebuilt on a cache miss. */}
const cachePlan=JSON.parse(await Deno.readTextFile('.generated/render-cache-plan.json').catch(()=>'{}'));
const reusable=new Set(Deno.args.includes('--cache-plan')?(cachePlan.reusable??[]):[]);
const ogPages=[];
const missCount=fixtures.filter((f:any)=>!reusable.has(f.url)).length;
const requestedWorkers=Number(Deno.env.get('DENO_NORMALIZE_WORKERS')??'4');
if(!Number.isInteger(requestedWorkers)||requestedWorkers<0||requestedWorkers>4)throw Error('Normalization workers must be 0..4');
const pool=new NormalizerPool(missCount>=32?requestedWorkers:0);
const inFlight=new Set<Promise<void>>();
let backpressure_s=0,output_io_work_s=0;
const generatorStart=performance.now();
for(const source of ['examples/index.examples.page.tsx','examples/index.page.tsx','lint/lint_rule.page.tsx','reference/reference.page.ts']){
 const sourceStem='/'+source.replace('.page.tsx','').replace('.page.ts','');
 if(Deno.args.includes('--cache-plan') && !fixtures.some((f:any)=>!reusable.has(f.url)&&f.sourcePath.startsWith(sourceStem)))continue;
 const familyStart=performance.now();
 const module=await import(toFileUrl(root+'/authored/'+source).href);
 const base={search};await components(base,source.startsWith('reference/'),source.startsWith('examples/'));
 Deno.chdir(root+'/authored');
 try{for(const item of module.default(base,helpers)){
  if(item.url==='/api/_redirects.json'){const redirectStart=performance.now();await Deno.writeTextFile(root+'/.generated/api-redirects.json',item.content);timing.redirect_generation_subset_s+=(performance.now()-redirectStart)/1000;continue;}
  const url=item.url.replace(/\/index\.html$/,'/').replace(/\/?$/,'/');
  generated.set(url,{...item,layout:item.layout??module.layout,url});
 }}finally{Deno.chdir(root);}
 timing.generators[source]=(performance.now()-familyStart)/1000;
}
timing.generator_s=(performance.now()-generatorStart)/1000;
for(const f of fixtures){
 if(reusable.has(f.url)){ogPages.push(previousOG.find((row:any)=>row.route===f.url));continue;}
 const pageMetadataStart=performance.now();
 const gen=generated.get(f.url);
 let body='',attrs={};
 if(/\.mdx?$/.test(f.sourcePath)){
  const raw=await Deno.readTextFile('authored/'+f.sourcePath.replace(/^\//,''));
  const yamlStart=performance.now();
  if(raw.startsWith('---'))({body,attrs}=extractYaml(raw));else body=raw;
  timing.frontmatter_s+=(performance.now()-yamlStart)/1000;
 }else if(!gen&&f.sourcePath!=='/lint/index.page.tsx')throw Error('Unsupported fixture source: '+f.sourcePath);
 const data={...globalData,...metadata[f.url],...inherited(f.sourcePath),...attrs,url:f.url,search};
 data.navigation=attrs.navigation??inherited(f.sourcePath).navigation??globalData.navigation;
 data.apiCategories=globalData.apiCategories;
 if(gen)Object.assign(data,gen);
 data.lastModified=data.last_modified?new Date(data.last_modified):undefined;
 data.page={sourcePath:f.sourcePath,data};
 timing.page_metadata_s+=(performance.now()-pageMetadataStart)/1000;
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
 // Source layout removal must fall back to the pinned default, not its captured route value.
 const sourceDefaultLayout=inherited(f.sourcePath).layout??globalData.layout??'doc.tsx';
 const routeFallback=frontmatterOwnership[f.url]?.includes('layout')?sourceDefaultLayout:f.layout??sourceDefaultLayout;
 for(let name=attrs.layout??gen?.layout??routeFallback;name;){
  const m=await import(toFileUrl(Deno.cwd()+'/authored/_includes/'+name).href);
  html=await render(m.default,{...data,children:html,content:html});name=m.layout;
 }
 timing.layout_s+=(performance.now()-layoutStart)/1000;
 ogPages.push({route:f.url,title:data.title,description:data.description,openGraphLayout:data.openGraphLayout??'/open_graph/default.jsx',openGraphTitle:data.openGraphTitle,openGraphColor:data.openGraphColor});
 const job=pool.normalize(html).then(async(normalized)=>{html=normalized;
 const writeStart=performance.now();
 const expected=Deno.args.includes('--verify')?await Deno.readTextFile('../deno-baseline/site/'+f.outputPath.replace(/^\//,'')):html;
 const out='.generated/pages/'+f.url.replaceAll('/','_')+'.html';await Deno.writeTextFile(out,html);
 console.log(JSON.stringify({route:f.url,match:html===expected,bytes:html.length,expected:expected.length}));
 output_io_work_s+=(performance.now()-writeStart)/1000;
 if(html!==expected){await Deno.writeTextFile('.generated/proof/expected.html',expected);throw Error('Layout parity failed: '+f.url);}
 });
 inFlight.add(job);job.then(()=>inFlight.delete(job),()=>{});
 if(inFlight.size>=Math.max(1,pool.count)){const waitStart=performance.now();await Promise.race(inFlight);backpressure_s+=(performance.now()-waitStart)/1000;}
}

const drainStart=performance.now();
try{await Promise.all(inFlight);}finally{pool.close();}
const normalization_drain_s=(performance.now()-drainStart)/1000;
timing.dom_s=pool.work_s;
await Deno.writeTextFile('.generated/render-metrics.json',JSON.stringify({render_s:(performance.now()-started)/1000,pages:fixtures.length,reused_pages:reusable.size,normalization_workers:pool.count,normalization_backpressure_s:backpressure_s,normalization_drain_s,output_io_work_s,...timing,...markdownMetrics,...jsxMetrics,counter_boundaries:'Frontmatter is a subset of initial/per-page metadata. Generator-family and redirect counters are subsets of generation. Markdown parsing and Prism are subsets of inclusive Markdown, whose helpers also occur in layouts/generators. MDX is a subset of body; JSX expansion is a subset of body/layout work, with nested render calls excluded. DOM and output I/O are summed job work, overlapping producer work with parser workers. Backpressure/drain describe waiting, not additional transformation costs. Do not add overlapping counters.'}));
await Deno.writeTextFile('.generated/og-data.json',JSON.stringify(ogPages));
