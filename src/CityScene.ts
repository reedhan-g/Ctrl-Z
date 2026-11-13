import { Container, Graphics, Text } from 'pixi.js';
import { buildings, status, type Snapshot, type BuildingId } from './simulation.ts';
import { iso, prismFaces, flatten, sortedBuildings } from './geometry.ts';
import { dependencies, upstreamPaths } from './dependencies.ts';
import { diagnoseDependency } from './investigation.ts';
import { buildingShell, lightFacade, streetDetails, neon } from './cityArt.ts';
import { fleet, vehiclePosition } from './traffic.ts';

type SceneState = Snapshot & { selected: BuildingId | null; trace: boolean };

function prism(g: Graphics, x: number, y: number, w: number, d: number, top: number,
  roof: number, left: number, right: number, bottom = 0) {
  prismFaces(x, y, w, d, top, bottom).forEach((face, index) =>
    g.poly(flatten(face)).fill([left, right, roof][index]));
}

/** Allocate scene objects once; updates only change affected graphics and labels. */
export function buildCityScene() {
  const world = new Container();
  const ground = new Graphics();
  world.addChild(ground);
  prism(ground, -.8, -.8, 11.3, 11.3, 18, 0x292634, 0x0c111c, 0x171725);
  for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) {
    const p = iso(x, y);
    ground.poly([p.x, p.y, p.x + 38, p.y + 19, p.x, p.y + 38, p.x - 38, p.y + 19])
      .fill(x === 4 || y === 4 || x === 9 || y === 9 ? 0x10121d : 0x292634);
  }
  const lampPoints: { x: number; y: number }[] = [];
  const decorativeWindows: { x: number; y: number }[] = [];
  for (let i = 0; i < 10; i++) {
    for (const [x, y] of [[4.45, i + .15], [i + .15, 4.45]]) {
      const p = iso(x, y), q = iso(x + .22, y + .22);
      ground.moveTo(p.x, p.y).lineTo(q.x, q.y).stroke({ color: 0x78878a, width: 1 });
    }
    for (const [x, y] of [[4, i], [9, i], [i, 4], [i, 9]]) {
      const p = iso(x, y);
      ground.moveTo(p.x, p.y).lineTo(p.x, p.y - 13).stroke({ color: 0x50626a, width: 1.5 });
      lampPoints.push({ x: p.x, y: p.y - 14 });
    }
  }
  for (const [x, y, h] of [[0, 0, 27], [8, 0, 55], [0, 8, 31], [8, 8, 35], [6, 8, 29], [8, 6, 44], [2, 0, 24], [0, 2, 27]]) {
    prism(ground, x + .1, y + .1, 1.25, 1.25, h, 0x3c314a, 0x232130, 0x171b2b);
    prism(ground, x + .4, y + .4, .55, .5, h + 5, 0x51405d, 0x29273c, 0x222738, h);
    for (let row = 0; row < 3; row++) decorativeWindows.push(iso(x + 1.36, y + .3 + row * .35, h - 9));
  }
  for (const [x, y] of [[1, 4.8], [3.3, 8], [7.6, 3], [5.2, .3], [.1, 3.4], [8, 3]]) {
    const p = iso(x, y);
    ground.moveTo(p.x, p.y).lineTo(p.x, p.y - 12).stroke({ color: 0x685b42, width: 3 });
    ground.circle(p.x, p.y - 18, 10).fill(0x294f46).circle(p.x - 3, p.y - 21, 7).fill(0x396657);
  }
  streetDetails(ground);
  const lamps = new Graphics(), links = new Graphics();
  world.addChild(lamps, links);
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
    positions.forEach((p,i)=>vehicles[i].sprite.position.set(Math.round(p.x),Math.round(p.y)));
    previousVehicleKey=key;return true;
  }
  let previousOutage: boolean | null = null;
  let previousTrace: string | null = null;
  const views = sortedBuildings.map(b => {
    // Keep each building's solids, windows and signs in the same depth layer.
    const layer = new Container(), selection = new Graphics(), body = new Graphics(), windows = new Graphics();
    const roof = new Graphics(), indicator = new Graphics();
    layer.addChild(selection, body, windows, roof, indicator);
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
    return { b, windows, indicator, selection, label, p, tone: '', selected: false };
  });

  function update(s: SceneState) {
    let changed = false;
    if (previousOutage !== s.outage) {
      changed = true; lamps.clear();
      for (const p of lampPoints) lamps.circle(p.x, p.y, 3).fill({ color: s.outage ? 0x46606a : 0xffcf89, alpha: .8 });
      for (const p of decorativeWindows) lamps.rect(p.x - 1, p.y, 3, 5).fill(s.outage ? 0x292b3b : (p.x%3<1?0xeabb69:0x6ad8df));
      previousOutage = s.outage;
    }
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
  return { world, update, animate };
}
