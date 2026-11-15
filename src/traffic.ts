import { iso, type Point } from './geometry.ts';
import { logisticsOutcome } from './logistics.ts';
import {buildings,type Snapshot } from './simulation.ts';
import type {VehicleDirection} from './vehicleAtlas.ts';

export const fleet=[{id:'courier-1',name:'Courier 01',offset:0,color:0xeabb69,art:'amber'},
  {id:'courier-2',name:'Courier 02',offset:8,color:0x67dbe5,art:'cyan'},
  {id:'courier-3',name:'Courier 03',offset:17,color:0xe582c6,art:'pink'}] as const;
export type VehicleId=typeof fleet[number]['id'];
// Dispatch exits the hub's east loading frontage onto the east arterial.
const hub=buildings.find(b=>b.id==='logistics')!;
const dispatchGate={x:hub.x+2.85,y:hub.y+.95};
export const vehicleRoute=[dispatchGate,{x:29.5,y:29.5},{x:-20.5,y:29.5},{x:-20.5,y:4.5},{x:4.5,y:4.5},{x:4.5,y:-20.5},{x:29.5,y:-20.5},dispatchGate];
const route=vehicleRoute;
const segments=route.slice(1).map((end,i)=>({start:route[i],end,length:Math.hypot(end.x-route[i].x,end.y-route[i].y)}));
const length=segments.reduce((n,s)=>n+s.length,0);
export interface VehiclePose {point:Point;tile:Point;direction:VehicleDirection;segment:number}
// Both pose fields come from one route sample. At a vertex use the outgoing
// segment, even if rounded screen coordinates have not changed yet.
export function routePose(distance:number):VehiclePose {
 let remaining=distance%length;if(remaining<0)remaining+=length;
 let start=0;
 for(let i=0;i<segments.length;i++){
  const segment=segments[i],end=start+segment.length;
  if(remaining<end){
   const t=(remaining-start)/segment.length,dx=segment.end.x-segment.start.x,dy=segment.end.y-segment.start.y;
   const tile={x:segment.start.x+dx*t,y:segment.start.y+dy*t};
   const direction:VehicleDirection=dx?(dx>0?'x+':'x-'):(dy>0?'y+':'y-');
   return {tile,point:iso(tile.x,tile.y,4),direction,segment:i};
  }
  start=end;
 }
 return routePose(0);
}
export function vehiclePose(id:VehicleId,s:Snapshot,visualHours=0):VehiclePose {
 const vehicle=fleet.find(v=>v.id===id)!,outcome=logisticsOutcome(s);
 return routePose((outcome.dispatched/12+visualHours*outcome.capacity)*5+vehicle.offset);
}
// Preserve the existing minimap, camera and picking API and its z=4 point.
export const vehiclePosition=(id:VehicleId,s:Snapshot,visualHours=0):Point=>vehiclePose(id,s,visualHours).point;
export function pickVehicle(point:Point,s:Snapshot,visualHours=0):VehicleId|null {
  return fleet.find(v=>{const p=vehiclePosition(v.id,s,visualHours);return Math.hypot(point.x-p.x,point.y-p.y)<16;})?.id??null;
}
