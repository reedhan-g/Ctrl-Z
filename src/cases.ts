import { buildings, status, serviceCapacity, type BuildingId, type Snapshot } from './simulation.ts';

export const cases = {
  dispatch:{name:'Silent dispatch',time:5,target:'logistics',source:'telecom',
    observation:'Consignments are delayed although the hub still has power. Find which dependency limits dispatch.',
    required:['logistics','telecom','grid']},
  wards:{name:'A generator is not enough',time:19,target:'hospital',source:'water',
    observation:'Critical wards are interrupted despite a fuel delivery. Trace what the generator cannot replace.',
    required:['hospital','water','grid']},
} as const;
export type CaseId=keyof typeof cases;
export interface Evidence { building:BuildingId; time:number; label:string; remaining:number; capacity:number }
export interface CaseProgress {id:CaseId; evidence:Evidence[]; diagnosis:'correct'|'incorrect'|null}
export function readEvidence(building:BuildingId,s:Snapshot):Evidence {
  const state=status(building,s);
  return {building,time:s.time,label:state.label,remaining:state.remaining,capacity:serviceCapacity(building,s)};
}
export function supportsDiagnosis(progress:CaseProgress,source:BuildingId):boolean {
  const c=cases[progress.id];
  if(!c.required.every(id=>progress.evidence.some(e=>e.building===id&&e.time===c.time)))return false;
  const target=progress.evidence.find(e=>e.building===c.target&&e.time===c.time)!;
  const upstream=progress.evidence.find(e=>e.building===source&&e.time===c.time);
  // Diagnosis requires measured dependency failure while the target still has fuel/power.
  return source===c.source&&upstream?.capacity===0&&target.remaining>0
    &&(c.target==='logistics'?target.capacity===.35:target.label==='No water');
}
export function caseRecovered(progress:CaseProgress,s:Snapshot) {
  return progress.diagnosis==='correct'&&serviceCapacity(cases[progress.id].target,s)>(progress.id==='dispatch'?.35:0);
}
export const evidenceText=(e:Evidence)=>`${buildings.find(b=>b.id===e.building)!.name} at ${e.time.toFixed(1)}h: ${e.label}; ${e.remaining.toFixed(1)}h reserve; ${Math.round(e.capacity*100)}% service.`;
