// Persistent bounded parser workers; no source/component runtime duplication.
export class NormalizerPool{
 workers:any[]=[];queue:any[]=[];pending=new Map();serial:any;sequence=0;work_s=0;jobs=0;
 constructor(public count:number){
  for(let i=0;i<count;i++){
   const state={worker:new Worker(new URL('./normalize-worker.ts',import.meta.url).href,{type:'module'}),ready:false,busy:false};
   state.worker.onmessage=({data})=>{
    if(data.ready){state.ready=true;this.dispatch();return;}
    const task=this.pending.get(data.id);this.pending.delete(data.id);state.busy=false;
    if(data.error)task.reject(Error(data.error));else{this.work_s+=data.work_s;this.jobs++;task.resolve(data.html);}
    this.dispatch();
   };
   state.worker.onerror=(event)=>{event.preventDefault();for(const task of this.pending.values())task.reject(Error(event.message));this.pending.clear();};
   this.workers.push(state);
  }
 }
 dispatch(){for(const state of this.workers){if(!state.ready||state.busy||!this.queue.length)continue;const task=this.queue.shift();state.busy=true;state.worker.postMessage({id:task.id,html:task.html});}}
 async normalize(html:string):Promise<string>{
  if(!this.count){this.serial??=await import('./normalize.ts');const start=performance.now();const result=this.serial.normalize(html);this.work_s+=(performance.now()-start)/1000;this.jobs++;return result;}
  return await new Promise((resolve,reject)=>{const id=this.sequence++;const task={id,html,resolve,reject};this.pending.set(id,task);this.queue.push(task);this.dispatch();});
 }
 close(){for(const state of this.workers)state.worker.terminate();}
}
