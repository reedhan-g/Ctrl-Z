import { essentialServices } from './crisis.ts';
import { replayAt, type Intervention, type ReplayBranch } from './replay.ts';
import { branchOutcome } from './report.ts';
import { buildings, serviceCapacity, status } from './simulation.ts';
import { formatTime } from './time.ts';

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
