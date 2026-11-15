import InspectionShell from './InspectionShell';
import {inspectScenery} from './selection';
import {sceneryInfo} from './sceneryInfo';
import type {Scenery} from './worldScenery';

export default function SceneryInspector({building}:{building:Scenery}){
 const info=sceneryInfo(building);
 return <InspectionShell title={info.name} category={`${info.category} · CITY SCENERY`} status={{label:'Informational · not simulated',tone:'scenery'}} onClose={()=>inspectScenery(null)}>
  <p>{info.purpose}</p><div className="dependency">District · {info.district}</div>
  <p className="scenery-note">This is an informational city building. Individual services, reserves and recovery actions are not modeled here.</p>
  <p>Inspect the six infrastructure facilities for simulation-connected services and interventions.</p>
 </InspectionShell>;
}
