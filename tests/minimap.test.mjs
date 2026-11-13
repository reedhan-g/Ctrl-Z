import {test} from 'node:test';
import assert from 'node:assert/strict';
import {landmarkPoint,minimapRoads,minimapDistricts,minimapBounds} from '../src/minimapGeometry.ts';
import {buildings} from '../src/simulation.ts';
import {iso} from '../src/geometry.ts';
test('minimap uses the same landmark projection, finite roads and district geometry',()=>{
 for(const b of buildings)assert.deepEqual(landmarkPoint(b.id),iso(b.x+.9,b.y+.9));
 assert.equal(minimapDistricts.length,5);assert.equal(minimapRoads.length,16);
 for(const road of minimapRoads)for(const p of road){assert.ok(p.x>=minimapBounds.x&&p.x<=minimapBounds.x+minimapBounds.width);assert.ok(p.y>=minimapBounds.y&&p.y<=minimapBounds.y+minimapBounds.height);}
});
