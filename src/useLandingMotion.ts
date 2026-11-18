import {useEffect,useRef,useState} from 'react';

/** Small progressive enhancements; the blackout remains the main motion. */
export function useLandingMotion(){
 const rootRef=useRef<HTMLDivElement>(null);
 const [motionPaused,setMotionPaused]=useState(false),[motionAvailable,setMotionAvailable]=useState(false);
 useEffect(()=>{
  const root=rootRef.current;
  if(!root)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const pointer=matchMedia('(hover: hover) and (pointer: fine)');
  const touch=matchMedia('(pointer: coarse)');
  const connection=(navigator as Navigator & {connection?:EventTarget & {saveData?:boolean}}).connection;
  const opening=root.querySelector<HTMLElement>('.opening');
  const title=root.querySelector<HTMLElement>('.opening-title');
  const copy=root.querySelector<HTMLElement>('.opening-copy');
  const introductions=[...root.querySelectorAll<HTMLElement>('.concept .editorial-split, .possibilities > h2, .feature-list > li, #closing-title')];
  let frame=0,observer:IntersectionObserver|null=null,point={x:75,y:38};
  const available=()=>!media.matches&&!connection?.saveData&&(pointer.matches||touch.matches);
  const parallax=()=>available()&&pointer.matches&&!motionPaused;
  const visibility=()=>{root.dataset.motion=available()&&!motionPaused&&!document.hidden?'running':'static';schedule();};
  const update=()=>{
   frame=0;
   if(document.hidden)return;
   const distance=parallax()?Math.max(0,Math.min(600,scrollY)):0;
   title?.style.setProperty('--headline-drift',`${Math.min(50,distance*.07)}px`);
   title?.style.setProperty('--headline-opacity',String(Math.max(.35,1-distance/680)));
   copy?.style.setProperty('--copy-drift',`${distance*.025}px`);
   root.style.setProperty('--network-drift',`${-distance*.11}px`);
   opening?.style.setProperty('--light-x',`${parallax()?point.x:75}%`);
   opening?.style.setProperty('--light-y',`${parallax()?point.y:38}%`);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const scroll=()=>{if(pointer.matches)schedule();};
  const move=(event:PointerEvent)=>{
   if(!parallax()||event.pointerType==='touch')return;
   const box=opening?.getBoundingClientRect();
   if(!box)return;
   point={x:(event.clientX-box.left)/box.width*100,y:(event.clientY-box.top)/box.height*100};
   schedule();
  };
  const leave=()=>{point={x:75,y:38};schedule();};
  const scopes=root.querySelectorAll<HTMLElement>('[data-motion-scope]');
  const loops=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
   for(const entry of entries)(entry.target as HTMLElement).dataset.inview=String(entry.isIntersecting);
  });
  for(const scope of scopes){if(loops)loops.observe(scope);else scope.dataset.inview='true';}
  const configure=()=>{
   observer?.disconnect();
   setMotionAvailable(available());visibility();
   if(!media.matches&&!connection?.saveData&&!motionPaused&&typeof IntersectionObserver!=='undefined'){
    observer=new IntersectionObserver(entries=>{
     for(const entry of entries)if(entry.isIntersecting){
      (entry.target as HTMLElement).dataset.arrived='true';observer?.unobserve(entry.target);
     }
    },{threshold:.12});
    for(const element of introductions){
     // Initial and direct-anchor content never waits on an entrance.
     if(element.getBoundingClientRect().top<innerHeight)element.dataset.arrived='true';
     else if(element.dataset.arrived!=='true'){element.dataset.arrived='false';observer.observe(element);}
    }
   }else for(const element of introductions)element.dataset.arrived='true';
   schedule();
  };
  addEventListener('scroll',scroll,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  opening?.addEventListener('pointermove',move,{passive:true});opening?.addEventListener('pointerleave',leave);
  document.addEventListener('visibilitychange',visibility);
  media.addEventListener('change',configure);
  pointer.addEventListener('change',configure);
  touch.addEventListener('change',configure);
  connection?.addEventListener('change',configure);
  configure();
  return()=>{
   cancelAnimationFrame(frame);observer?.disconnect();loops?.disconnect();
   removeEventListener('scroll',scroll);removeEventListener('resize',schedule);
   opening?.removeEventListener('pointermove',move);opening?.removeEventListener('pointerleave',leave);
   document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',configure);pointer.removeEventListener('change',configure);
   touch.removeEventListener('change',configure);
   connection?.removeEventListener('change',configure);
  };
 },[motionPaused]);
 return {rootRef,motionPaused,setMotionPaused,motionAvailable};
}
