import {test} from 'node:test';
import assert from 'node:assert/strict';
import {buildings,status} from '../src/simulation.ts';
import {world,districtAt,roadAt,places,placeFocus} from '../src/world.ts';
import {cityScenery} from '../src/worldScenery.ts';
import {landmarkPoint} from '../src/minimapGeometry.ts';
import {unproject} from '../src/geometry.ts';
import {vehicleRoute} from '../src/traffic.ts';
import {readFileSync} from 'node:fs';
import {decodeExperiment} from '../src/persistence.ts';
import {reduceGame} from '../src/gameState.ts';

const expected={grid:'industry',hospital:'civic',water:'utility',homes:'residential',telecom:'market',logistics:'logistics'};
test('six stable service identities occupy appropriate separated accessible districts',()=>{
 assert.deepEqual(buildings.map(b=>b.id).sort(),Object.keys(expected).sort());
 for(const b of buildings){
  assert.equal(districtAt(b.x+.95,b.y+.95).id,expected[b.id]);
  assert.ok(b.x>=world.min+5&&b.y>=world.min+5&&b.x+1.9<=world.max-5&&b.y+1.9<=world.max-5);
  for(const other of buildings.filter(o=>o.id!==b.id))assert.ok(Math.hypot(b.x-other.x,b.y-other.y)>=12);
  // The complete footprint and its road-facing approach stay clear.
  for(let x=b.x;x<b.x+1.9;x+=.1)for(let y=b.y;y<b.y+1.9;y+=.1)assert.equal(roadAt(x,y),false,b.id+' blocks a road');
  const east=b.id==='grid',front=east?{x:b.x+1.9,y:b.y,width:.95,depth:1.9}:{x:b.x,y:b.y+1.9,width:1.9,depth:.95};
  for(let t=.1;t<1.9;t+=.2){
   const x=east?b.x+2.85:b.x+t,y=east?b.y+t:b.y+2.85;
   assert.equal(roadAt(x,y),true,b.id+' lacks frontage road access');
  }
  for(const a of cityScenery)assert.ok(!(a.x<front.x+front.width&&a.x+a.width>front.x&&a.y<front.y+front.depth&&a.y+a.depth>front.y),b.id+' entrance obstructed by '+a.id);
 }
 assert.ok(Math.max(...buildings.map(b=>b.x))-Math.min(...buildings.map(b=>b.x))>40);
 assert.ok(Math.max(...buildings.map(b=>b.y))-Math.min(...buildings.map(b=>b.y))>40);
 const hub=buildings.find(b=>b.id==='logistics');assert.deepEqual(vehicleRoute[0],{x:hub.x+2.85,y:hub.y+.95});
});

test('historical v1 journals keep service dependencies and replay behavior after relocation',()=>{
 const state=decodeExperiment(readFileSync(new URL('./fixtures/save-v1-core.json',import.meta.url),'utf8'));
 assert.ok(state);assert.equal(state.time,12);assert.equal(status('water',state).label,'Backup power');
 for(const b of buildings){const selected=reduceGame(state,{type:'select',id:b.id});assert.equal(selected.selected,b.id);assert.equal(selected.time,state.time);assert.deepEqual(selected.branches,state.branches);}
 const replay=reduceGame(state,{type:'seek',time:24});assert.equal(status('hospital',replay).label,'Offline');
});

test('district destinations focus open forecourts clear of service lots and visible markers',()=>{
 for(const place of places){
  const point=placeFocus(place);
  for(const b of buildings){
   const marker=landmarkPoint(b.id);assert.ok(Math.hypot(point.x-marker.x,point.y-marker.y)>80,place.id+' collides with service marker '+b.id);
   const {x,y}=unproject(point);assert.ok(!(x>=b.x&&x<=b.x+1.9&&y>=b.y&&y<=b.y+1.9));
  }
 }
});
