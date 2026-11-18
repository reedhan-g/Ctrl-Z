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
  const connection=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
  const title=root.querySelector<HTMLElement>('.opening-title');
  const copy=root.querySelector<HTMLElement>('.opening-copy');
  const introductions=[...root.querySelectorAll<HTMLElement>('.concept .editorial-split, .closing h2')];
  let frame=0,observer:IntersectionObserver|null=null,point={x:0,y:0};
  const available=()=>!media.matches&&pointer.matches&&!connection?.saveData;
  const visibility=()=>{root.dataset.motion=available()&&!motionPaused&&!document.hidden?'running':'static';schedule();};
  const update=()=>{
   frame=0;
   if(document.hidden)return;
   const distance=media.matches||motionPaused?0:Math.max(0,Math.min(600,scrollY));
   title?.style.setProperty('--headline-drift',`${distance*.08}px`);
   copy?.style.setProperty('--copy-drift',`${distance*.025}px`);
   root.style.setProperty('--network-drift',`${distance*.035}px`);
   root.style.setProperty('--network-x',`${available()&&!motionPaused?point.x:0}px`);
   root.style.setProperty('--network-y',`${available()&&!motionPaused?point.y:0}px`);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const move=(event:PointerEvent)=>{
   if(!available()||motionPaused)return;
   const box=root.querySelector('.opening')?.getBoundingClientRect();
   if(!box||event.clientY>box.bottom||box.bottom<0)return;
   point={x:(event.clientX/innerWidth-.5)*14,y:(event.clientY/innerHeight-.5)*10};schedule();
  };
  const leave=()=>{point={x:0,y:0};schedule();};
  const scopes=root.querySelectorAll<HTMLElement>('[data-motion-scope]');
  const loops=typeof IntersectionObserver==='undefined'?null:new IntersectionObserver(entries=>{
   for(const entry of entries)(entry.target as HTMLElement).dataset.inview=String(entry.isIntersecting);
  });
  for(const scope of scopes){if(loops)loops.observe(scope);else scope.dataset.inview='true';}
  const configure=()=>{
   observer?.disconnect();
   setMotionAvailable(available());visibility();
   if(!media.matches&&typeof IntersectionObserver!=='undefined'){
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
  addEventListener('scroll',schedule,{passive:true});
  addEventListener('resize',schedule,{passive:true});
  root.addEventListener('pointermove',move,{passive:true});root.addEventListener('pointerleave',leave);
  document.addEventListener('visibilitychange',visibility);
  media.addEventListener('change',configure);
  pointer.addEventListener('change',configure);
  configure();
  return()=>{
   cancelAnimationFrame(frame);observer?.disconnect();loops?.disconnect();
   removeEventListener('scroll',schedule);removeEventListener('resize',schedule);
   root.removeEventListener('pointermove',move);root.removeEventListener('pointerleave',leave);
   document.removeEventListener('visibilitychange',visibility);media.removeEventListener('change',configure);pointer.removeEventListener('change',configure);
  };
 },[motionPaused]);
 return {rootRef,motionPaused,setMotionPaused,motionAvailable};
}
