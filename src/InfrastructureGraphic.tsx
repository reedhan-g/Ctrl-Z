/** Original geometry from the creator-supplied animated concept. No city/game drawing. */
export default function InfrastructureGraphic({final=false}:{final?:boolean}){
 if(final)return <div className="infrastructure-graphic final-graphic" aria-hidden="true"><svg className="loop" viewBox="0 0 640 640" fill="none" focusable="false"><circle cx="320" cy="320" r="232"/><circle cx="320" cy="320" r="282" opacity=".15"/><circle cx="320" cy="320" r="318" opacity=".08"/></svg></div>;
 return <div className="infrastructure-graphic hero-graphic" aria-hidden="true">
  <svg viewBox="0 0 500 500" fill="none" focusable="false">
   <g className="orbit loop"><circle cx="250" cy="250" r="186"/></g>
   <g className="orbit orbit-reverse loop"><circle cx="250" cy="250" r="130" strokeDasharray="10 16"/></g>
   <circle cx="250" cy="250" r="65"/>
   <path className="signal-route loop" d="M35 260h80l55-55h100l75-70h150M-20 355h140l60-60h165l95 95h100M85 30v90l110 110h70l90 90h135M320-20V85l-70 70v90l-75 75"/>
   <path d="M250 90v320M90 250h320" strokeDasharray="3 10" opacity=".4"/>
   <circle className="node-breathe loop" cx="345" cy="135" r="4"/><circle className="node-breathe node-delayed loop" cx="175" cy="320" r="4"/><circle className="node-breathe loop" cx="440" cy="390" r="3"/>
   <circle cx="250" cy="250" r="9"/><circle className="signal-node" cx="250" cy="250" r="2"/>
   <text x="375" y="170">MERIDIAN / NODE 01</text><text x="45" y="418">SYSTEM INTERDEPENDENCY</text>
  </svg>
 </div>;
}
