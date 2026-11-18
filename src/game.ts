import { create } from 'zustand';
import { createInitialState, reduceGame, type Action, type GameData } from './gameState';
import type { BuildingId } from './simulation';
import type { VehicleId } from './traffic';
import type { CaseId } from './cases';
import {useNavigation} from './navigation';
export { buildings, status, reserveDeadline } from './simulation';
export type { BuildingId } from './simulation';

interface Actions {
  select: (id: BuildingId | null) => void;
  selectVehicle: (id: VehicleId) => void;
  startCase: (id: CaseId) => void;
  startCrisis: () => void;
  evidence: (id: BuildingId) => void;
  diagnose: (id: BuildingId) => void;
  fail: () => void;
  restore: () => void;
  tick: (hours: number) => void;
  seek: (time: number) => void;
  branch: (id: number) => void;
  boost: (id: BuildingId) => void;
  rewind: () => void;
  reset: () => void;
  toggle: () => void;
  setSpeed: (speed: number) => void;
  toggleTrace: () => void;
}

export const useGame = create<GameData & Actions>((set) => {
  const dispatch = (action: Action) => {
    if(['select','selectVehicle','startCase','startCrisis','reset'].includes(action.type)&&useNavigation.getState().sceneryId)useNavigation.setState({sceneryId:null});
    set(state => reduceGame(state, action));
    if(action.type==='select'||action.type==='selectVehicle')useNavigation.setState(s=>({inspectionRequest:s.inspectionRequest+1}));
  };
  return {
    ...createInitialState(),
    select: id => dispatch({ type: 'select', id }),
    selectVehicle: id => dispatch({ type: 'selectVehicle', id }),
    startCase: id => dispatch({type:'startCase',id}),
    startCrisis: () => dispatch({type:'startCrisis'}),
    evidence: id => dispatch({type:'evidence',id}),
    diagnose: id => dispatch({type:'diagnose',id}),
    fail: () => dispatch({ type: 'fail' }),
    restore: () => dispatch({ type: 'restore' }),
    tick: hours => dispatch({ type: 'tick', hours }),
    seek: time => dispatch({ type: 'seek', time }),
    branch: id => dispatch({ type: 'branch', id }),
    boost: id => dispatch({ type: 'boost', id }),
    rewind: () => dispatch({ type: 'rewind' }),
    reset: () => dispatch({ type: 'reset' }),
    toggle: () => dispatch({ type: 'toggle' }),
    setSpeed: speed => dispatch({ type: 'setSpeed', speed }),
    toggleTrace: () => dispatch({ type: 'toggleTrace' }),
  };
});
