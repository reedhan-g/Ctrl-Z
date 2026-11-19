import { crisisDeadline, crisisMaximum, crisisTarget, essentialServices } from './crisis';

export default function ServiceHoursDetails({ crisis = false }: { crisis?: boolean }) {
  return <details className="score-explainer">
    <summary>What are service-hours?</summary>
    <p>One service running at full capacity for one simulated hour earns one service-hour. Partial capacity earns proportionally less.</p>
    {crisis && <p>
      {essentialServices.length} scored services over {crisisDeadline} hours can earn up to {crisisMaximum} service-hours.
      To win, earn at least {crisisTarget.serviceHours} service-hours and keep at least {crisisTarget.activeServices} services active at the deadline.
      Both conditions are required.
    </p>}
  </details>;
}
