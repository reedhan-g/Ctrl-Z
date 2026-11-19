import { buildings, serviceCapacity, type BuildingId } from './simulation.ts';
import { replayAt, type ReplayBranch } from './replay.ts';
import { incidentLog, type Incident } from './investigation.ts';
import { logisticsOutcome } from './logistics.ts';

const districtServices=buildings.filter(b=>b.id!=='grid').map(b=>b.id);

export function serviceHoursThrough(branch:ReplayBranch,time:number,incidents:readonly Incident[],services:readonly BuildingId[]) {
  const times=[...new Set([0,time,...incidents.map(e=>e.time)])].sort((a,b)=>a-b);
  let serviceHours=0;
  for(let i=1;i<times.length;i++){
    const at=replayAt(branch,(times[i-1]+times[i])/2);
    serviceHours+=(times[i]-times[i-1])*services.reduce((n,id)=>n+serviceCapacity(id,at),0);
  }
  return serviceHours;
}
export function branchOutcome(branch:ReplayBranch,horizon:number) {
  const time=Math.max(0,Math.min(24,horizon)),state=replayAt(branch,time);
  const incidents=incidentLog(state);
  const serviceHours=serviceHoursThrough(branch,time,incidents,districtServices);
  return {id:branch.id,name:branch.name,time,serviceHours,lostServiceHours:time*(buildings.length-1)-serviceHours,
    ...logisticsOutcome(state),teamsUsed:state.boosted.length,restoredAt:state.restoredAt,
    decisions:branch.events.filter(e=>e.time<=time),incidents};
}
export function resilienceReport(branches:ReplayBranch[],activeBranch:number,time:number) {
  const outcomes=branches.map(b=>branchOutcome(b,time));
  return {game:'Ctrl Z',city:'Meridian',scenario:'Electricity',version:1,horizon:time,activeBranch,
    metric:'Service-hours sum fractional availability across five district services, excluding the substation. Scenario assumptions, not a real-world forecast.',
    outcomes,serviceHoursSaved:outcomes.find(o=>o.id===activeBranch)!.serviceHours-outcomes[0].serviceHours};
}
