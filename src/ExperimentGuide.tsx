import {useEffect,useState,useRef} from 'react';
import {useGame} from './game';

export default function ExperimentGuide({onClose}:{onClose:()=>void}){
 const heading=useRef<HTMLHeadingElement>(null);
 useEffect(()=>{heading.current?.focus({preventScroll:true});},[]);
 const [step,setStep]=useState(()=>useGame.getState().outage?2:0);
 useEffect(()=>useGame.subscribe((s,previous)=>{
  if(step===1&&!previous.outage&&s.outage)setStep(2);
  if(step===2&&s.selected!==previous.selected&&s.selected)setStep(3);
  if(step===3&&(s.boosted.length>previous.boosted.length||s.restoredAt!==previous.restoredAt||s.history.length<previous.history.length))setStep(4);
 }),[step]);
 const titles=['This is Meridian.','Remove electricity.','Follow the cascade.','Change the outcome.','Explore freely.'];
 const text=['Break one system. Watch the consequences. Then change the outcome.','Use Remove electricity to start a real blackout. You can restore power at any time.','Backup systems are taking over. Select an affected facility in City Systems or on the map.','Inspect the condition, then deliver permitted supplies, restore power or use Undo. Your decisions are recorded.','Use the timeline to revisit decisions and compare responses. Your current experiment stays yours.'];
 return <section className="experiment-guide" aria-label="Guided experiment">
  <div><span>{step+1} / 5</span><button aria-label="Close guide" onClick={onClose}>Close</button></div>
  <h3 ref={heading} tabIndex={-1}>{titles[step]}</h3><p>{text[step]}</p>
  <div><button onClick={onClose}>{step===4?'Finish guide':'Skip guide'}</button>{step===0&&<button onClick={()=>setStep(useGame.getState().outage?2:1)}>Next</button>}</div>
 </section>;
}
