// Freeze nondeterministic acquisition clock/order explicitly, not content.
const clock=JSON.parse(await Deno.readTextFile('data/search-clock.json'));
const full=JSON.parse(await Deno.readTextFile('.generated/search/orama-index-full.json'));
const summary=JSON.parse(await Deno.readTextFile('.generated/search/orama-index-summary.json'));
// Upstream has duplicate search IDs: preserve occurrences, never deduplicate them.
const ranks=new Map(clock.occurrences.map((row,i)=>[row.key,{rank:i,time:row.lastModified}]));
for(const index of [full,summary]){
 index.metadata.generatedAt=clock.metadata.generatedAt;
 const seen=new Map();
 const rows=index.data.map(d=>{const n=seen.get(d.id)??0;seen.set(d.id,n+1);return {doc:d,clock:ranks.get(d.id+'@@'+n)};});
 rows.sort((a,b)=>(a.clock?.rank??Number.MAX_SAFE_INTEGER)-(b.clock?.rank??Number.MAX_SAFE_INTEGER)||a.doc.id.localeCompare(b.doc.id));
 for(const row of rows)if('lastModified'in row.doc)row.doc.lastModified=row.clock?.time??Date.parse(clock.metadata.generatedAt);
 index.data=rows.map(row=>row.doc);
}
await Deno.writeTextFile('.generated/search/orama-index-full.json',JSON.stringify(full));
await Deno.writeTextFile('.generated/search/orama-index-summary.json',JSON.stringify(summary));
