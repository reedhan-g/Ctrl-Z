import {buildings,type BuildingId} from './simulation.ts';
import {spriteBounds} from './spriteHit.ts';
import {worldToScreen,type CameraView,type ViewRect} from './worldCamera.ts';

export interface LandmarkLabel extends ViewRect {id:BuildingId;name:string;emphasized:boolean;selected:boolean}
export const rectanglesOverlap=(a:ViewRect,b:ViewRect,margin=0)=>a.x<b.x+b.width+margin&&a.x+a.width>b.x-margin&&a.y<b.y+b.height+margin&&a.y+a.height>b.y-margin;
// CSS-pixel plates retain legible type at every DPR and camera scale. Important
// names get first choice; ordinary identifiers disappear rather than collide.
export function layoutLandmarkLabels(view:CameraView,obstacles:ViewRect[],selected:BuildingId|null,hovered:BuildingId|null):LandmarkLabel[]{
 const placed:LandmarkLabel[]=[];
 const priority=(id:BuildingId)=>id===selected?0:id===hovered?1:2;
 for(const b of [...buildings].sort((a,b)=>priority(a.id)-priority(b.id))){
  const emphasized=b.id===selected||b.id===hovered;
  if(!emphasized&&view.scale<.55)continue;
  const bounds=spriteBounds(b.id,b.x,b.y),top=worldToScreen(bounds,view),bottom=worldToScreen({x:bounds.x+bounds.width,y:bounds.y+bounds.height},view);
  if(bottom.x<0||top.x>view.width||bottom.y<0||top.y>view.height)continue;
  const width=Math.ceil(b.name.length*(emphasized?8.5:7.3)+18),height=emphasized?26:22;
  const center=(top.x+bottom.x)/2,above=top.y-height-5;
  const candidates=[0,-width*.25,width*.25,-width*.55,width*.55].map(offset=>({x:Math.round(center-width/2+offset),y:Math.round(above),width,height}));
  if(emphasized)for(const shift of [0,3,6])candidates.push({x:Math.round(Math.max(4,Math.min(view.width-width-4,center-width/2))),y:Math.max(4,Math.min(Math.floor(top.y-height),Math.round(above+shift))),width,height});
  const position=candidates.find(p=>p.x>=4&&p.y>=4&&p.x+p.width<=view.width-4&&p.y+p.height<=view.height-4&&!obstacles.some(o=>rectanglesOverlap(p,o,emphasized?1:4))&&!placed.some(o=>rectanglesOverlap(p,o,6)));
  if(position)placed.push({...position,id:b.id,name:b.name,emphasized,selected:b.id===selected});
 }
 return placed;
}
