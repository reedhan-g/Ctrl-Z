import rows from './spriteHitRows.json' with {type:'json'};
import type {CityModel} from './cityModels.ts';
import {iso,type Point} from './geometry.ts';

// Generated from the union of lit/unlit sprite alpha. No DOM canvas readback.
export function spriteHit(model:CityModel,x:number,y:number,point:Point){
 const origin=iso(x,y),px=Math.floor(point.x-origin.x+128),py=Math.floor(point.y-origin.y+140);
 const mask=rows[model],row=mask.rows[py-mask.top];
 if(!row||px<0||px>=256)return false;
 for(let i=0;i<row.length;i+=2)if(px>=row[i]&&px<row[i+1])return true;
 return false;
}
