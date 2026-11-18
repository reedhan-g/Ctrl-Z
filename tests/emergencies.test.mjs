import { test } from 'node:test';
import assert from 'node:assert/strict';
import { emergencyEvents } from '../src/emergencies.ts';
import { createReplay } from '../src/replay.ts';

const original = createReplay().branches[0];
const pairs = events => events.map(event => [event.building, event.time]);

test('outage emergencies reflect real thresholds and summarize the telecom cascade once', () => {
  const events = emergencyEvents(original, 24);
  assert.deepEqual(pairs(events), [['homes',2],['telecom',4],['water',6],['logistics',8],['hospital',18]]);
  assert.match(events[1].message, /manual dispatch/);
  assert.match(events[2].message, /water buffer/);
  assert.match(events[4].title, /generator/);
  assert.deepEqual(emergencyEvents(original, 3), events.slice(0, 1));
  assert.deepEqual(emergencyEvents(original, 24), events);
});

test('deliveries change the deadlines and reveal real recovery and later water failure', () => {
  const early = { ...original, events: [{ kind: 'delivery', building: 'telecom', time: 0 }] };
  assert.ok(!emergencyEvents(early, 4).some(event => event.building === 'telecom'));
  assert.equal(emergencyEvents(early, 12).find(event => event.building === 'telecom').time, 12);
  const late = { ...original, events: [
    { kind: 'delivery', building: 'telecom', time: 5 },
    { kind: 'delivery', building: 'hospital', time: 7 },
  ] };
  const recovered = emergencyEvents(late, 5).filter(event => event.kind === 'recovery');
  assert.deepEqual(pairs(recovered), [['telecom',5],['logistics',5]]);
  assert.match(recovered[1].message, /35% to 70%/);
  assert.match(emergencyEvents(late, 18).find(event => event.building === 'hospital').title, /water/);
});

test('grid restoration is one recovery and suppresses future outage alerts', () => {
  const restored = { ...original, events: [{ kind:'restore', time: 5 }] };
  const events = emergencyEvents(restored, 24);
  assert.deepEqual(pairs(events), [['homes',2],['telecom',4],['grid',5]]);
  assert.equal(events.at(-1).kind, 'recovery');
  assert.deepEqual(emergencyEvents(restored, 3), events.slice(0,1));
});
