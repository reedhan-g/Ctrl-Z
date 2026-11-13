import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cityScenery} from '../src/worldScenery.ts';
import {buildings} from '../src/simulation.ts';
test('dense scenery has stable unique coordinates, varied districts and no service footprint collisions',()=>{
 assert.ok(cityScenery.length>200);
 assert.equal(new Set(cityScenery.map(b=>b.id)).size,cityScenery.length);
 assert.equal(new Set(cityScenery.map(b=>b.district.id)).size,5);
 assert.equal(new Set(cityScenery.map(b=>b.variant)).size,4);
 for(const b of cityScenery)for(const service of buildings)
  assert.ok(!(b.x<service.x+1.9&&b.x+b.width>service.x&&b.y<service.y+1.9&&b.y+b.depth>service.y),`${b.id} overlaps ${service.id}`);
});
