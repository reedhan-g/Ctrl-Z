import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cityScenery} from '../src/worldScenery.ts';
import {findScenery,sceneryInfo} from '../src/sceneryInfo.ts';

test('every inspectable scenery parcel has accurate informational identity without simulation statistics',()=>{
 for(const b of cityScenery){
  const info=sceneryInfo(b);assert.equal(findScenery(b.id),b);
  assert.ok(info.name&&info.category&&info.purpose);assert.equal(info.district,b.district.name);
  assert.equal(info.simulated,false);assert.ok(!('capacity' in info));assert.ok(!('reserve' in info));
 }
 assert.equal(findScenery('unknown'),undefined);
 assert.equal(sceneryInfo(findScenery('scenery:-17.65:-17.7')).name,'Lantern Café');
});
