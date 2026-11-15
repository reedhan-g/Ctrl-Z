import {Zap,Hospital,Droplets,Building2,Radio,Truck} from 'lucide-react';
import {buildings,status,useGame} from './game';
import {serviceCapacity} from './simulation';

const groups={grid:'Electricity',water:'Water',telecom:'Communications',hospital:'Healthcare',logistics:'Logistics',homes:'Residences'};
const icons={grid:Zap,hospital:Hospital,water:Droplets,homes:Building2,telecom:Radio,logistics:Truck};
export default function CitySystems(){
 const s=useGame(),online=buildings.filter(b=>status(b.id,s).tone!=='bad').length;
 return <section className="city-systems" aria-label="City systems">
  <div className="section-heading buildings-heading"><span>CITY SYSTEMS</span><span>{online}/6 available</span></div>
  <div className="building-list">{buildings.map(b=>{const Icon=icons[b.id],v=status(b.id,s);return <button key={b.id} aria-label={`${b.name}: ${groups[b.id]}, ${v.label}`} data-system={b.id} data-tone={v.tone} aria-pressed={s.selected===b.id} className={`building-row ${s.selected===b.id?'selected':''}`} onClick={()=>s.select(b.id)}>
   <Icon size={17}/><span><strong>{groups[b.id]}</strong><span className="system-location">{b.name}</span><small className={v.tone}>{v.label}{b.id==='logistics'?` · ${Math.round(serviceCapacity(b.id,s)*100)}%`:''}</small></span><i className={v.tone}/>
  </button>;})}</div>
 </section>;
}
