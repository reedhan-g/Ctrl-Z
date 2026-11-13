import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createInitialState, reduceGame } from '../src/gameState.ts';
import { outageMessage, status } from '../src/simulation.ts';

test('a complete outage branches with deliveries, rewinds and recovers', () => {
  let s = reduceGame(createInitialState(), { type: 'fail' });
  s = reduceGame(s, { type: 'tick', hours: 7 });
  assert.match(outageMessage(s), /Pumps offline/);
  s = reduceGame(s, { type: 'boost', id: 'water' });
  assert.doesNotMatch(outageMessage(s), /Pumps offline/);
  s = reduceGame(s, { type: 'boost', id: 'homes' });
  assert.equal(status('homes', s).label, 'Backup power');
  s = reduceGame(s, { type: 'tick', hours: 7 });
  assert.equal(status('water', s).label, 'Backup power');
  s = reduceGame(s, { type: 'restore' });
  assert.match(outageMessage(s), /Grid restored at 14.0h/);
  s = reduceGame(s, { type: 'rewind' });
  assert.equal(s.outage, true); assert.equal(s.time, 14);
  s = reduceGame(s, { type: 'toggle' });
  s = reduceGame(s, { type: 'tick', hours: 10 });
  assert.equal(s.playing, false); assert.match(outageMessage(s), /observation complete/);
  s = reduceGame(s, { type: 'seek', time: 0 });
  assert.equal(s.boosted.length, 0); assert.equal(s.outage, true);
  s = reduceGame(s, { type: 'reset' });
  assert.deepEqual(s, createInitialState());
});
