import { buildings, type BuildingId } from './simulation.ts';

export interface Point { x: number; y: number }
export const iso = (x: number, y: number, z = 0): Point => ({ x: (x - y) * 39, y: (x + y) * 20 - z });

// Drawing and picking share exactly the same projected prism faces.
export function prismFaces(x: number, y: number, w: number, d: number, top: number, bottom = 0): Point[][] {
  const a = iso(x, y, top), b = iso(x + w, y, top), c = iso(x + w, y + d, top), e = iso(x, y + d, top);
  const b0 = iso(x + w, y, bottom), c0 = iso(x + w, y + d, bottom), e0 = iso(x, y + d, bottom);
  return [[e, c, c0, e0], [b, c, c0, b0], [a, b, c, e]];
}

export const sortedBuildings = [...buildings].sort((a, b) => (a.x + a.y) - (b.x + b.y));
export function buildingFaces(b: typeof buildings[number]): Point[][] {
  return [
    ...prismFaces(b.x, b.y, 1.9, 1.9, 7),
    ...prismFaces(b.x + .12, b.y + .12, 1.65, 1.65, b.height, 7),
    ...prismFaces(b.x + .4, b.y + .4, 1, 1, b.height + 6, b.height),
  ];
}

export function pointInPolygon(point: Point, polygon: Point[]): boolean {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const a = polygon[i], b = polygon[j];
    const cross = (point.x - a.x) * (b.y - a.y) - (point.y - a.y) * (b.x - a.x);
    if (Math.abs(cross) < 1e-6 && point.x >= Math.min(a.x, b.x) && point.x <= Math.max(a.x, b.x)
      && point.y >= Math.min(a.y, b.y) && point.y <= Math.max(a.y, b.y)) return true;
    if ((a.y > point.y) !== (b.y > point.y)
      && point.x < (b.x - a.x) * (point.y - a.y) / (b.y - a.y) + a.x) inside = !inside;
  }
  return inside;
}

export function pickBuilding(point: Point): BuildingId | null {
  for (const b of [...sortedBuildings].reverse()) {
    if (buildingFaces(b).some(face => pointInPolygon(point, face))) return b.id;
  }
  return null;
}

export const flatten = (points: Point[]) => points.flatMap(p => [p.x, p.y]);
