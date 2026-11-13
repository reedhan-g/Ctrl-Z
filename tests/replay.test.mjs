import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createReplay, recordIntervention, replayAt } from '../src/replay.ts';
import { createInitialState, reduceGame } from '../src/gameState.ts';
import { incidentLog } from '../src/investigation.ts';

test('replay preserves earlier supplies and hides future decisions until reached', () => {
  let s = recordIntervention(createReplay(), { kind: 'delivery', building: 'water', time: 3 });
  s = recordIntervention(s, { kind: 'delivery', building: 'hospital', time: 9 });
  const branch = s.branches.find(b => b.id === s.activeBranch);
  assert.deepEqual(replayAt(branch, 2).boosted, []);
  assert.deepEqual(replayAt(branch, 5).boosted, ['water']);
  assert.deepEqual(replayAt(branch, 10).boosted, ['water', 'hospital']);
  assert.deepEqual(replayAt(s.branches[0], 10).boosted, []);
});

const run=(...actions)=>actions.reduce(reduceGame,createInitialState());
test('integrated playback reapplies a future delivery and pauses at recorded restoration',()=>{
  let s=run({type:'fail'},{type:'tick',hours:7},{type:'boost',id:'water'},{type:'tick',hours:5},{type:'restore'});
  s=reduceGame(s,{type:'seek',time:5});
  assert.deepEqual(s.boosted,[]);
  assert.ok(!incidentLog(s).some(e=>e.kind==='delivery'));
  s=reduceGame(s,{type:'toggle'});
  s=reduceGame(s,{type:'tick',hours:4});
  assert.deepEqual(s.supplyAt,{water:7});
  s=reduceGame(s,{type:'tick',hours:10});
  assert.equal(s.time,12);assert.equal(s.restoredAt,12);assert.equal(s.playing,false);
});
test('reducer forks a response without spending future teams and undo restores the branch',()=>{
  let s=run({type:'fail'},{type:'tick',hours:3},{type:'boost',id:'water'},{type:'tick',hours:6},{type:'boost',id:'hospital'},{type:'seek',time:7});
  const before=structuredClone(s);
  s=reduceGame(s,{type:'boost',id:'homes'});
  assert.equal(s.activeBranch,2);
  assert.deepEqual(s.boosted,['water','homes']);
  assert.deepEqual(s.branches[1],before.branches[1]);
  assert.deepEqual(reduceGame(s,{type:'rewind'}),before);
  assert.equal(reduceGame(s,{type:'branch',id:99}),s);
});

test('intervening in the past forks without deleting an earlier response', () => {
  let s = recordIntervention(createReplay(), { kind: 'delivery', building: 'water', time: 3 });
  s = recordIntervention(s, { kind: 'restore', time: 12 });
  const original = structuredClone(s.branches[1]);
  s = recordIntervention(s, { kind: 'delivery', building: 'homes', time: 7 });
  assert.equal(s.activeBranch, 2);
  assert.deepEqual(s.branches[1], original);
  assert.deepEqual(replayAt(s.branches[2], 14).boosted, ['water', 'homes']);
  assert.equal(replayAt(s.branches[2], 14).outage, true);
  assert.equal(replayAt(original, 14).restoredAt, 12);
});
