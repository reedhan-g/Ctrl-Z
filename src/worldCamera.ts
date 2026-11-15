import { iso, unproject, type Point } from './geometry.ts';
import { world } from './world.ts';
import type { CameraGesture } from './camera.ts';

export interface ViewSize {width:number;height:number}
export interface CameraView extends ViewSize {scale:number;origin:Point;pan:Point;zoom:number;footprint:{x:number;y:number;width:number;height:number}}
// Ordinary exploration shows architecture; the existing zoom-out controls
// remain the overview. Do not fit the entire expanded world into the opening.
export const baseScale=(s:ViewSize)=>Math.max(.001,Math.min(s.width/650,s.height/480));
export const cameraOrigin=(s:ViewSize):Point=>({x:s.width/2,y:s.height*.19});
// Present the authored civic crossroads away from the desktop minimap, with
// room above the timeline. Gesture reset and minimap Home share this framing.
export function frameOpening(camera:CameraGesture,s:ViewSize){
 camera.reset();
 camera.focus(iso(4.5,4.5),cameraOrigin(s),{x:s.width*(s.width<=760?.5:.58),y:s.height*(s.width<=760?.59:.68)},baseScale(s));
}
// A selected edge building may need sky/ground margin around its roof. Extend
// the finite center range only as far as that authored selection requires.
export function frameInspection(camera:CameraGesture,s:ViewSize,point:Point,mobile:boolean,scenery=false){
 camera.zoom=Math.max(camera.zoom,mobile?1.5:scenery?1.2:1);
 const scale=baseScale(s)*camera.zoom,origin=cameraOrigin(s);
 camera.focus(point,origin,{x:s.width*(mobile?.5:.34),y:mobile?95:s.height*.38},scale);
 camera.inspectionCenter=unproject({x:(s.width/2-origin.x-camera.pan.x)/scale,y:(s.height/2-origin.y-camera.pan.y)/scale});
}
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
 const clamp=(n:number,anchor:number|undefined)=>Math.max(Math.min(world.min+half,anchor??Infinity),Math.min(Math.max(world.max-half,anchor??-Infinity),n));
 const p=iso(clamp(center.x,camera.inspectionCenter?.x),clamp(center.y,camera.inspectionCenter?.y));
 camera.pan={x:s.width/2-origin.x-p.x*scale,y:s.height/2-origin.y-p.y*scale};
 return { ...s,scale,origin,pan:{...camera.pan},zoom:camera.zoom,
  footprint:{x:(-origin.x-camera.pan.x)/scale,y:(-origin.y-camera.pan.y)/scale,width:s.width/scale,height:s.height/scale}};
}
export const screenToWorld=(p:Point,v:CameraView):Point=>({x:(p.x-v.origin.x-v.pan.x)/v.scale,y:(p.y-v.origin.y-v.pan.y)/v.scale});
export const worldToScreen=(p:Point,v:CameraView):Point=>({x:v.origin.x+v.pan.x+p.x*v.scale,y:v.origin.y+v.pan.y+p.y*v.scale});
