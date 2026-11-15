import {test} from 'node:test';
import assert from 'node:assert/strict';
import {spriteHit} from '../src/spriteHit.ts';
import {iso} from '../src/geometry.ts';

test('sprite picking follows a stepped hospital silhouette instead of its bounding prism',()=>{
 assert.equal(spriteHit('hospital',6,2,iso(6.9,2.9,30)),true);
 assert.equal(spriteHit('hospital',6,2,iso(7.85,2.1,70)),false,'empty space beside the stepped patient wing');
 assert.equal(spriteHit('hospital',6,2,{x:-10000,y:-10000}),false);
});
