import {Plus,ArrowRight,Network} from 'lucide-react';
import {useGame,type BuildingId} from './game';
import {inspectService,supplyRequirement,gridRequirement} from './inspection';
import {fleet} from './traffic';
import {logisticsOutcome} from './logistics';
import Investigation from './InvestigationPanel';
import InspectionShell from './InspectionShell';
import type { FutureFacility } from './futures';
import { formatTime } from './time';

export default function BuildingInspector({building:id,future,futureTime}:{building:BuildingId;future?:FutureFacility;futureTime?:number}){
 const s=useGame(),info=inspectService(id,s),b=info.building,st=info.state;
 const supplyReason=supplyRequirement(id,s),gridReason=gridRequirement(s),outcome=id==='logistics'?logisticsOutcome(s):null;
 const recorded=!!s.caseStudy&&s.caseStudy.diagnosis==='correct'&&s.caseStudy.evidence.some(e=>e.building===id&&e.time===s.time);
 return <InspectionShell title={s.selectedVehicle?fleet.find(v=>v.id===s.selectedVehicle)!.name:b.name} category={b.kind} status={st}
  statusContext={future?`Live experiment · ${formatTime(s.time)}`:undefined} onClose={()=>s.select(null)}>
  {b.reserve>0&&<button className="supply inspection-action" disabled={!!supplyReason} aria-describedby="supply-requirement" onClick={()=>s.boost(id)}><Plus size={15}/>{s.boosted.includes(id)?'Supplies delivered':'Send backup supplies · +8h'}</button>}
  {id==='grid'&&<button className="supply inspection-action" disabled={!!gridReason} aria-describedby="grid-requirement" onClick={s.outage?s.restore:s.fail}>{s.outage?'Reconnect the district':'Disconnect the grid'}<ArrowRight size={15}/></button>}
  {b.reserve>0&&<small id="supply-requirement" className="resource-note">{supplyReason??`${2-s.boosted.length} delivery teams available. Delivery adds eight hours to this facility's reserve deadline.`}</small>}
  {id==='grid'&&<small id="grid-requirement" className="resource-note">{gridReason??(s.outage?'Reconnect power to restore dependent services.':'Disconnect power to begin a reproducible outage experiment.')}</small>}
  <p className="inspection-purpose">{info.purpose}</p>

  <p className={`inspection-condition ${st.tone}`} role="status">{info.problem}</p>
  {future&&futureTime!==undefined&&<section className="inspection-futures" aria-label="Facility comparison">
   <h4>Comparison preview · {formatTime(futureTime)}</h4>
   <dl>
    <div><dt>Original</dt><dd>{future.originalStatus} · {Math.round(future.before*100)}%</dd></div>
    <div><dt>Revised</dt><dd>{future.revisedStatus} · {Math.round(future.after*100)}%</dd></div>
   </dl>
   <a href="#compare-futures">Back to comparison</a>
  </section>}
  {b.reserve>0&&<>
   <div className="reserve"><span>{id==='hospital'?'GENERATOR FUEL':id==='telecom'?'BATTERY RESERVE':'BACKUP RESERVE'}</span><strong>{st.remaining.toFixed(1)} <small>hours</small></strong></div>
   <div className="meter"><div style={{width:`${Math.min(100,st.remaining/(b.reserve+8)*100)}%`}}/></div>
  </>}
  {id==='grid'&&<div className="dependency">Regional electricity grid · {s.outage?'Disconnected':'Connected'}</div>}
  <dl className="inspection-metrics">{info.metrics.map(m=><div key={m.label}><dt>{m.label}</dt><dd>{m.value}</dd></div>)}</dl>
  <button className="supply" aria-pressed={s.trace} onClick={s.toggleTrace}><Network size={15}/>{s.trace?'Hide dependency trace':'Trace dependencies'}</button>
  {outcome&&<div className="logistics-outcome"><p>Fleet depends on East delivery hub power and dispatch.</p><strong>{Math.round(outcome.capacity*100)}% dispatch capacity</strong><p>{outcome.dispatched.toFixed(1)} consignments dispatched / {outcome.backlog.toFixed(1)} delayed</p><div className="fleet-list">{fleet.map(v=><button key={v.id} onClick={()=>s.selectVehicle(v.id)}>{v.name}</button>)}</div></div>}
  {s.caseStudy&&<><button className="supply" disabled={recorded} aria-describedby="evidence-requirement" onClick={()=>s.evidence(id)}>Record evidence</button><small id="evidence-requirement" className="resource-note">{recorded?'These readings already support the confirmed diagnosis.':'Record the current time and service readings for this investigation.'}</small></>}
  <details className="connected-locations"><summary>Required services & affected locations</summary>
   <h4>Requires</h4>{info.links.length?info.links.map(edge=><div className="connection-row" key={`${edge.source}:${edge.system}`}><span>{edge.system}{edge.bufferHours>0?` · ${edge.bufferHours}h buffer`:''}</span><strong>{edge.available?'Available':'Interrupted'}</strong><button onClick={()=>s.select(edge.source)}>Visit {inspectService(edge.source,s).building.name}</button></div>):<p>Regional grid connection; no other simulated upstream facility.</p>}
   <h4>Affects downstream</h4>{info.downstream.length?info.downstream.map(edge=><button className="connection-visit" key={`${edge.target}:${edge.system}`} onClick={()=>s.select(edge.target)}>Visit {edge.name} <small>{edge.system}</small></button>):<p>No downstream facility is modeled for this location.</p>}
  </details>
  <details className="connected-locations"><summary>Facility role & scenario assumptions</summary><p>{b.description}</p></details>
  <Investigation key={id} building={id} snapshot={s} onSelect={s.select}/>
 </InspectionShell>;
}
