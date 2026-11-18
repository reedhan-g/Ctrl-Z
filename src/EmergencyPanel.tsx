import { useRef, useState } from 'react';
import { buildings, useGame, type BuildingId } from './game';
import { formatTime } from './time';
import type { Emergency } from './emergencies';
import type { ReplayBranch } from './replay';

const dismissedByRun = new WeakMap<ReplayBranch, Set<string>>();

export default function EmergencyPanel({ events, run }: { events: Emergency[]; run: ReplayBranch }) {
  const select = useGame(game => game.select);
  const [, setDismissals] = useState(0);
  const history = useRef<HTMLElement>(null);
  if (!events.length) return null;
  const latest = events[events.length - 1];
  const dismissed = dismissedByRun.get(run);
  const name = buildings.find(building => building.id === latest.building)!.name;
  const inspect = (id: BuildingId) => {
    select(id);
    requestAnimationFrame(() => document.querySelector('.inspector')?.scrollIntoView({ block: 'nearest' }));
  };
  const dismiss = () => {
    const entries = dismissed ?? new Set<string>();
    entries.add(latest.id);
    dismissedByRun.set(run, entries);
    history.current?.focus({ preventScroll: true });
    setDismissals(count => count + 1);
  };

  return <section className="emergency-panel" id="city-emergencies" aria-labelledby="emergency-title">
    <h2 id="emergency-title">City emergencies</h2>
    {!dismissed?.has(latest.id) && <article className="emergency-card" data-kind={latest.kind}>
      <div aria-live="polite" aria-atomic="true">
        <p className="emergency-time">{formatTime(latest.time)} · {latest.kind === 'recovery' ? 'Service recovery' : 'Service disruption'}</p>
        <h3>{latest.title}</h3>
        <p>{latest.message}</p>
      </div>
      <div className="emergency-actions">
        <button onClick={() => inspect(latest.building)}>Inspect {name}</button>
        <button onClick={dismiss}>Dismiss</button>
      </div>
    </article>}
    <details>
      <summary ref={history}>Incident history · {events.length}</summary>
      <ol>
        {events.slice(-6).map(event => <li key={event.id}><time>{formatTime(event.time)}</time><span>{event.title}</span></li>)}
      </ol>
      {events.length > 6 && <p>Showing the six most recent changes.</p>}
    </details>
  </section>;
}
