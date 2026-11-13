import { iso, type Point } from './geometry.ts';

// The original service coordinates stay unchanged inside the expanded city.
export const world = { min: -15, max: 25, size: 40, chunkSize: 5 } as const;
export const landCorners = [iso(-15,-15),iso(25,-15),iso(25,25),iso(-15,25)];
export const projectedBounds = {x:-1560,y:-600,width:3120,height:1600};
export const roadAxes = Array.from({length:8},(_,i)=>world.min+i*5+4);
export const isRoad = (n:number) => roadAxes.includes(Math.floor(n));
export const districts = [
 {id:'market',name:'Neon Market',x:-15,y:-15,w:20,d:20,color:0x48324e,accent:0xe582c6},
 {id:'industry',name:'Foundry Ward',x:5,y:-15,w:20,d:20,color:0x343a45,accent:0xeabb69},
 {id:'residential',name:'Maple Heights',x:-15,y:5,w:20,d:20,color:0x323547,accent:0xb494ee},
 {id:'logistics',name:'East Exchange',x:5,y:5,w:20,d:20,color:0x283c43,accent:0x67dbe5},
 {id:'civic',name:'Civic & Medical',x:0,y:0,w:10,d:10,color:0x304448,accent:0x65e4e8},
] as const;
export const districtAt=(x:number,y:number)=>[...districts].reverse().find(d=>x>=d.x&&y>=d.y&&x<d.x+d.w&&y<d.y+d.d)!;
export const districtPolygon=(d:typeof districts[number]):Point[]=>[iso(d.x,d.y),iso(d.x+d.w,d.y),iso(d.x+d.w,d.y+d.d),iso(d.x,d.y+d.d)];
export const chunks=Array.from({length:64},(_,i)=>({id:`chunk-${i}`,x:world.min+i%8*5,y:world.min+Math.floor(i/8)*5}));
