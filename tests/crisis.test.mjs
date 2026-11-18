import { test } from 'node:test';
import assert from 'node:assert/strict';
import { crisisResult } from '../src/crisis.ts';
import { createInitialState, reduceGame } from '../src/gameState.ts';
import { decodeExperiment, encodeExperiment } from '../src/persistence.ts';

const start = () => reduceGame(createInitialState(), { type: 'startCrisis' });
const action = (s, ...actions) => actions.reduce(reduceGame, s);
const boost = id => ({ type: 'boost', id });
const seek = time => ({ type: 'seek', time });
const result = s => crisisResult(s.branches.find(b => b.id === s.activeBranch), s.branches[0]);

test('crisis starts paused at zero, stops at 12 and locks out restore and deadline supplies', () => {
  const s = start();
  assert.equal(s.crisis, true);
  assert.equal(s.outage, true);
  assert.equal(s.time, 0);
  assert.equal(s.playing, false);
  assert.equal(reduceGame(s, { type: 'restore' }), s);
  assert.equal(reduceGame(s, { type: 'rewind' }), s);
  const end = action(s, { type: 'toggle' }, { type: 'tick', hours: 30 });
  assert.equal(end.time, 12);
  assert.equal(end.playing, false);
  assert.equal(reduceGame(end, boost('water')), end);
  assert.equal(reduceGame(end, { type: 'toggle' }), end);
  assert.equal(reduceGame(s, seek(24)).time, 12);
  const sandbox = action(createInitialState(), { type: 'fail' }, { type: 'restore' }, seek(24));
  assert.equal(sandbox.restoredAt, 0);
  assert.equal(sandbox.time, 24);
  assert.equal(sandbox.crisis, false);
});

test('a late telecom intervention and water win, while baseline and a lower-scoring strategy lose', () => {
  const baseline = result(action(start(), seek(12)));
  assert.equal(baseline.serviceHours, 28.2);
  assert.equal(baseline.activeServices, 1);
  assert.equal(baseline.stabilized, false);
  const short = result(action(start(), boost('water'), boost('logistics'), seek(12)));
  assert.equal(short.activeServices, 3);
  assert.equal(short.stabilized, false);
  const response = action(start(), boost('water'), seek(4.25), boost('telecom'), seek(12));
  assert.equal(result(response).stabilized, true);
  assert.equal(result(response).activeServices, 3);
  assert.equal(result(response).teamsUsed, 2);
  assert.ok(result(response).advantage >= 36 - 28.2);
  const fork = action(response, seek(2), boost('logistics'));
  assert.deepEqual(fork.boosted, ['water','logistics']);
  assert.deepEqual(fork.branches[1], response.branches[1]);
  assert.equal(reduceGame(fork, boost('homes')), fork);
  assert.deepEqual(reduceGame(fork, { type: 'rewind' }).boosted, ['water']);
  assert.equal(result(action(fork, { type: 'branch', id: 1 }, seek(12))).stabilized, true);
});

test('crisis saves preserve the journal, load paused, and reject events past the crisis limit', () => {
  const s = action(start(), boost('water'), seek(4.25), boost('telecom'), seek(12));
  const text = encodeExperiment(s);
  assert.equal(JSON.parse(text).version, 2);
  assert.deepEqual(decodeExperiment(text), s);
  const invalid = JSON.parse(text);
  invalid.state.branches[1].events[1].time = 12;
  assert.equal(decodeExperiment(JSON.stringify(invalid)), null);
  const old = JSON.parse(encodeExperiment(createInitialState()));
  old.version = 1;
  delete old.state.crisis;
  assert.equal(decodeExperiment(JSON.stringify(old)).crisis, false);
});
