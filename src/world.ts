import { iso, type Point } from './geometry.ts';
import streetPlan from './streetPlan.json' with {type:'json'};

// The original service coordinates stay unchanged inside the expanded city.
export const world = { min: -25, max: 35, size: 60, chunkSize: 5 } as const;
export const landCorners = [iso(world.min,world.min),iso(world.max,world.min),iso(world.max,world.max),iso(world.min,world.max)];
export const projectedBounds = {x:-world.size*39,y:world.min*40,width:world.size*78,height:world.size*40};
export const streets=streetPlan;
export const roadAxes = [...new Set(streets.map(s=>s.at))];
export const isRoad = (n:number) => roadAxes.includes(Math.floor(n));
export const roadAt=(x:number,y:number)=>streets.some(s=>s.axis==='x'?x>=s.at&&x<s.at+1&&y>=s.from&&y<s.to:y>=s.at&&y<s.at+1&&x>=s.from&&x<s.to);
// East/south/west/north road edges select shared, offline rasterized ground.
export const chunkRoadMask=(x:number,y:number)=>Number(roadAt(x+4.5,y+2))*1+Number(roadAt(x+2,y+4.5))*2+Number(roadAt(x-.5,y+2))*4+Number(roadAt(x+2,y-.5))*8;
export const districts = [
 {id:'market',name:'Neon Market',x:-25,y:-25,w:30,d:30,color:0x48324e,accent:0xe582c6},
 {id:'industry',name:'Foundry Ward',x:5,y:-25,w:30,d:30,color:0x343a45,accent:0xeabb69},
 {id:'residential',name:'Maple Heights',x:-25,y:5,w:30,d:30,color:0x323547,accent:0xb494ee},
 {id:'logistics',name:'East Exchange',x:5,y:5,w:30,d:30,color:0x283c43,accent:0x67dbe5},
 {id:'civic',name:'Civic & Medical',x:0,y:0,w:10,d:10,color:0x304448,accent:0x65e4e8},
] as const;
export const districtAt=(x:number,y:number)=>[...districts].reverse().find(d=>x>=d.x&&y>=d.y&&x<d.x+d.w&&y<d.y+d.d)!;
export const districtPolygon=(d:typeof districts[number]):Point[]=>[iso(d.x,d.y),iso(d.x+d.w,d.y),iso(d.x+d.w,d.y+d.d),iso(d.x,d.y+d.d)];
export const chunks=Array.from({length:(world.size/5)**2},(_,i)=>({id:`chunk-${i}`,x:world.min+i%(world.size/5)*5,y:world.min+Math.floor(i/(world.size/5))*5}));

// Curated destination blocks occupy new land; these are places, not additional
// simulated infrastructure. Their roads/shops and open courts exist in-world.
export const places=[
 {id:'lantern',name:'Lantern Yard',x:-20,y:-20,layout:'market'},
 {id:'foundry',name:'Foundry Court',x:25,y:-20,layout:'works'},
 {id:'canal',name:'Maple Court',x:-20,y:25,layout:'housing'},
 {id:'freight',name:'Freight Square',x:25,y:25,layout:'transport'},
 {id:'passage',name:'Neon Passage',x:-20,y:0,layout:'market'},
 {id:'station',name:'Station Court',x:25,y:0,layout:'transport'},
] as const;
