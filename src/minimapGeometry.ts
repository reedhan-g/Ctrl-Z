import {iso,type Point} from './geometry.ts';
import {districts,districtPolygon,landCorners,roadAxes,world,projectedBounds} from './world.ts';
import {buildings,type BuildingId} from './simulation.ts';
export const minimapBounds={x:projectedBounds.x-100,y:projectedBounds.y-100,width:projectedBounds.width+200,height:projectedBounds.height+200};
export const points=(polygon:Point[])=>polygon.map(p=>`${p.x},${p.y}`).join(' ');
export const minimapLand=points(landCorners);
export const minimapDistricts=districts.map(d=>({...d,points:points(districtPolygon(d))}));
export const minimapRoads=roadAxes.flatMap(n=>[[iso(n+.5,world.min),iso(n+.5,world.max)],[iso(world.min,n+.5),iso(world.max,n+.5)]]);
export const landmarkPoint=(id:BuildingId)=>{const b=buildings.find(b=>b.id===id)!;return iso(b.x+.9,b.y+.9);};
export const symbols:Record<BuildingId,string>={grid:'P',hospital:'H',water:'W',telecom:'T',logistics:'L',homes:'R'};

export class MinimapDrag {
 private offset:Point|null=null;
 down(point:Point,footprint:{x:number;y:number;width:number;height:number},grabFootprint:boolean):Point {
  const center={x:footprint.x+footprint.width/2,y:footprint.y+footprint.height/2};
  this.offset=grabFootprint?{x:point.x-center.x,y:point.y-center.y}:{x:0,y:0};
  return this.move(point)!;
 }
 move(point:Point):Point|null{return this.offset?{x:point.x-this.offset.x,y:point.y-this.offset.y}:null;}
 end(){this.offset=null;}
}
