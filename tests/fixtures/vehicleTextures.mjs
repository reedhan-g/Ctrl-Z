import {vehicleAtlas} from '../../src/vehicleAtlas.ts';
export const vehicleTextures=()=>Object.fromEntries(Object.entries(vehicleAtlas.colors).map(([color,directions])=>[color,Object.fromEntries(Object.entries(directions).map(([direction,frames])=>[direction,Object.fromEntries(Object.entries(frames).map(([state,i])=>[state,{id:`${color}:${direction}:${state}`,frame:{x:i%8*64,y:Math.floor(i/8)*64,width:64,height:64}}]))]))]));

export const landmarkTextures=()=>Object.fromEntries(['grid','hospital','water','homes','telecom','logistics'].map(id=>[id,{id:'gold:'+id}]));
