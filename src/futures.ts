import { essentialServices } from './crisis.ts';
import { dependencies } from './dependencies.ts';
import { replayAt, type Intervention, type ReplayBranch } from './replay.ts';
import { branchOutcome, serviceHoursThrough } from './report.ts';
import { buildings, reserveDeadline, serviceCapacity, status, type BuildingId } from './simulation.ts';
import { formatTime, normalizeTime } from './time.ts';

export interface FutureSelection {
  originalId: number;
  revisedId: number;
  time: number;
}

export function distinctResponses(branches: ReplayBranch[]) {
  const seen = new Set<string>();
  return branches.filter(branch => {
    const signature = branch.events.map(event =>
      event.kind === 'restore' ? `${event.time}:restore` : `${event.time}:${event.building}`).sort().join('|');
    if (seen.has(signature)) return false;
    seen.add(signature);
    return true;
  });
}

export function decisionDescription(event: Intervention) {
  const action = event.kind === 'restore' ? 'Restore regional power'
    : `Supply ${buildings.find(building => building.id === event.building)!.name}`;
  return `${formatTime(event.time)} · ${action}`;
}

type BranchOutcome = ReturnType<typeof branchOutcome>;

function describeDelivery(branch: ReplayBranch, outcome: BranchOutcome, id: BuildingId, time: number) {
  const state = replayAt(branch, time);
  const before = { ...state, boosted: state.boosted.filter(building => building !== id) };
  const reserveGained = status(id, state).remaining - status(id, before).remaining;
  const water = dependencies.find(edge => edge.target === id && edge.system === 'water');
  let limit;
  if (water) {
    for (const incident of outcome.incidents) {
      if (incident.kind !== 'status' || incident.building !== id || incident.time < time) continue;
      const observed = replayAt(branch, incident.time);
      if (status(id, observed).label !== 'No water') continue;
      limit = {
        source: water.source,
        time: normalizeTime(reserveDeadline(water.source, observed) + water.bufferHours),
        buffered: water.bufferHours > 0,
      };
      break;
    }
  }
  return { time, reserveGained, limit };
}

export function compareFutures(originalBranch: ReplayBranch, revisedBranch: ReplayBranch, time: number) {
  const original = branchOutcome(originalBranch, time);
  const revised = branchOutcome(revisedBranch, original.time);
  const originalState = replayAt(originalBranch, original.time);
  const revisedState = replayAt(revisedBranch, original.time);
  return {
    time: original.time,
    original,
    revised,
    delta: revised.serviceHours - original.serviceHours,
    interventions: essentialServices.flatMap(({ id, name }) => {
      const delivery = (outcome: BranchOutcome) =>
        outcome.decisions.find(event => event.kind === 'delivery' && event.building === id);
      const before = delivery(original);
      const after = delivery(revised);
      if (before?.time === after?.time) return [];
      const originalHours = serviceHoursThrough(originalBranch, original.time, original.incidents, [id]);
      const revisedHours = serviceHoursThrough(revisedBranch, revised.time, revised.incidents, [id]);
      return [{
        id, name, delta: revisedHours - originalHours,
        original: before ? describeDelivery(originalBranch, original, id, before.time) : null,
        revised: after ? describeDelivery(revisedBranch, revised, id, after.time) : null,
      }];
    }),
    facilities: essentialServices.map(({ id, name }) => {
      const before = serviceCapacity(id, originalState);
      const after = serviceCapacity(id, revisedState);
      return {
        id, name, before, after,
        originalStatus: status(id, originalState).label,
        revisedStatus: status(id, revisedState).label,
        change: after > before ? 'Improved' : after < before ? 'Worsened' : 'Unchanged',
      } as const;
    }),
  };
}

export type FutureComparison = ReturnType<typeof compareFutures>;
export type FutureFacility = FutureComparison['facilities'][number];
