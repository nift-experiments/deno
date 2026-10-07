import {renderComponent} from 'lume/jsx-runtime';
import {walk} from '@std/fs/walk';
import {toFileUrl} from '@std/path';
import {md} from './markdown.ts';

export const helpers={md};
export const jsxMetrics={jsx_expansion_inclusive_s:0,jsx_render_calls:0};
let renderDepth=0;
const root=Deno.cwd();
export async function render(value:unknown,data:Record<string,unknown>={}){
 const outer=renderDepth++===0;const start=performance.now();jsxMetrics.jsx_render_calls++;
 try{
 const child=data.content??data.children;
 const children=typeof child==='string'?{__html:child}:child;
 const result=typeof value==='function'?await value({...data,children},helpers):value;
 return typeof result==='string'?result:await renderComponent(result);
 }finally{renderDepth--;if(outer)jsxMetrics.jsx_expansion_inclusive_s+=(performance.now()-start)/1000;}
}

const inventories=new Map<string,Promise<Array<{name:string,module:any}>>>();
async function inventory(scope:string){
 if(!inventories.has(scope))inventories.set(scope,(async()=>{
  const entries=[];
  for await(const entry of walk(root+'/'+scope,{exts:['.tsx','.jsx'],includeDirs:false})){
   const module=await import(toFileUrl(entry.path).href);
   const name=entry.name.startsWith('comp.')?entry.path.split('/').at(-2)!:entry.name.replace(/\.(tsx|jsx)$/,'');
   entries.push({name,module});
  }return entries;
 })());
 return await inventories.get(scope)!;
}

// Exactly the three component scopes in this corpus. No arbitrary site loader.
export async function components(data:Record<string,unknown>,reference=false,examples=false){
 const found:Record<string,unknown>={};
 const comp=new Proxy(found,{get:(target,key)=>target[String(key).toLowerCase()]});
 data.comp=comp;
 for(const scope of ['authored/_components',...(reference?['authored/reference/_components']:[]),...(examples?['authored/examples/_components']:[])]){
  for(const {name,module:m} of await inventory(scope)){
   found[name.toLowerCase()]=async(props:Record<string,unknown>={})=>({__html:await render(m.default,{...data,...props,comp:props.comp??comp})});
  }
 }
 return comp;
}
