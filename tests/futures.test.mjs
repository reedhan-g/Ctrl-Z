import { test } from 'node:test';
import assert from 'node:assert/strict';
import { compareFutures, distinctResponses } from '../src/futures.ts';
import { createReplay } from '../src/replay.ts';

const original = createReplay().branches[0];
const response = { id: 1, name: 'Response 1', events: [
  { kind:'delivery', building:'water', time:0 },
  { kind:'delivery', building:'telecom', time:4.25 },
] };

test('comparison integrates both journals to the same time without exposing future decisions', () => {
  const early = compareFutures(original, response, 4);
  assert.equal(early.original.time, 4);
  assert.equal(early.revised.time, 4);
  assert.equal(early.delta, 0);
  assert.equal(early.revised.decisions.length, 1);
  assert.ok(early.facilities.every(facility => facility.change === 'Unchanged'));
  const replay = structuredClone([original, response]);
  const end = compareFutures(original, response, 12);
  assert.equal(end.original.serviceHours, 28.2);
  assert.ok(Math.abs(end.revised.serviceHours - 43.2625) < 1e-9);
  assert.ok(end.revised.backlog < end.original.backlog);
  assert.equal(end.revised.teamsUsed, 2);
  assert.deepEqual(end.facilities.filter(facility => facility.change === 'Improved').map(facility => facility.id), ['water','telecom']);
  assert.equal(end.facilities.find(facility => facility.id === 'water').after, 1);
  const swapped = compareFutures(response, original, 12);
  assert.equal(swapped.delta, -end.delta);
  assert.equal(swapped.facilities.find(facility => facility.id === 'water').change, 'Worsened');
  assert.deepEqual([original, response], replay);
});

test('compare options exclude equivalent choices but keep genuinely different strategies', () => {
  const duplicate = { ...response, id: 7 };
  const variant = { ...response, id: 8, events: response.events.slice(0,1) };
  assert.deepEqual(distinctResponses([original, response, duplicate, variant]).map(branch => branch.id), [0,1,8]);
});

test('hospital fuel and service are separate, and the water limit appears only after it occurs', () => {
  const fuel = { id: 2, name: 'Fuel only', events: [{ kind: 'delivery', building: 'hospital', time: 12 }] };
  const before = structuredClone(fuel);
  assert.deepEqual(compareFutures(original, fuel, 11.75).interventions, []);
  assert.equal(compareFutures(original, fuel, 17.75).interventions[0].revised.limit, undefined);
  const end = compareFutures(original, fuel, 24);
  assert.equal(end.delta, 0);
  const hospital = end.interventions[0];
  assert.equal(hospital.id, 'hospital');
  assert.equal(hospital.delta, 0);
  assert.deepEqual(hospital.revised, {time: 12, reserveGained: 8, limit: {source: 'water', time: 18, buffered: true}});
  assert.deepEqual(compareFutures(fuel, original, 24).interventions[0].original, hospital.revised);
  assert.deepEqual(fuel, before);
});

test('a successful intervention measures facility service separately and reverses the signed delta', () => {
  const water = { id: 2, name: 'Supply pumps', events: [{ kind: 'delivery', building: 'water', time: 5 }] };
  const end = compareFutures(original, water, 12);
  assert.equal(end.interventions[0].delta, 6);
  assert.equal(end.interventions[0].revised.reserveGained, 8);
  assert.ok(Math.abs(end.delta - 6) < 1e-9);
  assert.equal(compareFutures(water, original, 12).interventions[0].delta, -6);
});
