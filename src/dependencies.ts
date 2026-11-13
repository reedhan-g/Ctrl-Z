import type { BuildingId } from './simulation.ts';

export interface Dependency {
  source: BuildingId;
  target: BuildingId;
  system: 'electricity' | 'water';
  bufferHours: number;
}

// The simulator, investigation panel and map all use this same network.
export const dependencies: readonly Dependency[] = [
  { source: 'grid', target: 'hospital', system: 'electricity', bufferHours: 0 },
  { source: 'grid', target: 'water', system: 'electricity', bufferHours: 0 },
  { source: 'grid', target: 'homes', system: 'electricity', bufferHours: 0 },
  { source: 'water', target: 'homes', system: 'water', bufferHours: 0 },
  { source: 'water', target: 'hospital', system: 'water', bufferHours: 12 },
];

export function upstreamPaths(target: BuildingId): BuildingId[][] {
  function visit(id: BuildingId, visited: Set<BuildingId>): BuildingId[][] {
    if (visited.has(id)) throw new Error('Dependency cycle detected');
    const incoming = dependencies.filter(d => d.target === id);
    if (!incoming.length) return [[id]];
    const seen = new Set(visited).add(id);
    return incoming.flatMap(d => visit(d.source, seen).map(path => [...path, id]));
  }
  return visit(target, new Set());
}
