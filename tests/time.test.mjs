import { test } from 'node:test';
import assert from 'node:assert/strict';
import { formatTime } from '../src/time.ts';

test('clock formatting carries whole minutes without floating-point underflow', () => {
  for (const [hours, expected] of [[2.05, '02:03'], [1.9999999999999978, '02:00'], [0, '00:00'], [24, '24:00']]) {
    assert.equal(formatTime(hours), expected);
  }
  assert.equal(formatTime((60_000 - 1) / 3_600_000), '00:00');
});
