import {useEffect,useMemo,useRef,useState,lazy,Suspense} from 'react';
import {Map as MapIcon,ArrowUpRight,Plus,Minus,Maximize,Network,Undo2,Box,Info} from 'lucide-react';
import {SimulationClock} from './clock';
const City=lazy(()=>import('./City'));
import BuildingInspector from './BuildingInspector';
import SceneryInspector from './SceneryInspector';
import SceneryBrowser from './SceneryBrowser';
import {useNavigation} from './navigation';
import {findScenery} from './sceneryInfo';
import {buildings,useGame,type BuildingId} from './game';
import Timeline from './Timeline';
import CitySystems from './CitySystems';
import ExperimentGuide from './ExperimentGuide';
import ScenarioPanel,{type GameMode} from './ScenarioPanel';
import GameHelp from './GameHelp';
import ModeChangeDialog from './ModeChangeDialog';
import ReportPanel from './ReportPanel';
import SaveControls from './SaveControls';
import Minimap from './Minimap';
import {shortcutFor} from './keyboard';
import EmergencyPanel from './EmergencyPanel';
import { emergencyEvents } from './emergencies';
import { gameDeadline } from './gameState';
import CompareFutures from './CompareFutures';
import { compareFutures, distinctResponses, type FutureSelection } from './futures';
import type { ReplayBranch } from './replay';
export default function App(){const s=useGame();const [help,setHelp]=useState(false);const [guide,setGuide]=useState(false);const [lowPower,setLowPower]=useState(false);
 const sceneryId=useNavigation(n=>n.sceneryId),scenery=findScenery(sceneryId);
 const [future,setFuture]=useState<{run:ReplayBranch;selection:FutureSelection;open:boolean}|null>(null);
 const comparisonLauncher=useRef<HTMLElement|null>(null);
 const [crisisPreview,setCrisisPreview]=useState<ReplayBranch|null>(()=>
  new URLSearchParams(window.location.search).get('mode')==='crisis'?s.branches[0]:null);
 const mode:GameMode=s.crisis||crisisPreview===s.branches[0]?'crisis':s.caseStudy?'investigation':'sandbox';
 const [pendingMode,setPendingMode]=useState<GameMode|null>(null);
 const startMode=(next:GameMode)=>{
  setGuide(false);
  setFuture(null);
  if(next==='investigation')s.startCase('dispatch');
  else s.reset();
  setCrisisPreview(next==='crisis'?useGame.getState().branches[0]:null);
 };
 const selectMode=(next:GameMode)=>{
  if(next===mode)return;
  if(s.history.length||s.caseStudy||s.crisis)setPendingMode(next);
  else startMode(next);
 };
 const branch=s.branches.find(entry=>entry.id===s.activeBranch)!;
 const deadline=gameDeadline(s);
 const scheduledEmergencies=useMemo(()=>emergencyEvents(branch,deadline),[branch,deadline]);
 const canReview=s.history.length>0&&(!s.caseStudy||s.caseStudy.diagnosis==='correct');
 const emergencies=canReview?scheduledEmergencies.filter(event=>event.time<=s.time):[];
 const responses=useMemo(()=>distinctResponses(s.branches),[s.branches]);
 const canCompare=canReview&&responses.length>1;
 const currentPreview=canCompare&&future?.run===s.branches[0]?future:null;
 const requested=currentPreview?.open?currentPreview.selection:null;
 const original=requested?(responses.find(entry=>entry.id===requested.originalId)??responses[0]):null;
 const revised=requested?(responses.find(entry=>entry.id===requested.revisedId&&entry!==original)??responses.find(entry=>entry!==original)):null;
 const comparisonTime=requested?.time??null;
 const comparison=useMemo(()=>original&&revised&&comparisonTime!==null?compareFutures(original,revised,comparisonTime):null,[original,revised,comparisonTime]);
 const comparing=!!comparison;
 const focusTimeline=()=>document.getElementById('simulation-timeline')?.focus();

 const showComparison=(selection:FutureSelection)=>{
  comparisonLauncher.current=document.activeElement instanceof HTMLElement?document.activeElement:null;
  setFuture({run:s.branches[0],selection,open:true});
  requestAnimationFrame(()=>document.getElementById('futures-heading')?.focus());
 };
 const openComparison=canCompare?()=>{
  const response=responses.find(entry=>entry.id===s.activeBranch&&entry!==responses[0])??responses[1];
  showComparison(currentPreview?.selection??{originalId:responses[0].id,revisedId:response.id,time:s.time});
 }:undefined;
 const startGuidedRun=()=>{
  setCrisisPreview(null);
  setFuture(null);
  s.reset();
  s.fail();
  s.seek(0);
 };
 const closeGuide=()=>{
  setGuide(false);
  requestAnimationFrame(()=>document.getElementById('guide-launcher')?.focus({preventScroll:true}));
 };
 const closeComparison=()=>{
  setFuture(current=>current?{...current,open:false}:null);
  requestAnimationFrame(()=>{
   if(comparisonLauncher.current?.isConnected)comparisonLauncher.current.focus();
   else focusTimeline();
  });
 };
 const compareInspection=(id:BuildingId)=>{
  s.select(id);
  requestAnimationFrame(()=>document.querySelector<HTMLElement>('.inspector h3')?.focus());
 };
 const retryResponse=()=>{
  s.branch(0);
  s.seek(0);
  setFuture(null);
  requestAnimationFrame(()=>document.querySelector('.timeline input')?.scrollIntoView({block:'nearest'}));
 };
 useEffect(()=>{
  if(pendingMode)return;
  const clock=new SimulationClock();let previous=performance.now();
  const visibility=()=>{previous=performance.now();clock.advance(0,1,false);};
  const id=setInterval(()=>{const now=performance.now(),s=useGame.getState();
   const hours=clock.advance(now-previous,s.speed,s.playing&&s.outage&&!document.hidden);previous=now;
   if(hours>0)s.tick(hours);
  },100);
  document.addEventListener('visibilitychange',visibility);
  return()=>{clearInterval(id);document.removeEventListener('visibilitychange',visibility);};
 },[pendingMode]);

 useEffect(()=>{
  const key=(e:KeyboardEvent)=>{
   if(pendingMode)return;
   const target=e.target instanceof Element?e.target:null;
   const editing=!!target?.closest('textarea,select,input:not([type="range"]),[contenteditable="true"]');
   const nativeSpace=!!target?.closest('button,summary,input,select,textarea,a[href],[role="button"]');
   const action=shortcutFor(e,editing,nativeSpace);
   if(action==='close'){
    e.preventDefault();
    if(help)setHelp(false);
    else if(target?.closest('.inspector'))useGame.getState().select(null);
    else if(comparing)closeComparison();
    else if(guide)closeGuide();
    else useGame.getState().select(null);
   }
   else if(!help&&action==='undo'){e.preventDefault();useGame.getState().rewind();}
   else if(!help&&action==='toggle'){e.preventDefault();useGame.getState().toggle();}
  };
  window.addEventListener('keydown',key);return()=>window.removeEventListener('keydown',key);
 },[help,comparing,guide,pendingMode]);
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
 <main className="simulation-layout" data-comparing={comparing}><aside className="sidebar"><div className="eyebrow">EXPERIMENT 001</div><h1>Undo the World<span className="title-dot">.</span></h1><p className="premise">Remove electricity. Watch a city unravel. Change the outcome.</p><ScenarioPanel mode={mode} onSelectMode={selectMode} onCompare={openComparison} guideOpen={guide} onGuide={()=>guide?closeGuide():setGuide(true)}/>{guide&&<ExperimentGuide onStart={startGuidedRun} onCompare={showComparison} onClose={closeGuide}/>}<EmergencyPanel events={emergencies} run={s.branches[0]} onInspect={compareInspection} onTimeline={focusTimeline}/><CitySystems/><div className="secondary-tools"><SceneryBrowser/><ReportPanel/><SaveControls/></div><div className="sidebar-foot"><Box size={17}/><p>Nothing exists in isolation.<br/><span>Not even a light switch.</span></p></div></aside>
 <section className="world" aria-label="City simulation"><div className="world-top"><div><div className="eyebrow">MERIDIAN <span> / LIVE SIMULATION</span></div><h2>Meridian / Control room</h2></div><span className={`state-pill ${s.outage?'outage':''}`}><i/>{s.caseStudy?'CASE IN PROGRESS':s.outage?'GRID OFFLINE':'SYSTEMS NOMINAL'}</span></div><div className="map-grid"/><div className="city-startup" role="status"><strong>CTRL Z / MERIDIAN</strong><span>Preparing the city and its systems...</span></div><Suspense fallback={<p className="city-loading" role="status">Loading Meridian...</p>}><City lowPower={lowPower}/></Suspense><div className="map-caption"><span className="north-arrow">&#8593;</span><span>MERIDIAN<br/><small>28.75 N / 77.12 E</small></span></div>
 <div className="map-controls"><button className="trace" aria-label="Low power mode" aria-pressed={lowPower} onClick={()=>setLowPower(!lowPower)}>Low power</button><button aria-label="Dependencies" aria-pressed={s.trace} className={`trace ${s.trace?'on':''}`} onClick={s.toggleTrace}><Network size={16}/><span>Dependencies</span></button><div><button aria-label="Zoom in" onClick={()=>cameraAction('in')}><Plus size={18}/></button><button aria-label="Zoom out" onClick={()=>cameraAction('out')}><Minus size={18}/></button><button aria-label="City overview" onClick={()=>cameraAction('overview')}><MapIcon size={17}/></button><button aria-label="Reset camera" onClick={()=>cameraAction('reset')}><Maximize size={17}/></button></div></div>
 {!selected&&!scenery&&<div className="map-hint"><span className="hint-dot"/>{s.outage?'Watch the cascade. Tap a building to intervene.':'Tap a building to discover its connections.'}</div>}
 {selected&&<BuildingInspector key={`${selected.id}:${s.selectedVehicle??''}`} building={selected.id}
  future={comparison?.facilities.find(service=>service.id===selected.id)} futureTime={comparison?.time}/>}
 {scenery&&!selected&&<SceneryInspector key={scenery.id} building={scenery}/>}
 <Minimap/><Timeline incidentCount={emergencies.length} onCompare={openComparison}/>
 </section>
 {comparison&&original&&revised&&<CompareFutures branches={responses} deadline={deadline} liveTime={s.time} outcome={comparison}
  selection={{originalId:original.id,revisedId:revised.id,time:comparison.time}}
  onChange={selection=>setFuture({run:s.branches[0],selection,open:true})} onClose={closeComparison}
  onInspect={compareInspection} onRetry={retryResponse} onTimeline={focusTimeline}/>}
 </main>
 <footer><span>CTRL Z <span className="muted">— UNDO THE WORLD.</span></span><span>Drag to pan <b>·</b> Scroll / pinch to zoom <b>·</b> Tap to inspect</span><span className="footer-end">EVERYTHING IS CONNECTED <Network size={13}/></span></footer>
 {help&&<GameHelp mode={mode} onClose={()=>setHelp(false)} onGuide={()=>{setHelp(false);setGuide(true);}}/>}
 {pendingMode&&<ModeChangeDialog mode={pendingMode} onCancel={()=>setPendingMode(null)}
  onStart={()=>{startMode(pendingMode);setPendingMode(null);}}/>}
 </div>;
}
