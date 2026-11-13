import { initial, type BuildingId, type Snapshot } from './simulation.ts';

export type Intervention = { time: number } & (
  | { kind: 'delivery'; building: BuildingId }
  | { kind: 'restore' }
);
export interface ReplayBranch { id: number; name: string; events: Intervention[] }
export interface ReplayData { branches: ReplayBranch[]; activeBranch: number; nextBranchId: number }

export function createReplay(): ReplayData {
  return { branches: [{ id: 0, name: 'Original outage', events: [] }], activeBranch: 0, nextBranchId: 1 };
}

// The journal stores decisions, never animation frames. Seeking and playback share it.
export function replayAt(branch: ReplayBranch, time: number): Snapshot {
  const result: Snapshot = { ...initial, time, outage: true, boosted: [], supplyAt: {} };
  for (const event of branch.events) {
    if (event.time > time) break;
    if (event.kind === 'restore') {
      result.outage = false;
      result.restoredAt = event.time;
    } else {
      result.boosted.push(event.building);
      result.supplyAt[event.building] = event.time;
    }
  }
  return result;
}

export function recordIntervention(s: ReplayData, event: Intervention): ReplayData {
  const branch = s.branches.find(b => b.id === s.activeBranch)!;
  const fork = branch.id === 0 || branch.events.some(e => e.time > event.time);
  const events = [...branch.events.filter(e => e.time <= event.time), event];
  if (fork) return {
    branches: [...s.branches, { id: s.nextBranchId, name: `Response ${s.nextBranchId}`, events }],
    activeBranch: s.nextBranchId, nextBranchId: s.nextBranchId + 1,
  };
  return { ...s, branches: s.branches.map(b => b.id === branch.id ? { ...b, events } : b) };
}
