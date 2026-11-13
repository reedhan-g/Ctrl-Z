import { buildings, serviceCapacity } from './simulation.ts';
import { replayAt, type ReplayBranch } from './replay.ts';
import { incidentLog } from './investigation.ts';
import { logisticsOutcome } from './logistics.ts';

export function branchOutcome(branch:ReplayBranch,horizon:number) {
  const time=Math.max(0,Math.min(24,horizon)),state=replayAt(branch,time);
  const times=[...new Set([0,time,...incidentLog(state).map(e=>e.time)])].sort((a,b)=>a-b);
  let serviceHours=0;
  for(let i=1;i<times.length;i++){
    const at=replayAt(branch,(times[i-1]+times[i])/2);
    serviceHours+=(times[i]-times[i-1])*buildings.filter(b=>b.id!=='grid').reduce((n,b)=>n+serviceCapacity(b.id,at),0);
  }
  return {id:branch.id,name:branch.name,time,serviceHours,lostServiceHours:time*(buildings.length-1)-serviceHours,
    ...logisticsOutcome(state),teamsUsed:state.boosted.length,restoredAt:state.restoredAt,
    decisions:branch.events.filter(e=>e.time<=time),incidents:incidentLog(state)};
}
export function resilienceReport(branches:ReplayBranch[],activeBranch:number,time:number) {
  const outcomes=branches.map(b=>branchOutcome(b,time));
  return {game:'Ctrl Z',city:'Meridian',scenario:'Electricity',version:1,horizon:time,activeBranch,
    metric:'Service-hours sum fractional availability across five district services, excluding the substation. Scenario assumptions, not a real-world forecast.',
    outcomes,serviceHoursSaved:outcomes.find(o=>o.id===activeBranch)!.serviceHours-outcomes[0].serviceHours};
}
