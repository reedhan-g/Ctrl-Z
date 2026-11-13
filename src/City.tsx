import { useEffect, useRef, useState } from 'react';
import { Application } from 'pixi.js';
import { useGame, buildings } from './game';
import { buildCityScene } from './CityScene';
import { iso } from './geometry';
import { CameraGesture } from './camera';
import {boundedView,cameraOrigin} from './worldCamera';
import {useNavigation} from './navigation';
import {pickVehicle,vehiclePosition} from './traffic';

export default function City({lowPower=false}:{lowPower?:boolean}) {
  const host = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');
  const [camera] = useState(()=>new CameraGesture());
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
      el.appendChild(app.canvas);
      const scene = buildCityScene();
      app.stage.addChild(scene.world);
      const size=()=>({width:el.clientWidth,height:el.clientHeight});
      const origin=()=>cameraOrigin(size());
      let frame = 0;
      const render = () => {
        if (frame || document.hidden || disposed) return;
        frame = requestAnimationFrame(() => { frame = 0; if (!disposed) app.render(); });
      };
      function fit() {
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
        el.setPointerCapture(e.pointerId); camera.down(e.pointerId, localPoint(e));
      };
      const move = (e: PointerEvent) => { if(camera.move(e.pointerId, localPoint(e), origin()))fit(); };
      const up = (e: PointerEvent) => {
        if (camera.up(e.pointerId)) {
          const p = localPoint(e);
          const point={x:(p.x-scene.world.x)/scene.world.scale.x,y:(p.y-scene.world.y)/scene.world.scale.y};
          const state=useGame.getState(),hit=scene.pick(point),building=hit.building,vehicle=hit.blocked?null:pickVehicle(point,state,visualHours);
          if(vehicle)state.selectVehicle(vehicle);else state.select(building);
        }
      };
      const cancel = (e: PointerEvent) => camera.cancel(e.pointerId);
      const wheel = (e: WheelEvent) => { e.preventDefault(); if(e.shiftKey){camera.pan.x-=e.deltaX||e.deltaY;camera.pan.y-=e.deltaX?e.deltaY:0;}else camera.zoomAt(Math.exp(-e.deltaY * .001), localPoint(e), origin()); fit(); };
      const command = (e: Event) => {
        const action = (e as CustomEvent<string>).detail;
        if (action === 'reset') camera.reset();
        else camera.zoomAt(action === 'in' ? 1.2 : 1 / 1.2, origin(), origin());
        fit();
      };
      el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up); el.addEventListener('pointercancel', cancel);
      el.addEventListener('lostpointercapture', cancel);
      el.addEventListener('wheel', wheel, { passive: false }); el.addEventListener('camera', command);
      const recenter=(point:{x:number;y:number})=>{camera.focus(point,origin(),{x:el.clientWidth/2,y:el.clientHeight/2},scene.world.scale.x);fit();};
      useNavigation.setState({recenter,reset:()=>{camera.reset();fit();}});
      const keys=(e:KeyboardEvent)=>{const delta:{[key:string]:[number,number]}={ArrowLeft:[90,0],ArrowRight:[-90,0],ArrowUp:[0,90],ArrowDown:[0,-90]};
        if(e.target!==el||!delta[e.key])return;e.preventDefault();camera.pan.x+=delta[e.key][0];camera.pan.y+=delta[e.key][1];fit();};
      el.addEventListener('keydown',keys);
      const observer = new ResizeObserver(fit); observer.observe(el);
      const unsubscribe = useGame.subscribe((state,previous) => {
        if(state.selected&&(state.selected!==previous.selected||state.selectedVehicle!==previous.selectedVehicle)){
          const b=buildings.find(b=>b.id===state.selected)!;
          const point=state.selectedVehicle?vehiclePosition(state.selectedVehicle,state,visualHours):iso(b.x+.9,b.y+.9,b.height*.45);
          const mobile=window.innerWidth<=760;
          if(mobile)camera.zoom=Math.max(camera.zoom,1.5);
          camera.focus(point,origin(),{x:el.clientWidth*(mobile?.5:.34),y:mobile?65:el.clientHeight*.38},scene.world.scale.x);
          fit();
        }
        lastTick=performance.now(); if (scene.update(state)){const view=useNavigation.getState().view;if(view)scene.cull(view.footprint);render();} schedule();publishVehicle();
      });
      document.addEventListener('visibilitychange', render);
      cleanup = () => {
        observer.disconnect(); viewport.disconnect(); unsubscribe(); cancelAnimationFrame(frame); cancelAnimationFrame(animation);
        motion.removeEventListener('change',schedule);document.removeEventListener('visibilitychange',schedule);
        document.removeEventListener('visibilitychange', render);el.removeEventListener('keydown',keys);
        useNavigation.setState({view:null,vehiclePoint:null,recenter:()=>{},reset:()=>{}});
        el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', cancel);
        el.removeEventListener('lostpointercapture', cancel);
        el.removeEventListener('wheel', wheel); el.removeEventListener('camera', command);
        destroy();
      };
      scene.update(useGame.getState()); fit(); schedule();
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
