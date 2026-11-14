import { iso, type Point } from './geometry.ts';
import { logisticsOutcome } from './logistics.ts';
import type { Snapshot } from './simulation.ts';

export const fleet=[{id:'courier-1',name:'Courier 01',offset:0,color:0xeabb69},
  {id:'courier-2',name:'Courier 02',offset:8,color:0x67dbe5},
  {id:'courier-3',name:'Courier 03',offset:17,color:0xe582c6}] as const;
export type VehicleId=typeof fleet[number]['id'];
export const vehicleRoute=[{x:4.5,y:.3},{x:4.5,y:29.5},{x:29.5,y:29.5},{x:29.5,y:-20.5},{x:-20.5,y:-20.5},{x:-20.5,y:4.5},{x:4.5,y:4.5},{x:4.5,y:.3}];
const route=vehicleRoute;
const segments=route.slice(1).map((end,i)=>({start:route[i],end,length:Math.hypot(end.x-route[i].x,end.y-route[i].y)}));
const length=segments.reduce((n,s)=>n+s.length,0);
export function vehiclePosition(id:VehicleId,s:Snapshot,visualHours=0):Point {
  const vehicle=fleet.find(v=>v.id===id)!;
  const outcome=logisticsOutcome(s);
  let distance=((outcome.dispatched/12+visualHours*outcome.capacity)*5+vehicle.offset)%length;
  for(const segment of segments){
    if(distance<=segment.length){const t=distance/segment.length;return iso(segment.start.x+(segment.end.x-segment.start.x)*t,segment.start.y+(segment.end.y-segment.start.y)*t,4);}
    distance-=segment.length;
  }
  return iso(route[0].x,route[0].y,4);
}
export function pickVehicle(point:Point,s:Snapshot,visualHours=0):VehicleId|null {
  return fleet.find(v=>{const p=vehiclePosition(v.id,s,visualHours);return Math.hypot(point.x-p.x,point.y-p.y)<16;})?.id??null;
}
