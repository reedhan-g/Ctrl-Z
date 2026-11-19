import { useEffect, useRef } from 'react';
import type { GameMode } from './ScenarioPanel';

const modeNames = { sandbox: 'Sandbox', investigation: 'Investigation', crisis: 'Crisis' };

export default function ModeChangeDialog({ mode, onCancel, onStart }: {
  mode: GameMode; onCancel: () => void; onStart: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const cancel = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const node = dialog.current!;
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    node.showModal();
    cancel.current?.focus();
    return () => {
      node.close();
      trigger?.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className="help mode-confirm" aria-labelledby="mode-confirm-title"
    aria-describedby="mode-confirm-detail" onCancel={event => { event.preventDefault(); onCancel(); }}>
    <h2 id="mode-confirm-title">Switch to {modeNames[mode]}?</h2>
    <p id="mode-confirm-detail">Starting replaces the current run. Your saved experiment stays available.</p>
    <div className="mode-confirm-actions">
      <button ref={cancel} type="button" className="supply" onClick={onCancel}>Cancel</button>
      <button type="button" className="primary" onClick={onStart}>Start new experiment</button>
    </div>
  </dialog>;
}
