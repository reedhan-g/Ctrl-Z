import { Pause, Play, RotateCcw, Undo2 } from 'lucide-react';
import { useGame, buildings, status } from './game';
import { outageMessage } from './simulation';
import { replayAt } from './replay';
import { formatTime } from './time';
import { gameDeadline } from './gameState';
import {useEffect,useRef,useState} from 'react';

export default function Timeline({incidentCount=0,onCompare}:{incidentCount?:number;onCompare?:()=>void}) {
 const s=useGame(),[expanded,setExpanded]=useState(false);
 const element=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const node=element.current!,world=node.parentElement!;
  const measure=()=>world.style.setProperty('--timeline-clearance',`${Math.ceil(world.clientHeight-node.offsetTop)}px`);
  const observer=new ResizeObserver(measure);observer.observe(node);measure();
  return ()=>{observer.disconnect();world.style.removeProperty('--timeline-clearance');};
 },[]);
 const clock=formatTime(s.time);
 const deadline=gameDeadline(s),crisisFinished=s.crisis&&s.time>=deadline;
 const baseline=replayAt(s.branches[0],s.time);
 const online=(snapshot: typeof baseline)=>buildings.filter(b=>status(b.id,snapshot).tone!=='bad').length;
 return <div className="timeline" ref={element} aria-label="Simulation controls" data-expanded={expanded}>
  <div className="timeline-mobile-bar">
   {incidentCount>0&&<a href="#city-emergencies">Incidents · {incidentCount}</a>}
   {onCompare&&<button className="future-trigger" onClick={onCompare}>Compare Futures</button>}
   <button className="timeline-disclosure" aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>{expanded?'Less timeline detail':'Timeline details'}</button>
  </div>
  {s.history.length>0&&<div className="branch-controls">
   <label>Timeline <select aria-label="Replay branch" value={s.activeBranch} onChange={e=>s.branch(Number(e.target.value))}>
    {s.branches.map(b=><option value={b.id} key={b.id}>{b.name}</option>)}
   </select></label>
   <span aria-label="Outcome comparison">{online(s)}/{buildings.length} online <span className="muted">vs original {online(baseline)}/{buildings.length} at {clock}</span></span>
   {onCompare&&<button className="future-trigger future-trigger-desktop" onClick={onCompare}>Compare Futures</button>}
  </div>}
  <div className="timeline-heading"><div><span className="eyebrow">Live experiment</span><strong>{clock}<small> HRS</small></strong></div>
   <div className="playback">
    <button aria-label={s.playing?'Pause simulation':'Play simulation'} disabled={!s.outage||s.time>=deadline} onClick={s.toggle}>{s.playing?<Pause size={17}/>:<Play size={17}/>}</button>
    <button className="speed" onClick={()=>s.setSpeed(s.speed===1?4:s.speed===4?12:1)} aria-label="Change simulation speed">{s.speed}x</button>
    <button aria-label="Undo" className="rewind" onClick={s.rewind} disabled={s.history.length<=(s.crisis?1:0)}><Undo2 size={16}/><span>Undo</span></button>
    <button className="icon" aria-label={s.crisis?'Restart crisis':'Reset experiment'} onClick={s.crisis?s.startCrisis:s.reset}><RotateCcw size={16}/></button>
   </div>
  </div>
  <input id="simulation-timeline" aria-label="Simulation timeline" aria-valuetext={`${clock} hours since deletion`} type="range" min="0" max={deadline} step="0.25" value={s.time} disabled={!s.history.length} onChange={e=>s.seek(Number(e.target.value))}/>
  <div className="time-labels"><span>0 MIN</span>{[1,2,3,4].map(part=><span key={part}>{deadline*part/4} HRS</span>)}</div>
  <div className="event-line" aria-live="polite"><span className={s.outage?'warn':'good'}>&#9679;</span>{crisisFinished?'12-hour crisis complete. Review the mission result or rewind a response.':s.caseStudy&&s.caseStudy.diagnosis!=='correct'?'Observed failure. Inspect services and record evidence to test a diagnosis.':outageMessage(s)}</div>
 </div>;
}
