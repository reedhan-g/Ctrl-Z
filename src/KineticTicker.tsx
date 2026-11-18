const phrases=['Everything is connected','One failure. Many consequences.','Rewind the world'];
export default function KineticTicker(){
 return <div className="ticker" data-motion-scope>
  <p className="sr-only">Everything is connected. One failure. Many consequences. Rewind the world.</p>
  <div className="ticker-track loop" aria-hidden="true">{[0,1].map(copy=>
   <div className="ticker-cycle" key={copy}>{[0,1].map(repeat=>
    <span key={repeat}>{phrases.map(phrase=>
     <span key={phrase}>{phrase}<svg viewBox="0 0 12 12"><path d="M6 1v10M1 6h10M2.5 2.5l7 7m0-7-7 7"/></svg></span>
    )}</span>
   )}</div>
  )}</div>
 </div>;
}
