import { test } from 'node:test';
import assert from 'node:assert/strict';
import { CameraGesture } from '../src/camera.ts';

const origin = { x: 200, y: 100 };
test('a tap does not move the camera; dragging does not select a building', () => {
  const c = new CameraGesture(); c.down(1, { x: 100, y: 100 });
  c.move(1, { x: 102, y: 102 }, origin);
  assert.deepEqual(c.pan, { x: 0, y: 0 }); assert.equal(c.up(1), true);
  c.down(1, { x: 100, y: 100 }); c.move(1, { x: 130, y: 120 }, origin);
  assert.deepEqual(c.pan, { x: 30, y: 20 }); assert.equal(c.up(1), false);
});
test('pinch zoom has bounds and never becomes a selection', () => {
  const c = new CameraGesture(); c.down(1, { x: 100, y: 100 }); c.down(2, { x: 200, y: 100 });
  c.move(2, { x: 300, y: 100 }, origin); assert.equal(c.zoom, 2);
  c.move(2, { x: 900, y: 100 }, origin); assert.equal(c.zoom, 2.8);
  assert.equal(c.up(2), false); assert.equal(c.up(1), false);
});
test('cancelled gestures and unknown pointers cannot inspect a building', () => {
  const c = new CameraGesture(); c.down(1, origin); c.cancel(1);
  assert.equal(c.up(1), false); assert.equal(c.up(9), false);
});
test('zoom is anchored at the cursor and reset restores the initial view', () => {
  const c = new CameraGesture(), point = { x: 300, y: 200 };
  c.zoomAt(2, point, origin);
  assert.equal((point.x - origin.x - c.pan.x) / c.zoom, 100);
  c.reset(); assert.equal(c.zoom, 1); assert.deepEqual(c.pan, { x: 0, y: 0 });
});
