import {memo,useEffect,useState} from 'react';
import {useGame,buildings,status} from './game';
import {useNavigation} from './navigation';
import {minimapBounds as box,minimapDistricts,minimapLand,minimapRoads,landmarkPoint,symbols} from './minimapGeometry';

const Geography=memo(function Geography(){return <g aria-hidden="true">
 <polygon points={minimapLand} fill="#151a29" stroke="#68808c" strokeWidth="12"/>
 {minimapDistricts.map(d=><polygon key={d.id} points={d.points} fill={`#${d.color.toString(16).padStart(6,'0')}`} stroke="#626071" strokeWidth="8"/>)}
 {minimapRoads.map((road,i)=><path key={i} d={`M${road[0].x},${road[0].y} L${road[1].x},${road[1].y}`} stroke="#8b829b" strokeWidth="13" fill="none"/>)}
 </g>;});

export default function Minimap(){
 const s=useGame(),view=useNavigation(state=>state.view);
 const [expanded,setExpanded]=useState(()=>window.innerWidth>760);
 useEffect(()=>{if(window.innerWidth<=760)setExpanded(false);},[s.selected,s.selectedVehicle]);
 const footprint=view?.footprint;
 return <aside className="minimap" aria-label="City minimap" data-expanded={expanded}>
  <div className="minimap-heading"><span>MERIDIAN / N ↑</span><button aria-label={expanded?'Collapse minimap':'Expand minimap'} aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>Map {expanded?'−':'+'}</button></div>
  {expanded&&<>
   <svg viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`} aria-label="Full city geography" role="img">
    <Geography/>
    {buildings.map(b=>{const p=landmarkPoint(b.id),state=status(b.id,s),selected=s.selected===b.id;return <g key={b.id} role="img" aria-label={`${b.name}: ${state.label}${selected?', selected':''}`} data-landmark={b.id} transform={`translate(${p.x} ${p.y})`}>
     <title>{b.name}: {state.label}</title>
     <circle r={selected?65:50} fill={state.tone==='bad'?'#542d40':state.tone==='warn'?'#5d4c32':'#203e43'} stroke={selected?'#fff0fb':state.tone==='bad'?'#f39180':state.tone==='warn'?'#e9ba7b':'#75d8d9'} strokeWidth={selected?18:12}/>
     <text y="31" textAnchor="middle" fill="#f5edf6" fontSize="100" fontFamily="monospace">{symbols[b.id]}</text>
     {state.tone!=='good'&&<text x="48" y="-35" fill="#ffe3b0" fontSize="105" fontFamily="monospace">{state.tone==='bad'?'!':'~'}</text>}
    </g>;})}
    {footprint&&<rect data-footprint="true" data-testid="camera-footprint" x={footprint.x} y={footprint.y} width={footprint.width} height={footprint.height} fill="#8be5e21a" stroke="#d8fff4" strokeWidth="17"/>}
   </svg>
   <p className="minimap-legend">P power · H hospital · W water · T telecom · L logistics · R homes<br/>! interrupted · ~ reserve. Other buildings are scenery.</p>
  </>}
 </aside>;
}
