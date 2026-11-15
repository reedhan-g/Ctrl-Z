import {useLayoutEffect,useRef,useState} from 'react';
import {useNavigation} from './navigation';
import {useGame,buildings} from './game';
import {layoutLandmarkLabels} from './landmarkLabelLayout';
import type {ViewRect} from './worldCamera';

export default function LandmarkLabels(){
 const root=useRef<HTMLDivElement>(null),view=useNavigation(s=>s.view),hovered=useNavigation(s=>s.hoveredLandmark),selected=useGame(s=>s.selected);
 const [obstacles,setObstacles]=useState<ViewRect[]>([]);
 useLayoutEffect(()=>{
  const host=root.current?.parentElement,world=host?.parentElement;if(!host||!world)return;
  let frame=0;
  const measure=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{
   const canvas=host.getBoundingClientRect();setObstacles([...world.querySelectorAll<HTMLElement>('.minimap,.inspector,.timeline,.map-controls,.world-top,.map-hint')].filter(n=>n.getClientRects().length).map(n=>{const r=n.getBoundingClientRect();return{x:r.left-canvas.left,y:r.top-canvas.top,width:r.width,height:r.height};}));
  });};
  const observer=new ResizeObserver(measure);
  const observe=()=>{observer.disconnect();observer.observe(host);world.querySelectorAll('.minimap,.inspector,.timeline,.map-controls,.world-top').forEach(n=>observer.observe(n));measure();};
  const changes=new MutationObserver(observe);changes.observe(world,{childList:true});observe();
  window.addEventListener('inspection-layout',measure);window.addEventListener('resize',measure);
  return()=>{cancelAnimationFrame(frame);changes.disconnect();observer.disconnect();window.removeEventListener('inspection-layout',measure);window.removeEventListener('resize',measure);};
 },[]);
 const labels=view?layoutLandmarkLabels(view,obstacles,selected,hovered):[];
 return <div ref={root} className="landmark-label-layer">
  {labels.map(label=><span aria-hidden="true" key={label.id} data-landmark-label={label.id} data-emphasized={label.emphasized} data-selected={label.selected} className="landmark-name" style={{left:label.x,top:label.y,width:label.width,height:label.height}}>{label.name}</span>)}
  <span id="landmark-selected-name" className="landmark-announcement" aria-live="polite">{selected?`${buildings.find(b=>b.id===selected)!.name}, selected. Inspection is open.`:'Important facilities have name labels. Select a facility to inspect its services.'}</span>
 </div>;
}
