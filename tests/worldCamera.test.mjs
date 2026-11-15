import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CameraGesture} from '../src/camera.ts';
import {boundedView,screenToWorld,worldToScreen,frameOpening,frameInspection,unobstructedViewport} from '../src/worldCamera.ts';
import {iso,unproject} from '../src/geometry.ts';
import {world} from '../src/world.ts';

test('projection round trips and expanded land has thirty-six times the original tile area',()=>{
 assert.equal(world.size**2,3600);
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

test('opening frames the civic intersection clear of the desktop minimap and mobile timeline',()=>{
 for(const size of [{width:1045,height:480},{width:390,height:415}]){
  const camera=new CameraGesture();camera.pan={x:300,y:900};camera.zoom=2;
  frameOpening(camera,size);const view=boundedView(camera,size);
  const cross=worldToScreen(iso(4.5,4.5),view);
  assert.equal(camera.zoom,1);
  assert.ok(Math.abs(cross.x-size.width*(size.width<=760?.5:.58))<1e-6);
  assert.ok(Math.abs(cross.y-size.height*(size.width<=760?.59:.68))<1e-6);
  const hospital=worldToScreen(iso(6.9,2.9,40),view);
  assert.ok(hospital.x>size.width*.5&&hospital.x<size.width);
  assert.ok(hospital.y>0&&hospital.y<size.height*.8);
 }
});

test('inspection can frame an authored edge building and reset restores normal land bounds',()=>{
 for(const size of [{width:1045,height:480},{width:390,height:415}]){
  const mobile=size.width<760,camera=new CameraGesture(),point=iso(-24,-24,45);
  const bounds={x:point.x-60,y:point.y-80,width:120,height:160},free=unobstructedViewport(size,[{x:size.width-200,y:0,width:200,height:300}]);
  frameInspection(camera,size,bounds,free,mobile,true);const view=boundedView(camera,size),shown=worldToScreen(point,view);
  assert.ok(Math.abs(shown.x-(free.x+free.width/2))<1e-6);
  assert.ok(Math.abs(shown.y-(free.y+free.height/2))<1e-6);
  camera.pan={x:1e9,y:1e9};const bounded=boundedView(camera,size);assert.ok(Math.abs(bounded.pan.x)<100000&&Math.abs(bounded.pan.y)<100000);
  frameOpening(camera,size);assert.equal(camera.inspectionCenter,null);
 }
});

test('free viewport excludes measured overlays and fits a full tall silhouette',()=>{
 for(const size of [{width:1045,height:480},{width:390,height:415}]){
  const mobile=size.width<760,obstacles=mobile?[{x:0,y:220,width:390,height:195}]:[{x:0,y:22,width:232,height:300},{x:756,y:22,width:264,height:350}];
  const free=unobstructedViewport(size,obstacles),camera=new CameraGesture(),bounds={x:-70,y:-155,width:140,height:200};
  frameInspection(camera,size,bounds,free,mobile);const view=boundedView(camera,size);
  const top=worldToScreen(bounds,view),bottom=worldToScreen({x:bounds.x+bounds.width,y:bounds.y+bounds.height},view);
  assert.ok(top.x>=free.x-1e-6&&top.y>=free.y-1e-6&&bottom.x<=free.x+free.width+1e-6&&bottom.y<=free.y+free.height+1e-6);
  for(const r of obstacles)assert.ok(free.x>=r.x+r.width||free.x+free.width<=r.x||free.y>=r.y+r.height||free.y+free.height<=r.y);
 }
});
