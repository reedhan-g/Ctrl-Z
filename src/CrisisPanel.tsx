import { ArrowRight, Zap } from 'lucide-react';
import { crisisDeadline, crisisMaximum, crisisResult, crisisTarget, essentialServices } from './crisis';
import { status, useGame } from './game';
import { serviceCapacity } from './simulation';
import { formatTime } from './time';

const goal = `Target ${crisisTarget.serviceHours}/${crisisMaximum} service-hours and ${crisisTarget.activeServices} active at deadline`;

export default function CrisisPanel() {
  const game = useGame();
  if (!game.crisis) return <section className="crisis-panel" aria-labelledby="crisis-title">
    <h2 id="crisis-title">Crisis 001 · Meridian Blackout</h2>
    <p>The regional grid is unavailable for 12 simulated hours. Maintain essential services until repair crews restore power. You have two emergency supply interventions.</p>
    <p>{goal}.</p>
    <button className="primary" onClick={game.startCrisis}><Zap size={16}/>Start crisis<ArrowRight size={16}/></button>
  </section>;

  const active = essentialServices.filter(service => serviceCapacity(service.id, game) > 0).length;
  const remaining = formatTime(crisisDeadline - game.time);
  const teams = 2 - game.boosted.length;
  const response = game.branches.find(branch => branch.id === game.activeBranch)!;
  const result = game.time >= crisisDeadline ? crisisResult(response, game.branches[0]) : null;

  return <section className="crisis-panel" aria-label="Meridian Blackout mission">
    <details className="crisis-details">
      <summary aria-label={`Mission details, ${remaining} remaining, ${teams} of 2 emergency teams, ${active} of 5 services active`}>
        <strong>{remaining} left</strong><span>{teams}/2 teams</span><span>{active}/5 active</span>
      </summary>
      <h2>Crisis 001 · Meridian Blackout</h2>
      <p>Regional power is unavailable during the mission. Seek or use Play on the timeline to advance.</p>
      <ul className="crisis-services">{essentialServices.map(service => {
        const condition = status(service.id, game);
        const capacity = serviceCapacity(service.id, game);
        return <li key={service.id}><span>{service.name}</span><span className={condition.tone}>
          {capacity > 0 && capacity < 1 ? `${condition.label} · ${Math.round(capacity * 100)}%` : condition.label}
        </span></li>;
      })}</ul>
    </details>
    <progress aria-label="Mission elapsed time" max={crisisDeadline} value={game.time}/>
    {!result && <p className="crisis-goal">{goal}</p>}
    {result && <div className="crisis-result">
      <h2 role="status" className={result.stabilized ? 'good' : 'warn'}>{result.stabilized ? 'City stabilized' : 'Crisis unresolved'}</h2>
      <dl>
        <div><dt>Service-hours preserved</dt><dd>{result.serviceHours.toFixed(1)} / {crisisMaximum}</dd></div>
        <div><dt>Active at deadline</dt><dd>{result.activeServices} / 5</dd></div>
        <div><dt>Interventions used</dt><dd>{result.teamsUsed} / 2</dd></div>
        <div><dt>Vs. no intervention</dt><dd>{result.advantage > 0 ? '+' : ''}{result.advantage.toFixed(1)} service-hours</dd></div>
      </dl>
      <div className="crisis-actions">
        <button className="supply" onClick={() => game.seek(0)}>Replay response</button>
        <button className="supply" onClick={() => { game.branch(0); game.seek(0); }}>Try a different response</button>
      </div>
    </div>}
  </section>;
}
