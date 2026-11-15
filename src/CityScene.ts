import { Container, Graphics } from 'pixi.js';
import { buildings, status, type Snapshot, type BuildingId } from './simulation.ts';
import { iso, prismFaces, flatten, sortedBuildings } from './geometry.ts';
import { dependencies, upstreamPaths } from './dependencies.ts';
import { diagnoseDependency } from './investigation.ts';
import { buildingShell, lightFacade } from './cityArt.ts';
import { fleet, vehiclePose } from './traffic.ts';
import {world as land} from './world.ts';
import {buildWorldArt,type CullEntry} from './worldArt.ts';
import {cityScenery,sceneryDepth,boundsOf,intersects,type Rect} from './worldScenery.ts';
import {pointInPolygon,buildingFaces} from './geometry.ts';
import {architecture,highlightSprite,landmarkGlowSprite,type CityTextures} from './pixelArt.ts';
import {spriteHit} from './spriteHit.ts';
import {vehicleSprite,drawVehicleFallback} from './vehicleArt.ts';

type SceneState = Snapshot & { selected: BuildingId | null; trace: boolean;selectedScenery?:string|null };

/** Allocate scene objects once; updates only change affected graphics and labels. */
export function buildCityScene(textures?:CityTextures,options:{touch?:boolean}={}) {
  const world = new Container();world.sortableChildren=true;
  const ground = new Graphics();
  world.addChild(ground);
  ground.zIndex=-10000;ground.poly(flatten(prismFaces(land.min,land.min,land.size,land.size,0)[2])).fill(0x20202e);
  const art=buildWorldArt(world,textures);
  const links = new Graphics();
  world.addChild(links);links.zIndex=-9997;
  const vehicles=fleet.map(vehicle=>{
    const sprite=new Container();
    const art=textures?vehicleSprite(textures.vehicles,vehicle.art,'y+',0,0,4):null;
    const shape=art?null:new Graphics();
    if(art)sprite.addChild(art.sprite);else {shape!.position.set(0,4);sprite.addChild(shape!);}
    world.addChild(sprite);return {vehicle,sprite,art,shape,direction:null as ReturnType<typeof vehiclePose>['direction']|null};
  });
  let previousVehicleKey='';
  function animate(s:Snapshot,visualHours=0) {
    const poses=vehicles.map(v=>vehiclePose(v.vehicle.id,s,visualHours));
    const key=poses.map(p=>`${Math.round(p.point.x)},${Math.round(p.point.y)},${p.direction}`).join(':');
    if(key===previousVehicleKey)return false;
    poses.forEach((pose,i)=>{const v=vehicles[i],p=pose.point;
      v.sprite.position.set(Math.round(p.x),Math.round(p.y));v.sprite.zIndex=(pose.tile.x+pose.tile.y+.2)*100;
      if(v.direction!==pose.direction){v.art?.setDirection(pose.direction);if(v.shape)drawVehicleFallback(v.shape,v.vehicle.color,pose.direction);v.direction=pose.direction;}
    });
    previousVehicleKey=key;return true;
  }
  let previousOutage: boolean | null = null;
  let previousTrace: string | null = null;
  let selectedId:BuildingId|null=null,selectedScenery:string|null=null,hoveredId:string|null=null;
  const views = sortedBuildings.map(b => {
    // Keep each building's solids, windows and signs in the same depth layer.
    const layer = new Container(), selection = new Graphics(), body = new Graphics(), windows = new Graphics();
    const roof = new Graphics(), indicator = new Graphics();
    layer.addChild(selection, body, windows, roof, indicator);layer.zIndex=(b.x+b.y+1.9)*100;
    const facade=textures?architecture(textures,b.id,b.x,b.y):null;
    if(facade)layer.addChild(facade.sprite);else buildingShell(body,b);
    const gold=textures?landmarkGlowSprite(textures,b.id,b.x,b.y):null;
    if(gold)layer.addChild(gold);
    const highlight=textures?highlightSprite(textures,b.id,b.x,b.y):null;
    if(highlight)layer.addChild(highlight);
    const r = iso(b.x + .94, b.y + .94, b.height + 9);
    if (!facade && b.id === 'hospital') {
      roof.rect(r.x - 8, r.y - 3, 16, 6).fill(0xa9ddd3).rect(r.x - 3, r.y - 8, 6, 16).fill(0xa9ddd3);
    }
    if (!facade&&b.id==='telecom') roof.moveTo(r.x,r.y).lineTo(r.x,r.y-28).stroke({color:0x67e2ec,width:3}).circle(r.x,r.y-30,3).fill(0xe895d6);
    if (!facade&&b.id==='logistics') roof.rect(r.x-15,r.y-4,30,8).fill(0xeccf79);
    if (!facade&&b.id === 'water') {
      roof.ellipse(r.x, r.y - 7, 17, 8).fill(0x7b969b).rect(r.x - 17, r.y - 7, 34, 14).fill(0x607d85)
        .ellipse(r.x, r.y + 7, 17, 8).fill(0x829b9e);
    }
    const p = iso(b.x + .9, b.y + .9, b.height + 30);
    world.addChild(layer);
    return { b, layer, windows, indicator, selection, p, facade,highlight,gold,tone: '', selected: false,target:.18,from:.18,start:0,tween:false };
  });

  function showHighlights(smooth=false,now=performance.now()){
    let changed=art.selectScenery(selectedScenery,hoveredId);
    for(const v of views){
      const selected=v.b.id===selectedId,hovered=v.b.id===hoveredId,target=hovered||(selected&&options.touch)?1:selected?.65:.18;
      if(v.highlight&&(v.highlight.visible!==selected||v.highlight.alpha!==1)){v.highlight.visible=selected;v.highlight.alpha=1;changed=true;}
      if(v.gold&&v.target!==target){v.from=v.gold.alpha;v.target=target;v.start=now;v.tween=smooth;changed=true;if(!smooth)v.gold.alpha=target;}
    }
    return changed;
  }
  function preview(id:string|null,smooth=false,now=performance.now()){const changed=hoveredId!==id;hoveredId=id;return showHighlights(smooth,now)||changed;}
  const highlightAnimating=()=>views.some(v=>v.tween);
  function advanceHighlights(now:number){let changed=false;
    for(const v of views)if(v.gold&&v.tween){const t=Math.min(1,Math.max(0,(now-v.start)/140)),alpha=t===1?v.target:v.from+(v.target-v.from)*(1-(1-t)**3);
      changed=changed||v.gold.alpha!==alpha;v.gold.alpha=alpha;if(t===1)v.tween=false;
    }return changed;
  }

  function update(s: SceneState) {
    let changed = false;
    selectedId=s.selected;selectedScenery=s.selected?null:s.selectedScenery??null;changed=showHighlights()||changed;
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
          const relevant = !s.selected || edge.source===s.selected || paths.some(path => path.some((id, i) => id === edge.source && path[i + 1] === edge.target));
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
        if(view.facade)view.facade.setPowered(tone!=='bad');else lightFacade(windows,b,tone!=='bad');
        indicator.circle(p.x, p.y, 9).fill({ color, alpha: .14 }).circle(p.x, p.y, 3.5).fill(color);
      }
      const selected = s.selected === b.id;
      if (view.selected !== selected) {
        changed = true; view.selected = selected; selection.clear();
        if (selected&&!view.highlight)for(const face of buildingFaces(b))selection.poly(flatten(face)).stroke({ color: 0x8de4d1, width: 2 });
      }
    }
    return animate(s)||changed;
  }
  const entries:CullEntry[]=[...art.entries,...views.map(v=>({node:v.layer,bounds:boundsOf(buildingFaces(v.b).flat(),60),kind:'service' as const}))];
  function cull(rect:Rect){
    let visible=0,servicesVisible=0;for(const entry of entries){entry.node.visible=intersects(entry.bounds,rect,100);if(entry.node.visible){visible++;if(entry.kind==='service')servicesVisible++;}}
    for(const v of vehicles)v.sprite.visible=intersects({x:v.sprite.x-32,y:v.sprite.y-36,width:64,height:64},rect,60);
    return {total:entries.length,visible,servicesVisible};
  }
  const occluders=[...cityScenery.map(b=>({depth:sceneryDepth(b),order:0,faces:b.faces,model:b.model,x:b.x,y:b.y,scenery:b.id as string|null,building:null as BuildingId|null})),...buildings.map(b=>({depth:(b.x+b.y+1.9)*100,order:1,faces:buildingFaces(b),model:b.id,x:b.x,y:b.y,scenery:null as string|null,building:b.id as BuildingId|null}))].sort((a,b)=>b.depth-a.depth||b.order-a.order);
  function pick(point:{x:number;y:number}){const hit=occluders.find(o=>textures?spriteHit(o.model,o.x,o.y,point):o.faces.some(face=>pointInPolygon(point,face)));return {building:hit?.building??null,scenery:hit?.scenery??null,blocked:!!hit};}
  const getVehiclePosition=(id:string)=>{const sprite=vehicles.find(v=>v.vehicle.id===id)!.sprite;return {x:sprite.x,y:sprite.y};};
  const vehicleState=()=>vehicles.map(v=>({id:v.vehicle.id,color:v.vehicle.art,direction:v.direction,x:v.sprite.x,y:v.sprite.y,visible:v.sprite.visible,frame:v.art?.sprite.texture.frame,rotation:v.art?.sprite.rotation??0,offset:v.art?{x:v.art.sprite.x,y:v.art.sprite.y}:null}));
  const selectionState=()=>({selected:selectedId,scenery:selectedScenery,hovered:hoveredId,highlighted:[...views.filter(v=>v.b.id===selectedId||v.b.id===hoveredId).map(v=>v.b.id),...art.highlighted()],landmarks:views.map(v=>({id:v.b.id,gold:v.gold?.alpha??0,target:v.target,selected:v.b.id===selectedId,hovered:v.b.id===hoveredId}))});
  return { world, update, animate, cull, pick, preview, advanceHighlights,highlightAnimating,selectionState, getVehiclePosition, vehicleState };
}
