import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {registerHooks} from 'node:module';
import {vehicleAtlas,vehicleDirections} from '../src/vehicleAtlas.ts';
import {vehicleTextures} from './fixtures/vehicleTextures.mjs';
import {iso} from '../src/geometry.ts';

const hooks=registerHooks({resolve(specifier,context,next){return specifier==='pixi.js'?{url:new URL('./fixtures/pixi.mjs',import.meta.url).href,shortCircuit:true}:next(specifier,context);}});
const {vehicleSprite}=await import('../src/vehicleArt.ts');
const {stats}=await import('./fixtures/pixi.mjs');hooks.deregister();

test('vehicle metadata covers distinct color/direction/light frames within the committed atlas',()=>{
 const png=readFileSync(new URL('../src/assets/vehicle-atlas.png',import.meta.url));
 assert.equal(png.readUInt32BE(16),vehicleAtlas.columns*vehicleAtlas.frameSize);
 assert.equal(png.readUInt32BE(20),vehicleAtlas.rows*vehicleAtlas.frameSize);
 const indices=Object.values(vehicleAtlas.colors).flatMap(d=>Object.values(d).flatMap(f=>[f.on,f.off]));
 assert.deepEqual([...indices].sort((a,b)=>a-b),Array.from({length:24},(_,i)=>i));
});

test('direction changes retain sprite identity, lighting state and centered ground contact',()=>{
 const textures=vehicleTextures(),p=iso(4.5,8.5);
 for(const color of Object.keys(textures)){
  const art=vehicleSprite(textures,color,'y+',4.5,8.5),created=stats.created;
  const position={x:art.sprite.x,y:art.sprite.y};
  assert.deepEqual(position,{x:p.x-32,y:p.y-40});assert.equal(art.sprite.roundPixels,true);
  for(const direction of vehicleDirections){
   art.setDirection(direction);assert.equal(art.sprite.texture,textures[color][direction].on);
   art.setPowered(false);assert.equal(art.sprite.texture,textures[color][direction].off);
   assert.deepEqual({x:art.sprite.x,y:art.sprite.y},position);art.setPowered(true);
  }
  assert.equal(stats.created,created);art.sprite.destroy();
 }
 const moving=vehicleSprite(textures,'amber','x+',0,0,4);
 assert.equal(moving.sprite.y,-36,'existing z=4 pose cancels at the wheel contact plane');moving.sprite.destroy();
});
