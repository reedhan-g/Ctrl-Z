import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState,reduceGame} from '../src/gameState.ts';
import {inspectService,supplyRequirement,gridRequirement} from '../src/inspection.ts';

test('inspection explains real communications degradation and downstream effects',()=>{
 const s=reduceGame(reduceGame(createInitialState(),{type:'fail'}),{type:'seek',time:5});
 const hub=inspectService('logistics',s),telecom=inspectService('telecom',s);
 assert.equal(hub.metrics[0].value,'35%');assert.equal(hub.state.label,'Manual dispatch');
 assert.match(hub.problem,/Telecom is offline/);assert.ok(hub.links.some(e=>e.system==='communications'&&!e.available));
 assert.deepEqual(telecom.downstream.map(e=>e.target),['logistics']);
 assert.equal(inspectService('grid',s).downstream.length,5);
});

test('hospital inspection separates remaining fuel from an exhausted water buffer',()=>{
 const s=reduceGame(createInitialState(),{type:'startCase',id:'wards'}),info=inspectService('hospital',s);
 assert.equal(info.state.label,'No water');assert.equal(info.state.remaining,7);
 assert.equal(info.metrics.find(m=>m.label==='Water buffer').value,'0.0h left');
 assert.equal(info.metrics[0].value,'0%');assert.match(info.problem,/Generator fuel cannot replace/);
 assert.match(supplyRequirement('water',s),/Confirm the case diagnosis/);assert.match(gridRequirement(s),/Confirm the case diagnosis/);
});

test('action explanations mirror delivery limits without disabling valid late recovery',()=>{
 let s=createInitialState();assert.match(supplyRequirement('hospital',s),/Disconnect electricity/);
 s=reduceGame(reduceGame(s,{type:'fail'}),{type:'seek',time:20});assert.equal(supplyRequirement('water',s),null);
 s=reduceGame(s,{type:'boost',id:'water'});assert.match(supplyRequirement('water',s),/already received/);
 s=reduceGame(s,{type:'boost',id:'hospital'});assert.match(supplyRequirement('telecom',s),/Both delivery teams/);
 const undone=reduceGame(s,{type:'rewind'});assert.equal(supplyRequirement('telecom',undone),null);
 assert.equal(inspectService('hospital',createInitialState()).metrics[1].value,'12.0h ready');
});
