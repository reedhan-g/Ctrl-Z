import { useEffect, useRef, useState } from 'react';
import { useGame } from './game';
import { compareFutures, type FutureSelection } from './futures';
import type { ReplayBranch } from './replay';

const inspectionHour = 7;
const deliveryHour = 5;
const comparisonHour = 12;

type Props = {
  onStart: () => void;
  onCompare: (selection: FutureSelection) => void;
  onClose: () => void;
};

export default function ExperimentGuide({ onStart, onCompare, onClose }: Props) {
  const game = useGame();
  const heading = useRef<HTMLHeadingElement>(null);
  const guidedRun = useRef<ReplayBranch>(null);
  const responseId = useRef<number>(null);
  const [step, setStep] = useState(0);
  const [confirmRestart, setConfirmRestart] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [step, confirmRestart]);

  const begin = () => {
    onStart();
    guidedRun.current = useGame.getState().branches[0];
    responseId.current = null;
    setConfirmRestart(false);
    setResult(null);
    setStep(1);
  };

  const atOriginal = (hour: number) => {
    game.branch(0);
    game.seek(hour);
  };
  const inspect = () => {
    atOriginal(inspectionHour);
    game.select('water');
    setStep(2);
  };
  const observe = () => {
    atOriginal(comparisonHour);
    setStep(3);
  };
  const rewind = () => {
    atOriginal(deliveryHour);
    game.select('water');
    setStep(4);
  };
  const supply = () => {
    atOriginal(deliveryHour);
    game.boost('water');
    responseId.current = useGame.getState().activeBranch;
    setStep(5);
  };
  const revised = game.branches.find(branch => branch.id === responseId.current && branch.id !== 0);
  const compare = () => {
    if (!revised) return;
    const outcome = compareFutures(game.branches[0], revised, comparisonHour);
    setResult(outcome.delta);
    setStep(6);
    onCompare({ originalId: 0, revisedId: revised.id, time: comparisonHour });
  };
  const lostRun = step > 0 && (guidedRun.current !== game.branches[0] || !game.history.length);
  const lostDelivery = step === 5 && !revised;
  const steps = [
    { title: 'Guide a Sandbox response', copy: 'Cut the grid, trace a failure and compare a supply delivery with the original outage.', action: 'Start Sandbox outage', next: begin },
    { title: 'Find the first pump failure', copy: 'Advance to 07:00 and open Waterworks. Its pumps lose power when their six-hour reserve runs out.', action: 'Inspect Waterworks at 07:00', next: inspect },
    { title: 'Follow the power dependency', copy: 'Waterworks is offline. Its inspector shows the connection to the offline North substation. Observe the original response at 12:00.', action: 'Observe original at 12:00', next: observe },
    { title: 'Rewind before the pumps stop', copy: 'At 12:00, the original Waterworks is still offline. Go back to 05:00, with one hour of reserve left.', action: 'Rewind to 05:00', next: rewind },
    { title: 'Keep the pumps running', copy: 'Send one supply team to extend the pump reserve from 06:00 to 14:00.', action: 'Send supplies to Waterworks', next: supply },
    { title: 'Compare both responses', copy: 'Check the original and revised response at 12:00. The comparison will measure how much pump service the delivery preserved.', action: 'Compare at 12:00', next: compare },
    { title: 'Guide complete', copy: 'Your current experiment is ready for more decisions.', action: 'Finish guide', next: onClose },
  ];
  const view = confirmRestart || lostRun
    ? { title: 'Start a new guided run?', copy: 'Starting replaces the current run. Your saved experiment stays available.', action: 'Start new guided run', next: begin }
    : lostDelivery
      ? { title: 'The delivery was undone', copy: 'Rewind to 05:00 to send the supply team again.', action: 'Rewind to 05:00', next: rewind }
      : steps[step];
  const startingWithRun = step === 0 && game.history.length > 0;

  return <section className="experiment-guide" id="guided-experiment" aria-label="Guided experiment">
    {step > 0 && step < 6 && !confirmRestart && !lostRun && <p className="guide-progress">Step {Math.min(step, 5)} of 5</p>}
    <h3 ref={heading} tabIndex={-1}>{view.title}</h3>
    <p>{view.copy}</p>
    {startingWithRun && <p>The new outage replaces the current run. Your saved experiment stays available.</p>}
    {result !== null && !confirmRestart && !lostRun && <p className="guide-result">
      The revised response preserved {result.toFixed(1)} more city service-hours through 12:00.
    </p>}
    <div className="guide-actions">
      <button className="guide-next" onClick={view.next}>{startingWithRun ? 'Start new Sandbox outage' : view.action}</button>
      {confirmRestart
        ? <button onClick={() => setConfirmRestart(false)}>Cancel restart</button>
        : step > 0 && !lostRun && <button onClick={() => setConfirmRestart(true)}>Restart guide</button>}
      {step !== 6 && <button onClick={onClose}>Skip guide</button>}
    </div>
  </section>;
}
