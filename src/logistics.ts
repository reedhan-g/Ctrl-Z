import { serviceCapacity, type Snapshot } from './simulation.ts';
import { incidentLog } from './investigation.ts';

// Integrate constant-capacity intervals, so skipped ticks and seeking agree exactly.
export function logisticsOutcome(s:Snapshot) {
  const times=[...new Set([0,s.time,...incidentLog(s).map(e=>e.time)])].sort((a,b)=>a-b);
  let dispatched=0;
  for(let i=1;i<times.length;i++) {
    const time=(times[i-1]+times[i])/2;
    const state:Snapshot={...s,time,outage:s.outage||(s.restoredAt!==null&&time<s.restoredAt),
      boosted:s.boosted.filter(id=>(s.supplyAt[id]??0)<=time)};
    dispatched+=(times[i]-times[i-1])*12*serviceCapacity('logistics',state);
  }
  return {capacity:serviceCapacity('logistics',s),dispatched,backlog:Math.max(0,s.time*12-dispatched)};
}
