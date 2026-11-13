import {test} from 'node:test';
import assert from 'node:assert/strict';
import {landmarkPoint,minimapRoads,minimapDistricts,minimapBounds,MinimapDrag} from '../src/minimapGeometry.ts';
import {buildings} from '../src/simulation.ts';
import {iso} from '../src/geometry.ts';
test('minimap uses the same landmark projection, finite roads and district geometry',()=>{
 for(const b of buildings)assert.deepEqual(landmarkPoint(b.id),iso(b.x+.9,b.y+.9));
 assert.equal(minimapDistricts.length,5);assert.equal(minimapRoads.length,16);
 for(const road of minimapRoads)for(const p of road){assert.ok(p.x>=minimapBounds.x&&p.x<=minimapBounds.x+minimapBounds.width);assert.ok(p.y>=minimapBounds.y&&p.y<=minimapBounds.y+minimapBounds.height);}
});
test('grabbing the footprint preserves its pointer offset and cancellation stops navigation',()=>{
 const drag=new MinimapDrag(),view={x:10,y:20,width:200,height:100};
 assert.deepEqual(drag.down({x:50,y:40},view,true),{x:110,y:70});
 assert.deepEqual(drag.move({x:80,y:55}),{x:140,y:85});
 drag.end();assert.equal(drag.move({x:100,y:100}),null);
 assert.deepEqual(drag.down({x:-300,y:400},view,false),{x:-300,y:400});
});
