import { useEffect, useRef, useState } from 'react';
import { Application } from 'pixi.js';
import { useGame, buildings } from './game';
import { buildCityScene } from './CityScene';
import { pickBuilding, iso } from './geometry';
import { CameraGesture } from './camera';
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
      const origin = () => ({ x: el.clientWidth / 2, y: el.clientHeight * .19 });
      let frame = 0;
      const render = () => {
        if (frame || document.hidden || disposed) return;
        frame = requestAnimationFrame(() => { frame = 0; if (!disposed) app.render(); });
      };
      function fit() {
        if (app.screen.width !== el.clientWidth || app.screen.height !== el.clientHeight)
          app.renderer.resize(el.clientWidth, el.clientHeight);
        const baseScale = Math.min(el.clientWidth / 880, el.clientHeight / 650);
        scene.world.scale.set(baseScale * camera.zoom);
        const center = origin();
        scene.world.position.set(center.x + camera.pan.x, center.y + camera.pan.y);
        render();
      }
      const motion=matchMedia('(prefers-reduced-motion: reduce)');
      let animation=0,lastFrame=0,lastTick=performance.now(),visible=true,visualHours=0;
      const ambientStart=performance.now();
      const moving=()=>{const s=useGame.getState();return !disposed&&visible&&!document.hidden&&!lowPower&&!motion.matches&&(s.playing||(!s.outage&&!s.history.length));};
      const animate=(now:number)=>{
        animation=0;
        if(!moving())return;
        if(now-lastFrame>=33){
          const s=useGame.getState();
          visualHours=s.playing?Math.max(0,now-lastTick)*s.speed/6000:(now-ambientStart)/6000;
          if(scene.animate(s,visualHours))render();
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
      const move = (e: PointerEvent) => { camera.move(e.pointerId, localPoint(e), origin()); fit(); };
      const up = (e: PointerEvent) => {
        if (camera.up(e.pointerId)) {
          const p = localPoint(e);
          const point={x:(p.x-scene.world.x)/scene.world.scale.x,y:(p.y-scene.world.y)/scene.world.scale.y};
          const state=useGame.getState(),building=pickBuilding(point),vehicle=building?null:pickVehicle(point,state,visualHours);
          if(vehicle)state.selectVehicle(vehicle);else state.select(building);
        }
      };
      const cancel = (e: PointerEvent) => camera.cancel(e.pointerId);
      const wheel = (e: WheelEvent) => { e.preventDefault(); camera.zoomAt(Math.exp(-e.deltaY * .001), localPoint(e), origin()); fit(); };
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
      const observer = new ResizeObserver(fit); observer.observe(el);
      const unsubscribe = useGame.subscribe((state,previous) => {
        if(state.selected&&(state.selected!==previous.selected||state.selectedVehicle!==previous.selectedVehicle)){
          const b=buildings.find(b=>b.id===state.selected)!;
          const point=state.selectedVehicle?vehiclePosition(state.selectedVehicle,state,visualHours):iso(b.x+.9,b.y+.9,b.height*.45);
          const mobile=window.innerWidth<=760;
          camera.focus(point,origin(),{x:el.clientWidth*(mobile?.5:.34),y:mobile?65:el.clientHeight*.38},scene.world.scale.x);
          fit();
        }
        lastTick=performance.now(); if (scene.update(state)) render(); schedule();
      });
      document.addEventListener('visibilitychange', render);
      cleanup = () => {
        observer.disconnect(); viewport.disconnect(); unsubscribe(); cancelAnimationFrame(frame); cancelAnimationFrame(animation);
        motion.removeEventListener('change',schedule);document.removeEventListener('visibilitychange',schedule);
        document.removeEventListener('visibilitychange', render);
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
