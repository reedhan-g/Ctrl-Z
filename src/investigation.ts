import { buildings, status, reserveDeadline, type BuildingId, type Snapshot } from './simulation.ts';
import { dependencies, type Dependency } from './dependencies.ts';

export function diagnoseDependency(edge: Dependency, s: Snapshot) {
  const sourceOnline = status(edge.source, s).tone !== 'bad';
  const deadline = edge.system === 'electricity' ? reserveDeadline(edge.target, s)
    : reserveDeadline(edge.source, s) + edge.bufferHours;
  const remaining = s.outage ? Math.max(0, deadline - s.time) : 0;
  const available = sourceOnline || remaining > 0;
  let evidence: string;
  if (edge.system === 'electricity') evidence = sourceOnline ? 'Grid power is available.'
    : available ? `Backup power is bridging the outage: ${remaining.toFixed(1)}h remaining.` : 'Both grid and backup power are unavailable.';
  else if(edge.system==='communications') evidence=sourceOnline ? 'Dispatch communications are available.'
    : 'Dispatch link lost. Manual routing continues at 35% capacity while hub power lasts.';
  else evidence = sourceOnline ? 'Powered pumps are supplying water.'
    : available ? `On-site water storage is bridging the pump failure: ${remaining.toFixed(1)}h remaining.` : 'Pumps are offline and no stored water remains.';
  return { ...edge, sourceOnline, available, remaining, evidence };
}

export const investigate = (id: BuildingId, s: Snapshot) => dependencies
  .filter(edge => edge.target === id).map(edge => diagnoseDependency(edge, s));

export interface Incident {
  id: string;
  time: number;
  building: BuildingId;
  kind: 'outage' | 'delivery' | 'status' | 'recovery';
  message: string;
}

// Reconstruct only observed events, including failures before a late delivery.
// No frame-by-frame storage and no future events are exposed to the investigator.
export function incidentLog(s: Snapshot): Incident[] {
  if (!s.outage && s.restoredAt === null) return [];
  const horizon = s.restoredAt ?? s.time;
  const supplyTime = (id: BuildingId) => s.supplyAt[id] ?? 0;
  const at = (time: number): Snapshot => {
    const boosted = s.boosted.filter(id => supplyTime(id) <= time);
    return { ...s, outage: true, restoredAt: null, time, boosted };
  };
  const times = new Set<number>([0]);
  for (const b of buildings) {
    if (b.reserve > 0) times.add(b.reserve);
    times.add(reserveDeadline(b.id, s));
    if (s.boosted.includes(b.id)) times.add(supplyTime(b.id));
  }
  for (const edge of dependencies.filter(d => d.system === 'water')) {
    const source = buildings.find(b => b.id === edge.source)!;
    times.add(source.reserve + edge.bufferHours);
    times.add(reserveDeadline(edge.source, s) + edge.bufferHours);
  }
  const entries: Incident[] = [{ id: 'grid:outage:0', time: 0, building: 'grid', kind: 'outage', message: 'District grid disconnected.' }];
  const previous = new Map<BuildingId, string>();
  for (const time of [...times].filter(t => t <= horizon).sort((a, b) => a - b)) {
    for (const id of s.boosted.filter(id => supplyTime(id) === time)) {
      entries.push({ id: `${id}:delivery:${time}`, time, building: id, kind: 'delivery',
        message: `${buildings.find(b => b.id === id)!.name}: backup supplies delivered.` });
    }
    for (const b of buildings.filter(b => b.id !== 'grid')) {
      const current = status(b.id, at(time));
      if (current.label !== previous.get(b.id)) {
        entries.push({ id: `${b.id}:status:${time}`, time, building: b.id, kind: 'status', message: `${b.name}: ${current.label.toLowerCase()}.` });
        previous.set(b.id, current.label);
      }
    }
  }
  if (s.restoredAt !== null) entries.push({ id: `grid:recovery:${horizon}`, time: horizon, building: 'grid',
    kind: 'recovery', message: 'Grid restored. All district services recovered.' });
  return entries;
}
