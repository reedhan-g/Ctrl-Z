/** Original schematic geometry, not a city illustration or a live-data display. */
export default function InfrastructureGraphic({final=false}:{final?:boolean}){
 return <div className={`infrastructure-graphic ${final?'final-graphic':'hero-graphic'}`} aria-hidden="true">
  <svg viewBox="0 0 640 640" fill="none" focusable="false">
   <g className="orbit loop"><circle cx="320" cy="320" r="232"/><path d="M320 88a232 232 0 0 1 232 232" className="orbit-highlight"/><circle cx="320" cy="88" r="4" className="signal-node"/></g>
   <g className="orbit orbit-reverse loop"><circle cx="320" cy="320" r="174" strokeDasharray="2 12"/><path d="M146 320a174 174 0 0 0 174 174"/><circle cx="494" cy="320" r="3" className="signal-node"/></g>
   <circle cx="320" cy="320" r="104"/>
   <path d="M20 240h142v80h316v128h142M320 20v166h112v134h188M72 532h128V400h120V298H176V112M320 400v220M20 320h142"/>
   <path className="signal-route loop" d="M20 240h142v80h316v128h142M320 20v166h112v134h188"/>
   <g className="junctions"><circle cx="162" cy="240" r="4"/><circle cx="162" cy="320" r="4"/><circle cx="320" cy="400" r="4"/><circle cx="432" cy="186" r="4"/><circle cx="478" cy="448" r="4"/></g>
   <circle className="node-breathe loop" cx="432" cy="320" r="7"/><circle className="node-breathe node-delayed loop" cx="200" cy="532" r="5"/>
   <path d="M308 320h24M320 308v24M36 36h24M48 24v24M580 580h24M592 568v24"/>
   <text x="362" y="70">SYSTEM INTERDEPENDENCY</text><text x="334" y="592">MERIDIAN / NODE 01</text>
  </svg>
 </div>;
}
