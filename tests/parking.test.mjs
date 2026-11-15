import {test} from 'node:test';
import assert from 'node:assert/strict';
import {parkedCars,validParking,buildParking,parkingPoint} from '../src/parking.ts';
import {roadAt,world,streets} from '../src/world.ts';
import {cityScenery} from '../src/worldScenery.ts';
import {vehicleRoute} from '../src/traffic.ts';

test('curbside bays keep tires on designated asphalt outside moving lanes and preserve sidewalk width',()=>{
 assert.ok(parkedCars.length>=6&&parkedCars.length<=35);
 assert.equal(new Set(parkedCars.map(p=>p.id)).size,parkedCars.length);
 assert.ok(new Set(parkedCars.map(p=>p.district.id)).size>=5);
 assert.deepEqual(buildParking(),parkedCars,'placement is deterministic');
 for(const p of parkedCars){
  assert.ok(validParking(p));assert.ok(streets.includes(p.street));
  assert.equal(p.direction[0],p.street.axis==='x'?'y':'x');
  for(let x=p.footprint.x;x<=p.footprint.x+p.footprint.width;x+=.05)for(let y=p.footprint.y;y<=p.footprint.y+p.footprint.depth;y+=.05){
   assert.equal(roadAt(x,y),false,'parked body never enters through asphalt');
   assert.ok(x>=world.min&&x<=world.max&&y>=world.min&&y<=world.max);
  }
  for(const n of [.11,.3,.49])for(const a of [-.4,0,.4]){
   const point=parkingPoint(p,n,a);assert.equal(roadAt(point.x,point.y),false);
   assert.ok(n<.6&&Math.abs(a)<.49,'tires fit wholly inside the paved bay, before its curb');
  }
  assert.equal(p.walk.length,8);assert.ok(.64-.49>=.15-1e-8,'rear sidewalk does not overlap the car');
  const lane=p.street.axis==='x'?{x:p.street.at+.5,y:p.t}:{x:p.t,y:p.street.at+.5};
  assert.ok(roadAt(lane.x,lane.y));assert.ok(Math.hypot(lane.x-p.center.x,lane.y-p.center.y)>=.8-1e-8);
 }
});

test('parking omits occupied spaces and keeps junctions, crossings, services and depot approaches clear',()=>{
 const p=parkedCars[0],obstacle={...cityScenery[0],...p.envelope};
 assert.equal(validParking(p,[...cityScenery,obstacle]),false);
 assert.ok(!buildParking([...cityScenery,obstacle]).some(b=>b.id===p.id));
 assert.equal(validParking(p,cityScenery,[{x:p.center.x,y:p.center.y}]),false);
 for(const a of parkedCars)for(const b of parkedCars)if(a!==b)assert.ok(Math.hypot(a.center.x-b.center.x,a.center.y-b.center.y)>=5);
 for(const p of parkedCars)for(let i=1;i<vehicleRoute.length;i++){
  const a=vehicleRoute[i-1],b=vehicleRoute[i];
  for(let t=0;t<=1;t+=.05){const x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t;
   const dx=Math.max(p.footprint.x-x,0,x-p.footprint.x-p.footprint.width),dy=Math.max(p.footprint.y-y,0,y-p.footprint.y-p.footprint.depth);
   assert.ok(Math.hypot(dx,dy)>.55,'courier lane and turning envelope stay clear');
  }
 }
});
