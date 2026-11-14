import {test} from 'node:test';
import assert from 'node:assert/strict';
import {iso,pickBuilding} from '../src/geometry.ts';
test('pixel facade outer masonry remains selectable above the service plinth',()=>{
 assert.equal(pickBuilding(iso(7.85,2.9,35)),'hospital');
 assert.equal(pickBuilding(iso(2.9,7.85,22)),'water');
});
