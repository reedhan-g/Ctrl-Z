import {useEffect,useRef} from 'react';

/** Small progressive enhancements; the blackout remains the main motion. */
export function useLandingMotion(){
 const rootRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const root=rootRef.current;
  if(!root)return;
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const title=root.querySelector<HTMLElement>('.opening-title');
  const copy=root.querySelector<HTMLElement>('.opening-copy');
  const introductions=[...root.querySelectorAll<HTMLElement>('.concept .editorial-split, .closing h2')];
  let frame=0,observer:IntersectionObserver|null=null;
  const update=()=>{
   frame=0;
   if(document.hidden)return;
   const distance=media.matches?0:Math.max(0,Math.min(600,scrollY));
   title?.style.setProperty('--headline-drift',`${distance*.08}px`);
   copy?.style.setProperty('--copy-drift',`${distance*.025}px`);
  };
  const schedule=()=>{if(!frame)frame=requestAnimationFrame(update);};
  const configure=()=>{
   observer?.disconnect();
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
  document.addEventListener('visibilitychange',schedule);
  media.addEventListener('change',configure);
  configure();
  return()=>{
   cancelAnimationFrame(frame);observer?.disconnect();
   removeEventListener('scroll',schedule);removeEventListener('resize',schedule);
   document.removeEventListener('visibilitychange',schedule);media.removeEventListener('change',configure);
  };
 },[]);
 return rootRef;
}
