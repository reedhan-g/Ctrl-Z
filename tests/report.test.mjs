import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createReplay,recordIntervention} from '../src/replay.ts';
import {branchOutcome,resilienceReport} from '../src/report.ts';
test('report integrates exact baseline thresholds and fractional dispatch',()=>{
 const baseline=createReplay().branches[0];
 assert.ok(Math.abs(branchOutcome(baseline,24).serviceHours-34.2)<1e-9);
 assert.ok(Math.abs(branchOutcome(baseline,24).dispatched-50.4)<1e-9);
 assert.equal(branchOutcome(baseline,0).serviceHours,0);
});
test('reports compare equal horizons, hide future actions and reflect recovery',()=>{
 let s=recordIntervention(createReplay(),{kind:'delivery',building:'water',time:3});
 s=recordIntervention(s,{kind:'restore',time:8});
 const early=resilienceReport(s.branches,s.activeBranch,2);
 assert.equal(early.serviceHoursSaved,0);assert.deepEqual(early.outcomes[1].decisions,[]);
 const report=resilienceReport(s.branches,s.activeBranch,24);
 assert.equal(report.outcomes[1].restoredAt,8);
 assert.ok(report.serviceHoursSaved>0);
 assert.ok(report.outcomes.every(o=>o.time===24));
 assert.equal(report.outcomes[1].teamsUsed,1);
});
