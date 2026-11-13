import { iso, unproject, type Point } from './geometry.ts';
import { world } from './world.ts';
import type { CameraGesture } from './camera.ts';

export interface ViewSize {width:number;height:number}
export interface CameraView extends ViewSize {scale:number;origin:Point;pan:Point;zoom:number;footprint:{x:number;y:number;width:number;height:number}}
export const baseScale=(s:ViewSize)=>Math.max(.001,Math.min(s.width/880,s.height/650));
export const cameraOrigin=(s:ViewSize):Point=>({x:s.width/2,y:s.height*.19});
export function boundedView(camera:CameraGesture,s:ViewSize):CameraView {
 const base=baseScale(s);
 // All four inverse-projected viewport corners must remain on the finite land.
 const minimumScale=(s.width/78+s.height/40)/world.size;
 camera.minZoom=Math.max(.55,(minimumScale+1e-6)/base);
 camera.maxZoom=Math.max(2.8,camera.minZoom);
 camera.zoom=Math.min(camera.maxZoom,Math.max(camera.minZoom,camera.zoom));
 const scale=base*camera.zoom,origin=cameraOrigin(s);
 const center=unproject({x:(s.width/2-origin.x-camera.pan.x)/scale,y:(s.height/2-origin.y-camera.pan.y)/scale});
 const half=(s.width/156+s.height/80)/scale;
 const clamp=(n:number)=>Math.max(world.min+half,Math.min(world.max-half,n));
 const p=iso(clamp(center.x),clamp(center.y));
 camera.pan={x:s.width/2-origin.x-p.x*scale,y:s.height/2-origin.y-p.y*scale};
 return { ...s,scale,origin,pan:{...camera.pan},zoom:camera.zoom,
  footprint:{x:(-origin.x-camera.pan.x)/scale,y:(-origin.y-camera.pan.y)/scale,width:s.width/scale,height:s.height/scale}};
}
export const screenToWorld=(p:Point,v:CameraView):Point=>({x:(p.x-v.origin.x-v.pan.x)/v.scale,y:(p.y-v.origin.y-v.pan.y)/v.scale});
export const worldToScreen=(p:Point,v:CameraView):Point=>({x:v.origin.x+v.pan.x+p.x*v.scale,y:v.origin.y+v.pan.y+p.y*v.scale});
