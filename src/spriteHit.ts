import rows from './spriteHitRows.json' with {type:'json'};
import type {CityModel} from './cityModels.ts';
import {iso,type Point} from './geometry.ts';
import type {ViewRect} from './worldCamera.ts';

const boundsCache=new Map<CityModel,ViewRect>();
// Include the two-pixel selection outline, using the same alpha mask as picking.
export function spriteBounds(model:CityModel,x:number,y:number):ViewRect {
 let bounds=boundsCache.get(model);
 if(!bounds){const mask=rows[model],spans=mask.rows.flat();let left=256,right=0;
  for(let i=0;i<spans.length;i+=2){left=Math.min(left,spans[i]);right=Math.max(right,spans[i+1]);}
  bounds={x:left-130,y:mask.top-142,width:right-left+4,height:mask.rows.length+4};boundsCache.set(model,bounds);
 }
 const p=iso(x,y);return {...bounds,x:bounds.x+p.x,y:bounds.y+p.y};
}

// Generated from the union of lit/unlit sprite alpha. No DOM canvas readback.
export function spriteHit(model:CityModel,x:number,y:number,point:Point){
 const origin=iso(x,y),px=Math.floor(point.x-origin.x+128),py=Math.floor(point.y-origin.y+140);
 const mask=rows[model],row=mask.rows[py-mask.top];
 if(!row||px<0||px>=256)return false;
 for(let i=0;i<row.length;i+=2)if(px>=row[i]&&px<row[i+1])return true;
 return false;
}
