import { Graphics } from 'pixi.js';
import { iso, prismFaces, flatten } from './geometry.ts';
import type { buildings } from './simulation.ts';

type Building = typeof buildings[number];
export const neon = { grid:0xe9c86d, hospital:0x65e4e8, water:0x52d5bc,
  homes:0xe27abf, telecom:0xb494ee, logistics:0xeabb69 };

export function block(g:Graphics,x:number,y:number,w:number,d:number,h:number,
  colors:number[]=[0x242331,0x161c29,0x393746],bottom=0) {
  prismFaces(x,y,w,d,h,bottom).forEach((p,i)=>g.poly(flatten(p)).fill(colors[i]));
}

// Original modular facade vocabulary: stepped parapets, floor bands, service
// cabinets and fire escapes. No reference image is flattened into the scene.
export function buildingShell(g:Graphics,b:Building) {
  const {x,y,height:h}=b;
  block(g,x,y,1.9,1.9,7,[0x292c38,0x1c2430,0x535060]);
  const roof=b.id==='homes'?0x473448:b.id==='hospital'?0x31454e:0x353342;
  block(g,x+.12,y+.12,1.65,1.65,h,[0x292735,0x1a1e2b,roof],7);
  // Recessed roof and crisp parapet edges; same geometry as picking envelope.
  block(g,x+.4,y+.4,1,1,h+6,[0x302f40,0x202735,0x4b4859],h);
  for(let floor=20;floor<h-5;floor+=14) {
    const a=iso(x+.12,y+1.77,floor),c=iso(x+1.77,y+1.77,floor),d=iso(x+1.77,y+.12,floor);
    g.moveTo(a.x,a.y).lineTo(c.x,c.y).lineTo(d.x,d.y).stroke({color:0x424151,width:1});
  }
  // Distinct architecture inside the shared selectable footprint.
  if(b.id==='homes') {
    for(let z=28;z<h-8;z+=28) block(g,x+.35,y+1.7,.7,.18,z,[0x504050,0x272436,0x5c4a61],z-3);
  } else if(b.id==='hospital') {
    for(let i=0;i<3;i++) block(g,x+.25+i*.4,y+.45,.27,.4,h+4,[0x414753,0x282f3a,0x5d6871],h);
  } else if(b.id==='grid') {
    for(let i=0;i<3;i++) {
      const p=iso(x+.45+i*.4,y+.8,h+5);
      g.rect(p.x-3,p.y-9,6,9).fill(0x7a7169).rect(p.x-4,p.y-10,8,2).fill(0xd7b77b);
    }
  } else if(b.id==='logistics') {
    for(let i=0;i<3;i++) {
      const p=iso(x+.35+i*.43,y+1.79,10);
      g.poly([p.x,p.y,p.x+9,p.y+4,p.x+9,p.y-11,p.x,p.y-15]).fill(0x484354);
    }
  } else if(b.id==='telecom') {
    const p=iso(x+.9,y+.9,h+6);
    g.moveTo(p.x-8,p.y+3).lineTo(p.x,p.y-27).lineTo(p.x+8,p.y+3).stroke({color:0x8a839d,width:2});
  }
  // A fire escape and roof vents add readable pixel-scale detail.
  const p=iso(x+1.78,y+.38,12),q=iso(x+1.78,y+.38,h-7);
  g.moveTo(p.x,p.y).lineTo(q.x,q.y).stroke({color:0x71657b,width:1});
  for(let z=15;z<h-8;z+=8){const r=iso(x+1.78,y+.38,z);g.rect(r.x-3,r.y,6,1).fill(0x685d74);}
}

export function lightFacade(g:Graphics,b:Building,online:boolean) {
  const accent=online?neon[b.id]:0x2d293a;
  for(let side=0;side<2;side++)for(let row=0;row<Math.floor(b.height/14)-1;row++)for(let col=0;col<4;col++) {
    const p=iso(b.x+(side?1.78:.27+col*.36),b.y+(side?.27+col*.36:1.78),16+row*14);
    const dy=side?-2:2;
    const color=!online?0x292e3d:(row+col)%4===0?0xf4c66f:accent;
    g.poly([p.x,p.y,p.x+5,p.y+dy,p.x+5,p.y+6+dy,p.x,p.y+6]).fill(color);
  }
  // Narrow neon cornice and shopfront, with no blur or bloom filters.
  for(const z of [10,b.height-3]) {
    const a=iso(b.x+.12,b.y+1.79,z),c=iso(b.x+1.79,b.y+1.79,z),d=iso(b.x+1.79,b.y+.12,z);
    g.moveTo(a.x,a.y).lineTo(c.x,c.y).lineTo(d.x,d.y).stroke({color:accent,width:2});
  }
}

export function streetDetails(g:Graphics) {
  for(const road of [4,9])for(let i=0;i<10;i++)for(const flip of [false,true]) {
    const x=flip?i+.2:road+.45,y=flip?road+.45:i+.2;
    const a=iso(x,y),b=iso(x+(flip?.42:0),y+(flip?0:.42));
    g.moveTo(a.x,a.y).lineTo(b.x,b.y).stroke({color:0x998d9e,width:1});
    if(i===4||i===9)for(let j=0;j<5;j++) {
      const p=iso(x+(flip?j*.13:0),y+(flip?0:j*.13));
      g.poly([p.x,p.y,p.x+10,p.y+5,p.x+7,p.y+7,p.x-3,p.y+2]).fill(0x6b6575);
    }
  }
}
