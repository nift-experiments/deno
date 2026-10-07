import {stringToDocument,documentToString} from 'lume/core/utils/dom.ts';
export function normalize(html:string){
 const doc=stringToDocument('<!DOCTYPE html>\n'+html);
 for(const table of doc.querySelectorAll('table')){
  if(table.parentElement?.classList.contains('table-wrapper'))continue;
  const wrap=doc.createElement('div');wrap.className='table-wrapper';table.replaceWith(wrap);wrap.append(table);
 }
 return documentToString(doc);
}
