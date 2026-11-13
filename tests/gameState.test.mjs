import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, reduceGame } from '../src/gameState.ts';
import { status } from '../src/simulation.ts';

const run = (...actions) => actions.reduce(reduceGame, createInitialState());
const fail = { type: 'fail' };

test('late delivery replenishes a depleted backup instead of wasting a team', () => {
  const s = run(fail, { type: 'seek', time: 12 }, { type: 'boost', id: 'water' });
  assert.equal(status('water', s).remaining, 8);
  assert.equal(status('water', s).label, 'Backup power');
});
test('late water delivery recovers water for homes still on backup power', () => {
  const s = run(fail, { type: 'tick', hours: 7 }, { type: 'boost', id: 'homes' }, { type: 'boost', id: 'water' });
  assert.equal(status('homes', s).remaining, 8);
  assert.equal(status('homes', s).label, 'Backup power');
});
test('supplies add eight hours to an active reserve', () => {
  const s = run(fail, { type: 'tick', hours: 2 }, { type: 'boost', id: 'hospital' });
  assert.equal(status('hospital', s).remaining, 24);
});
test('only two distinct delivery teams can be used', () => {
  const s = run(fail, { type: 'boost', id: 'hospital' }, { type: 'boost', id: 'water' });
  assert.equal(reduceGame(s, { type: 'boost', id: 'homes' }), s);
  assert.equal(reduceGame(s, { type: 'boost', id: 'water' }), s);
  assert.equal(reduceGame(s, { type: 'boost', id: 'grid' }), s);
});
test('undo restores exact time, reserves and available teams', () => {
  const before = run(fail, { type: 'tick', hours: 12 });
  const after = reduceGame(before, { type: 'boost', id: 'water' });
  assert.deepEqual(reduceGame(after, { type: 'rewind' }), { ...before, playing: false });
});
test('restoration and undo preserve the original outage and supplies', () => {
  const s = run(fail, { type: 'tick', hours: 9 }, { type: 'boost', id: 'water' });
  const restored = reduceGame(s, { type: 'restore' });
  assert.equal(status('grid', restored).label, 'Operational');
  assert.deepEqual(reduceGame(restored, { type: 'rewind' }), { ...s, playing: false });
});
test('scrubbing preserves past interventions and original outage remains selectable', () => {
  const s = run(fail, { type: 'boost', id: 'water' }, { type: 'seek', time: 10 });
  assert.equal(s.time, 10); assert.equal(s.playing, false);
  assert.deepEqual(s.supplyAt, {water:0}); assert.deepEqual(s.boosted, ['water']);
  assert.equal(status('water', s).label, 'Backup power');
  const baseline = reduceGame(s, {type:'branch', id:0});
  assert.equal(status('water', baseline).label, 'Offline');
  assert.deepEqual(baseline.boosted, []);
});
test('clock pauses at 24 hours and cannot resume past the endpoint', () => {
  const s = run(fail, { type: 'tick', hours: 30 });
  assert.equal(s.time, 24); assert.equal(s.playing, false);
  assert.equal(reduceGame(s, { type: 'toggle' }), s);
});

test('minute-sized playback hits reserve deadlines and stops exactly at 24 hours', () => {
  let s = run(fail);
  for (let minute = 1; minute <= 1440; minute++) {
    s = reduceGame(s, { type: 'tick', hours: 1 / 60 });
    for (const [id, deadline] of [['homes', 120], ['telecom', 240], ['water', 360], ['hospital', 1080]]) {
      if (minute === deadline) assert.equal(status(id, s).label, 'Offline', `${id} at minute ${minute}`);
    }
  }
  assert.equal(s.time, 24);
  assert.equal(s.playing, false);
});
test('invalid times and speeds cannot corrupt the simulation', () => {
  const s = run(fail);
  for (const hours of [-1, NaN, Infinity]) assert.equal(reduceGame(s, { type: 'tick', hours }), s);
  assert.equal(reduceGame(s, { type: 'seek', time: NaN }), s);
  assert.equal(reduceGame(s, { type: 'setSpeed', speed: -2 }), s);
});
test('reset returns a fresh initial state without mutable shared collections', () => {
  const s = run(fail, { type: 'boost', id: 'hospital' }, { type: 'setSpeed', speed: 12 }, { type: 'toggleTrace' });
  assert.deepEqual(reduceGame(s, { type: 'reset' }), createInitialState());
  assert.notEqual(createInitialState().supplyAt, createInitialState().supplyAt);
});
