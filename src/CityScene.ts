import { Container, Graphics, Text } from 'pixi.js';
import { buildings, status, type Snapshot, type BuildingId } from './simulation.ts';
import { iso, prismFaces, flatten, sortedBuildings } from './geometry.ts';
import { dependencies, upstreamPaths } from './dependencies.ts';
import { diagnoseDependency } from './investigation.ts';
import { buildingShell, lightFacade } from './cityArt.ts';
import { fleet, vehiclePosition } from './traffic.ts';
import {world as land} from './world.ts';
import {buildWorldArt,type CullEntry} from './worldArt.ts';
import {cityScenery,boundsOf,intersects,type Rect} from './worldScenery.ts';
import {pointInPolygon,buildingFaces,unproject} from './geometry.ts';

type SceneState = Snapshot & { selected: BuildingId | null; trace: boolean };

/** Allocate scene objects once; updates only change affected graphics and labels. */
export function buildCityScene() {
  const world = new Container();world.sortableChildren=true;
  const ground = new Graphics();
  world.addChild(ground);
  ground.zIndex=-10000;ground.poly(flatten(prismFaces(land.min,land.min,land.size,land.size,0)[2])).fill(0x20202e);
  const art=buildWorldArt(world);
  const links = new Graphics();
  world.addChild(links);links.zIndex=-9997;
  const vehicles=fleet.map(vehicle=>{
    const sprite=new Graphics();
    sprite.poly([-9,0,0,-5,10,0,1,6]).fill(vehicle.color)
      .poly([-6,-3,0,-7,7,-3,0,1]).fill(0x44445a)
      .rect(-8,1,3,3).fill(0xf8e3a0).rect(5,1,3,3).fill(0xf8e3a0);
    world.addChild(sprite);return {vehicle,sprite};
  });
  let previousVehicleKey='';
  function animate(s:Snapshot,visualHours=0) {
    const positions=vehicles.map(v=>vehiclePosition(v.vehicle.id,s,visualHours));
    const key=positions.map(p=>`${Math.round(p.x)},${Math.round(p.y)}`).join(':');
    if(key===previousVehicleKey)return false;
    positions.forEach((p,i)=>{vehicles[i].sprite.position.set(Math.round(p.x),Math.round(p.y));const tile=unproject({x:p.x,y:p.y+4});vehicles[i].sprite.zIndex=(tile.x+tile.y+.2)*100;});
    previousVehicleKey=key;return true;
  }
  let previousOutage: boolean | null = null;
  let previousTrace: string | null = null;
  const views = sortedBuildings.map(b => {
    // Keep each building's solids, windows and signs in the same depth layer.
    const layer = new Container(), selection = new Graphics(), body = new Graphics(), windows = new Graphics();
    const roof = new Graphics(), indicator = new Graphics();
    layer.addChild(selection, body, windows, roof, indicator);layer.zIndex=(b.x+b.y+1.9)*100;
    buildingShell(body,b);
    const r = iso(b.x + .94, b.y + .94, b.height + 9);
    if (b.id === 'hospital') {
      roof.rect(r.x - 8, r.y - 3, 16, 6).fill(0xa9ddd3).rect(r.x - 3, r.y - 8, 6, 16).fill(0xa9ddd3);
    }
    if (b.id==='telecom') roof.moveTo(r.x,r.y).lineTo(r.x,r.y-28).stroke({color:0x67e2ec,width:3}).circle(r.x,r.y-30,3).fill(0xe895d6);
    if (b.id==='logistics') roof.rect(r.x-15,r.y-4,30,8).fill(0xeccf79);
    if (b.id === 'water') {
      roof.ellipse(r.x, r.y - 7, 17, 8).fill(0x7b969b).rect(r.x - 17, r.y - 7, 34, 14).fill(0x607d85)
        .ellipse(r.x, r.y + 7, 17, 8).fill(0x829b9e);
    }
    const p = iso(b.x + .9, b.y + .9, b.height + 30);
    const label = new Text({ text: b.id === 'grid' ? 'SUBSTATION' : b.id === 'hospital' ? 'HOSPITAL' : b.id === 'water' ? 'WATERWORKS' : b.id==='telecom'?'TELECOM':b.id==='logistics'?'DELIVERY HUB':'RESIDENCES',
      style: { fontFamily: 'monospace', fontSize: 10, fill: 0xabc0c6, letterSpacing: 1 } });
    label.anchor.set(.5); label.position.set(p.x, p.y - 24);
    layer.addChild(label); world.addChild(layer);
    return { b, layer, windows, indicator, selection, label, p, tone: '', selected: false };
  });

  function update(s: SceneState) {
    let changed = false;
    if(previousOutage!==s.outage){previousOutage=s.outage;changed=art.update(s.outage)||changed;}
    const diagnostics = dependencies.map(edge => diagnoseDependency(edge, s));
    const traceKey = `${s.trace}:${s.selected}:${diagnostics.map(d => `${d.sourceOnline}:${d.available}`).join(',')}`;
    if (previousTrace !== traceKey) {
      changed = true; links.clear(); previousTrace = traceKey;
      if (s.trace) {
        const paths = s.selected ? upstreamPaths(s.selected) : [];
        for (const edge of diagnostics) {
          const from = buildings.find(b => b.id === edge.source)!, to = buildings.find(b => b.id === edge.target)!;
          const a = iso(from.x + .9, from.y + .9), b = iso(to.x + .9, to.y + .9);
          const relevant = !s.selected || paths.some(path => path.some((id, i) => id === edge.source && path[i + 1] === edge.target));
          links.moveTo(a.x, a.y).lineTo(b.x, b.y).stroke({ width: relevant ? 2 : 1,
            color: edge.sourceOnline ? (edge.system === 'water' ? 0x6cabc8 : 0x70d8c0) : edge.available ? 0xf1ba76 : 0xf48676,
            alpha: relevant ? .9 : .18 });
        }
      }
    }
    for (const view of views) {
      const { b, windows, indicator, selection, p } = view;
      const tone = status(b.id, s).tone;
      if (view.tone !== tone) {
        changed = true; windows.clear(); indicator.clear(); view.tone = tone;
        const color = tone === 'good' ? 0x8ddbc4 : tone === 'warn' ? 0xf1ba76 : 0xf17d70;
        lightFacade(windows,b,tone!=='bad');
        indicator.circle(p.x, p.y, 9).fill({ color, alpha: .14 }).circle(p.x, p.y, 3.5).fill(color);
      }
      const selected = s.selected === b.id;
      if (view.selected !== selected) {
        changed = true; view.selected = selected; selection.clear();
        view.label.style.fill = selected ? 0xb9f3e4 : 0xabc0c6;
        if (selected) selection.poly(flatten(prismFaces(b.x - .05, b.y - .05, 2.05, 2.05, 8)[2]))
          .stroke({ color: 0x8de4d1, width: 2 });
      }
    }
    return animate(s)||changed;
  }
  const entries:CullEntry[]=[...art.entries,...views.map(v=>({node:v.layer,bounds:boundsOf(buildingFaces(v.b).flat(),60),kind:'service' as const}))];
  function cull(rect:Rect){
    let visible=0,servicesVisible=0;for(const entry of entries){entry.node.visible=intersects(entry.bounds,rect,100);if(entry.node.visible){visible++;if(entry.kind==='service')servicesVisible++;}}
    for(const v of vehicles)v.sprite.visible=intersects({x:v.sprite.x-16,y:v.sprite.y-16,width:32,height:32},rect,60);
    return {total:entries.length,visible,servicesVisible};
  }
  const occluders=[...cityScenery.map(b=>({depth:(b.x+b.y+b.width)*100,faces:b.faces,building:null as BuildingId|null})),...buildings.map(b=>({depth:(b.x+b.y+1.9)*100,faces:buildingFaces(b),building:b.id as BuildingId|null}))].sort((a,b)=>b.depth-a.depth);
  function pick(point:{x:number;y:number}){const hit=occluders.find(o=>o.faces.some(face=>pointInPolygon(point,face)));return {building:hit?.building??null,blocked:!!hit};}
  const getVehiclePosition=(id:string)=>{const sprite=vehicles.find(v=>v.vehicle.id===id)!.sprite;return {x:sprite.x,y:sprite.y};};
  return { world, update, animate, cull, pick, getVehiclePosition };
}
