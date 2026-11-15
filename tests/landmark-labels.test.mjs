import {test} from 'node:test';
import assert from 'node:assert/strict';
import {layoutLandmarkLabels,rectanglesOverlap} from '../src/landmarkLabelLayout.ts';
import {buildings} from '../src/simulation.ts';
import {spriteBounds} from '../src/spriteHit.ts';
import {CameraGesture} from '../src/camera.ts';
import {frameInspection,boundedView,unobstructedViewport,worldToScreen} from '../src/worldCamera.ts';

test('all six full-name plates fit above selected silhouettes and avoid measured desktop/mobile overlays',()=>{
 for(const size of [{width:1045,height:480},{width:390,height:415}])for(const b of buildings){
  const mobile=size.width<760,obstacles=mobile?[{x:0,y:-65,width:390,height:71},{x:14,y:125,width:362,height:220},{x:332,y:5,width:44,height:44},{x:0,y:350,width:390,height:65}]:[{x:20,y:22,width:232,height:275},{x:756,y:22,width:264,height:400}];
  const free=unobstructedViewport(size,obstacles),reserve=Math.min(26,free.height*.22),camera=new CameraGesture(),bounds=spriteBounds(b.id,b.x,b.y);
  frameInspection(camera,size,bounds,{...free,y:free.y+reserve,height:free.height-reserve*2},mobile);
  const view=boundedView(camera,size),labels=layoutLandmarkLabels(view,obstacles,b.id,null),label=labels.find(l=>l.id===b.id);
  assert.ok(label,b.id+' needs a visible name');assert.equal(label.name,b.name);assert.equal(label.emphasized,true);
  assert.ok(label.y+label.height<=worldToScreen(bounds,view).y+.5,'plate stays above the selected roof');
  for(const obstacle of obstacles)assert.equal(rectanglesOverlap(label,obstacle),false);
  for(let i=0;i<labels.length;i++)for(const other of labels.slice(i+1))assert.equal(rectanglesOverlap(labels[i],other),false);
 }
});

test('overview declutters ordinary identifiers while hovered and selected names receive priority',()=>{
 const view={width:700,height:500,scale:.1,origin:{x:350,y:250},pan:{x:0,y:0},zoom:.1,footprint:{x:-3500,y:-2500,width:7000,height:5000}};
 assert.deepEqual(layoutLandmarkLabels(view,[],null,null),[]);
 const labels=layoutLandmarkLabels(view,[],'hospital','water');
 assert.equal(labels[0].id,'hospital');assert.ok(labels.every(l=>l.emphasized));
 const covered=layoutLandmarkLabels(view,[{x:0,y:0,width:700,height:500}],null,null);assert.deepEqual(covered,[]);
});
