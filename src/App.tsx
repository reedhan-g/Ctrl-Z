import {useEffect,useState,lazy,Suspense} from 'react';
import {Map as MapIcon,ArrowUpRight,ArrowRight,Plus,Minus,Maximize,Network,X,Undo2,Box,Info} from 'lucide-react';
import {SimulationClock} from './clock';
const City=lazy(()=>import('./City'));
import BuildingInspector from './BuildingInspector';
import SceneryInspector from './SceneryInspector';
import SceneryBrowser from './SceneryBrowser';
import {useNavigation} from './navigation';
import {findScenery} from './sceneryInfo';
import {buildings,useGame} from './game';
import Timeline from './Timeline';
import CitySystems from './CitySystems';
import ExperimentGuide from './ExperimentGuide';
import ScenarioPanel from './ScenarioPanel';
import ReportPanel from './ReportPanel';
import SaveControls from './SaveControls';
import Minimap from './Minimap';
import {shortcutFor} from './keyboard';
export default function App(){const s=useGame();const [help,setHelp]=useState(false);const [guide,setGuide]=useState(false);const [lowPower,setLowPower]=useState(false);
 const sceneryId=useNavigation(n=>n.sceneryId),scenery=findScenery(sceneryId);
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
   if(action==='close'){e.preventDefault();setHelp(false);setGuide(false);useGame.getState().select(null);}
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
 const selected=buildings.find(b=>b.id===s.selected);
 const cameraAction=(detail:string)=>document.querySelector('.city-canvas')?.dispatchEvent(new CustomEvent('camera',{detail}));
 return <div className="app"><header><a className="brand" href="./" aria-label="Ctrl Z home"><span className="brand-icon"><Undo2 size={24}/></span>Ctrl Z<span className="edition">UNDO THE WORLD</span></a><div className="header-right"><span className="prototype">{s.caseStudy?'CASE IN PROGRESS':s.outage?'GRID DISCONNECTED':s.restoredAt!==null?'POWER RESTORED':'SIMULATION READY'} <i/></span><button className="icon" aria-label="How to play" onClick={()=>setHelp(true)}><Info size={18}/></button><a className="chapter" href="#scenario">01 <span>/ ELECTRICITY</span><ArrowUpRight size={15}/></a></div></header>
 <main><aside className="sidebar"><div className="eyebrow">EXPERIMENT 001</div><h1>Undo the World<span className="title-dot">.</span></h1><p className="premise">Remove electricity. Watch a city unravel. Change the outcome.</p><ScenarioPanel/>{guide&&<ExperimentGuide onClose={()=>{setGuide(false);document.querySelector<HTMLButtonElement>('[aria-label="How to play"]')?.focus({preventScroll:true});}}/>}<CitySystems/><div className="secondary-tools"><SceneryBrowser/><ReportPanel/><SaveControls/></div><div className="sidebar-foot"><Box size={17}/><p>Nothing exists in isolation.<br/><span>Not even a light switch.</span></p></div></aside>
 <section className="world" aria-label="City simulation"><div className="world-top"><div><div className="eyebrow">MERIDIAN <span> / LIVE SIMULATION</span></div><h2>Meridian / Control room</h2></div><span className={`state-pill ${s.outage?'outage':''}`}><i/>{s.caseStudy?'CASE IN PROGRESS':s.outage?'GRID OFFLINE':'SYSTEMS NOMINAL'}</span></div><div className="map-grid"/><div className="city-startup" role="status"><strong>CTRL Z / MERIDIAN</strong><span>Preparing the city and its systems...</span></div><Suspense fallback={<p className="city-loading" role="status">Loading Meridian...</p>}><City lowPower={lowPower}/></Suspense><div className="map-caption"><span className="north-arrow">&#8593;</span><span>MERIDIAN<br/><small>28.75 N / 77.12 E</small></span></div>
 <div className="map-controls"><button className="trace" aria-label="Low power mode" aria-pressed={lowPower} onClick={()=>setLowPower(!lowPower)}>Low power</button><button aria-label="Dependencies" aria-pressed={s.trace} className={`trace ${s.trace?'on':''}`} onClick={s.toggleTrace}><Network size={16}/><span>Dependencies</span></button><div><button aria-label="Zoom in" onClick={()=>cameraAction('in')}><Plus size={18}/></button><button aria-label="Zoom out" onClick={()=>cameraAction('out')}><Minus size={18}/></button><button aria-label="City overview" onClick={()=>cameraAction('overview')}><MapIcon size={17}/></button><button aria-label="Reset camera" onClick={()=>cameraAction('reset')}><Maximize size={17}/></button></div></div>
 {!selected&&!scenery&&<div className="map-hint"><span className="hint-dot"/>{s.outage?'Watch the cascade. Tap a building to intervene.':'Tap a building to discover its connections.'}</div>}
 {selected&&<BuildingInspector key={`${selected.id}:${s.selectedVehicle??''}`} building={selected.id}/>}
 {scenery&&!selected&&<SceneryInspector key={scenery.id} building={scenery}/>}
 <Minimap/><Timeline/>
 </section></main><footer><span>CTRL Z <span className="muted">— UNDO THE WORLD.</span></span><span>Drag to pan <b>·</b> Scroll / pinch to zoom <b>·</b> Tap to inspect</span><span className="footer-end">EVERYTHING IS CONNECTED <Network size={13}/></span></footer>
 {help&&<div className="modal-backdrop" onClick={()=>setHelp(false)}><section className="help" role="dialog" aria-modal="true" aria-label="How to play" onClick={e=>e.stopPropagation()}><button className="icon close-help" aria-label="Close help" onClick={()=>setHelp(false)}><X/></button><div className="eyebrow">WELCOME TO CTRL Z</div><h2>Pull a thread.<br/>Follow the consequences.</h2><p>Remove electricity to start the experiment. Each second advances 10 simulated minutes at 1× speed.</p><ol><li>Inspect any building to see its dependencies.</li><li>Scenario reserves: homes 2h, telecom 4h, waterworks 6h, delivery hub 8h and hospital fuel 18h.</li><li>Send two available supply teams to extend any two reserves by 8h.</li><li>Use Undo (Ctrl/Command Z) to reverse an intervention. Scrub time to replay recorded decisions. Change an earlier response to create a branch; choose Original outage to compare without interventions.</li></ol><p>Drag to pan. Scroll or pinch to zoom. Space pauses time when the map is focused; focused buttons keep their normal Space action. Restore electricity whenever you want to end the outage.</p><button className="supply" onClick={()=>{setHelp(false);setGuide(true);}}>Start guided experiment</button><button className="primary" onClick={()=>setHelp(false)}>Explore the district<ArrowRight size={17}/></button></section></div>}
 </div>;
}
