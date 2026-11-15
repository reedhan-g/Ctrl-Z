import {Sprite,type Texture} from 'pixi.js';
import {iso} from './geometry.ts';
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
