import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { createInitialState } from '../src/gameState.ts';
import {cityModels} from '../src/cityModels.ts';

const hooks = registerHooks({ resolve(specifier, context, nextResolve) {
  return specifier === 'pixi.js'
    ? { url: new URL('./fixtures/pixi.mjs', import.meta.url).href, shortCircuit: true }
    : nextResolve(specifier, context);
} });
const { buildCityScene } = await import('../src/CityScene.ts');
const { stats } = await import('./fixtures/pixi.mjs');
hooks.deregister();

test('atlas lighting swaps retained textures and keeps service backup distinct from city outage',()=>{
 const textures={...Object.fromEntries(Object.keys(cityModels).map(id=>[id,{on:{id:`${id}:on`},off:{id:`${id}:off`}}])),ground:{id:'street'}};
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

test('simulation ticks reuse all scene objects without redrawing unchanged visuals', () => {
  const scene = buildCityScene(), state = { ...createInitialState(), outage: true };
  assert.equal(scene.update(state), true);
  const created = stats.created, drawn = stats.drawn, children = [...scene.world.children];
  for (let tick = 1; tick < 100; tick++) scene.update({ ...state, time: tick / 100 });
  assert.equal(stats.created, created); assert.equal(stats.drawn, drawn);
  assert.deepEqual(scene.world.children, children);
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
