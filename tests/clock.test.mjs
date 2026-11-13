import { test } from 'node:test';
import assert from 'node:assert/strict';
import { SimulationClock } from '../src/clock.ts';

test('fixed-step clock gives the same result for differently partitioned callbacks',()=>{
 const a=new SimulationClock(),b=new SimulationClock();
 const one=a.advance(1000,4,true);
 const many=[35,115,250,50,550].reduce((total,ms)=>total+b.advance(ms,4,true),0);
 assert.ok(Math.abs(one-many)<1e-12);
 assert.equal(a.advance(50,4,true),0);
 assert.equal(a.advance(50,4,true),4/60);
});
test('hidden tabs, pauses and long stalls discard partial time without catch-up',()=>{
 const clock=new SimulationClock();
 clock.advance(90,1,true);
 assert.equal(clock.advance(10000,1,true),0);
 assert.equal(clock.advance(10,1,true),0);
 assert.equal(clock.advance(90,1,false),0);
 assert.equal(clock.advance(90,1,true),0);
 assert.equal(clock.advance(10,1,true),1/60);
});
