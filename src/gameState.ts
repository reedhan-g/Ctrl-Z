import { initial, type Snapshot, type BuildingId } from './simulation.ts';

export interface GameData extends Snapshot {
  selected: BuildingId | null;
  playing: boolean;
  speed: number;
  trace: boolean;
  history: Snapshot[];
}

export type Action =
  | { type: 'select'; id: BuildingId | null }
  | { type: 'fail' | 'restore' | 'rewind' | 'reset' | 'toggle' | 'toggleTrace' }
  | { type: 'tick'; hours: number }
  | { type: 'seek'; time: number }
  | { type: 'boost'; id: BuildingId }
  | { type: 'setSpeed'; speed: number };

export function createInitialState(): GameData {
  return { ...initial, boosted: [], supplyAt: {}, selected: null, playing: false, speed: 1, trace: false, history: [] };
}

function snapshot(s: Snapshot): Snapshot {
  return { time: s.time, outage: s.outage, boosted: [...s.boosted], supplyAt: { ...s.supplyAt }, restoredAt: s.restoredAt };
}

// Pure transitions are shared by the Zustand adapter and dependency-free tests.
export function reduceGame(s: GameData, action: Action): GameData {
  switch (action.type) {
    case 'select': return { ...s, selected: action.id };
    case 'fail': return s.outage ? s : {
      ...s, outage: true, playing: true, time: 0, boosted: [], supplyAt: {}, restoredAt: null, history: [snapshot(s)],
    };
    case 'restore': return !s.outage ? s : {
      ...s, outage: false, playing: false, restoredAt: s.time, history: [...s.history, snapshot(s)],
    };
    case 'tick': {
      if (!s.playing || !s.outage || !Number.isFinite(action.hours) || action.hours <= 0) return s;
      const time = Math.min(24, s.time + action.hours);
      return { ...s, time, playing: time < 24 };
    }
    case 'seek': {
      if (!s.history.length || !Number.isFinite(action.time)) return s;
      return { ...s, time: Math.max(0, Math.min(24, action.time)), playing: false,
        boosted: [], supplyAt: {}, outage: true, restoredAt: null, history: [s.history[0]] };
    }
    case 'boost': {
      if (!s.outage || action.id === 'grid' || s.boosted.includes(action.id) || s.boosted.length >= 2) return s;
      return { ...s, boosted: [...s.boosted, action.id], supplyAt: { ...s.supplyAt, [action.id]: s.time },
        history: [...s.history, snapshot(s)] };
    }
    case 'rewind': {
      const previous = s.history.at(-1);
      return previous ? { ...s, ...snapshot(previous), playing: false, history: s.history.slice(0, -1) } : s;
    }
    case 'reset': return createInitialState();
    case 'toggle': return s.outage && s.time < 24 ? { ...s, playing: !s.playing } : s;
    case 'setSpeed': return [1, 4, 12].includes(action.speed) ? { ...s, speed: action.speed } : s;
    case 'toggleTrace': return { ...s, trace: !s.trace };
  }
}
