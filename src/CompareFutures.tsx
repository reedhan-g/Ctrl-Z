import { ArrowDown, ArrowUp } from 'lucide-react';
import { decisionDescription, type FutureComparison, type FutureSelection } from './futures';
import { type ReplayBranch } from './replay';
import { buildings, type BuildingId } from './simulation';
import { formatTime } from './time';

type Props = {
  branches: ReplayBranch[];
  selection: FutureSelection;
  outcome: FutureComparison;
  deadline: number;
  onChange: (selection: FutureSelection) => void;
  onClose: () => void;
  onInspect: (id: BuildingId) => void;
  onRetry: () => void;
  onTimeline: () => void;
};

function signedHours(hours: number) {
  const rounded = Number(hours.toFixed(1));
  return `${rounded >= 0 ? '+' : ''}${rounded}h`;
}

export default function CompareFutures({ branches, selection, outcome, deadline, onChange, onClose, onInspect, onRetry, onTimeline }: Props) {
  const time = formatTime(outcome.time);
  const delta = Number(outcome.delta.toFixed(1));
  const limitingSystems = new Set(outcome.interventions.flatMap(({ original, revised }) =>
    [original?.limit?.source, revised?.limit?.source].filter(id => id !== undefined)));
  const changeBranch = (side: 'originalId' | 'revisedId', id: number) => {
    const other = side === 'originalId' ? 'revisedId' : 'originalId';
    onChange({ ...selection, [side]: id, [other]: selection[other] === id ? selection[side] : selection[other] });
  };
  return <section className="futures" id="compare-futures" aria-labelledby="futures-heading">
    <div className="futures-heading">
      <h2 id="futures-heading" tabIndex={-1}>Compare Futures</h2>
      <div className="futures-actions">
        <button className="futures-close" onClick={onTimeline}>Back to timeline</button>
        <button className="futures-close" onClick={onClose}>Close comparison</button>
      </div>
    </div>
    <p>Two responses at the same hour in Meridian.</p>
    <div className="futures-controls">
      <label>Original response<select value={selection.originalId} onChange={event => changeBranch('originalId', Number(event.target.value))}>
        {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
      </select></label>
      <label>Revised response<select value={selection.revisedId} onChange={event => changeBranch('revisedId', Number(event.target.value))}>
        {branches.map(branch => <option key={branch.id} value={branch.id}>{branch.name}</option>)}
      </select></label>
      <label className="futures-clock">Comparison time <strong>{time}</strong>
        <input type="range" aria-label="Comparison time" aria-valuetext={`${time} simulated hours`}
          min={0} max={deadline} step="any" value={selection.time} onChange={event => onChange({ ...selection, time: event.target.valueAsNumber })}/>
      </label>
    </div>
    <p className="futures-delta" data-change={delta > 0 ? 'Improved' : delta < 0 ? 'Worsened' : 'Unchanged'}>
      Citywide: {delta > 0 ? '+' : ''}{delta.toFixed(1)} service-hours vs. original through {time}
    </p>
    <div className="futures-summaries">
      {([['Original outcome', outcome.original], ['Revised outcome', outcome.revised]] as const).map(([label, response]) =>
        <section key={label} aria-label={label}>
          <h3>{label}</h3>
          <p className="futures-score"><strong>{response.serviceHours.toFixed(1)}</strong> city service-hours</p>
          <p>{response.teamsUsed}/2 teams used · {response.backlog.toFixed(1)} delayed consignments</p>
          {response.decisions.length
            ? <ul>{response.decisions.map(event => <li key={decisionDescription(event)}>{decisionDescription(event)}</li>)}</ul>
            : <p>No interventions by {time}.</p>}
        </section>)}
    </div>
    {outcome.interventions.length > 0 && <section className="futures-interventions" aria-labelledby="intervention-heading">
      <h3 id="intervention-heading">Intervention results</h3>
      {outcome.interventions.map(effect => <article key={effect.id}>
        <h4>{effect.name}</h4>
        <p>{effect.id === 'hospital' ? 'Hospital' : effect.name} service {signedHours(effect.delta)} through {time}.</p>
        {([['Original', effect.original], ['Revised', effect.revised]] as const).map(([side, delivery]) =>
          delivery && <div key={side}>
            <p><strong>{side} · {formatTime(delivery.time)}</strong> · {effect.id === 'hospital' ? 'Generator reserve' : 'Reserve'} {signedHours(delivery.reserveGained)} at delivery.</p>
            {delivery.limit && <p>{delivery.limit.buffered ? 'The water buffer ran out' : 'The water supply failed'} at {formatTime(delivery.limit.time)}.</p>}
          </div>)}
      </article>)}
      {buildings.filter(building => limitingSystems.has(building.id)).map(building =>
        <button key={building.id} className="futures-facility" onClick={() => onInspect(building.id)}>Inspect {building.name}</button>)}
    </section>}
    <div className="futures-facilities">
      <h3>City systems at {time}</h3>
      <ul>{outcome.facilities.map(service => <li key={service.id} data-change={service.change}>
        <button className="futures-facility" onClick={() => onInspect(service.id)}
          aria-label={`Inspect ${service.name}${limitingSystems.has(service.id) ? ' from City systems' : ''}`}>{service.name}</button>
        <span><small>Original</small>{service.originalStatus} · {Math.round(service.before * 100)}%</span>
        <span><small>Revised</small>{service.revisedStatus} · {Math.round(service.after * 100)}%</span>
        {service.change !== 'Unchanged' && <strong className="futures-change">
          {service.change === 'Improved' ? <ArrowUp size={14} aria-hidden="true"/> : <ArrowDown size={14} aria-hidden="true"/>}{service.change}
        </strong>}
      </li>)}</ul>
    </div>
    <button className="supply futures-retry" onClick={onRetry}>Rewind and try a different response</button>
  </section>;
}
