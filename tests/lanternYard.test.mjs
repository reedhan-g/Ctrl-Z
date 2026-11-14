import {test} from 'node:test';
import assert from 'node:assert/strict';
import {lanternYard} from '../src/lanternYard.ts';
import {cityScenery} from '../src/worldScenery.ts';
import {cityModels} from '../src/cityModels.ts';
import {roadAxes} from '../src/world.ts';

test('Lantern Yard frontages leave continuous sidewalks, thresholds and a usable court',()=>{
  const parcels=cityScenery.filter(b=>b.x>=-20&&b.x< -15&&b.y>=-20&&b.y< -15);
  assert.deepEqual(parcels.map(b=>b.model),['yardHouse','lanternNoodles','lanternCafe']);
  for(const b of parcels){
    assert.ok(b.x+b.width<=-16.45+1e-9);
    assert.ok(b.y+b.depth<=-16.45+1e-9);
    const c=lanternYard.court;
    assert.ok(!(b.x<c.x+c.width&&b.x+b.width>c.x&&b.y<c.y+c.depth&&b.y+b.depth>c.y));
  }
  const house=parcels[0],shop=parcels[1],cafe=parcels[2];
  assert.ok(shop.x-house.x-house.width>=.35-1e-9,'court has a connected side passage');
  assert.ok(cafe.y-shop.y-shop.depth>=.45-1e-9,'cross-passage connects to the sidewalk');
  assert.ok(house.height>shop.height&&shop.height>cafe.height,'low corner leaves rear architecture visible');
  for(const p of lanternYard.parcels){
    const m=cityModels[p.model];
    if(p.entrance!=='+y')assert.ok(roadAxes.some(x=>Math.abs(x-(p.x+m.width))<.5));
    if(p.entrance==='corner')assert.ok(roadAxes.some(y=>Math.abs(y-(p.y+m.depth))<.5));
  }
});
