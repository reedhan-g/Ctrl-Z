import {Container,Graphics,Sprite,Text} from 'pixi.js';
import {chunks,isRoad,districtAt} from './world.ts';
import {cityScenery,sceneryDepth,boundsOf,groundPolygon,polygonNumbers,type Rect} from './worldScenery.ts';
import {iso} from './geometry.ts';
import {block} from './cityArt.ts';
import {architecture,type CityTextures} from './pixelArt.ts';

export interface CullEntry {node:Container;bounds:Rect;kind:'ground'|'scenery'|'service'}
export function buildWorldArt(parent:Container,textures?:CityTextures){
 const entries:CullEntry[]=[],lights: {g:Graphics;draw:(on:boolean)=>void}[]=[];
 const facades:ReturnType<typeof architecture>[]=[];
 for(const chunk of chunks){
  const g=textures?new Sprite(textures.ground):new Graphics();g.zIndex=-9999;parent.addChild(g);
  if(textures){const p=iso(chunk.x,chunk.y);g.position.set(p.x-200,p.y-12);}
  if(g instanceof Graphics)for(let x=chunk.x;x<chunk.x+5;x++)for(let y=chunk.y;y<chunk.y+5;y++){
   const road=isRoad(x)||isRoad(y),color=road?0x151b29:0x252735;
   g.poly(polygonNumbers(groundPolygon(x,y,1))).fill(color);
   if(road){
    const p=iso(x+.5,y+.3),q=iso(x+.5,y+.7);
    if(isRoad(x)&&!isRoad(y))g.moveTo(p.x,p.y).lineTo(q.x,q.y).stroke({color:0x81758c,width:1});
    if(isRoad(y)&&!isRoad(x)){const a=iso(x+.3,y+.5),b=iso(x+.7,y+.5);g.moveTo(a.x,a.y).lineTo(b.x,b.y).stroke({color:0x81758c,width:1});}
    // Four approach crossings leave the actual junction open for vehicles.
    if(isRoad(x)&&!isRoad(y)&&(isRoad(y+1)||isRoad(y-1)))for(let i=0;i<6;i++)g.poly(polygonNumbers([iso(x+.08,y+.1+i*.13),iso(x+.92,y+.1+i*.13),iso(x+.92,y+.16+i*.13),iso(x+.08,y+.16+i*.13)])).fill(0xaaa0ac);
    if(isRoad(y)&&!isRoad(x)&&(isRoad(x+1)||isRoad(x-1)))for(let i=0;i<6;i++)g.poly(polygonNumbers([iso(x+.1+i*.13,y+.08),iso(x+.16+i*.13,y+.08),iso(x+.16+i*.13,y+.92),iso(x+.1+i*.13,y+.92)])).fill(0xaaa0ac);
   }else{
    // Continuous sidewalk bands and curb edges, not isolated corner dots.
    if(isRoad(x+1)||isRoad(x-1)){const a=isRoad(x+1)?x+.72:x;g.poly(polygonNumbers([iso(a,y),iso(a+.28,y),iso(a+.28,y+1),iso(a,y+1)])).fill(0x414353);}
    if(isRoad(y+1)||isRoad(y-1)){const a=isRoad(y+1)?y+.72:y;g.poly(polygonNumbers([iso(x,a),iso(x+1,a),iso(x+1,a+.28),iso(x,a+.28)])).fill(0x414353);}
   }
  }
  entries.push({node:g,bounds:boundsOf(groundPolygon(chunk.x,chunk.y,5),2),kind:'ground'});
  if(textures){
   const lamp=architecture(textures,'streetlamp',chunk.x+3.78,chunk.y+3.78);lamp.sprite.zIndex=(chunk.x+chunk.y+7.7)*100;parent.addChild(lamp.sprite);facades.push(lamp);
   const p=iso(chunk.x+3.78,chunk.y+3.78);entries.push({node:lamp.sprite,bounds:{x:p.x-15,y:p.y-42,width:30,height:55},kind:'scenery'});
   if((chunk.x/5+chunk.y/5)%3===0){const car=architecture(textures,'carAmber',chunk.x+4.22,chunk.y+1.1);car.sprite.zIndex=(chunk.x+chunk.y+6)*100;parent.addChild(car.sprite);
    const p=iso(chunk.x+4.22,chunk.y+1.1);entries.push({node:car.sprite,bounds:{x:p.x-25,y:p.y-20,width:50,height:45},kind:'scenery'});}
  }
 }
 for(const b of cityScenery){
  if(textures){const art=architecture(textures,b.model,b.x,b.y);art.sprite.zIndex=sceneryDepth(b);parent.addChild(art.sprite);facades.push(art);entries.push({node:art.sprite,bounds:b.bounds,kind:'scenery'});continue;}
  const layer=new Container(),solid=new Graphics(),glow=new Graphics();layer.zIndex=sceneryDepth(b);
  layer.addChild(solid,glow);parent.addChild(layer);
  const h=b.height,accent=b.district.accent;
  block(solid,b.x,b.y,b.width,b.depth,h,[0x242333,0x171d29,b.district.color]);
  // Four deliberately authored silhouettes: terraced homes, glass offices,
  // corner shops and lower industrial sheds. All are explicitly scenery.
  if(b.variant===0)block(solid,b.x+.15,b.y+.15,1.35,1.35,h+6,[0x45384e,0x252436,0x574260],h);
  if(b.variant===1)for(let z=20;z<h;z+=24)block(solid,b.x+.1,b.y+1.5,1.3,.2,z,[0x4a3d50,0x2d293d,0x62516b],z-3);
  if(b.variant===2)block(solid,b.x+.5,b.y+.4,.6,.8,h+10,[0x343e4b,0x242938,0x5d5366],h);
  if(b.variant===3)for(let i=0;i<3;i++)block(solid,b.x+.2+i*.4,b.y+.3,.25,.5,h+4,[0x474454,0x272e3a,0x676272],h);
  for(let z=18;z<h-3;z+=14){const a=iso(b.x,b.y+1.65,z),c=iso(b.x+1.65,b.y+1.65,z),d=iso(b.x+1.65,b.y,z);solid.moveTo(a.x,a.y).lineTo(c.x,c.y).lineTo(d.x,d.y).stroke({color:0x4a4158,width:1});}
  const draw=(on:boolean)=>{
   glow.clear();
   for(let side=0;side<2;side++)for(let row=0;row<Math.max(1,Math.floor(h/16)-1);row++)for(let col=0;col<4;col++){
    const p=iso(b.x+(side?1.66:.18+col*.34),b.y+(side?.18+col*.34:1.66),12+row*16),dy=side?-2:2;
    glow.poly([p.x,p.y,p.x+5,p.y+dy,p.x+5,p.y+dy+6,p.x,p.y+6]).fill(on?((row+col+b.variant)%4===0?0xefbe74:accent):0x2d3040);
   }
   const a=iso(b.x,b.y+1.66,8),c=iso(b.x+1.66,b.y+1.66,8),d=iso(b.x+1.66,b.y,8);
   glow.moveTo(a.x,a.y).lineTo(c.x,c.y).lineTo(d.x,d.y).stroke({color:on?accent:0x383144,width:2});
  };
  lights.push({g:glow,draw});
  if(b.variant===0){const p=iso(b.x+.7,b.y+1.67,h*.6);solid.rect(p.x-16,p.y-7,32,12).fill(0x48334d);
   const sign=new Text({text:['ARCADE','STUDIO','MARKET'][Math.abs(Math.floor(b.x))%3],style:{fontFamily:'monospace',fontSize:7,fill:accent}});sign.position.set(p.x-14,p.y-6);layer.addChild(sign);}
  entries.push({node:layer,bounds:b.bounds,kind:'scenery'});
 }
 let previous:boolean|null=null;
 return {entries,update(outage:boolean){if(previous===outage)return false;previous=outage;for(const light of lights)light.draw(!outage);for(const facade of facades)facade.setPowered(!outage);return true;}};
}
