import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { createInitialState } from '../src/gameState.ts';
import {cityModels} from '../src/cityModels.ts';
import {iso,unproject} from '../src/geometry.ts';
import {roadAt} from '../src/world.ts';
import {parkedCars} from '../src/parking.ts';
import {buildings} from '../src/simulation.ts';
import {vehicleTextures} from './fixtures/vehicleTextures.mjs';
import {fleet,vehicleRoute,vehiclePose} from '../src/traffic.ts';
import {vehicleAtlas} from '../src/vehicleAtlas.ts';

const hooks = registerHooks({ resolve(specifier, context, nextResolve) {
  return specifier === 'pixi.js'
    ? { url: new URL('./fixtures/pixi.mjs', import.meta.url).href, shortCircuit: true }
    : nextResolve(specifier, context);
} });
const { buildCityScene } = await import('../src/CityScene.ts');
const { stats } = await import('./fixtures/pixi.mjs');
hooks.deregister();

test('atlas lighting swaps retained textures and keeps service backup distinct from city outage',()=>{
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{id:`${id}:on`},off:{id:`${id}:off`}}])),ground:{id:'street'},lanternGround:{id:'yard'}};
 const scene=buildCityScene(textures);scene.update(createInitialState());
 const collect=node=>[node,...node.children.flatMap(collect)];
 const all=collect(scene.world),hospital=all.find(n=>n.texture===textures.hospital.on),shop=all.find(n=>n.texture===textures.market.on);
 assert.ok(hospital&&shop);const created=stats.created;
 scene.update({...createInitialState(),outage:true,time:0});
 assert.equal(shop.texture,textures.market.off);assert.equal(hospital.texture,textures.hospital.on);
 scene.update({...createInitialState(),outage:true,time:24});assert.equal(hospital.texture,textures.hospital.off);
 scene.update(createInitialState());assert.equal(shop.texture,textures.market.on);assert.equal(hospital.texture,textures.hospital.on);
 assert.equal(stats.created,created);scene.world.destroy();
});

test('authored Lantern Yard uses its ground and retained outage frames without creating services',()=>{
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{id:`${id}:on`},off:{id:`${id}:off`}}])),ground:{id:'street'},lanternGround:{id:'yard'}};
 const scene=buildCityScene(textures),state=createInitialState();scene.update(state);
 const nodes=node=>[node,...node.children.flatMap(nodes)],all=nodes(scene.world);
 assert.equal(all.filter(n=>n.texture===textures.lanternGround).length,1);
 const views=['yardHouse','lanternNoodles','lanternCafe'].map(id=>({id,node:all.find(n=>n.texture===textures[id].on)}));
 assert.ok(views.every(v=>v.node));const created=stats.created;
 assert.deepEqual(scene.pick(iso(-17.05,-17.075,28)),{building:null,scenery:'scenery:-17.65:-17.7',blocked:true},'café roof occludes picks as scenery');
 scene.update({...state,outage:true});
 for(const v of views)assert.equal(v.node.texture,textures[v.id].off);
 scene.update(state);for(const v of views)assert.equal(v.node.texture,textures[v.id].on);
 assert.equal(stats.created,created);scene.world.destroy();
});

test('simulation ticks reuse all scene objects without redrawing unchanged visuals', () => {
  const scene = buildCityScene(), state = { ...createInitialState(), outage: true };
  assert.equal(scene.update(state), true);
  const created = stats.created, drawn = stats.drawn, children = [...scene.world.children];
  // Stay before the first turn: a changed heading is now a real visual change.
  for (let tick = 1; tick < 100; tick++) scene.update({ ...state, time: tick / 1000 });
  assert.equal(stats.created, created); assert.equal(stats.drawn, drawn);
  assert.deepEqual(scene.world.children, children);
  scene.world.destroy();
});

test('junction illumination swaps with grid state while hospital reserve illumination survives',()=>{
 const grounds=Array.from({length:16},(_,i)=>({on:{id:`ground-${i}:on`},off:{id:`ground-${i}:off`}}));
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{id:`${id}:on`},off:{id:`${id}:off`}}])),ground:{},lanternGround:{},grounds};
 const scene=buildCityScene(textures),state=createInitialState();scene.update(state);
 const collect=n=>[n,...n.children.flatMap(collect)],all=collect(scene.world);
 const junction=all.find(n=>n.texture===grounds[15].on),hospital=all.find(n=>n.texture===textures.hospital.on);
 assert.ok(junction&&hospital);const created=stats.created;
 scene.update({...state,outage:true,time:5});
 assert.equal(junction.texture,grounds[15].off);assert.equal(hospital.texture,textures.hospital.on);
 scene.update(state);assert.equal(junction.texture,grounds[15].on);assert.equal(stats.created,created);
 scene.world.destroy();
});
test('failure thresholds and inspection update existing layers instead of recreating the city', () => {
  const scene = buildCityScene(), state = { ...createInitialState(), outage: true };
  scene.update(state);
  const ground = scene.world.children[0], created = stats.created, drawn = stats.drawn;
  scene.update({ ...state, time: 6, selected: 'hospital', trace: true });
  assert.equal(stats.created, created); assert.ok(stats.drawn > drawn);
  assert.equal(ground.clears, 0);
  scene.world.destroy();
});

