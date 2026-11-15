import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState,reduceGame} from '../src/gameState.ts';
import {vehiclePosition,vehiclePose,routePose,pickVehicle,vehicleRoute,fleet} from '../src/traffic.ts';
import {iso} from '../src/geometry.ts';
import {logisticsOutcome} from '../src/logistics.ts';
import {roadAt,world} from '../src/world.ts';
const run=(...a)=>a.reduce(reduceGame,createInitialState());
test('expanded courier route crosses outer districts on connected finite roads',()=>{
 assert.ok(vehicleRoute.some(p=>p.x<0));assert.ok(vehicleRoute.some(p=>p.y>10));
 for(let i=1;i<vehicleRoute.length;i++){
  const a=vehicleRoute[i-1],b=vehicleRoute[i];
  assert.ok(a.x===b.x||a.y===b.y);
  for(let t=0;t<=1;t+=.01)assert.ok(roadAt(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t),'entire courier route remains on the shared street network');
  for(const n of [a.x,a.y,b.x,b.y])assert.ok(n>=world.min&&n<=world.max);
 }
});
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

const directionOf=(a,b)=>a.x!==b.x?(b.x>a.x?'x+':'x-'):(b.y>a.y?'y+':'y-');
const lengths=vehicleRoute.slice(1).map((b,i)=>Math.hypot(b.x-vehicleRoute[i].x,b.y-vehicleRoute[i].y));
const circuit=lengths.reduce((a,b)=>a+b,0);
const close=(a,b)=>{assert.ok(Math.abs(a.x-b.x)<1e-8);assert.ok(Math.abs(a.y-b.y)<1e-8);};

test('all three couriers face world-coordinate travel in all four directions on every route segment',()=>{
 for(const vehicle of fleet){
  let start=0;const headings=new Set();
  for(let i=0;i<lengths.length;i++){
   const distance=start+lengths[i]/2,hours=(distance-vehicle.offset+circuit)/5;
   const a=vehiclePose(vehicle.id,createInitialState(),hours),b=vehiclePose(vehicle.id,createInitialState(),hours+.001);
   assert.equal(a.direction,directionOf(vehicleRoute[i],vehicleRoute[i+1]));headings.add(a.direction);
   assert.equal(directionOf(a.tile,b.tile),a.direction);assert.equal(roadAt(a.tile.x,a.tile.y),true);
   const width=a.direction[0]==='x'?.8:.38,depth=a.direction[0]==='y'?.8:.38;
   for(const dx of [-width/2,width/2])for(const dy of [-depth/2,depth/2])assert.ok(roadAt(a.tile.x+dx,a.tile.y+dy),'entire moving footprint stays on its road lane');
   close(a.point,vehiclePosition(vehicle.id,createInitialState(),hours));start+=lengths[i];
  }
  assert.deepEqual([...headings].sort(),['x+','x-','y+','y-']);
 }
});

test('every intersection uses its outgoing segment at the vertex and preserves continuous road contact',()=>{
 let boundary=0;
 for(let i=0;i<lengths.length;i++){
  boundary+=lengths[i];const next=(i+1)%lengths.length,vertex=vehicleRoute[i+1];
  const before=routePose(boundary-.001),at=routePose(boundary),after=routePose(boundary+.001);
  assert.equal(before.direction,directionOf(vehicleRoute[i],vertex));
  assert.equal(at.direction,directionOf(vehicleRoute[next],vehicleRoute[next+1]));assert.equal(after.direction,at.direction);
  close(at.tile,vertex);assert.ok(Math.hypot(after.tile.x-before.tile.x,after.tile.y-before.tile.y)<=.00201);
 }
 close(routePose(circuit).tile,vehicleRoute[0]);
});

test('pause, speed, rewind and response branches reproduce the same vehicle poses',()=>{
 let recorded=run({type:'fail'},{type:'seek',time:3},{type:'boost',id:'water'});
 const branch=recorded.activeBranch,expected=fleet.map(v=>vehiclePose(v.id,recorded));
 for(const action of [{type:'toggle'},{type:'setSpeed',speed:8},{type:'toggle'}]){
  recorded=reduceGame(recorded,action);assert.deepEqual(fleet.map(v=>vehiclePose(v.id,recorded)),expected);
 }
 const resumed=reduceGame(reduceGame(recorded,{type:'seek',time:1}),{type:'seek',time:3});
 assert.deepEqual(fleet.map(v=>vehiclePose(v.id,resumed)),expected);
 const fork=reduceGame(reduceGame(recorded,{type:'seek',time:1}),{type:'boost',id:'telecom'});
 const back=reduceGame(reduceGame(fork,{type:'branch',id:branch}),{type:'seek',time:3});
 assert.deepEqual(fleet.map(v=>vehiclePose(v.id,back)),expected);
 const undone=reduceGame(recorded,{type:'rewind'}),original=run({type:'fail'},{type:'seek',time:3});
 assert.deepEqual(fleet.map(v=>vehiclePose(v.id,undone)),fleet.map(v=>vehiclePose(v.id,original)));
});

// Contract comparison with the former position-only sampler: orientation must
// not change routes, dispatch distance, fleet offsets or the z=4 picking API.
function legacyPosition(id,s,visualHours=0){
 const outcome=logisticsOutcome(s),vehicle=fleet.find(v=>v.id===id);
 let distance=((outcome.dispatched/12+visualHours*outcome.capacity)*5+vehicle.offset)%circuit;
 for(let i=0;i<lengths.length;i++){
  if(distance<=lengths[i]){const t=distance/lengths[i],a=vehicleRoute[i],b=vehicleRoute[i+1];return iso(a.x+(b.x-a.x)*t,a.y+(b.y-a.y)*t,4);}
  distance-=lengths[i];
 }
 return iso(vehicleRoute[0].x,vehicleRoute[0].y,4);
}

test('directional sampling preserves existing positions through outages, depletion and recovery',()=>{
 for(const t of [0,.379,1,3,6,8,12,18,24]){
  const states=[{...createInitialState(),time:t},run({type:'fail'},{type:'seek',time:t})];
  if(t>=12)states.push(run({type:'fail'},{type:'seek',time:12},{type:'boost',id:'logistics'},{type:'seek',time:t}));
  for(const s of states)for(const v of fleet)for(const visualHours of [0,.001,1])close(vehiclePose(v.id,s,visualHours).point,legacyPosition(v.id,s,visualHours));
 }
});
