import {useEffect,useRef,useState,type ReactNode} from 'react';
import {X,ChevronDown,ChevronUp} from 'lucide-react';

export default function InspectionShell({title,category,status,onClose,children}:{title:string;category:string;status?:{label:string;tone:string};onClose:()=>void;children:ReactNode}){
 const [collapsed,setCollapsed]=useState(false),root=useRef<HTMLElement>(null);
 useEffect(()=>{const observer=new ResizeObserver(()=>window.dispatchEvent(new Event('inspection-layout')));if(root.current)observer.observe(root.current);return()=>observer.disconnect();},[]);
 useEffect(()=>{
  const previous=document.activeElement as HTMLElement|null,node=root.current;
  const media=matchMedia('(max-width:760px)'),resize=()=>{if(!media.matches)setCollapsed(false);};
  media.addEventListener('change',resize);
  return()=>{media.removeEventListener('change',resize);if(node?.contains(document.activeElement)){
   if(previous?.isConnected&&!node.contains(previous))previous.focus({preventScroll:true});
   else document.querySelector<HTMLElement>('.city-canvas')?.focus({preventScroll:true});
  }};
 },[]);
 return <section ref={root} className="inspector" aria-label="Building inspection" data-collapsed={collapsed}>
  <div className="inspector-top"><span className="eyebrow">{category}</span><div className="inspection-controls">
   <button className="icon sheet-toggle" aria-label={collapsed?'Expand inspection':'Collapse inspection'} aria-expanded={!collapsed} aria-controls="inspection-body" onClick={()=>setCollapsed(!collapsed)}>{collapsed?<ChevronUp size={17}/>:<ChevronDown size={17}/>}</button>
   <button className="icon" aria-label="Close inspection" onClick={onClose}><X size={17}/></button>
  </div></div>
  <h3 tabIndex={-1}>{title}</h3>
  {status&&<span className={`status-text ${status.tone}`}><i/>{status.label}</span>}
  <div id="inspection-body" className="inspector-body" hidden={collapsed}>{children}</div>
 </section>;
}
