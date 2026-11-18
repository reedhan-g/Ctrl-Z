import { incidentLog } from './investigation.ts';
import { replayAt, type ReplayBranch } from './replay.ts';
import { buildings, serviceCapacity, status, type BuildingId, type Snapshot } from './simulation.ts';

export interface Emergency {
  id: string;
  time: number;
  building: BuildingId;
  kind: 'disruption' | 'recovery';
  title: string;
  message: string;
}

const services = buildings.filter(building => building.id !== 'grid');

function disruption(building: BuildingId, before: Snapshot, after: Snapshot) {
  const condition = status(building, after);
  switch (building) {
    case 'homes': return condition.label === 'No water'
      ? { title: 'Residential water interrupted', message: 'Maple residences lost their connection to the Waterworks.' }
      : { title: 'Residential batteries depleted', message: 'Common-area backup power at Maple residences is exhausted.' };
    case 'telecom': {
      const manualDispatch = status('logistics', after).label === 'Manual dispatch' &&
        serviceCapacity('logistics', before) > serviceCapacity('logistics', after);
      return { title: 'Communications lost', message: 'Meridian telecom exhausted its battery.' +
        (manualDispatch ? ' The delivery hub has switched to manual dispatch.' : '') };
    }
    case 'water': {
      const buffered = serviceCapacity('hospital', after) > 0 && condition.tone === 'bad';
      return { title: 'Waterworks stopped', message: 'Backup power for pumping is exhausted.' +
        (buffered ? ' St. Mira Hospital is drawing from its water buffer.' : '') };
    }
    case 'hospital': return condition.label === 'No water'
      ? { title: 'Hospital water exhausted', message: 'St. Mira Hospital has used its stored water. Generator fuel cannot replace it.' }
      : { title: 'Hospital generator depleted', message: 'St. Mira Hospital has lost backup power. Critical services are offline.' };
    case 'logistics': return condition.label === 'Manual dispatch'
      ? { title: 'Dispatch limited', message: 'The delivery hub is routing consignments manually.' }
      : { title: 'Delivery hub stopped', message: 'Backup power for dispatch has run out.' };
    default: return { title: 'Region disconnected', message: 'Grid power is unavailable.' };
  }
}

/** Evaluate only the replay's known transition boundaries. */
export function emergencyEvents(branch: ReplayBranch, horizon: number): Emergency[] {
  const end = replayAt(branch, horizon);
  const times = [...new Set(incidentLog(end).map(incident => incident.time))].sort((a, b) => a - b);
  const events: Emergency[] = [];
  let before = replayAt(branch, 0);
  for (const time of times) {
    const after = replayAt(branch, time);
    if (!after.outage) {
      events.push({ id: `grid:recovery:${time}`, time, building: 'grid', kind: 'recovery',
        title: 'Grid power restored', message: 'Regional power is available again. District services have recovered.' });
      break;
    }
    if (time === 0) continue;
    const telecomLost = serviceCapacity('telecom', before) > 0 && serviceCapacity('telecom', after) === 0;
    for (const service of services) {
      const from = serviceCapacity(service.id, before);
      const to = serviceCapacity(service.id, after);
      if (from === to || (service.id === 'logistics' && telecomLost && from > to &&
        status('logistics', after).label === 'Manual dispatch')) continue;
      const kind = to > from ? 'recovery' : 'disruption';
      const copy = kind === 'recovery'
        ? { title: `${service.name} ${from === 0 ? 'recovered' : 'improved'}`,
            message: `Service capacity rose from ${Math.round(from * 100)}% to ${Math.round(to * 100)}%.` }
        : disruption(service.id, before, after);
      events.push({ id: `${service.id}:${kind}:${time}:${from}:${to}`, time, building: service.id, kind, ...copy });
    }
    before = after;
  }
  return events;
}
