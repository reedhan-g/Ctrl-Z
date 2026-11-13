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
 const h=height??(district.id==='industry'?24+hash%38:district.id==='residential'?55+hash%80:36+hash%125);
 const faces=prismFaces(x+.08,y+.08,1.65,1.65,h);
 scenery.push({id:`scenery:${x}:${y}`,x:x+.08,y:y+.08,width:1.65,depth:1.65,height:h,variant,district,faces,bounds:boundsOf(faces.flat(),12)});
}
for(let x=world.min;x<world.max;x+=5)for(let y=world.min;y<world.max;y+=5)
 for(const dx of [0,2])for(const dy of [0,2]){const a=x+dx,b=y+dy;if(a>=0&&a<10&&b>=0&&b<10)continue;add(a,b);}
for(const [x,y,h] of [[0,0,27],[8,0,55],[0,8,31],[8,8,35],[6,8,29],[8,6,44],[2,0,24],[0,2,27]])add(x,y,h);
export const cityScenery:readonly Scenery[]=scenery;
export const groundPolygon=(x:number,y:number,size:number)=>prismFaces(x,y,size,size,0)[2];
export const polygonNumbers=(p:Point[])=>flatten(p);
