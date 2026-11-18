import type {CSSProperties} from 'react';
import {dependencies} from './dependencies';

const nodes=[
 {id:'grid',name:'Electricity',detail:'North substation',x:120,y:280,mx:500,my:60},
 {id:'water',name:'Waterworks',detail:'Pumps & supply',x:440,y:110,mx:250,my:190},
 {id:'telecom',name:'Telecom',detail:'Communications',x:440,y:450,mx:750,my:190},
 {id:'homes',name:'Residences',detail:'Power + water',x:830,y:85,mx:250,my:330},
 {id:'hospital',name:'Hospital',detail:'Power + water',x:830,y:280,mx:750,my:330},
 {id:'logistics',name:'Logistics',detail:'Power + dispatch',x:830,y:475,mx:750,my:480},
];
const routes:Record<string,[string,string]>={
 'grid:hospital':['M208 280H742','M720 60H988V330H970'],
 'grid:water':['M208 280H270V110H352','M500 96V130H250V154'],
 'grid:homes':['M208 280H270V30H650V85H742','M280 60H12V330H30'],
 'water:homes':['M528 110H650V85H742','M250 226V294'],
 'water:hospital':['M528 110H650V280H742','M470 190H500V330H530'],
 'grid:telecom':['M208 280H270V450H352','M500 96V130H750V154'],
 'grid:logistics':['M208 280H270V530H650V475H742','M720 60H988V480H970'],
 'telecom:logistics':['M528 450H650V475H742','M750 226V260H500V430H750V444'],
};
export default function DependencyNetwork(){
 return <figure className="dependency-network" data-motion-scope aria-labelledby="network-title" aria-describedby="network-description">
  <div className="network-heading"><h3 id="network-title">Meridian / Dependency network</h3><p>Simplified schematic</p></div>
  <div className="network-plot">
   {[false,true].map(mobile=><svg key={String(mobile)} className={mobile?'network-mobile':'network-desktop'} viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true" focusable="false">
    <defs><marker id={`direction-${mobile}`} markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto" markerUnits="strokeWidth"><path d="m1 1 6 3-6 3" fill="none" stroke="currentColor"/></marker></defs>
    <g className="network-edges">{dependencies.map(edge=>{
     const key=`${edge.source}:${edge.target}`,path=routes[key][mobile?1:0];
     return <path key={key} data-edge={key} className={`edge-${edge.system}`} d={path} markerEnd={`url(#direction-${mobile})`}/>;
    })}</g>
    <g className="network-signals loop">{dependencies.map(edge=><path key={`${edge.source}:${edge.target}`} d={routes[`${edge.source}:${edge.target}`][mobile?1:0]}/>)}</g>
   </svg>)}
   {nodes.map(node=><div className="network-node" data-node={node.id} key={node.id} style={{'--node-x':`${node.x/10}%`,'--node-y':`${node.y/5.6}%`,'--mobile-x':`${node.mx/10}%`,'--mobile-y':`${node.my/5.6}%`} as CSSProperties}><span className="network-dot"/><strong>{node.name}</strong><span>{node.detail}</span></div>)}
  </div>
  <figcaption id="network-description">Electricity powers all five services. Water supplies homes and the hospital; telecom supports logistics. The hospital has a 12-hour water buffer. Lines show dependencies, not live status.</figcaption>
 </figure>;
}
