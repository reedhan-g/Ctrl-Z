import type { Point } from './geometry.ts';

export class CameraGesture {
  zoom = 1;
  pan: Point = { x: 0, y: 0 };
  private pointers = new Map<number, Point>();
  private start: Point = { x: 0, y: 0 };
  private last: Point = { x: 0, y: 0 };
  private moved = false;

  down(id: number, p: Point) {
    if (this.pointers.size >= 2) return;
    this.pointers.set(id, p);
    if (this.pointers.size === 1) { this.start = this.last = p; this.moved = false; }
    else this.moved = true;
  }

  move(id: number, p: Point, origin: Point) {
    if (!this.pointers.has(id)) return;
    const previous = [...this.pointers.values()];
    this.pointers.set(id, p);
    if (this.pointers.size === 2) {
      const next = [...this.pointers.values()];
      const midpoint = (a: Point, b: Point) => ({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 });
      const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.y - b.y);
      const oldMid = midpoint(previous[0], previous[1]), newMid = midpoint(next[0], next[1]);
      const oldDistance = distance(previous[0], previous[1]);
      if (oldDistance > 0) this.zoomAt(distance(next[0], next[1]) / oldDistance, oldMid, origin);
      this.pan.x += newMid.x - oldMid.x; this.pan.y += newMid.y - oldMid.y;
      this.moved = true;
    } else {
      if (!this.moved && Math.hypot(p.x - this.start.x, p.y - this.start.y) < 6) return;
      this.moved = true;
      this.pan.x += p.x - this.last.x; this.pan.y += p.y - this.last.y;
    }
    this.last = p;
  }

  up(id: number): boolean {
    if (!this.pointers.has(id)) return false;
    const tap = !this.moved && this.pointers.size === 1;
    this.pointers.delete(id);
    if (this.pointers.size) { this.last = [...this.pointers.values()][0]; this.moved = true; }
    return tap;
  }

  cancel(id: number) { this.moved = true; this.up(id); }
  zoomAt(factor: number, point: Point, origin: Point) {
    const next = Math.max(.55, Math.min(2.8, this.zoom * factor)), ratio = next / this.zoom;
    this.pan = { x: point.x - origin.x - (point.x - origin.x - this.pan.x) * ratio,
      y: point.y - origin.y - (point.y - origin.y - this.pan.y) * ratio };
    this.zoom = next;
  }
  reset() { this.zoom = 1; this.pan = { x: 0, y: 0 }; this.pointers.clear(); this.moved = true; }
}
