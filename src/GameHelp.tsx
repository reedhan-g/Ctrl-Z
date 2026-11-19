import { ArrowRight, X } from 'lucide-react';
import { crisisDeadline, crisisMaximum, crisisTarget } from './crisis';
import type { GameMode } from './ScenarioPanel';

const modeHelp = {
  sandbox: {
    title: 'Sandbox',
    instructions: 'Use Remove electricity to start the outage. Backup supplies extend a facility’s reserve by eight hours. Use Restore electricity to manually reconnect the district whenever you’re ready.',
  },
  crisis: {
    title: 'Meridian Blackout',
    instructions: `You have ${crisisDeadline} simulated hours and two supply teams. Preserve at least ${crisisTarget.serviceHours} of ${crisisMaximum} service-hours and keep at least ${crisisTarget.activeServices} services active at the deadline. Manual grid restoration is unavailable during the crisis.`,
  },
  investigation: {
    title: 'Investigation',
    instructions: 'Use the timeline to reach the case’s evidence hour. Inspect the required facilities and record their readings, then test your diagnosis. After confirming the cause, use supplies or restore district power and check whether the affected service recovers.',
  },
} satisfies Record<GameMode, {title: string; instructions: string}>;

export default function GameHelp({mode,onClose,onGuide}:{
  mode:GameMode;onClose:()=>void;onGuide:()=>void;
}){
  const {title,instructions}=modeHelp[mode];
  return <div className="modal-backdrop" onClick={onClose}>
    <section className="help" role="dialog" aria-modal="true" aria-label="How to play" onClick={event=>event.stopPropagation()}>
      <button className="icon close-help" aria-label="Close help" onClick={onClose}><X/></button>
      <h2>{title} help</h2>
      <p>{instructions}</p>
      <h3>Shared controls</h3>
      <ul>
        <li>Drag to pan, scroll or pinch to zoom, and select a facility to inspect its status and dependencies.</li>
        <li>Use Play or Pause on the timeline. Space also toggles playback when the map is focused.</li>
        <li>Scrub the timeline to revisit decisions. Use Ctrl or Command + Z to undo an intervention. Change an earlier decision to create a new response.</li>
      </ul>
      <button className="supply" onClick={onGuide}>Start guided experiment</button>
      <button className="primary" onClick={onClose}>Explore the district<ArrowRight size={17}/></button>
    </section>
  </div>;
}
