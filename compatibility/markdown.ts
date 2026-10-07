// Pinned bounded adapter: actual Deno Markdown behavior, no Site.
import markdownIt from 'npm:markdown-it@14.1.0';
import attrs from 'npm:markdown-it-attrs@4.3.1';
import deflist from 'npm:markdown-it-deflist@3.0.0';
import anchor from 'npm:markdown-it-anchor@9';
import Prism from '../authored/prism.ts';
import replacer from '../authored/markdown-it/replacer.ts';
import admonition from '../authored/markdown-it/admonition.ts';
import copy from '../authored/markdown-it/codeblock-copy.ts';
import title from '../authored/markdown-it/codeblock-title.ts';
import relative from '../authored/markdown-it/relative-path.ts';
import toc from 'https://deno.land/x/lume_markdown_plugins@v0.7.0/toc/mod.ts';
import makeSlugifier from 'lume/core/slugifier.ts';
import deriveTitle from 'https://deno.land/x/lume_markdown_plugins@v0.7.0/title/mod.ts';
export const markdownMetrics={markdown_inclusive_s:0,prism_subset_s:0,render_calls:0};

export const markdown = markdownIt({html:true,linkify:true,
  langPrefix:'highlight notranslate language-',
  highlight:(code,lang)=>{
    const start=performance.now();
    try{return !lang||!Prism.languages[lang]?code:Prism.highlight(code,Prism.languages[lang],lang)||code;}
    finally{markdownMetrics.prism_subset_s+=(performance.now()-start)/1000;}
  }});
markdown.disable('code');
for(const plugin of [attrs,deflist,replacer,admonition,copy,title]) markdown.use(plugin);
markdown.use(anchor,{permalink:anchor.permalink.linkInsideHeader({symbol:'<span class="sr-only">Jump to heading</span><span aria-hidden="true" class="anchor-end">#</span>',placement:'after'}),getTokensText:(tokens)=>tokens.filter(t=>['text','code_inline'].includes(t.type)).map(t=>t.content.replaceAll(/ \([0-9/]+?\)/g,'')).join('').trim()});
markdown.use(relative);
markdown.use(toc,{anchor:false,slugify:makeSlugifier()});
markdown.use(deriveTitle);
for(const method of ['render','renderInline'] as const){
 const original=markdown[method].bind(markdown);
 markdown[method]=(...args:unknown[])=>{
  const start=performance.now();markdownMetrics.render_calls++;
  try{return original(...args);}finally{markdownMetrics.markdown_inclusive_s+=(performance.now()-start)/1000;}
 };
}
export const md=(text:string,inline=false)=> (inline?markdown.renderInline(text?.toString()||''):markdown.render(text?.toString()||'')).trim();
