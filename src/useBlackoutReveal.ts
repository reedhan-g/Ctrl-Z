import {useEffect,useRef,useState} from 'react';

type Phase='powered'|'transition'|'blackout';
export function useBlackoutReveal(){
 const sectionRef=useRef<HTMLElement>(null),stageRef=useRef<HTMLDivElement>(null),imageRef=useRef<HTMLDivElement>(null);
 const manual=useRef<number|null>(null),scheduleRef=useRef(()=>{});
 const [nearby,setNearby]=useState(false);
 const [view,setView]=useState({phase:'powered' as Phase,manual:false,reduced:false});
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)'),viewport=window.visualViewport;
  const touch=matchMedia('(pointer: coarse)');
  let frame=0,disposed=false,lastProgress=-1,lastView='',anchorOffset=location.hash==='#preview'?NaN:0;
  const flash=imageRef.current?.querySelector('.preview-flash');
  let flashAnimation:Animation|undefined,previousAutomatic:number|undefined,flashArmed=true;
  const update=()=>{
   frame=0;
   if(disposed||document.hidden||!sectionRef.current||!stageRef.current||!imageRef.current)return;
   const height=viewport?.height??innerHeight,offset=viewport?.offsetTop??0;
   // Pin only when the entire scene, including its direct controls, fits.
   // Short screens and zoomed viewports retain ordinary document scrolling.
   const stageHeight=stageRef.current.getBoundingClientRect().height;
   const pinned=!media.matches&&(!touch.matches||height>=720)&&stageHeight+32<=height;
   if(sectionRef.current.dataset.pinned!==String(pinned))sectionRef.current.dataset.pinned=String(pinned);
   const section=sectionRef.current.getBoundingClientRect(),image=imageRef.current.getBoundingClientRect();
   const outside=section.bottom<=offset||section.top>=offset+height;
   let progress:number,automatic:number|undefined;
   if(outside){
    manual.current=null;anchorOffset=0;
    progress=media.matches?0:(section.bottom<=offset?1:0);
   }else{
    const distance=pinned?16-(section.top-offset):height*.82-(image.top-offset);
    const span=pinned?section.height-stageHeight:Math.min(420,height*.60);
    if(Number.isNaN(anchorOffset))anchorOffset=Math.max(0,distance);
    const fraction=(distance-anchorOffset)/Math.max(1,span);
    // Ease into and out of the cut, with stable holds at both endpoints.
    const eased=Math.max(0,Math.min(1,(fraction-.1)/.8));
    automatic=eased*eased*(3-2*eased);
    progress=manual.current??(media.matches?0:automatic);
   }
   const canFlash=automatic!==undefined&&!touch.matches&&!media.matches&&manual.current===null&&
    sectionRef.current.closest<HTMLElement>('.landing')?.dataset.motion==='running';
   if(!canFlash){
    flashAnimation?.cancel();
    flashArmed=true;
    previousAutomatic=undefined;
   }else if(automatic!==undefined){
    if(automatic<.32||automatic>.68)flashArmed=true;
    else if(flashArmed&&previousAutomatic!==undefined&&Math.abs(previousAutomatic-automatic)<.24&&
      (previousAutomatic<.5)!==(automatic<.5)){
     flashArmed=false;
     flashAnimation?.cancel();
     flashAnimation=flash?.animate([{opacity:0},{opacity:.045,offset:.2},{opacity:0}],{duration:280,easing:'ease-out'});
    }
    previousAutomatic=automatic;
   }
   if(progress!==lastProgress){
    sectionRef.current.style.setProperty('--blackout-progress',String(progress));
    imageRef.current.dataset.progress=progress.toFixed(4);
    lastProgress=progress;
   }
   const phase:Phase=progress<.001?'powered':progress>.999?'blackout':'transition';
   const key=`${phase}:${manual.current!==null}:${media.matches}`;
   if(key!==lastView){lastView=key;setView({phase,manual:manual.current!==null,reduced:media.matches});}
  };
  const schedule=()=>{if(!disposed&&!frame)frame=requestAnimationFrame(update);};
  const anchor=()=>{if(location.hash==='#preview'){anchorOffset=NaN;manual.current=null;}schedule();};
  const previewLink=(event:MouseEvent)=>{
   if(event.target instanceof Element&&event.target.closest('a[href="#preview"]')){
    anchorOffset=NaN;manual.current=null;schedule();
   }
  };
  scheduleRef.current=schedule;
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  addEventListener('hashchange',anchor);
  document.addEventListener('click',previewLink);
  viewport?.addEventListener('resize',schedule,{passive:true});
  viewport?.addEventListener('scroll',schedule,{passive:true});
  document.addEventListener('visibilitychange',schedule);
  media.addEventListener('change',schedule);
  touch.addEventListener('change',schedule);
  const observer=typeof ResizeObserver==='undefined'?null:new ResizeObserver(schedule);
  // A fully clipped lazy image may never load in Chromium. Prepare both captures
  // shortly before arrival, while keeping them deferred on the opening screen.
  const images=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){setNearby(true);images?.disconnect();}
  },{rootMargin:'400px'});
  if(imageRef.current)images?.observe(imageRef.current);
  if(!images)setNearby(true);
  if(sectionRef.current)observer?.observe(sectionRef.current);
  if(stageRef.current)observer?.observe(stageRef.current);
  observer?.observe(document.documentElement);
  document.fonts.ready.then(schedule);
  // The hash target is mounted by React after the browser's initial anchor pass.
  // Complete only this explicit navigation; ordinary scrolling stays native.
  if(location.hash==='#preview')sectionRef.current?.scrollIntoView({block:'start',behavior:'instant'});
  schedule();
  return()=>{
   disposed=true;cancelAnimationFrame(frame);flashAnimation?.cancel();observer?.disconnect();images?.disconnect();scheduleRef.current=()=>{};
   removeEventListener('scroll',schedule);removeEventListener('resize',schedule);removeEventListener('hashchange',anchor);
   document.removeEventListener('click',previewLink);
   viewport?.removeEventListener('resize',schedule);viewport?.removeEventListener('scroll',schedule);
   document.removeEventListener('visibilitychange',schedule);media.removeEventListener('change',schedule);
   touch.removeEventListener('change',schedule);
  };
 },[]);
 const choose=(value:0|1)=>{manual.current=value;scheduleRef.current();};
 return {sectionRef,stageRef,imageRef,view,choose,nearby};
}
