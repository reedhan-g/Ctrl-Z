import {memo,useEffect,useState,useRef,type PointerEvent as ReactPointerEvent} from 'react';
import {useGame,buildings,status} from './game';
import {useNavigation} from './navigation';
import {fleet,vehiclePosition} from './traffic';
import {minimapBounds as box,minimapDistricts,minimapLand,minimapRoads,landmarkPoint,symbols,MinimapDrag} from './minimapGeometry';

const Geography=memo(function Geography(){return <g aria-hidden="true">
 <polygon points={minimapLand} fill="#151a29" stroke="#68808c" strokeWidth="12"/>
 {minimapDistricts.map(d=><polygon key={d.id} points={d.points} fill={`#${d.color.toString(16).padStart(6,'0')}`} stroke="#626071" strokeWidth="8"/>)}
 {minimapRoads.map((road,i)=><path key={i} d={`M${road[0].x},${road[0].y} L${road[1].x},${road[1].y}`} stroke="#8b829b" strokeWidth="13" fill="none"/>)}
 </g>;});

export default function Minimap(){
 const s=useGame(),view=useNavigation(state=>state.view);
 const vehiclePoint=useNavigation(state=>state.vehiclePoint);
 const [expanded,setExpanded]=useState(()=>window.innerWidth>760);
 useEffect(()=>{if(window.innerWidth<=760)setExpanded(false);},[s.selected,s.selectedVehicle]);
 const footprint=view?.footprint;
 const drag=useRef(new MinimapDrag()),pointer=useRef<number|null>(null);
 const tap=useRef<{x:number;y:number;point:{x:number;y:number};moved:boolean}|null>(null);
 useEffect(()=>{if(!expanded){pointer.current=null;drag.current.end();tap.current=null;}},[expanded]);
 const point=(e:ReactPointerEvent<SVGSVGElement>)=>{
  const matrix=e.currentTarget.getScreenCTM();if(!matrix)return null;
  const p=e.currentTarget.createSVGPoint();p.x=e.clientX;p.y=e.clientY;return p.matrixTransform(matrix.inverse());
 };
 const down=(e:ReactPointerEvent<SVGSVGElement>)=>{
  e.stopPropagation();e.preventDefault();if(pointer.current!==null||!footprint||(e.pointerType==='mouse'&&e.button!==0))return;
  const p=point(e);if(!p)return;
  e.currentTarget.focus({preventScroll:true});e.currentTarget.setPointerCapture(e.pointerId);pointer.current=e.pointerId;
  tap.current={x:e.clientX,y:e.clientY,point:{x:p.x,y:p.y},moved:false};
  useNavigation.getState().recenter(drag.current.down(p,footprint,(e.target as Element).getAttribute('data-footprint')==='true'));
 };
 const move=(e:ReactPointerEvent<SVGSVGElement>)=>{
  if(pointer.current!==e.pointerId)return;e.stopPropagation();e.preventDefault();if(tap.current&&Math.hypot(e.clientX-tap.current.x,e.clientY-tap.current.y)>4)tap.current.moved=true;
  const p=point(e),target=p&&drag.current.move(p);if(target)useNavigation.getState().recenter(target);
 };
 const end=(e:ReactPointerEvent<SVGSVGElement>)=>{
  if(pointer.current!==e.pointerId)return;e.stopPropagation();pointer.current=null;drag.current.end();
  if(e.type==='pointerup'&&tap.current&&!tap.current.moved)useNavigation.getState().recenter(tap.current.point);
  tap.current=null;
  if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId);
 };
 return <aside className="minimap" aria-label="City minimap" data-expanded={expanded}>
  <div className="minimap-heading"><span>MERIDIAN / N ↑</span><button aria-label={expanded?'Collapse minimap':'Expand minimap'} aria-expanded={expanded} onClick={()=>setExpanded(!expanded)}>Map {expanded?'−':'+'}</button></div>
  {expanded&&<>
   <svg viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`} aria-label="Interactive city minimap" aria-describedby="minimap-instructions" role="application" tabIndex={0}
    onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={end}
    onKeyDown={e=>{if(!footprint)return;const center={x:footprint.x+footprint.width/2,y:footprint.y+footprint.height/2};
     const delta:{[key:string]:[number,number]}={ArrowLeft:[-footprint.width*.15,0],ArrowRight:[footprint.width*.15,0],ArrowUp:[0,-footprint.height*.15],ArrowDown:[0,footprint.height*.15]};
     if(e.key==='Home'){e.preventDefault();e.stopPropagation();useNavigation.getState().reset();}
     else if(delta[e.key]){e.preventDefault();e.stopPropagation();useNavigation.getState().recenter({x:center.x+delta[e.key][0],y:center.y+delta[e.key][1]});}}}>
    <desc id="minimap-instructions">Tap to recenter. Drag the outlined viewport to pan. Arrow keys navigate; Home resets. P power, H hospital, W water, T telecom, L logistics, R homes. ! interrupted; ~ reserve. Other buildings are scenery.</desc>
    <Geography/>
    {buildings.map(b=>{const p=landmarkPoint(b.id),state=status(b.id,s),selected=s.selected===b.id;return <g key={b.id} role="img" aria-label={`${b.name}: ${state.label}${selected?', selected':''}`} data-landmark={b.id} transform={`translate(${p.x} ${p.y})`}>
     <title>{b.name}: {state.label}</title>
     <circle r={selected?65:50} fill={state.tone==='bad'?'#542d40':state.tone==='warn'?'#5d4c32':'#203e43'} stroke={selected?'#fff0fb':state.tone==='bad'?'#f39180':state.tone==='warn'?'#e9ba7b':'#75d8d9'} strokeWidth={selected?18:12}/>
     <text y="31" textAnchor="middle" fill="#f5edf6" fontSize="100" fontFamily="monospace">{symbols[b.id]}</text>
     {state.tone!=='good'&&<text x="48" y="-35" fill="#ffe3b0" fontSize="105" fontFamily="monospace">{state.tone==='bad'?'!':'~'}</text>}
    </g>;})}
    {fleet.map(v=>{const selected=s.selectedVehicle===v.id,p=selected&&vehiclePoint?vehiclePoint:vehiclePosition(v.id,s);return <g key={v.id} data-courier={v.id} aria-label={`${v.name}: ${status('logistics',s).label}${selected?', selected':''}`} transform={`translate(${p.x} ${p.y})`} role="img"><title>{v.name}: {status('logistics',s).label}</title><path d="M0,-45 L40,35 L-40,35 Z" fill={selected?'#fff3ca':'#eabb69'} stroke="#17222d" strokeWidth="10"/>{selected&&<circle r="65" fill="none" stroke="#fff" strokeWidth="12"/>}</g>;})}
    {footprint&&<rect data-footprint="true" data-testid="camera-footprint" x={footprint.x} y={footprint.y} width={footprint.width} height={footprint.height} fill="#8be5e21a" stroke="#d8fff4" strokeWidth="17"/>}
   </svg>
   <p className="minimap-legend">P power · H hospital · W water · T telecom · L logistics · R homes<br/>! interrupted · ~ reserve. Other buildings are scenery.</p>
   <select className="minimap-landmarks" aria-label="Minimap landmark navigation" defaultValue="" onChange={e=>{if(e.target.value)useNavigation.getState().recenter(landmarkPoint(e.target.value as typeof buildings[number]['id']));e.target.value='';}}>
    <option value="">Navigate to a service…</option>{buildings.map(b=><option value={b.id} key={b.id}>{b.name}</option>)}
   </select>
  </>}
 </aside>;
}
