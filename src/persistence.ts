import { buildings, type Snapshot } from './simulation.ts';
import { replayAt } from './replay.ts';
import { cases, supportsDiagnosis } from './cases.ts';
import type { GameData } from './gameState.ts';

export const saveKey='ctrl-z:experiment:v1';
const object=(v:any)=>v!==null&&typeof v==='object'&&!Array.isArray(v);
const time=(v:any)=>Number.isFinite(v)&&v>=0&&v<=24;
const integer=(v:any)=>Number.isSafeInteger(v)&&v>=0;
const id=(v:any)=>buildings.some(b=>b.id===v);

function validReplay(v:any):boolean {
 if(!object(v)||!Array.isArray(v.branches)||!v.branches.length||v.branches.length>128)return false;
 const ids=new Set<number>();
 for(const branch of v.branches){
  if(!object(branch)||!integer(branch.id)||ids.has(branch.id)||typeof branch.name!=='string'||branch.name.length>80
   ||!Array.isArray(branch.events)||branch.events.length>3)return false;
  ids.add(branch.id);let previous=0,restored=false;const delivered=new Set();
  for(const event of branch.events){
   if(!object(event)||!time(event.time)||event.time<previous||restored)return false;
   previous=event.time;
   if(event.kind==='restore')restored=true;
   else if(event.kind==='delivery'&&id(event.building)&&event.building!=='grid'&&!delivered.has(event.building))delivered.add(event.building);
   else return false;
  }
  if(delivered.size>2)return false;
 }
 return v.branches[0].id===0&&v.branches[0].events.length===0&&ids.has(v.activeBranch)
   &&integer(v.nextBranchId)&&v.nextBranchId>Math.max(...ids);
}
function validSnapshot(v:any):boolean {
 if(!object(v)||!time(v.time)||typeof v.outage!=='boolean'||!(v.restoredAt===null||time(v.restoredAt))
  ||!Array.isArray(v.boosted)||v.boosted.length>2||new Set(v.boosted).size!==v.boosted.length
  ||!v.boosted.every((b:any)=>id(b)&&b!=='grid')||!object(v.supplyAt))return false;
 if(!Object.entries(v.supplyAt).every(([key,value])=>v.boosted.includes(key)&&time(value)))return false;
 if(!v.boosted.every((key:string)=>time(v.supplyAt[key])))return false;
 if(v.restoredAt!==null&&(v.outage||v.restoredAt>v.time))return false;
 return true;
}
function consistent(v:any):boolean {
 if(!validReplay(v)||!validSnapshot(v))return false;
 if(!v.outage&&v.restoredAt===null)return v.time===0&&v.boosted.length===0;
 const state=replayAt(v.branches.find((b:any)=>b.id===v.activeBranch),v.time);
 return (['outage','restoredAt'] as const).every(key=>state[key]===v[key])
  &&JSON.stringify(state.boosted)===JSON.stringify(v.boosted)
  &&state.boosted.every(b=>state.supplyAt[b]===v.supplyAt[b]);
}
function validCase(c:any):boolean {
 if(c===null)return true;
 if(!object(c)||!Object.hasOwn(cases,c.id)||!Array.isArray(c.evidence)||c.evidence.length>128
   ||![null,'correct','incorrect'].includes(c.diagnosis))return false;
 if(!c.evidence.every((e:any)=>object(e)&&id(e.building)&&time(e.time)&&typeof e.label==='string'&&e.label.length<64
  &&Number.isFinite(e.remaining)&&e.remaining>=0&&e.remaining<=100&&Number.isFinite(e.capacity)&&e.capacity>=0&&e.capacity<=1))return false;
 return c.diagnosis!=='correct'||supportsDiagnosis(c,cases[c.id as keyof typeof cases].source);
}

export function encodeExperiment(state:GameData):string {
 const serialized=JSON.stringify({version:1,state:{...state,playing:false,selected:null,selectedVehicle:null}});
 if(!decodeExperiment(serialized))throw new Error('This experiment is too large or inconsistent to save.');
 return serialized;
}
export function decodeExperiment(text:string):GameData|null {
 try {
  if(text.length>2_000_000)return null;
  const data=JSON.parse(text),s=data?.state;
  if(data?.version!==1||!consistent(s)||!Array.isArray(s.history)||s.history.length>128||!s.history.every(consistent)
   ||![1,4,12].includes(s.speed)||typeof s.trace!=='boolean'||!validCase(s.caseStudy))return null;
  const state:Snapshot={time:s.time,outage:s.outage,boosted:s.boosted,supplyAt:s.supplyAt,restoredAt:s.restoredAt};
  return {...state,branches:s.branches,activeBranch:s.activeBranch,nextBranchId:s.nextBranchId,history:s.history,
    caseStudy:s.caseStudy,speed:s.speed,trace:s.trace,playing:false,selected:null,selectedVehicle:null};
 } catch {return null;}
}
