import { buildings } from './simulation.ts';
import {world,districtAt} from './world.ts';
import {iso,prismFaces,flatten,type Point} from './geometry.ts';

export interface Rect {x:number;y:number;width:number;height:number}
export interface Scenery {id:string;x:number;y:number;width:number;depth:number;height:number;variant:number;district:ReturnType<typeof districtAt>;faces:Point[][];bounds:Rect}
export function boundsOf(points:Point[],margin=0):Rect {
 const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
 const x=Math.min(...xs)-margin,y=Math.min(...ys)-margin;
 return {x,y,width:Math.max(...xs)-x+margin,height:Math.max(...ys)-y+margin};
}
export const intersects=(a:Rect,b:Rect,margin=0)=>a.x+a.width>=b.x-margin&&a.x<=b.x+b.width+margin&&a.y+a.height>=b.y-margin&&a.y<=b.y+b.height+margin;
const scenery:Scenery[]=[];
function add(x:number,y:number,height?:number){
 if(buildings.some(b=>x<b.x+2&&x+1.8>b.x&&y<b.y+2&&y+1.8>b.y))return;
 const hash=((x+30)*73856093^(y+30)*19349663)>>>0,variant=hash%4,district=districtAt(x,y);
 const h=height??(district.id==='industry'?24+hash%20:district.id==='residential'?48+hash%30:40+hash%40);
 const faces=prismFaces(x+.08,y+.08,1.65,1.65,h);
 scenery.push({id:`scenery:${x}:${y}`,x:x+.08,y:y+.08,width:1.65,depth:1.65,height:h,variant,district,faces,bounds:boundsOf(faces.flat(),12)});
}
// Two composed parcels per block leave a service alley/courtyard instead of
// filling all four lots. Low frontages keep the diagonal street sightline open.
for(let x=world.min;x<world.max;x+=5)for(let y=world.min;y<world.max;y+=5)
 for(const [dx,dy] of [[.15,.15],[2.1,1.9]]){const a=x+dx,b=y+dy;if(a>=0&&a<10&&b>=0&&b<10)continue;add(a,b);}
for(const [x,y,h] of [[0,0,40],[8,0,44],[0,8,34],[8,8,25],[6,8,28],[8,6,30],[2,0,32],[0,2,37]])add(x,y,h);
export const cityScenery:readonly Scenery[]=scenery;
export const groundPolygon=(x:number,y:number,size:number)=>prismFaces(x,y,size,size,0)[2];
export const polygonNumbers=(p:Point[])=>flatten(p);
