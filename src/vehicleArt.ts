import {Sprite,type Texture,type Graphics} from 'pixi.js';
import {iso,prismFaces,flatten} from './geometry.ts';
import {vehicleAtlas,type VehicleColor,type VehicleDirection} from './vehicleAtlas.ts';

export type VehicleTextures=Record<VehicleColor,Record<VehicleDirection,{on:Texture;off:Texture}>>;

// Directional frames share a centered road-contact origin. Moving poses retain
// their existing z=4 point; groundLift cancels that lift for the wheels.
export function vehicleSprite(textures:VehicleTextures,color:VehicleColor,direction:VehicleDirection,x:number,y:number,groundLift=0){
 let facing=direction,powered=true;
 const sprite=new Sprite(textures[color][facing].on),point=iso(x,y);
 sprite.position.set(point.x-vehicleAtlas.origin.x,point.y-vehicleAtlas.origin.y+groundLift);
 sprite.roundPixels=true;
 const apply=()=>{sprite.texture=textures[color][facing][powered?'on':'off'];};
 return {sprite,get direction(){return facing;},setDirection(next:VehicleDirection){if(next!==facing){facing=next;apply();}},setPowered(on:boolean){if(on!==powered){powered=on;apply();}}};
}

// Geometry-only scene fallback follows the same world axes and cabin offset.
export function drawVehicleFallback(g:Graphics,color:number,direction:VehicleDirection){
 const alongX=direction[0]==='x',sign=direction[1]==='+'?1:-1;
 const width=alongX?.8:.38,depth=alongX?.38:.8;
 g.clear();
 prismFaces(-width/2,-depth/2,width,depth,9,3).forEach((face,i)=>g.poly(flatten(face)).fill([color,0x344456,color][i]));
 const cx=alongX?-.07*sign:0,cy=alongX?0:-.07*sign,w=alongX?.35:.34,d=alongX?.34:.35;
 prismFaces(cx-w/2,cy-d/2,w,d,15,9).forEach((face,i)=>g.poly(flatten(face)).fill([0x496573,0x314c5b,color][i]));
 for(const side of [-.12,.12]){const p=iso(alongX?.401:side,alongX?side:.401,6);g.circle(p.x,p.y,1.5).fill(sign>0?0xfff0b0:0xf08783);}
}
