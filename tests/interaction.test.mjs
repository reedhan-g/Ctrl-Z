import { test } from 'node:test';
import assert from 'node:assert/strict';
import { iso, pickBuilding, prismFaces, pointInPolygon } from '../src/geometry.ts';
import { shortcutFor } from '../src/keyboard.ts';

test('residence roof selects the foreground residence, not the substation', () => {
  assert.equal(pickBuilding(iso(6.94, 6.94, 121)), 'homes');
});
test('roof and facade taps select hospital and waterworks', () => {
  assert.equal(pickBuilding(iso(6.94, 2.94, 100)), 'hospital');
  assert.equal(pickBuilding(iso(2.94, 6.94, 63)), 'water');
  assert.equal(pickBuilding(iso(7.77, 2.8, 30)), 'hospital');
});
test('empty streets and off-map taps do not select a nearby building', () => {
  assert.equal(pickBuilding(iso(4.5, 9.5)), null);
  assert.equal(pickBuilding({ x: 1000, y: -1000 }), null);
});
test('polygon boundaries count as part of the visible building', () => {
  const face = prismFaces(0, 0, 1, 1, 10)[2];
  assert.equal(pointInPolygon(face[0], face), true);
});
const key = (patch = {}) => ({ key: 'z', code: 'KeyZ', ctrlKey: true, metaKey: false, altKey: false, repeat: false, ...patch });
test('undo remains available after a button gets focus', () => {
  assert.equal(shortcutFor(key(), false, true), 'undo');
  assert.equal(shortcutFor(key({ ctrlKey: false, metaKey: true, key: 'Z' }), false, true), 'undo');
  assert.equal(shortcutFor(key({ shiftKey: true }), false, true), null);
});
test('editing retains native undo but Escape always closes an overlay', () => {
  assert.equal(shortcutFor(key(), true, true), null);
  assert.equal(shortcutFor(key({ key: 'Escape' }), true, true), 'close');
});
test('Space toggles time on the map and activates focused buttons natively', () => {
  const space = key({ key: ' ', code: 'Space', ctrlKey: false });
  assert.equal(shortcutFor(space, false, false), 'toggle');
  assert.equal(shortcutFor(space, false, true), null);
  assert.equal(shortcutFor({ ...space, repeat: true }, false, false), null);
});
