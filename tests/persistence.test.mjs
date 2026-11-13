import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState,reduceGame} from '../src/gameState.ts';
import {encodeExperiment,decodeExperiment} from '../src/persistence.ts';
import {readFileSync} from 'node:fs';
import {status} from '../src/simulation.ts';
test('pre-expansion v1 core response resumes without requiring camera or world fields',()=>{
 const saved=readFileSync(new URL('./fixtures/save-v1-core.json',import.meta.url),'utf-8');
 const state=decodeExperiment(saved);assert.ok(state);assert.equal(state.time,12);assert.equal(state.activeBranch,1);
 assert.equal(status('water',state).label,'Backup power');assert.equal(state.playing,false);
 const undo=reduceGame(state,{type:'rewind'});assert.equal(undo.time,0);assert.deepEqual(undo.boosted,[]);
});
test('save/load retains branches, exact undo and evidence while resuming paused',()=>{
 let s=reduceGame(createInitialState(),{type:'startCase',id:'dispatch'});
 for(const id of ['grid','telecom','logistics'])s=reduceGame(s,{type:'evidence',id});
 s=reduceGame(s,{type:'diagnose',id:'telecom'});s=reduceGame(s,{type:'boost',id:'telecom'});
 s=reduceGame(s,{type:'toggle'});
 const loaded=decodeExperiment(encodeExperiment(s));
 assert.deepEqual(loaded,{...s,playing:false,selected:null,selectedVehicle:null});
 assert.deepEqual(reduceGame(loaded,{type:'rewind'}).branches,reduceGame(s,{type:'rewind'}).branches);
 assert.equal(loaded.caseStudy.diagnosis,'correct');
 assert.deepEqual(decodeExperiment(encodeExperiment(createInitialState())),createInitialState());
});
test('corrupt saves and invalid or inconsistent journals cannot replace a running experiment',()=>{
 const s=reduceGame(createInitialState(),{type:'fail'}),valid=encodeExperiment(s);
 for(const edit of [d=>d.version=9,d=>d.state.time=NaN,d=>d.state.activeBranch=99,
  d=>d.state.boosted=['water'],d=>d.state.branches[0].events.push({kind:'delivery',building:'secret',time:1}),
  d=>d.state.caseStudy={id:'missing',evidence:[],diagnosis:'correct'},d=>d.state.history=[{}]]){
   const data=JSON.parse(valid);edit(data);assert.equal(decodeExperiment(JSON.stringify(data)),null);
 }
 assert.equal(decodeExperiment('{broken'),null);
 assert.equal(decodeExperiment('x'.repeat(2_000_001)),null);
});
