import {buildings,status,serviceCapacity,reserveDeadline,type BuildingId,type Snapshot} from './simulation.ts';
import {dependencies} from './dependencies.ts';
import {investigate} from './investigation.ts';
import type {GameData} from './gameState.ts';

export function inspectService(id:BuildingId,s:Snapshot){
 const building=buildings.find(b=>b.id===id)!,state=status(id,s),links=investigate(id,s);
 const downstream=dependencies.filter(e=>e.source===id).map(e=>({...e,name:buildings.find(b=>b.id===e.target)!.name}));
 const metrics=[{label:id==='water'?'Pumping capacity':id==='telecom'?'Communications capacity':id==='logistics'?'Dispatch capacity':'Service capacity',value:`${Math.round(serviceCapacity(id,s)*100)}%`}];
 if(id==='hospital'){
  const water=links.find(e=>e.system==='water')!;
  metrics.push({label:'Water buffer',value:!s.outage||water.sourceOnline?'12.0h ready':`${Math.max(0,reserveDeadline('water',s)+12-s.time).toFixed(1)}h left`});
 }
 if(id==='homes')metrics.push({label:'Water connection',value:links.find(e=>e.system==='water')!.available?'Available':'Interrupted'});
 let problem=!s.outage?'All required connections are available.':id==='grid'?'The regional grid connection is disconnected.'
  :state.label==='No water'?'Stored water is exhausted. Generator fuel cannot replace the water supply.'
  :state.label==='Offline'?'On-site electrical backup is exhausted. Inspect upstream connections or deliver supplies when permitted.'
  :state.label==='Manual dispatch'?'Telecom is offline. Manual dispatch is limited to 35% while hub power lasts.'
  :'Grid power is lost; on-site reserves are supporting service.';
 const purpose:Record<BuildingId,string>={grid:'Connects Meridian to regional electricity and feeds five district services.',hospital:'Emergency care supported by generator fuel and a twelve-hour water buffer.',water:'Powered pumps sustain water for the hospital and residences.',homes:'Homes depend on common-area backup electricity and the district water supply.',telecom:'Battery-backed communications keep automated delivery dispatch connected.',logistics:'The delivery hub coordinates three couriers and district consignments.'};
 return {building,state,links,downstream,metrics,problem,purpose:purpose[id]};
}

export function supplyRequirement(id:BuildingId,s:GameData):string|null{
 if(id==='grid')return 'The substation uses grid reconnection rather than a supply delivery.';
 if(!s.outage)return 'Disconnect electricity before assigning backup supplies.';
 if(s.caseStudy&&s.caseStudy.diagnosis!=='correct')return 'Confirm the case diagnosis before sending supplies.';
 if(s.boosted.includes(id))return 'This facility has already received its supply delivery.';
 if(s.boosted.length>=2)return 'Both delivery teams are assigned. Undo a delivery to free a team.';
 return null;
}
export const gridRequirement=(s:GameData)=>s.caseStudy&&s.caseStudy.diagnosis!=='correct'?'Confirm the case diagnosis before reconnecting the grid.':null;
