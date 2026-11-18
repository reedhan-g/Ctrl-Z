const message='Everything is connected · One failure. Many consequences. · Rewind the world · ';
export default function KineticTicker(){
 return <div className="ticker" data-motion-scope>
  <p className="sr-only">Everything is connected. One failure. Many consequences. Rewind the world.</p>
  <div className="ticker-track loop" aria-hidden="true">{[0,1].map(copy=><span key={copy}>{message}{message}</span>)}</div>
 </div>;
}
