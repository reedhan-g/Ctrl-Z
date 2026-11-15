import {cityScenery} from './worldScenery';
import {districts} from './world';
import {sceneryInfo} from './sceneryInfo';
import {inspectScenery} from './selection';
import {useNavigation} from './navigation';

export default function SceneryBrowser(){
 const id=useNavigation(s=>s.sceneryId);
 return <details className="scenery-browser"><summary>Explore city buildings</summary>
  <label htmlFor="scenery-chooser">Informational scenery</label>
  <select id="scenery-chooser" aria-label="Inspect a city building" value={id??''} onChange={e=>inspectScenery(e.target.value||null)}>
   <option value="">Choose a building…</option>
   {districts.map(d=><optgroup key={d.id} label={d.name}>{cityScenery.filter(b=>b.district.id===d.id).map((b,i)=><option value={b.id} key={b.id}>{sceneryInfo(b).name} · {d.name} {i+1}</option>)}</optgroup>)}
  </select><small>These locations have no independent simulation mechanics.</small>
 </details>;
}
