import {Assets,Rectangle,Sprite,Texture} from 'pixi.js';
import {cityModels,type CityModel} from './cityModels.ts';
import {iso} from './geometry.ts';
import {vehicleAtlas} from './vehicleAtlas.ts';
import type {VehicleTextures} from './vehicleArt.ts';

export type CityTextures=Record<CityModel,{on:Texture;off:Texture;highlight:Texture}>&{ground:Texture;lanternGround:Texture;grounds:{on:Texture;off:Texture}[];vehicles:VehicleTextures};
let cached:Promise<CityTextures>|undefined;
export function loadCityTextures(){
 return cached??=(async()=>{
  const [atlas,ground,lanternGround]=await Promise.all([Assets.load<Texture>(new URL('./assets/city-atlas.png',import.meta.url).href),Assets.load<Texture>(new URL('./assets/street-tile.png',import.meta.url).href),Assets.load<Texture>(new URL('./assets/lantern-yard.png',import.meta.url).href)]);
  atlas.source.scaleMode='nearest';ground.source.scaleMode='nearest';lanternGround.source.scaleMode='nearest';
  const streets=await Assets.load<Texture>(new URL('./assets/street-atlas.png',import.meta.url).href);streets.source.scaleMode='nearest';
  const outlines=await Assets.load<Texture>(new URL('./assets/selection-atlas.png',import.meta.url).href);outlines.source.scaleMode='nearest';
  const groundFrame=(i:number)=>new Texture({source:streets.source,frame:new Rectangle(i%4*512,Math.floor(i/4)*256,400,224)});
  const grounds=Array.from({length:16},(_,i)=>({on:groundFrame(i),off:groundFrame(i+16)}));
  const cars=await Assets.load<Texture>(new URL('./assets/vehicle-atlas.png',import.meta.url).href);cars.source.scaleMode='nearest';
  const carFrame=(i:number)=>new Texture({source:cars.source,frame:new Rectangle(i%vehicleAtlas.columns*vehicleAtlas.frameSize,Math.floor(i/vehicleAtlas.columns)*vehicleAtlas.frameSize,vehicleAtlas.frameSize,vehicleAtlas.frameSize)});
  const vehicles=Object.fromEntries(Object.entries(vehicleAtlas.colors).map(([color,directions])=>[color,Object.fromEntries(Object.entries(directions).map(([direction,frames])=>[direction,{on:carFrame(frames.on),off:carFrame(frames.off)}]))])) as VehicleTextures;
  return {...Object.fromEntries(Object.entries(cityModels).map(([id,m])=>{
   const frame=(i:number)=>new Texture({source:atlas.source,frame:new Rectangle(i%8*256,Math.floor(i/8)*256,256,256)});
   const i=m.index/2,highlight=new Texture({source:outlines.source,frame:new Rectangle(i%8*256,Math.floor(i/8)*256,256,256)});
   return [id,{on:frame(m.index),off:frame(m.index+1),highlight}];
  })),ground,lanternGround,grounds,vehicles} as CityTextures;
 })();
}
export function architecture(textures:CityTextures,id:CityModel,x:number,y:number){
 const sprite=new Sprite(textures[id].on),p=iso(x,y);
 sprite.position.set(p.x-128,p.y-140);sprite.roundPixels=true;
 return {sprite,setPowered(on:boolean){sprite.texture=textures[id][on?'on':'off'];}};
}
export function highlightSprite(textures:CityTextures,id:CityModel,x:number,y:number){
 const sprite=new Sprite(textures[id].highlight),p=iso(x,y);
 sprite.position.set(p.x-128,p.y-140);sprite.roundPixels=true;sprite.visible=false;
 return sprite;
}
