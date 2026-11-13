
export type BuildingId = 'grid' | 'hospital' | 'water' | 'homes';
export const buildings = [
 {id:'grid',name:'North substation',kind:'POWER INFRASTRUCTURE',x:2,y:2,height:49,reserve:0,description:'The district’s only grid connection. Removing electricity here starts a chain reaction across the city.',dependency:'Regional electricity grid'},
 {id:'hospital',name:'St. Mira Hospital',kind:'ESSENTIAL SERVICES',x:6,y:2,height:94,reserve:18,description:'Emergency generators keep critical wards running. Once fuel runs out, life-support services are interrupted.',dependency:'North substation → backup generator'},
 {id:'water',name:'Waterworks',kind:'PUBLIC UTILITIES',x:2,y:6,height:57,reserve:6,description:'Stored water maintains pressure for a while. Without powered pumps, the district eventually loses its water supply.',dependency:'North substation → pumping station'},
 {id:'homes',name:'Maple residences',kind:'RESIDENTIAL DISTRICT',x:6,y:6,height:115,reserve:2,description:'Emergency batteries power common areas. Residents also depend on the Waterworks for running water.',dependency:'North substation + Waterworks'},
] as const;
export interface Snapshot { time:number; outage:boolean; boosted:BuildingId[]; supplyAt:Partial<Record<BuildingId,number>>; restoredAt:number|null }
export const initial:Snapshot={time:0,outage:false,boosted:[],supplyAt:{},restoredAt:null};
export function reserveDeadline(id:BuildingId,s:Snapshot) {
 const base=buildings.find(b=>b.id===id)!.reserve;
 return s.boosted.includes(id)?Math.max(base,s.supplyAt[id]??0)+8:base;
}
export function status(id:BuildingId,s:Snapshot) {
 const b=buildings.find(b=>b.id===id)!;
 if(!s.outage) return {label:'Operational',tone:'good',remaining:b.reserve};
 if(id==='grid') return {label:'Offline',tone:'bad',remaining:0};
 const remaining=Math.max(0,reserveDeadline(id,s)-s.time);
 if(!remaining) return {label:'Offline',tone:'bad',remaining};
 if(id==='homes' && s.time>=reserveDeadline('water',s)) return {label:'No water',tone:'bad',remaining};
 return {label:'Backup power',tone:'warn',remaining};
}

export function outageMessage(s:Snapshot):string {
 if(s.restoredAt!==null) return `Grid restored at ${s.restoredAt.toFixed(1)}h. All district services are back online.`;
 if(!s.outage) return 'A quiet evening. Every system is connected.';
 if(s.time>=24) return '24-hour observation complete. Restore electricity or rewind to try another outcome.';
 if(status('hospital',s).tone==='bad') return 'Hospital backup depleted. Critical services interrupted.';
 if(status('water',s).tone==='bad') return 'Pumps offline. Water supply lost across the district.';
 if(status('homes',s).tone==='bad') return 'Residential batteries depleted. Homes fall dark.';
 return 'Grid disconnected. Emergency backups have taken over.';
}

