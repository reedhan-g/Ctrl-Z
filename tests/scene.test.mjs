import { test } from 'node:test';
import assert from 'node:assert/strict';
import { registerHooks } from 'node:module';
import { createInitialState } from '../src/gameState.ts';

const hooks = registerHooks({ resolve(specifier, context, nextResolve) {
  return specifier === 'pixi.js'
    ? { url: new URL('./fixtures/pixi.mjs', import.meta.url).href, shortCircuit: true }
    : nextResolve(specifier, context);
} });
const { buildCityScene } = await import('../src/CityScene.ts');
const { stats } = await import('./fixtures/pixi.mjs');
hooks.deregister();

test('simulation ticks reuse all scene objects without redrawing unchanged visuals', () => {
  const scene = buildCityScene(), state = { ...createInitialState(), outage: true };
  assert.equal(scene.update(state), true);
  const created = stats.created, drawn = stats.drawn, children = [...scene.world.children];
  for (let tick = 1; tick < 100; tick++) assert.equal(scene.update({ ...state, time: tick / 100 }), false);
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
