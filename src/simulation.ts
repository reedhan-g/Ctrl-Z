
import { dependencies } from './dependencies.ts';
import { normalizeTime } from './time.ts';
export type BuildingId = 'grid' | 'hospital' | 'water' | 'homes' | 'telecom' | 'logistics';
export const buildings = [
 {id:'grid',name:'North substation',kind:'POWER INFRASTRUCTURE',x:2,y:2,height:49,reserve:0,description:'The district’s only grid connection. Removing electricity here starts a chain reaction across the city.',dependency:'Regional electricity grid'},
 {id:'hospital',name:'St. Mira Hospital',kind:'ESSENTIAL SERVICES',x:6,y:2,height:94,reserve:18,description:'Emergency generators keep critical wards running. Critical services need both generator fuel and water. A 12-hour on-site water tank bridges pump failures.',dependency:'North substation + Waterworks (12h water tank)'},
 {id:'water',name:'Waterworks',kind:'PUBLIC UTILITIES',x:2,y:6,height:57,reserve:6,description:'Stored water maintains pressure for a while. Without powered pumps, the district eventually loses its water supply.',dependency:'North substation → pumping station'},
 {id:'homes',name:'Maple residences',kind:'RESIDENTIAL DISTRICT',x:6,y:6,height:115,reserve:2,description:'Emergency batteries power common areas. Residents also depend on the Waterworks for running water.',dependency:'North substation + Waterworks'},
 {id:'telecom',name:'Meridian telecom',kind:'COMMUNICATIONS',x:6,y:0,height:72,reserve:4,description:'Four hours of battery reserve keep district dispatch connected. A late battery delivery restores communications and automated routing.',dependency:'North substation'},
 {id:'logistics',name:'East delivery hub',kind:'LOGISTICS',x:0,y:6,height:40,reserve:8,description:'Dispatch handles 12 consignments per hour. Backup power reduces capacity to 70%; radio loss leaves manual dispatch at 35%. No power stops dispatch. These are scenario assumptions.',dependency:'North substation + Meridian telecom'},
] as const;
export interface Snapshot { time:number; outage:boolean; boosted:BuildingId[]; supplyAt:Partial<Record<BuildingId,number>>; restoredAt:number|null }
export const initial:Snapshot={time:0,outage:false,boosted:[],supplyAt:{},restoredAt:null};
export function reserveDeadline(id:BuildingId,s:Snapshot) {
 const base=buildings.find(b=>b.id===id)!.reserve;
 return s.boosted.includes(id)?normalizeTime(Math.max(base,s.supplyAt[id]??0)+8):base;
}
export function status(id:BuildingId,s:Snapshot) {
 const b=buildings.find(b=>b.id===id)!;
 if(!s.outage) return {label:'Operational',tone:'good',remaining:b.reserve};
 if(id==='grid') return {label:'Offline',tone:'bad',remaining:0};
 const time=normalizeTime(s.time);
 const remaining=Math.max(0,reserveDeadline(id,s)-time);
 if(!remaining) return {label:'Offline',tone:'bad',remaining};
 const waterDependency=dependencies.find(d=>d.target===id&&d.system==='water');
 if(waterDependency && time>=normalizeTime(reserveDeadline(waterDependency.source,s)+waterDependency.bufferHours))
  return {label:'No water',tone:'bad',remaining};
 if(id==='logistics' && status('telecom',s).tone==='bad') return {label:'Manual dispatch',tone:'warn',remaining};
 return {label:'Backup power',tone:'warn',remaining};
}

export function serviceCapacity(id:BuildingId,s:Snapshot):number {
 const state=status(id,s);
 if(state.tone==='bad')return 0;
 if(id==='logistics')return state.label==='Manual dispatch'?.35:s.outage?.7:1;
 return 1;
}

export function outageMessage(s:Snapshot):string {
 if(s.restoredAt!==null) return `Grid restored at ${s.restoredAt.toFixed(1)}h. All district services are back online.`;
 if(!s.outage) return 'A quiet evening. Every system is connected.';
 if(s.time>=24) return '24-hour observation complete. Restore electricity or rewind to try another outcome.';
 if(status('hospital',s).label==='No water') return 'Hospital water reserve exhausted. Critical services interrupted.';
 if(status('hospital',s).tone==='bad') return 'Hospital backup depleted. Critical services interrupted.';
 if(status('water',s).tone==='bad') return 'Pumps offline. Water supply lost across the district.';
 if(status('homes',s).tone==='bad') return 'Residential batteries depleted. Homes fall dark.';
 return 'Grid disconnected. Emergency backups have taken over.';
}

