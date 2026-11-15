import {test} from 'node:test';
import assert from 'node:assert/strict';
import {iso,pickBuilding} from '../src/geometry.ts';
import {buildings} from '../src/simulation.ts';
const hospital=buildings.find(b=>b.id==='hospital'),water=buildings.find(b=>b.id==='water');
test('pixel facade outer masonry remains selectable above the service plinth',()=>{
 assert.equal(pickBuilding(iso(hospital.x+1.85,hospital.y+.9,35)),'hospital');
 assert.equal(pickBuilding(iso(water.x+.9,water.y+1.85,22)),'water');
});
