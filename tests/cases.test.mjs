import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createInitialState,reduceGame} from '../src/gameState.ts';
import {caseRecovered,cases} from '../src/cases.ts';
for(const id of ['dispatch','wards'])test(`${id} requires measured evidence, rejects a wrong diagnosis and verifies real recovery`,()=>{
 let s=reduceGame(createInitialState(),{type:'startCase',id});
 const original=s;
 assert.equal(reduceGame(s,{type:'boost',id:cases[id].source}),s);
 s=reduceGame(s,{type:'diagnose',id:cases[id].source});assert.equal(s.caseStudy.diagnosis,'incorrect');
 for(const building of cases[id].required)s=reduceGame(s,{type:'evidence',id:building});
 s=reduceGame(s,{type:'diagnose',id:'homes'});assert.equal(s.caseStudy.diagnosis,'incorrect');
 s=reduceGame(s,{type:'diagnose',id:cases[id].source});assert.equal(s.caseStudy.diagnosis,'correct');
 assert.equal(caseRecovered(s.caseStudy,s),false);
 s=reduceGame(s,{type:'boost',id:cases[id].source});assert.equal(caseRecovered(s.caseStudy,s),true);
 s=reduceGame(s,{type:'rewind'});assert.equal(caseRecovered(s.caseStudy,s),false);
 assert.equal(s.time,original.time);
});
