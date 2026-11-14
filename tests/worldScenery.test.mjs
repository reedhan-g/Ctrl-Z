import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cityScenery} from '../src/worldScenery.ts';
import {buildings} from '../src/simulation.ts';
import {roadAxes,chunks,places,world} from '../src/world.ts';
test('dense scenery has stable unique coordinates, varied districts and no service footprint collisions',()=>{
 assert.ok(cityScenery.length<chunks.length*2.1,'street composition takes priority over building count');
 assert.ok(cityScenery.filter(b=>b.height>100).length<cityScenery.length/4,'tall silhouettes remain occasional');
 assert.ok(new Set(cityScenery.map(b=>b.model)).size>=8,'districts need meaningful architectural variety');
 assert.equal(new Set(cityScenery.map(b=>b.id)).size,cityScenery.length);
 assert.equal(new Set(cityScenery.map(b=>b.district.id)).size,5);
 assert.equal(new Set(cityScenery.map(b=>b.variant)).size,4);
 for(const b of cityScenery)for(const service of buildings)
  assert.ok(!(b.x<service.x+1.9&&b.x+b.width>service.x&&b.y<service.y+1.9&&b.y+b.depth>service.y),`${b.id} overlaps ${service.id}`);
 for(const b of cityScenery)for(const axis of roadAxes){
  assert.ok(!(b.x<axis+1&&b.x+b.width>axis),`${b.id} obstructs x road ${axis}`);
  assert.ok(!(b.y<axis+1&&b.y+b.depth>axis),`${b.id} obstructs y road ${axis}`);
 }
 for(let i=0;i<cityScenery.length;i++)for(const b of cityScenery.slice(i+1)){
  const a=cityScenery[i];assert.ok(!(a.x<b.x+b.width&&a.x+a.width>b.x&&a.y<b.y+b.depth&&a.y+a.depth>b.y),`${a.id} overlaps ${b.id}`);
 }
});

test('new outer destinations have distinct composed parcels inside useful expanded land',()=>{
 assert.equal(places.length,6);assert.ok(places.every(p=>p.x< -15||p.x>=25||p.y>=25));
 const counts=places.map(p=>cityScenery.filter(b=>b.x>=p.x&&b.x<p.x+5&&b.y>=p.y&&b.y<p.y+5).length);
 assert.ok(new Set(counts).size>=3,'market yards, works courts and transport blocks need different composition');
 for(const b of cityScenery)assert.ok(b.x>=world.min&&b.y>=world.min&&b.x+b.width<=world.max&&b.y+b.depth<=world.max);
});
