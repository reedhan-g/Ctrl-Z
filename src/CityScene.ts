import { Container, Graphics, Text } from 'pixi.js';
import { buildings, status, type Snapshot, type BuildingId } from './simulation.ts';
import { iso, prismFaces, flatten, sortedBuildings } from './geometry.ts';

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
  prism(ground, -.8, -.8, 11.3, 11.3, 18, 0x26383e, 0x101c24, 0x14232d);
  for (let x = 0; x < 10; x++) for (let y = 0; y < 10; y++) {
    const p = iso(x, y);
    ground.poly([p.x, p.y, p.x + 38, p.y + 19, p.x, p.y + 38, p.x - 38, p.y + 19])
      .fill(x === 4 || y === 4 || x === 9 || y === 9 ? 0x101d26 : 0x2b4045);
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
  for (const [x, y, h] of [[0, 0, 27], [0, 6, 39], [6, 0, 40], [8, 0, 55], [0, 8, 31], [8, 8, 35], [6, 8, 29], [8, 6, 44], [2, 0, 24], [0, 2, 27]]) {
    prism(ground, x + .1, y + .1, 1.25, 1.25, h, 0x42565b, 0x273a44, 0x20303a);
    prism(ground, x + .4, y + .4, .55, .5, h + 5, 0x596a6c, 0x35484f, 0x293c44, h);
    for (let row = 0; row < 3; row++) decorativeWindows.push(iso(x + 1.36, y + .3 + row * .35, h - 9));
  }
  for (const [x, y] of [[1, 4.8], [3.3, 8], [7.6, 3], [5.2, .3], [.1, 3.4], [8, 3]]) {
    const p = iso(x, y);
    ground.moveTo(p.x, p.y).lineTo(p.x, p.y - 12).stroke({ color: 0x685b42, width: 3 });
    ground.circle(p.x, p.y - 18, 10).fill(0x294f46).circle(p.x - 3, p.y - 21, 7).fill(0x396657);
  }
  const lamps = new Graphics(), links = new Graphics();
  world.addChild(lamps, links);
  let previousOutage: boolean | null = null;
  let previousTrace: string | null = null;
  const views = sortedBuildings.map(b => {
    // Keep each building's solids, windows and signs in the same depth layer.
    const layer = new Container(), selection = new Graphics(), body = new Graphics(), windows = new Graphics();
    const roof = new Graphics(), indicator = new Graphics();
    layer.addChild(selection, body, windows, roof, indicator);
    prism(body, b.x, b.y, 1.9, 1.9, 7, 0x526466, 0x253942, 0x20313b);
    prism(body, b.x + .12, b.y + .12, 1.65, 1.65, b.height, 0x52666c, 0x314853, 0x233741, 7);
    prism(body, b.x + .4, b.y + .4, 1, 1, b.height + 6, 0x657a7b, 0x3d525a, 0x2f454e, b.height);
    const r = iso(b.x + .94, b.y + .94, b.height + 9);
    if (b.id === 'hospital') {
      roof.rect(r.x - 8, r.y - 3, 16, 6).fill(0xa9ddd3).rect(r.x - 3, r.y - 8, 6, 16).fill(0xa9ddd3);
    }
    if (b.id === 'water') {
      roof.ellipse(r.x, r.y - 7, 17, 8).fill(0x7b969b).rect(r.x - 17, r.y - 7, 34, 14).fill(0x607d85)
        .ellipse(r.x, r.y + 7, 17, 8).fill(0x829b9e);
    }
    const p = iso(b.x + .9, b.y + .9, b.height + 30);
    const label = new Text({ text: b.id === 'grid' ? 'SUBSTATION' : b.id === 'hospital' ? 'HOSPITAL' : b.id === 'water' ? 'WATERWORKS' : 'RESIDENCES',
      style: { fontFamily: 'monospace', fontSize: 10, fill: 0xabc0c6, letterSpacing: 1 } });
    label.anchor.set(.5); label.position.set(p.x, p.y - 24);
    layer.addChild(label); world.addChild(layer);
    return { b, windows, indicator, selection, label, p, tone: '', selected: false };
  });

  function update(s: SceneState) {
    if (previousOutage !== s.outage) {
      lamps.clear();
      for (const p of lampPoints) lamps.circle(p.x, p.y, 3).fill({ color: s.outage ? 0x46606a : 0xffcf89, alpha: .8 });
      for (const p of decorativeWindows) lamps.rect(p.x - 1, p.y, 3, 5).fill(s.outage ? 0x3a4c54 : 0xe6b578);
      previousOutage = s.outage;
    }
    const traceKey = `${s.trace}:${s.outage}`;
    if (previousTrace !== traceKey) {
      links.clear(); previousTrace = traceKey;
      if (s.trace) {
        const source = iso(2.9, 2.9);
        for (const b of buildings.filter(b => b.id !== 'grid')) {
          const p = iso(b.x + .9, b.y + .9);
          links.moveTo(source.x, source.y).lineTo(p.x, p.y).stroke({ color: s.outage ? 0xf48676 : 0x70d8c0, width: 2, alpha: .75 });
        }
        const water = iso(2.9, 6.9), homes = iso(6.9, 6.9);
        links.moveTo(water.x, water.y).lineTo(homes.x, homes.y).stroke({ color: 0x6cabc8, width: 2 });
      }
    }
    for (const view of views) {
      const { b, windows, indicator, selection, p } = view;
      const tone = status(b.id, s).tone;
      if (view.tone !== tone) {
        windows.clear(); indicator.clear(); view.tone = tone;
        const color = tone === 'good' ? 0x8ddbc4 : tone === 'warn' ? 0xf1ba76 : 0xf17d70;
        for (let side = 0; side < 2; side++) for (let row = 0; row < Math.floor(b.height / 15) - 1; row++) for (let col = 0; col < 4; col++) {
          const x = b.x + (side ? 1.78 : .27 + col * .36), y = b.y + (side ? .27 + col * .36 : 1.78);
          const q = iso(x, y, 16 + row * 14), dy = side ? -2.5 : 2.5;
          windows.poly([q.x, q.y, q.x + 5, q.y + dy, q.x + 5, q.y + 7 + dy, q.x, q.y + 7])
            .fill({ color: tone === 'bad' ? 0x40505a : 0xffcc86, alpha: tone === 'bad' ? .45 : .9 });
        }
        indicator.circle(p.x, p.y, 9).fill({ color, alpha: .14 }).circle(p.x, p.y, 3.5).fill(color);
      }
      const selected = s.selected === b.id;
      if (view.selected !== selected) {
        view.selected = selected; selection.clear();
        view.label.style.fill = selected ? 0xb9f3e4 : 0xabc0c6;
        if (selected) selection.poly(flatten(prismFaces(b.x - .05, b.y - .05, 2.05, 2.05, 8)[2]))
          .stroke({ color: 0x8de4d1, width: 2 });
      }
    }
  }
  return { world, update };
}
