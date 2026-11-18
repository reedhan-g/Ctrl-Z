import {useBlackoutReveal} from './useBlackoutReveal';

const captures=[
 {label:'Power on',desktop:new URL('./assets/previews/city-powered.png',import.meta.url).href,mobile:new URL('./assets/previews/city-powered-mobile.png',import.meta.url).href},
 {label:'Power off',desktop:new URL('./assets/previews/city-blackout.png',import.meta.url).href,mobile:new URL('./assets/previews/city-blackout-mobile.png',import.meta.url).href},
];

export default function BlackoutPreview({onEnter}:{onEnter:()=>void}){
 const {sectionRef,stageRef,imageRef,view,choose,nearby}=useBlackoutReveal();
 const status={powered:'Power connected',transition:'The moment of interruption',blackout:'Grid disconnected'}[view.phase];
 const caption={
  powered:'The city before the power cut. All six services are operational.',
  transition:'Two real captures. One electricity decision.',
  blackout:'Grid disconnected / Backup systems active.',
 }[view.phase];
 return <section id="preview" ref={sectionRef} className="preview-section page-width blackout-preview" data-state={view.phase} aria-labelledby="preview-title">
  <div className="preview-stage" ref={stageRef}>
  <div className="preview-heading">
   <div><p className="preview-index">02 / The interruption</p><h2 id="preview-title">Watch the city go dark.</h2></div>
   <div className="preview-switch" role="group" aria-label="Gameplay preview state">
    {captures.map((capture,index)=><button key={capture.label} type="button" aria-pressed={view.phase===(index===0?'powered':'blackout')} aria-controls="game-preview" aria-describedby="preview-instruction" onClick={()=>choose(index as 0|1)}>{capture.label}</button>)}
   </div>
  </div>
  <div className="preview-summary">
   <p className="preview-state" role="status">{status}</p>
   <p id="preview-instruction">{view.manual?'Your choice stays until you leave this preview.':view.reduced?'Choose a capture to compare the power cut.':'Scroll through the city to compare the power cut.'}</p>
  </div>
  <figure id="game-preview">
   <div className="preview-images" ref={imageRef} data-progress="0">
    {captures.map((capture,index)=><picture key={capture.label} className={`${index===1?'blackout-layer':'preview-base'} ${(index===1)===(view.phase==='blackout')?'preview-active':''}`} aria-hidden={index===1?true:undefined}>
     <source media="(max-width: 600px)" srcSet={capture.mobile} width="1290" height="1467"/>
     <img src={capture.desktop} alt={index===0?'Meridian before and after a power cut, shown as an aligned comparison of actual gameplay captures.':''} width="1685" height="692" loading={nearby?'eager':'lazy'} decoding="async"/>
    </picture>)}
    <div className="blackout-rail" aria-hidden="true"><span/></div>
   </div>
   <figcaption><span>{caption}</span><span>Meridian / Actual game capture</span></figcaption>
  </figure>
  <p className="preview-note">The experiment is yours to change. <a href="#simulation" onClick={onEnter}>Explore the city yourself</a>.</p>
  </div>
 </section>;
}
