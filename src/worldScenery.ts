import { buildings } from './simulation.ts';
import {world,districtAt,places} from './world.ts';
import {iso,prismFaces,flatten,type Point} from './geometry.ts';
import {cityModels,type CityModel} from './cityModels.ts';
import {lanternYard} from './lanternYard.ts';
import {neighborhoodBlocks} from './neighborhoods.ts';

export interface Rect {x:number;y:number;width:number;height:number}
export interface Scenery {id:string;x:number;y:number;width:number;depth:number;height:number;variant:number;model:CityModel;district:ReturnType<typeof districtAt>;faces:Point[][];bounds:Rect}
export const sceneryDepth=(b:Scenery)=>(b.x+b.y+(b.width+b.depth)/2)*100;
export function boundsOf(points:Point[],margin=0):Rect {
 const xs=points.map(p=>p.x),ys=points.map(p=>p.y);
 const x=Math.min(...xs)-margin,y=Math.min(...ys)-margin;
 return {x,y,width:Math.max(...xs)-x+margin,height:Math.max(...ys)-y+margin};
}
export const intersects=(a:Rect,b:Rect,margin=0)=>a.x+a.width>=b.x-margin&&a.x<=b.x+b.width+margin&&a.y+a.height>=b.y-margin&&a.y<=b.y+b.height+margin;
const scenery:Scenery[]=[];
function add(x:number,y:number,chosen?:CityModel){
 const district=districtAt(x,y),blockX=Math.floor(x/5),blockY=Math.floor(y/5),variant=((blockX*3+blockY*5+Math.floor((x-blockX*5)*2))%4+4)%4;
 const choices:Record<string,CityModel[]>={market:['market','noodle','cinema','arcade'],industry:['workshop','warehouse','studio','workshop'],residential:['walkup','cafe','apartments','walkup'],logistics:['warehouse','workshop','cafe','studio'],civic:['cafe','market','studio','walkup']};
 const model=chosen??choices[district.id][variant],m=cityModels[model];
 if(buildings.some(b=>x<b.x+2.1&&x+m.width>b.x-.1&&y<b.y+2.1&&y+m.depth>b.y-.1))return;
 // Preserve an open approach around service frontages, not a wall of decoration.
 const faces=prismFaces(x,y,m.width,m.depth,m.height);
 scenery.push({id:`scenery:${x}:${y}`,x,y,width:m.width,depth:m.depth,height:m.height,variant,model,district,faces,bounds:boundsOf(faces.flat(),40)});
}
// Two composed parcels per block leave a service alley/courtyard instead of
// filling all four lots. Low frontages keep the diagonal street sightline open.
for(let x:number=world.min;x<world.max;x+=5)for(let y:number=world.min;y<world.max;y+=5)
 {const layout=((x/5+y/5)%3+3)%3;
  const place=places.find(p=>p.x===x&&p.y===y);
  if(x===lanternYard.x&&y===lanternYard.y){
   lanternYard.parcels.forEach(p=>add(p.x,p.y,p.model));continue;
  }
  const authored=neighborhoodBlocks.find(b=>b.x===x&&b.y===y);
  if(authored){
   add(x+.30,y+.30,authored.rear);
   const front=cityModels[authored.front];add(x+3.55-front.width,y+3.55-front.depth,authored.front);continue;
  }
  if(place){
   const models:Record<typeof place.layout,CityModel[]>={market:['market','noodle','cafe'],works:['workshop'],housing:['walkup','cafe'],transport:['warehouse','cafe']};
   const m=models[place.layout];add(x+.15,y+.15,m[0]);
   if(m[1])add(x+2.1,y+2.1,m[1]);if(m[2])add(x+2.1,y+.15,m[2]);continue;
  }
  const parcels=layout===0?[[.15,.15],[2.1,2.1]]:layout===1?[[.15,1.85],[2.1,.15]]:[[1.85,.15],[.15,2.1]];
  parcels.forEach(([dx,dy],i)=>{const a=x+dx,b=y+dy;if(a>=0&&a<10&&b>=0&&b<10)return;
   add(a,b,i===1?(['noodle','walkup','cafe'] as const)[layout]:undefined);});
 }
// The narrow strips beside core services are courtyards, not undersized lots
// with buildings spilling across road 9. Keep the service approaches open.
for(const [x,y,model] of [[0,0,'market'],[2,0,'arcade'],[0,2,'walkup']] as const)add(x,y,model);
export const cityScenery:readonly Scenery[]=scenery;
export const groundPolygon=(x:number,y:number,size:number)=>prismFaces(x,y,size,size,0)[2];
export const polygonNumbers=(p:Point[])=>flatten(p);
