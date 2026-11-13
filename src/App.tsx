import {useEffect,useState,lazy,Suspense} from 'react';
import {ArrowUpRight,ArrowRight,Plus,Minus,Maximize,Network,Zap,X,Hospital,Droplets,Building2,ChevronRight,Undo2,Box,Info,Radio,Truck} from 'lucide-react';
import {logisticsOutcome} from './logistics';
import {SimulationClock} from './clock';
const City=lazy(()=>import('./City'));
import Investigation from './InvestigationPanel';
import {buildings,status,useGame} from './game';
import Timeline from './Timeline';
import {shortcutFor} from './keyboard';
const icons={grid:Zap,hospital:Hospital,water:Droplets,homes:Building2,telecom:Radio,logistics:Truck};
export default function App(){const s=useGame();const [help,setHelp]=useState(false);
 useEffect(()=>{
  const clock=new SimulationClock();let previous=performance.now();
  const visibility=()=>{previous=performance.now();clock.advance(0,1,false);};
  const id=setInterval(()=>{const now=performance.now(),s=useGame.getState();
   const hours=clock.advance(now-previous,s.speed,s.playing&&s.outage&&!document.hidden);previous=now;
   if(hours>0)s.tick(hours);
  },100);
  document.addEventListener('visibilitychange',visibility);
  return()=>{clearInterval(id);document.removeEventListener('visibilitychange',visibility);};
 },[]);

 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{
   const target=e.target instanceof Element?e.target:null;
   const editing=!!target?.closest('textarea,select,input:not([type="range"]),[contenteditable="true"]');
   const nativeSpace=!!target?.closest('button,input,select,textarea,a[href],[role="button"]');
   const action=shortcutFor(e,editing,nativeSpace);
   if(action==='close'){e.preventDefault();setHelp(false);useGame.getState().select(null);}
   else if(!help&&action==='undo'){e.preventDefault();useGame.getState().rewind();}
   else if(!help&&action==='toggle'){e.preventDefault();useGame.getState().toggle();}
  };
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[help]);
 useEffect(()=>{
  if(!help)return;
  const previous=document.activeElement as HTMLElement|null;
  const dialog=document.querySelector<HTMLElement>('.help');
  const buttons=()=>Array.from(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled),a[href],input')??[]);
  buttons()[0]?.focus();
  const trap=(e:KeyboardEvent)=>{if(e.key!=='Tab')return;const all=buttons(),first=all[0],last=all.at(-1);
   if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}
   else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}};
  dialog?.addEventListener('keydown',trap);
  return()=>{dialog?.removeEventListener('keydown',trap);previous?.focus();};
 },[help]);
 const online=buildings.filter(b=>status(b.id,s).tone!=='bad').length;const selected=buildings.find(b=>b.id===s.selected);const st=selected?status(selected.id,s):null;
 const cameraAction=(detail:string)=>document.querySelector('.city-canvas')?.dispatchEvent(new CustomEvent('camera',{detail}));
 return <div className="app"><header><a className="brand" href="./" aria-label="Ctrl Z home"><span className="brand-icon"><Undo2 size={24}/></span>Ctrl Z<span className="edition">CITY SYSTEMS SIMULATOR</span></a><div className="header-right"><span className="prototype">PLAYABLE PROTOTYPE <i/></span><button className="icon" aria-label="How to play" onClick={()=>setHelp(true)}><Info size={18}/></button><a className="chapter" href="#scenario">01 <span>/ ELECTRICITY</span><ArrowUpRight size={15}/></a></div></header>
 <main><aside className="sidebar"><div className="eyebrow">EXPERIMENT 001</div><h1>Meridian<em>Undo the World.</em></h1><p className="intro">A city is a web of invisible connections.<br/>Pull one thread. See what unravels.</p><div className="divider"/><div className="section-heading"><span>THE SCENARIO</span><span>01 — 04</span></div><button id="scenario" className={`scenario ${s.outage?'active':''}`} onClick={s.fail} disabled={s.outage}><span className="scenario-icon"><Zap size={21}/></span><span><strong>Electricity</strong><small>{s.outage?'Removed from reality':'The current that connects us'}</small></span><ChevronRight size={16}/></button><p className="scenario-description">What happens when an entire district loses power? The lights are only the beginning.</p><button className={`primary ${s.outage?'restore':''}`} onClick={s.outage?s.restore:s.fail}><Zap size={16}/>{s.outage?'Restore electricity':'Remove electricity'}<ArrowRight size={17}/></button><div className="section-heading buildings-heading"><span>DISTRICT OVERVIEW</span><span>{online}/{buildings.length} ONLINE</span></div><div className="building-list">{buildings.map(b=>{const Icon=icons[b.id],v=status(b.id,s);return <button key={b.id} aria-pressed={s.selected===b.id} className={`building-row ${s.selected===b.id?'selected':''}`} onClick={()=>s.select(b.id)}><Icon size={17}/><span>{b.name}<small>{v.label}</small></span><i className={v.tone}/></button>;})}</div><div className="sidebar-foot"><Box size={17}/><p>Nothing exists in isolation.<br/><span>Not even a light switch.</span></p></div></aside>
 <section className="world" aria-label="City simulation"><div className="world-top"><div><div className="eyebrow">MERIDIAN <span> / LIVE SIMULATION</span></div><h2>Follow the connections.</h2></div><span className={`state-pill ${s.outage?'outage':''}`}><i/>{s.outage?'GRID OFFLINE':'SYSTEMS NOMINAL'}</span></div><div className="map-grid"/><Suspense fallback={<p className="city-loading" role="status">Loading Meridian...</p>}><City/></Suspense><div className="map-caption"><span className="north-arrow">&#8593;</span><span>MERIDIAN<br/><small>28.75 N / 77.12 E</small></span></div>
 <div className="map-controls"><button aria-label="Dependencies" aria-pressed={s.trace} className={`trace ${s.trace?'on':''}`} onClick={s.toggleTrace}><Network size={16}/><span>Dependencies</span></button><div><button aria-label="Zoom in" onClick={()=>cameraAction('in')}><Plus size={18}/></button><button aria-label="Zoom out" onClick={()=>cameraAction('out')}><Minus size={18}/></button><button aria-label="Reset camera" onClick={()=>cameraAction('reset')}><Maximize size={17}/></button></div></div>
 {!selected&&<div className="map-hint"><span className="hint-dot"/>{s.outage?'Watch the cascade. Tap a building to intervene.':'Tap a building to discover its connections.'}</div>}
 {selected&&st&&<section className="inspector" aria-label="Building inspection"><div className="inspector-top"><span className="eyebrow">{selected.kind}</span><button className="icon" aria-label="Close inspection" onClick={()=>s.select(null)}><X size={17}/></button></div><h3>{selected.name}</h3><span className={`status-text ${st.tone}`}><i/>{st.label}</span><p>{selected.description}</p><div className="dependency"><Network size={15}/><span>{selected.dependency}</span></div>{selected.reserve>0&&<><div className="reserve"><span>BACKUP RESERVE</span><strong>{st.remaining.toFixed(1)} <small>hours</small></strong></div><div className="meter"><div style={{width:`${st.remaining/(selected.reserve+8)*100}%`}}/></div><button className="supply" disabled={!s.outage||s.boosted.includes(selected.id)||s.boosted.length>=2} onClick={()=>s.boost(selected.id)}><Plus size={15}/>{s.boosted.includes(selected.id)?'Supplies delivered':`Send backup supplies · +8h`}</button><small className="resource-note">{2-s.boosted.length} delivery teams available</small></>}{selected.id==='grid'&&<button className="supply" onClick={s.outage?s.restore:s.fail}>{s.outage?'Reconnect the district':'Disconnect the grid'}<ArrowRight size={15}/></button>}{selected.id==='logistics'&&<div className="logistics-outcome"><strong>{Math.round(logisticsOutcome(s).capacity*100)}% dispatch capacity</strong><p>{logisticsOutcome(s).dispatched.toFixed(1)} consignments dispatched / {logisticsOutcome(s).backlog.toFixed(1)} delayed</p></div>}<Investigation key={selected.id} building={selected.id} snapshot={s} onSelect={s.select}/></section>}
 <Timeline/>
 </section></main><footer><span>CTRL Z <span className="muted">— UNDO THE WORLD.</span></span><span>Drag to pan <b>·</b> Scroll / pinch to zoom <b>·</b> Tap to inspect</span><span className="footer-end">EVERYTHING IS CONNECTED <Network size={13}/></span></footer>
 {help&&<div className="modal-backdrop" onClick={()=>setHelp(false)}><section className="help" role="dialog" aria-modal="true" aria-label="How to play" onClick={e=>e.stopPropagation()}><button className="icon close-help" aria-label="Close help" onClick={()=>setHelp(false)}><X/></button><div className="eyebrow">WELCOME TO CTRL Z</div><h2>Pull a thread.<br/>Follow the consequences.</h2><p>Remove electricity to start the experiment. Each second advances 10 simulated minutes at 1× speed.</p><ol><li>Inspect any building to see its dependencies.</li><li>Scenario reserves: homes 2h, telecom 4h, waterworks 6h, delivery hub 8h and hospital fuel 18h.</li><li>Send two available supply teams to extend any two reserves by 8h.</li><li>Use Undo (Ctrl/Command Z) to reverse an intervention. Scrub time to replay recorded decisions. Change an earlier response to create a branch; choose Original outage to compare without interventions.</li></ol><p>Drag to pan. Scroll or pinch to zoom. Space pauses time when the map is focused; focused buttons keep their normal Space action. Restore electricity whenever you want to end the outage.</p><button className="primary" onClick={()=>setHelp(false)}>Explore the district<ArrowRight size={17}/></button></section></div>}
 </div>;
}
