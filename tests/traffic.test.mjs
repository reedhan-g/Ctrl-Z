import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState,reduceGame} from '../src/gameState.ts';
import {vehiclePosition,pickVehicle} from '../src/traffic.ts';
const run=(...a)=>a.reduce(reduceGame,createInitialState());
test('vehicles stop when hub backup expires and resume after delivery',()=>{
 const s=run({type:'fail'},{type:'seek',time:8});
 const p=vehiclePosition('courier-1',s);
 assert.deepEqual(vehiclePosition('courier-1',{...s,time:12}),p);
 const recovered=reduceGame({...s,time:12},{type:'boost',id:'logistics'});
 assert.notDeepEqual(vehiclePosition('courier-1',recovered,1),p);
 assert.equal(pickVehicle(p,s),'courier-1');
});
test('vehicle positions reproduce after replay and selection exposes the owning hub',()=>{
 const s=run({type:'fail'},{type:'seek',time:6},{type:'selectVehicle',id:'courier-2'});
 assert.equal(s.selected,'logistics');assert.equal(s.selectedVehicle,'courier-2');
 const replay=reduceGame(reduceGame(s,{type:'seek',time:1}),{type:'seek',time:6});
 assert.deepEqual(vehiclePosition('courier-2',s),vehiclePosition('courier-2',replay));
 assert.equal(reduceGame(s,{type:'select',id:'hospital'}).selectedVehicle,null);
});
