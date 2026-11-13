import { Pause, Play, RotateCcw, Undo2 } from 'lucide-react';
import { useGame, buildings, status } from './game';
import { outageMessage } from './simulation';
import { replayAt } from './replay';
import { formatTime } from './time';

export default function Timeline() {
 const s=useGame();
 const clock=formatTime(s.time);
 const baseline=replayAt(s.branches[0],s.time);
 const online=(snapshot: typeof baseline)=>buildings.filter(b=>status(b.id,snapshot).tone!=='bad').length;
 return <div className="timeline">
  {s.history.length>0&&<div className="branch-controls">
   <label>Timeline <select aria-label="Replay branch" value={s.activeBranch} onChange={e=>s.branch(Number(e.target.value))}>
    {s.branches.map(b=><option value={b.id} key={b.id}>{b.name}</option>)}
   </select></label>
   <span aria-label="Outcome comparison">{online(s)}/{buildings.length} online <span className="muted">vs original {online(baseline)}/{buildings.length} at {clock}</span></span>
  </div>}
  <div className="timeline-heading"><div><span className="eyebrow">TIME SINCE DELETION</span><strong>{clock}<small> HRS</small></strong></div>
   <div className="playback">
    <button aria-label={s.playing?'Pause simulation':'Play simulation'} disabled={!s.outage||s.time>=24} onClick={s.toggle}>{s.playing?<Pause size={17}/>:<Play size={17}/>}</button>
    <button className="speed" onClick={()=>s.setSpeed(s.speed===1?4:s.speed===4?12:1)} aria-label="Change simulation speed">{s.speed}x</button>
    <button aria-label="Undo" className="rewind" onClick={s.rewind} disabled={!s.history.length}><Undo2 size={16}/><span>Undo</span></button>
    <button className="icon" aria-label="Reset experiment" onClick={s.reset}><RotateCcw size={16}/></button>
   </div>
  </div>
  <input aria-label="Simulation timeline" aria-valuetext={`${clock} hours since deletion`} type="range" min="0" max="24" step="0.25" value={s.time} disabled={!s.history.length} onChange={e=>s.seek(Number(e.target.value))}/>
  <div className="time-labels"><span>0 MIN</span><span>6 HRS</span><span>12 HRS</span><span>18 HRS</span><span>24 HRS</span></div>
  <div className="event-line" aria-live="polite"><span className={s.outage?'warn':'good'}>&#9679;</span>{s.caseStudy&&s.caseStudy.diagnosis!=='correct'?'Observed failure. Inspect services and record evidence to test a diagnosis.':outageMessage(s)}</div>
 </div>;
}
