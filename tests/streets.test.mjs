import {test} from 'node:test';
import assert from 'node:assert/strict';
import {streets,roadAt,chunkRoadMask} from '../src/world.ts';
import {neighborhoodBlocks} from '../src/neighborhoods.ts';
import {cityScenery} from '../src/worldScenery.ts';

test('authored streets form one connected network with partial streets and reclaimed courts',()=>{
 const cells=[];
 for(let x=-25;x<35;x++)for(let y=-25;y<35;y++)if(roadAt(x+.5,y+.5))cells.push(`${x},${y}`);
 const remaining=new Set(cells),queue=[cells[0]];remaining.delete(cells[0]);
 for(let i=0;i<queue.length;i++){
  const [x,y]=queue[i].split(',').map(Number);
  for(const [a,b] of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]])if(remaining.delete(`${a},${b}`))queue.push(`${a},${b}`);
 }
 assert.equal(remaining.size,0);assert.ok(streets.some(s=>s.to-s.from<20));
 assert.equal(roadAt(14.5,14.5),false,'old uniform grid junction becomes a pedestrian garden');
 assert.equal(roadAt(4.5,4.5),true,'civic crossroads stays connected');
 assert.equal(chunkRoadMask(-20,-20),15,'Lantern ground matches its real four road edges');
});

test('authored civic and Lantern blocks keep frontages behind continuous sidewalks',()=>{
 assert.ok(neighborhoodBlocks.length>=15);
 for(const block of neighborhoodBlocks){
  const parcels=cityScenery.filter(b=>b.x>=block.x&&b.x<block.x+4&&b.y>=block.y&&b.y<block.y+4);
  assert.equal(parcels.length,2,block.court);
  for(const b of parcels){
   assert.ok(b.x+b.width<=block.x+3.55+1e-8);assert.ok(b.y+b.depth<=block.y+3.55+1e-8);
  }
 }
});
