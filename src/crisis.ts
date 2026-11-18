import { buildings, serviceCapacity } from './simulation.ts';
import { replayAt, type ReplayBranch } from './replay.ts';
import { branchOutcome } from './report.ts';

export const crisisDeadline = 12;
export const crisisTarget = { serviceHours: 36, activeServices: 3 };
export const essentialServices = buildings.filter(building => building.id !== 'grid');
export const crisisMaximum = essentialServices.length * crisisDeadline;

export function crisisResult(response: ReplayBranch, baseline: ReplayBranch) {
  const atDeadline = replayAt(response, crisisDeadline);
  const activeServices = essentialServices.filter(building => serviceCapacity(building.id, atDeadline) > 0).length;
  const score = branchOutcome(response, crisisDeadline);
  const original = branchOutcome(baseline, crisisDeadline);
  return {
    serviceHours: score.serviceHours,
    activeServices,
    teamsUsed: score.teamsUsed,
    advantage: score.serviceHours - original.serviceHours,
    stabilized: score.serviceHours + 1e-9 >= crisisTarget.serviceHours && activeServices >= crisisTarget.activeServices,
  };
}
