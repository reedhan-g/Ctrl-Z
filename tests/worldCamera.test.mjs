import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CameraGesture} from '../src/camera.ts';
import {boundedView,screenToWorld,worldToScreen} from '../src/worldCamera.ts';
import {iso,unproject} from '../src/geometry.ts';
import {world} from '../src/world.ts';

test('projection round trips and expanded land has sixteen times the tile area',()=>{
 assert.equal(world.size**2,1600);
 for(const p of [{x:-15,y:25},{x:6,y:2},{x:25,y:25}])assert.deepEqual(unproject(iso(p.x,p.y)),p);
});
test('every viewport corner remains on finite land at extreme pans, zooms and sizes',()=>{
 for(const size of [{width:1045,height:480},{width:390,height:415},{width:844,height:300}])
 for(const zoom of [.01,.55,1,2.8,100])for(const direction of [-1,1]){
  const camera=new CameraGesture();camera.zoom=zoom;camera.pan={x:direction*1e6,y:-direction*1e6};
  const view=boundedView(camera,size);
  for(const p of [{x:0,y:0},{x:size.width,y:0},{x:0,y:size.height},{x:size.width,y:size.height}]){
   const tile=unproject(screenToWorld(p,view));
   for(const n of [tile.x,tile.y])assert.ok(n>=world.min-1e-6&&n<=world.max+1e-6,JSON.stringify({size,zoom,tile}));
   const back=worldToScreen(screenToWorld(p,view),view);assert.ok(Math.abs(back.x-p.x)<1e-6&&Math.abs(back.y-p.y)<1e-6);
  }
 }
});
