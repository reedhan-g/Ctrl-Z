import { useMemo } from 'react';
import { buildings, type Snapshot, type BuildingId } from './simulation';
import { upstreamPaths } from './dependencies';
import { investigate, incidentLog } from './investigation';

interface Props { building: BuildingId; snapshot: Snapshot; onSelect: (id: BuildingId) => void }
const nameOf = (id: BuildingId) => buildings.find(b => b.id === id)!.name;

export default function InvestigationPanel({ building, snapshot, onSelect }: Props) {
  const diagnosis = investigate(building, snapshot);
  const events = useMemo(() => incidentLog(snapshot),
    [snapshot.time, snapshot.outage, snapshot.restoredAt, snapshot.boosted, snapshot.supplyAt]);
  return <div className="investigation">
    <details>
      <summary>Investigate connections <span>{diagnosis.length}</span></summary>
      {diagnosis.length === 0 ? <p>The regional grid feeds this substation. Disconnecting it affects every building downstream.</p>
        : diagnosis.map(edge => <div className={`evidence ${edge.available ? 'available' : 'blocked'}`} key={`${edge.source}:${edge.system}`}>
          <div className="evidence-heading"><strong>{edge.system === 'water' ? 'Water supply' : 'Electricity'}</strong>
            <span>{edge.sourceOnline ? 'Connected' : edge.available ? 'On reserve' : 'Interrupted'}</span></div>
          <p>{edge.evidence}</p>
          <button onClick={() => onSelect(edge.source)}>Inspect {nameOf(edge.source)} <span aria-hidden="true">&rarr;</span></button>
        </div>)}
      <div className="causal-paths"><span className="eyebrow">TRACE TO THE SOURCE</span>
        {upstreamPaths(building).map(path => <p key={path.join(':')}>{path.map(nameOf).join(' / ')}</p>)}
      </div>
    </details>
    <details>
      <summary>Incident log <span>{events.length}</span></summary>
      {events.length === 0 ? <p>No incidents recorded. Remove electricity to begin an investigation.</p>
        : <ol className="incident-list">{[...events].reverse().map(event => <li key={event.id}>
          <time>{Math.floor(event.time).toString().padStart(2, '0')}:{Math.floor(event.time % 1 * 60 + 1e-6).toString().padStart(2, '0')}</time>
          <button onClick={() => onSelect(event.building)}>{event.message}</button>
        </li>)}</ol>}
    </details>
  </div>;
}
