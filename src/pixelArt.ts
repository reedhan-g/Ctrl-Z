import {Assets,Rectangle,Sprite,Texture} from 'pixi.js';
import {cityModels,type CityModel} from './cityModels.ts';
import {iso} from './geometry.ts';

export type CityTextures=Record<CityModel,{on:Texture;off:Texture}>&{ground:Texture;lanternGround:Texture};
let cached:Promise<CityTextures>|undefined;
export function loadCityTextures(){
 return cached??=(async()=>{
  const [atlas,ground,lanternGround]=await Promise.all([Assets.load<Texture>(new URL('./assets/city-atlas.png',import.meta.url).href),Assets.load<Texture>(new URL('./assets/street-tile.png',import.meta.url).href),Assets.load<Texture>(new URL('./assets/lantern-yard.png',import.meta.url).href)]);
  atlas.source.scaleMode='nearest';ground.source.scaleMode='nearest';lanternGround.source.scaleMode='nearest';
  return {...Object.fromEntries(Object.entries(cityModels).map(([id,m])=>{
   const frame=(i:number)=>new Texture({source:atlas.source,frame:new Rectangle(i%8*256,Math.floor(i/8)*256,256,256)});
   return [id,{on:frame(m.index),off:frame(m.index+1)}];
  })),ground,lanternGround} as CityTextures;
 })();
}
export function architecture(textures:CityTextures,id:CityModel,x:number,y:number){
 const sprite=new Sprite(textures[id].on),p=iso(x,y);
 sprite.position.set(p.x-128,p.y-140);sprite.roundPixels=true;
 return {sprite,setPowered(on:boolean){sprite.texture=textures[id][on?'on':'off'];}};
}
