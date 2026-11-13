import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState,reduceGame} from '../src/gameState.ts';
import {status,serviceCapacity} from '../src/simulation.ts';
import {logisticsOutcome} from '../src/logistics.ts';
const run=(...a)=>a.reduce(reduceGame,createInitialState());
test('telecom depletion reduces dispatch without instantly disabling deliveries',()=>{
 const s=run({type:'fail'},{type:'tick',hours:4});
 assert.equal(status('telecom',s).label,'Offline');
 assert.equal(status('logistics',s).label,'Manual dispatch');
 assert.equal(serviceCapacity('logistics',s),.35);
 assert.equal(status('logistics',{...s,time:8}).label,'Offline');
});
test('delivery tradeoffs change reproducible throughput and survive seeking',()=>{
 const s=run({type:'fail'},{type:'tick',hours:5},{type:'boost',id:'telecom'},{type:'tick',hours:2});
 const baseline=reduceGame(s,{type:'branch',id:0});
 assert.ok(logisticsOutcome(s).dispatched>logisticsOutcome(baseline).dispatched);
 assert.equal(serviceCapacity('logistics',s),.7);
 const replay=reduceGame(reduceGame(s,{type:'seek',time:1}),{type:'seek',time:7});
 assert.deepEqual(logisticsOutcome(replay),logisticsOutcome(s));
 const hubOnly=run({type:'fail'},{type:'tick',hours:9},{type:'boost',id:'logistics'});
 assert.equal(serviceCapacity('logistics',hubOnly),.35);
 const both=reduceGame(hubOnly,{type:'boost',id:'telecom'});
 assert.equal(serviceCapacity('logistics',both),.7);
});
