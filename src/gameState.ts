import { initial, type Snapshot, type BuildingId } from './simulation.ts';
import { createReplay, replayAt, recordIntervention, type ReplayData } from './replay.ts';
import type { VehicleId } from './traffic.ts';
import { cases, readEvidence, supportsDiagnosis, type CaseId, type CaseProgress } from './cases.ts';
import { normalizeTime } from './time.ts';
import { crisisDeadline } from './crisis.ts';

type Checkpoint = Snapshot & ReplayData;
export interface GameData extends Snapshot, ReplayData {
  selected: BuildingId | null;
  selectedVehicle: VehicleId | null;
  caseStudy: CaseProgress | null;
  crisis: boolean;
  playing: boolean;
  speed: number;
  trace: boolean;
  history: Checkpoint[];
}

export type Action =
  | { type: 'select'; id: BuildingId | null }
  | { type: 'selectVehicle'; id: VehicleId }
  | { type: 'startCase'; id: CaseId }
  | { type: 'startCrisis' }
  | { type: 'evidence'; id: BuildingId }
  | { type: 'diagnose'; id: BuildingId }
  | { type: 'fail' | 'restore' | 'rewind' | 'reset' | 'toggle' | 'toggleTrace' }
  | { type: 'tick'; hours: number }
  | { type: 'seek'; time: number }
  | { type: 'branch'; id: number }
  | { type: 'boost'; id: BuildingId }
  | { type: 'setSpeed'; speed: number };

export function createInitialState(): GameData {
  return { ...initial, ...createReplay(), boosted: [], supplyAt: {}, selected: null, selectedVehicle:null, caseStudy:null, crisis:false, playing: false, speed: 1, trace: false, history: [] };
}

export const gameDeadline = (s: Pick<GameData, 'crisis'>) => s.crisis ? crisisDeadline : 24;

function snapshot(s: Checkpoint): Checkpoint {
  return { time: s.time, outage: s.outage, boosted: [...s.boosted], supplyAt: { ...s.supplyAt }, restoredAt: s.restoredAt,
    branches: s.branches, activeBranch: s.activeBranch, nextBranchId: s.nextBranchId };
}

// Pure transitions are shared by the Zustand adapter and dependency-free tests.
export function reduceGame(s: GameData, action: Action): GameData {
  switch (action.type) {
    case 'startCrisis': {
      const start = reduceGame(createInitialState(), { type: 'fail' });
      return { ...start, crisis: true, playing: false };
    }
    case 'startCase': {
      if(!Object.hasOwn(cases,action.id))return s;
      let state=reduceGame(createInitialState(),{type:'fail'});
      if(action.id==='wards')state=reduceGame(state,{type:'boost',id:'hospital'});
      state=reduceGame(state,{type:'seek',time:cases[action.id].time});
      return {...state,selected:cases[action.id].target,caseStudy:{id:action.id,evidence:[],diagnosis:null}};
    }
    case 'evidence': {
      if(!s.caseStudy)return s;
      if(s.caseStudy.diagnosis==='correct'&&s.caseStudy.evidence.some(e=>e.building===action.id&&e.time===s.time))return s;
      const evidence=readEvidence(action.id,s);
      return {...s,caseStudy:{...s.caseStudy,evidence:[...s.caseStudy.evidence.filter(e=>!(e.building===action.id&&e.time===s.time)),evidence]}};
    }
    case 'diagnose': return s.caseStudy?{...s,caseStudy:{...s.caseStudy,
      diagnosis:supportsDiagnosis(s.caseStudy,action.id)?'correct':'incorrect'}}:s;
    case 'select': return { ...s, selected: action.id, selectedVehicle:null };
    case 'selectVehicle': return { ...s, selected:'logistics', selectedVehicle:action.id };
    case 'fail': return s.outage ? s : {
      ...s, ...createReplay(), outage: true, playing: true, time: 0, boosted: [], supplyAt: {}, restoredAt: null, history: [snapshot(s)],
    };
    case 'restore': return !s.outage || s.crisis || (s.caseStudy&&s.caseStudy.diagnosis!=='correct') ? s : {
      ...s, ...recordIntervention(s, {kind: 'restore', time: s.time}), outage: false, playing: false, restoredAt: s.time, history: [...s.history, snapshot(s)],
    };
    case 'tick': {
      if (!s.playing || !s.outage || !Number.isFinite(action.hours) || action.hours <= 0) return s;
      const branch = s.branches.find(b => b.id === s.activeBranch)!;
      const restore = branch.events.find(e => e.kind === 'restore' && e.time >= s.time);
      const deadline = gameDeadline(s);
      const time = Math.min(deadline, normalizeTime(s.time + action.hours), restore?.time ?? deadline);
      const state = replayAt(branch, time);
      return { ...s, ...state, playing: time < deadline && state.outage };
    }
    case 'seek': {
      if (!s.history.length || !Number.isFinite(action.time)) return s;
      const branch = s.branches.find(b => b.id === s.activeBranch)!;
      return { ...s, ...replayAt(branch, Math.max(0, Math.min(gameDeadline(s), action.time))), playing: false };
    }
    case 'branch': {
      const branch = s.branches.find(b => b.id === action.id);
      if (!s.history.length || !branch || branch.id === s.activeBranch) return s;
      return { ...s, ...replayAt(branch, s.time), activeBranch: branch.id, playing: false,
        history: [snapshot(createInitialState())] };
    }
    case 'boost': {
      if (!s.outage || (s.crisis && s.time >= crisisDeadline) || (s.caseStudy&&s.caseStudy.diagnosis!=='correct') || action.id === 'grid' || s.boosted.includes(action.id) || s.boosted.length >= 2) return s;
      return { ...s, ...recordIntervention(s, {kind: 'delivery', building: action.id, time: s.time}),
        boosted: [...s.boosted, action.id], supplyAt: { ...s.supplyAt, [action.id]: s.time },
        history: [...s.history, snapshot(s)] };
    }
    case 'rewind': {
      if (s.crisis && s.history.length <= 1) return s;
      const previous = s.history.at(-1);
      return previous ? { ...s, ...snapshot(previous), playing: false, history: s.history.slice(0, -1) } : s;
    }
    case 'reset': return createInitialState();
    case 'toggle': return s.outage && s.time < gameDeadline(s) ? { ...s, playing: !s.playing } : s;
    case 'setSpeed': return [1, 4, 12].includes(action.speed) ? { ...s, speed: action.speed } : s;
    case 'toggleTrace': return { ...s, trace: !s.trace };
  }
}