test('culling hides distant geometry without discarding identity or offscreen outage state',()=>{
 const scene=buildCityScene(),state=createInitialState();scene.update(state);
 const children=[...scene.world.children],created=stats.created;
 const counts=scene.cull({x:-150,y:0,width:300,height:250});
 assert.ok(counts.total>100);assert.ok(counts.visible<counts.total/2);
 scene.cull({x:700,y:500,width:300,height:200});
 scene.update({...state,outage:true,time:20});
 scene.cull({x:-150,y:0,width:300,height:250});
 assert.deepEqual(scene.world.children,children);assert.equal(stats.created,created);
 scene.world.destroy();
});

test('silhouette highlights transfer exclusively, retain outage state and preview without allocations',()=>{
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{id:`${id}:on`},off:{id:`${id}:off`},highlight:{id:`${id}:highlight`}}])),ground:{},lanternGround:{}};
 const scene=buildCityScene(textures),state=createInitialState();scene.update({...state,selected:'hospital'});
 assert.deepEqual(scene.selectionState().highlighted,['hospital']);const created=stats.created;
 scene.preview('water');assert.deepEqual(new Set(scene.selectionState().highlighted),new Set(['hospital','water']));
 scene.preview(null);scene.update({...state,selected:'water',outage:true,time:10});
 assert.deepEqual(scene.selectionState().highlighted,['water']);
 scene.update(state);assert.deepEqual(scene.selectionState().highlighted,[]);
 assert.equal(stats.created,created);scene.world.destroy();
});

test('scenery selection uses the same paint layer and clears when a service or empty land is chosen',()=>{
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{},off:{},highlight:{}}])),ground:{},lanternGround:{}};
 const scene=buildCityScene(textures),state=createInitialState(),id='scenery:-17.65:-17.7';
 scene.update({...state,selectedScenery:id});assert.deepEqual(scene.selectionState().highlighted,[id]);
 assert.equal(scene.pick(iso(-17.05,-17.075,28)).scenery,id);
 scene.update({...state,selected:'hospital',selectedScenery:id});assert.deepEqual(scene.selectionState().highlighted,['hospital']);
 assert.deepEqual(scene.pick({x:-10000,y:-10000}),{building:null,scenery:null,blocked:false});
 scene.update(state);assert.deepEqual(scene.selectionState().highlighted,[]);scene.world.destroy();
});

// The same retained renderer and alpha picking must follow relocated metadata.
test('all six relocated landmarks remain directly pickable and highlight their own layer',()=>{
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{id:`${id}:on`},off:{id:`${id}:off`},highlight:{id:`${id}:highlight`}}])),ground:{},lanternGround:{}};
 const scene=buildCityScene(textures),state=createInitialState();
 for(const b of buildings){
  scene.update({...state,selected:b.id});
  assert.deepEqual(scene.selectionState().highlighted,[b.id]);
  assert.equal(scene.pick(iso(b.x+.9,b.y+.9,b.height*.45)).building,b.id);
 }
 scene.world.destroy();
});

test('parked directional cars use validated curbside bays and stable contact points',()=>{
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{},off:{},highlight:{}}])),ground:{},lanternGround:{}};
 const scene=buildCityScene(textures),nodes=n=>[n,...n.children.flatMap(nodes)];
 const parked=nodes(scene.world).filter(n=>n.label?.startsWith('parking:'));
 assert.equal(parked.length,parkedCars.length);
 for(const car of parked){
  const space=parkedCars.find(p=>p.id===car.label);assert.ok(space);
  assert.equal(car.texture,textures.vehicles.amber[space.direction].on);
  const p=unproject({x:car.x+32,y:car.y+40});
  assert.ok(Math.hypot(p.x-space.center.x,p.y-space.center.y)<1e-8);
  assert.equal(roadAt(p.x,p.y),false,'parked car is outside the active asphalt lane');
 }
 scene.world.destroy();
});

test('retained courier textures turn before rounded positions change without allocating scene objects',()=>{
 const textures={vehicles:vehicleTextures(),...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{},off:{},highlight:{}}])),ground:{},lanternGround:{}};
 const scene=buildCityScene(textures),state=createInitialState();scene.update(state);
 const created=stats.created,drawn=stats.drawn,circuit=vehicleRoute.slice(1).reduce((n,b,i)=>n+Math.hypot(b.x-vehicleRoute[i].x,b.y-vehicleRoute[i].y),0);
 for(const vehicle of fleet){let boundary=0;
  for(let i=1;i<vehicleRoute.length;i++){
   boundary+=Math.hypot(vehicleRoute[i].x-vehicleRoute[i-1].x,vehicleRoute[i].y-vehicleRoute[i-1].y);
   const before=(boundary-vehicle.offset+circuit-.0001)/5,after=before+.00004;
   scene.animate(state,before);const a=scene.vehicleState().find(v=>v.id===vehicle.id);
   const changed=scene.animate(state,after),b=scene.vehicleState().find(v=>v.id===vehicle.id),pose=vehiclePose(vehicle.id,state,after);
   assert.equal(b.direction,pose.direction);assert.ok(a.x===b.x&&a.y===b.y);
   if(a.direction!==b.direction)assert.equal(changed,true,'orientation invalidates the rounded-position cache');
   const index=vehicleAtlas.colors[vehicle.art][pose.direction].on;
   assert.equal(b.frame.x,index%8*64);assert.equal(b.frame.y,Math.floor(index/8)*64);
   assert.deepEqual(b.offset,{x:-32,y:-36});assert.equal(b.rotation,0);
   assert.deepEqual(scene.getVehiclePosition(vehicle.id),{x:b.x,y:b.y});
  }
 }
 assert.equal(stats.created,created);assert.equal(stats.drawn,drawn);scene.world.destroy();
});
