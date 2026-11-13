import {useState} from 'react';
import {Zap,ArrowRight} from 'lucide-react';
import {useGame,buildings,type BuildingId} from './game';
import {cases,caseRecovered,evidenceText} from './cases';

export default function ScenarioPanel(){
 const s=useGame(),[hypothesis,setHypothesis]=useState<BuildingId>('grid');
 const progress=s.caseStudy,definition=progress?cases[progress.id]:null;
 return <div className="scenario-panel" id="scenario">
  <nav className="mode-tabs" aria-label="Game mode"><button aria-pressed={!progress} onClick={s.reset}>Sandbox</button>
   <button aria-pressed={!!progress} onClick={()=>s.startCase('dispatch')}>Investigation</button></nav>
  {!progress?<>
   <div className="section-heading"><span>THE SCENARIO</span><span>01 / ELECTRICITY</span></div>
   <button className={`scenario ${s.outage?'active':''}`} onClick={s.fail} disabled={s.outage}><Zap size={21}/><span><strong>Electricity</strong><small>{s.outage?'Removed from reality':'The current that connects us'}</small></span></button>
   <p className="scenario-description">Disconnect one system. Follow the cascade, then compare your response.</p>
   <button className={`primary ${s.outage?'restore':''}`} onClick={s.outage?s.restore:s.fail}><Zap size={16}/>{s.outage?'Restore electricity':'Remove electricity'}<ArrowRight size={17}/></button>
  </>:<div className="case-brief">
   <label>Case <select aria-label="Investigation case" value={progress.id} onChange={e=>s.startCase(e.target.value as keyof typeof cases)}>{Object.entries(cases).map(([id,c])=><option key={id} value={id}>{c.name}</option>)}</select></label>
   <h2>{definition!.name}</h2><p>{definition!.observation}</p>
   <p>Record readings at {definition!.time}h from {definition!.required.map(id=>buildings.find(b=>b.id===id)!.name).join(', ')}. Inspect connections to decide what failed.</p>
   <ul>{progress.evidence.map(e=><li key={`${e.building}:${e.time}`}>{evidenceText(e)}</li>)}</ul>
   <label>Failing dependency <select aria-label="Failing dependency" value={hypothesis} onChange={e=>setHypothesis(e.target.value as BuildingId)}>{buildings.map(b=><option key={b.id} value={b.id}>{b.name}</option>)}</select></label>
   <button className="supply" disabled={progress.evidence.length<3} onClick={()=>s.diagnose(hypothesis)}>Test diagnosis</button>
   <p role="status">{progress.diagnosis==='correct'?'Evidence supports your diagnosis. Test a recovery with the remaining teams.':progress.diagnosis==='incorrect'?'That diagnosis does not explain the readings. Recheck dependencies and reserves.':'Cause unconfirmed. Gather readings before intervening.'}</p>
   {caseRecovered(progress,s)&&<p className="case-success" role="status">Recovery verified in the simulation. Rewind to compare another strategy.</p>}
   {progress.diagnosis==='correct'&&s.outage&&<button className="supply" onClick={s.restore}>Restore district power</button>}
  </div>}
 </div>;
}
