import {streets,world,roadAt,districtAt,places,chunkRoadMask} from './world.ts';
import {cityScenery} from './worldScenery.ts';
import {buildings} from './simulation.ts';
import type {Point} from './geometry.ts';
import type {VehicleDirection} from './vehicleAtlas.ts';

export interface GroundRect {x:number;y:number;width:number;depth:number}
export interface ParkingSpace {
 id:string;street:typeof streets[number];side:number;t:number;center:Point;
 direction:VehicleDirection;footprint:GroundRect;envelope:GroundRect;
 surface:Point[];walk:Point[];district:ReturnType<typeof districtAt>;
}
const overlaps=(a:GroundRect,b:GroundRect,margin=0)=>a.x<b.x+b.width+margin&&a.x+a.width>b.x-margin&&a.y<b.y+b.depth+margin&&a.y+a.depth>b.y-margin;
const rect=(points:Point[]):GroundRect=>{const xs=points.map(p=>p.x),ys=points.map(p=>p.y),x=Math.min(...xs),y=Math.min(...ys);return {x,y,width:Math.max(...xs)-x,depth:Math.max(...ys)-y};};
// n measures outward from the actual asphalt edge; t follows its road axis.
export function parkingPoint(p:Pick<ParkingSpace,'street'|'side'|'t'>,n:number,along=0):Point {
 const edge=p.street.at+(p.side>0?1:0),cross=edge+p.side*n;
 return p.street.axis==='x'?{x:cross,y:p.t+along}:{x:p.t+along,y:cross};
}
export function parkingCandidate(street:typeof streets[number],side:number,t:number):ParkingSpace {
 const base={street,side,t},center=parkingPoint(base,.3),point=(n:number,a:number)=>parkingPoint(base,n,a);
 const surface=[point(0,-.59),point(.5,-.59),point(.6,-.49),point(.6,.49),point(.5,.59),point(0,.59)];
 // Continuous .28-tile sidewalk detours behind the inset parking pocket.
 const walk=[point(0,-.8),point(.64,-.59),point(.64,.59),point(0,.8),point(.28,.8),point(.92,.59),point(.92,-.59),point(.28,-.8)];
 const envelope=rect([point(0,-.8),point(.94,.8)]),alongX=street.axis==='y';
 return {...base,id:`parking:${street.axis}:${street.at}:${side}:${t}`,center,surface,walk,envelope,
  direction:street.axis==='x'?(side<0?'y+':'y-'):(side<0?'x-':'x+'),
  footprint:{x:center.x-(alongX?.4:.19),y:center.y-(alongX?.19:.4),width:alongX?.8:.38,depth:alongX?.38:.8},district:districtAt(center.x,center.y)};
}
function landscaped(x:number,y:number){
 const cx=Math.floor(x/5)*5,cy=Math.floor(y/5)*5,mask=chunkRoadMask(cx,cy),a=x-cx,b=y-cy;
 return (!(mask&1)&&a>=4.12&&a<=4.8&&b>=.35&&b<=3.55)||(!(mask&2)&&b>=4.12&&b<=4.8&&a>=.35&&a<=3.55);
}
export function validParking(p:ParkingSpace,scenery=cityScenery,services:readonly {x:number;y:number}[]=buildings){
 const r=p.envelope,s=p.street;
 if(r.x<world.min+.05||r.y<world.min+.05||r.x+r.width>world.max-.05||r.y+r.depth>world.max-.05)return false;
 if(scenery.some(b=>overlaps(r,b,.12))||services.some(b=>overlaps(r,{x:b.x-1.25,y:b.y-1.25,width:4.4,depth:4.4})))return false;
 // Authored destination courts, loading/emergency access and pedestrian yards
 // are never repurposed as parking simply because their ground looks empty.
 if(places.some(b=>overlaps(r,{x:b.x,y:b.y,width:4,depth:4})))return false;
 const longMin=p.t-.4,longMax=p.t+.4;
 for(const other of streets)if(other.axis!==s.axis&&(s.axis==='x'?r.x<other.to+.2&&r.x+r.width>other.from-.2:r.y<other.to+.2&&r.y+r.depth>other.from-.2)){
  if(longMax>other.at-1.15&&longMin<other.at+1.5)return false;
 }
 // Factories/depots have vehicle access across their paved frontage.
 for(const b of scenery)if(b.model==='workshop'||b.model==='warehouse'){
  const access=s.axis==='x'?{x:b.x+b.width,y:b.y,width:3,depth:b.depth}:{x:b.x,y:b.y+b.depth,width:b.width,depth:3};
  if(overlaps(r,access,.15))return false;
 }
 for(let a=-.8;a<=.8001;a+=.1){
  const x=s.axis==='x'?s.at+.5:p.t+a,y=s.axis==='x'?p.t+a:s.at+.5;
  if(!roadAt(x,y))return false;
 }
 for(let x=r.x;x<=r.x+r.width+.001;x+=.08)for(let y=r.y;y<=r.y+r.depth+.001;y+=.08){
  if(landscaped(x,y))return false;
  const cx=Math.floor(x/5)*5,cy=Math.floor(y/5)*5;
  if(overlaps({x,y,width:.08,depth:.08},{x:cx+3.64,y:cy+3.64,width:.42,depth:.42})||overlaps({x,y,width:.08,depth:.08},{x:cx+3.36,y:cy+3.36,width:.32,depth:.32}))return false;
 }
 return true;
}
export function buildParking(scenery=cityScenery,services:readonly {x:number;y:number}[]=buildings){
 const result:ParkingSpace[]=[],counts:Record<string,number>={};
 const quotas:Record<string,number>={market:10,residential:10,civic:2,industry:4,utility:3,logistics:5};
 for(const street of streets)for(let t=street.from+1;t<street.to-1;t+=.25)for(const side of [-1,1]){
  const p=parkingCandidate(street,side,t);
  if(!p.district||(counts[p.district.id]??0)>=quotas[p.district.id]||result.some(b=>Math.hypot(b.center.x-p.center.x,b.center.y-p.center.y)<5)||!validParking(p,scenery,services))continue;
  result.push(p);counts[p.district.id]=(counts[p.district.id]??0)+1;
 }
 return result;
}
export const parkedCars=buildParking();
