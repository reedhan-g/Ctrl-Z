import { test } from 'node:test';
import assert from 'node:assert/strict';
import { initial, status } from '../src/simulation.ts';
import { dependencies, upstreamPaths } from '../src/dependencies.ts';
import { investigate, incidentLog } from '../src/investigation.ts';
import { createInitialState, reduceGame } from '../src/gameState.ts';

const outage = time => ({ ...initial, outage: true, time });
test('hospital investigation traces direct power and indirect water dependency', () => {
  assert.deepEqual(upstreamPaths('hospital'), [['grid', 'hospital'], ['grid', 'water', 'hospital']]);
  const evidence = investigate('hospital', outage(7));
  assert.equal(evidence[0].sourceOnline, false); assert.equal(evidence[0].available, true);
  assert.equal(evidence[1].remaining, 11); assert.equal(evidence[1].available, true);
});
test('hospital fuel alone cannot replace water after its twelve-hour tank empties', () => {
  const state = { ...outage(19), boosted: ['hospital'], supplyAt: { hospital: 0 } };
  assert.equal(status('hospital', state).label, 'No water');
  assert.equal(status('hospital', state).remaining, 7);
  assert.equal(investigate('hospital', state)[1].available, false);
  const recovered = { ...state, boosted: ['hospital', 'water'], supplyAt: { hospital: 0, water: 19 } };
  assert.equal(status('hospital', recovered).label, 'Backup power');
});
test('every simulated dependency has a valid acyclic investigation path', () => {
  for (const edge of dependencies) assert.ok(upstreamPaths(edge.target).some(path => path.includes(edge.source)));
});
test('incident log reveals no future failures and does not mutate state', () => {
  const state = outage(1), before = structuredClone(state), log = incidentLog(state);
  assert.ok(log.every(e => e.time <= 1));
  assert.equal(log.filter(e => e.kind === 'status').length, 3);
  assert.deepEqual(state, before); assert.deepEqual(incidentLog(initial), []);
});
test('late supply history retains the earlier failure and records service recovery', () => {
  const state = { ...outage(13), boosted: ['water'], supplyAt: { water: 12 } };
  const log = incidentLog(state).filter(e => e.building === 'water');
  assert.ok(log.some(e => e.time === 6 && e.message.includes('offline')));
  assert.ok(log.some(e => e.time === 12 && e.kind === 'delivery'));
  assert.ok(log.some(e => e.time === 12 && e.message.includes('backup power')));
  assert.ok(!log.some(e => e.time === 20));
});
test('early supplies postpone failure without inventing an interruption', () => {
  const state = { ...outage(15), boosted: ['water'], supplyAt: { water: 3 } };
  const failures = incidentLog(state).filter(e => e.building === 'water' && e.message.includes('offline'));
  assert.deepEqual(failures.map(e => e.time), [14]);
});
test('restoration and undo produce consistent incident histories', () => {
  let state = reduceGame(createInitialState(), { type: 'fail' });
  state = reduceGame(state, { type: 'tick', hours: 8 });
  const before = incidentLog(state);
  state = reduceGame(state, { type: 'restore' });
  assert.equal(incidentLog(state).at(-1).kind, 'recovery');
  state = reduceGame(state, { type: 'rewind' });
  assert.deepEqual(incidentLog(state), before);
});
