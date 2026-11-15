import { useEffect, useRef, useState } from 'react';
import { Application } from 'pixi.js';
import { useGame, buildings } from './game';
import { buildCityScene } from './CityScene';
import {spriteBounds} from './spriteHit';
import { CameraGesture } from './camera';
import {boundedView,cameraOrigin,frameOpening,frameInspection,unobstructedViewport} from './worldCamera';
import {useNavigation} from './navigation';
import {pickVehicle,vehiclePosition} from './traffic';
import {loadCityTextures} from './pixelArt';
import {inspectScenery} from './selection';
import {findScenery} from './sceneryInfo';

export default function City({lowPower=false}:{lowPower?:boolean}) {
  const host = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [camera] = useState(()=>new CameraGesture());
  const openingApplied=useRef(false);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    const app = new Application();
    let initialized = false, destroyed = false;
    const destroy = () => {
      if (initialized && !destroyed) { destroyed = true; app.destroy(true, { children: true }); }
    };
    (async () => {
      const el = host.current!;
      await app.init({ backgroundAlpha: 0, antialias: false, autoStart: false, resolution: Math.min(devicePixelRatio, lowPower?1:2),
        autoDensity: true, width: el.clientWidth, height: el.clientHeight, preference: 'webgl' });
      initialized = true;
      if (disposed) { destroy(); return; }
      const textures=await loadCityTextures();
      if(disposed){destroy();return;}
      const scene = buildCityScene(textures);
      app.stage.addChild(scene.world);
      el.appendChild(app.canvas);
      const size=()=>({width:el.clientWidth,height:el.clientHeight});
      const origin=()=>cameraOrigin(size());
      let frame = 0;
      const render = () => {
        el.dataset.selection=JSON.stringify(scene.selectionState());
        el.dataset.traffic=JSON.stringify(scene.vehicleState());
        if (frame || document.hidden || disposed) return;
        frame = requestAnimationFrame(() => { frame = 0; if (!disposed) app.render(); });
      };
      function fit() {
        scene.preview(null);
        if (app.screen.width !== el.clientWidth || app.screen.height !== el.clientHeight)
          app.renderer.resize(el.clientWidth, el.clientHeight);
        const view=boundedView(camera,size());
        scene.world.scale.set(view.scale);
        scene.world.position.set(view.origin.x+view.pan.x,view.origin.y+view.pan.y);
        const counts=scene.cull(view.footprint);el.dataset.scene=JSON.stringify(counts);
        useNavigation.setState({view});
        el.dataset.camera=JSON.stringify(view);
        render();
      }
      const motion=matchMedia('(prefers-reduced-motion: reduce)');
      const publishVehicle=()=>{const id=useGame.getState().selectedVehicle;useNavigation.setState({vehiclePoint:id?scene.getVehiclePosition(id):null});};
      let animation=0,lastFrame=0,lastTick=performance.now(),visible=true,visualHours=0;
      const ambientStart=performance.now();
      const moving=()=>{const s=useGame.getState();return !disposed&&visible&&!document.hidden&&!lowPower&&!motion.matches&&(s.playing||(!s.outage&&!s.history.length));};
      const animate=(now:number)=>{
        animation=0;
        if(!moving())return;
        if(now-lastFrame>=33){
          const s=useGame.getState();
          visualHours=s.playing?Math.max(0,now-lastTick)*s.speed/6000:(now-ambientStart)/6000;
          if(scene.animate(s,visualHours)){const view=useNavigation.getState().view;if(view)scene.cull(view.footprint);publishVehicle();render();}
          lastFrame=now;
        }
        animation=requestAnimationFrame(animate);
      };
      const schedule=()=>{if(!moving()){cancelAnimationFrame(animation);animation=0;visualHours=0;if(scene.animate(useGame.getState()))render();}
        else if(!animation)animation=requestAnimationFrame(animate);};
      const viewport=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule();});viewport.observe(el);
      motion.addEventListener('change',schedule);document.addEventListener('visibilitychange',schedule);
      const localPoint = (e: PointerEvent | WheelEvent) => {
        const rect = el.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      const down = (e: PointerEvent) => {
        if (e.pointerType === 'mouse' && e.button !== 0) return;
        if(scene.preview(null))render();el.setPointerCapture(e.pointerId); camera.down(e.pointerId, localPoint(e));
      };
      const move = (e: PointerEvent) => {
        if(camera.move(e.pointerId, localPoint(e), origin()))fit();
        else if(e.pointerType==='mouse'&&!e.buttons&&!camera.interacting){const p=localPoint(e),hit=scene.pick({x:(p.x-scene.world.x)/scene.world.scale.x,y:(p.y-scene.world.y)/scene.world.scale.y});if(scene.preview(hit.building??hit.scenery))render();}
      };
      const leave=()=>{if(scene.preview(null))render();};
      const up = (e: PointerEvent) => {
        if (camera.up(e.pointerId)) {
          const p = localPoint(e);
          const point={x:(p.x-scene.world.x)/scene.world.scale.x,y:(p.y-scene.world.y)/scene.world.scale.y};
          const state=useGame.getState(),hit=scene.pick(point),building=hit.building,vehicle=hit.blocked?null:pickVehicle(point,state,visualHours);
          if(hit.scenery)inspectScenery(hit.scenery);else if(vehicle)state.selectVehicle(vehicle);else state.select(building);
        }
      };
      const cancel = (e: PointerEvent) => camera.cancel(e.pointerId);
      const wheel = (e: WheelEvent) => { e.preventDefault(); if(e.shiftKey){camera.pan.x-=e.deltaX||e.deltaY;camera.pan.y-=e.deltaX?e.deltaY:0;}else camera.zoomAt(Math.exp(-e.deltaY * .001), localPoint(e), origin()); fit(); };
      const command = (e: Event) => {
        const action = (e as CustomEvent<string>).detail;
        if (action === 'reset') frameOpening(camera,size());
        else if(action==='overview'){camera.zoom=0;camera.pan={x:0,y:0};}
        else camera.zoomAt(action === 'in' ? 1.2 : 1 / 1.2, origin(), origin());
        fit();
      };
      el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave',leave);
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', cancel);
      el.addEventListener('lostpointercapture', cancel);
      el.addEventListener('wheel', wheel, { passive: false }); el.addEventListener('camera', command);
      const recenter=(point:{x:number;y:number})=>{camera.focus(point,origin(),{x:el.clientWidth/2,y:el.clientHeight/2},scene.world.scale.x);fit();};
      useNavigation.setState({recenter,reset:()=>{frameOpening(camera,size());fit();}});
      const keys=(e:KeyboardEvent)=>{const delta:{[key:string]:[number,number]}={ArrowLeft:[90,0],ArrowRight:[-90,0],ArrowUp:[0,90],ArrowDown:[0,-90]};
        if(e.target!==el||!delta[e.key])return;e.preventDefault();camera.pan.x+=delta[e.key][0];camera.pan.y+=delta[e.key][1];fit();};
      el.addEventListener('keydown',keys);
      const updateScene=()=>scene.update({...useGame.getState(),selectedScenery:useNavigation.getState().sceneryId});
      let inspectionFrame=0;
      const frameSelection=()=>{
        if(inspectionFrame||disposed)return;
        inspectionFrame=requestAnimationFrame(()=>{
          inspectionFrame=0;
          const state=useGame.getState(),scenery=findScenery(useNavigation.getState().sceneryId);
          const building=buildings.find(b=>b.id===state.selected);
          if(!scenery&&!building)return;
          const rect=el.getBoundingClientRect();
          const obstacles=[...el.parentElement!.querySelectorAll<HTMLElement>('.minimap,.inspector,.timeline,.map-controls,.world-top,.map-hint,.map-caption')]
            .filter(node=>node.getClientRects().length).map(node=>{const r=node.getBoundingClientRect();return {x:r.left-rect.left,y:r.top-rect.top,width:r.width,height:r.height};});
          const free=unobstructedViewport(size(),obstacles);
          const vehicle=state.selectedVehicle?vehiclePosition(state.selectedVehicle,state,visualHours):null;
          const bounds=vehicle?{x:vehicle.x-25,y:vehicle.y-25,width:50,height:50}:scenery?spriteBounds(scenery.model,scenery.x,scenery.y):spriteBounds(building!.id,building!.x,building!.y);
          frameInspection(camera,size(),bounds,free,window.innerWidth<=760,!!scenery);fit();
          el.dataset.inspection=JSON.stringify({bounds,free});
        });
      };
      const observer=new ResizeObserver(()=>{fit();frameSelection();});observer.observe(el);
      const overlays=new ResizeObserver(frameSelection);
      el.parentElement!.querySelectorAll('.minimap,.timeline,.map-controls').forEach(node=>overlays.observe(node));
      window.addEventListener('inspection-layout',frameSelection);
      const unsubscribeNavigation=useNavigation.subscribe((state,previous)=>{
        if(state.sceneryId===previous.sceneryId&&state.inspectionRequest===previous.inspectionRequest)return;
        frameSelection();
        if(updateScene())render();
      });
      const unsubscribe = useGame.subscribe((state,previous) => {
        if(state.selected&&(state.selected!==previous.selected||state.selectedVehicle!==previous.selectedVehicle)){
          frameSelection();
        }
        lastTick=performance.now(); if (updateScene()){const view=useNavigation.getState().view;if(view)scene.cull(view.footprint);render();} schedule();publishVehicle();
      });
      document.addEventListener('visibilitychange', render);
      cleanup = () => {
        observer.disconnect();overlays.disconnect();window.removeEventListener('inspection-layout',frameSelection);cancelAnimationFrame(inspectionFrame); viewport.disconnect(); unsubscribe();unsubscribeNavigation(); cancelAnimationFrame(frame); cancelAnimationFrame(animation);
        motion.removeEventListener('change',schedule);document.removeEventListener('visibilitychange',schedule);
        document.removeEventListener('visibilitychange', render);el.removeEventListener('keydown',keys);
        useNavigation.setState({view:null,vehiclePoint:null,recenter:()=>{},reset:()=>{}});
        el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerleave',leave);
        el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', cancel);
        el.removeEventListener('lostpointercapture', cancel);
        el.removeEventListener('wheel', wheel); el.removeEventListener('camera', command);
        destroy();
      };
      if(!openingApplied.current){frameOpening(camera,size());openingApplied.current=true;}
      updateScene();fit();schedule();
    })().catch(e => {
      if (!disposed) {
        cleanup();
        destroy();
        setError('The city could not start. Enable WebGL and reload. ' + String(e));
      }
    });
    // Async initialization owns destruction if unmounted before init completes.
    return () => { disposed = true; cleanup(); destroy(); };
  }, [lowPower,camera]);
  return <div ref={host} className="city-canvas" tabIndex={0}
    aria-label="Interactive isometric city. Drag to pan, pinch or scroll to zoom, tap a building to inspect."
    role="application">{error && <p role="alert">{error}</p>}</div>;
}
