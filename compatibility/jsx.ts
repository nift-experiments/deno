import {renderComponent} from 'lume/jsx-runtime';
import {walk} from '@std/fs/walk';
import {toFileUrl} from '@std/path';
import {md} from './markdown.ts';

export const helpers={md};
const root=Deno.cwd();
export async function render(value:unknown,data:Record<string,unknown>={}){
 const child=data.content??data.children;
 const children=typeof child==='string'?{__html:child}:child;
 const result=typeof value==='function'?await value({...data,children},helpers):value;
 return typeof result==='string'?result:await renderComponent(result);
}

// Exactly the three component scopes in this corpus. No arbitrary site loader.
export async function components(data:Record<string,unknown>,reference=false,examples=false){
 const found:Record<string,unknown>={};
 const comp=new Proxy(found,{get:(target,key)=>target[String(key).toLowerCase()]});
 data.comp=comp;
 for(const scope of ['authored/_components',...(reference?['authored/reference/_components']:[]),...(examples?['authored/examples/_components']:[])]){
  for await(const entry of walk(root+'/'+scope,{exts:['.tsx','.jsx'],includeDirs:false})){
   const m=await import(toFileUrl(entry.path).href);
   const name=entry.name.startsWith('comp.')?entry.path.split('/').at(-2)!:entry.name.replace(/\.(tsx|jsx)$/,'');
   found[name.toLowerCase()]=async(props:Record<string,unknown>={})=>({__html:await render(m.default,{...data,...props,comp:props.comp??comp})});
  }
 }
 return comp;
}
