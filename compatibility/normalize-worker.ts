import {normalize} from './normalize.ts';
self.onmessage=({data})=>{
 const start=performance.now();
 try{self.postMessage({id:data.id,html:normalize(data.html),work_s:(performance.now()-start)/1000});}
 catch(error){self.postMessage({id:data.id,error:String(error)});}
};
self.postMessage({ready:true});
