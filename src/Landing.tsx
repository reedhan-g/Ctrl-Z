import {useState, type SyntheticEvent} from 'react';
import BlackoutPreview from './BlackoutPreview';
import {useLandingMotion} from './useLandingMotion';
import InfrastructureGraphic from './InfrastructureGraphic';
import KineticTicker from './KineticTicker';
import DependencyNetwork from './DependencyNetwork';
import Consequences from './Consequences';

export default function Landing() {
  const {rootRef,motionPaused,setMotionPaused,motionAvailable} = useLandingMotion();
  const [playing, setPlaying] = useState(() => window.location.hash === '#simulation');
  const [embeddedOpen,setEmbeddedOpen] = useState(() => window.location.hash === '#simulation');
  const [gameReady, setGameReady] = useState(false);
  const enterSimulation = () => {setEmbeddedOpen(true);setPlaying(true);};
  const gameLoaded = (event: SyntheticEvent<HTMLIFrameElement>) => {
    setGameReady(true);
    // Keep the existing game's home link at the site level when embedded.
    event.currentTarget.contentDocument?.addEventListener('click', (click) => {
      if (click.defaultPrevented || click.button !== 0 || click.ctrlKey || click.metaKey || click.shiftKey || click.altKey) return;
      const home = (click.target as Element | null)?.closest<HTMLAnchorElement>('a.brand[href="./"]');
      if (home) { click.preventDefault(); window.location.assign(home.href); }
    });
  };
  return (
    <div className="landing" ref={rootRef} data-motion-paused={motionPaused}>
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header page-width">
        <a className="site-brand" href="./" aria-label="Ctrl Z home">Ctrl Z.</a>
        <nav aria-label="Main navigation">
          <a href="#about">The system</a>
          <a href="#preview">The city</a>
          <a className="entry-link" href="./simulation.html">Play</a>
        </nav>
      </header>

      <main id="content" tabIndex={-1}>
        <section className="opening page-width" aria-labelledby="site-title" data-motion-scope>
          <InfrastructureGraphic/>
          <div className="opening-title">
            <h1 id="site-title">Ctrl Z</h1>
            <p className="tagline">Undo <span className="outline-word">the</span><br/>World.</p>
          </div>
          <div className="opening-bottom">
            <div className="opening-copy">
              <p className="intro">A city runs on invisible connections. Break one, and watch the consequences spread.</p>
              <p className="opening-context">Meridian / An interactive infrastructure experiment</p>
            </div>
            <div className="opening-actions">
              <a className="enter-button" href="#preview">Witness the blackout <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 16 16 4M4 4h12v12"/></svg></a>

            </div>
          </div>
              <div className="opening-utilities"><a className="scroll-hint" href="#about">Scroll to discover <svg className="hint-arrow loop" aria-hidden="true" viewBox="0 0 20 20"><path d="M10 3v14m-5-5 5 5 5-5"/></svg></a>
              <button className="motion-toggle" type="button" disabled={!motionAvailable} aria-pressed={motionPaused} onClick={()=>setMotionPaused(value=>!value)}>{!motionAvailable?'Motion static':motionPaused?'Resume motion':'Pause motion'}</button></div>
        </section>
        <KineticTicker/>

        <section id="about" className="concept page-width" aria-labelledby="concept-title">
          <p className="section-marker"><span>01 / The system</span><span>Meridian</span></p>
          <div className="editorial-split">
            <h2 id="concept-title">One switch.<br/>Everything changes.</h2>
            <div className="concept-copy">
              <p>Power keeps the pumps running. Water reaches homes and hospitals. Communications keep dispatch connected. Every reserve buys time for the next service.</p>
            </div>
          </div>
          <DependencyNetwork/>
        </section>

        <BlackoutPreview onEnter={enterSimulation}/>

        <Consequences/>

        <section className="closing" aria-labelledby="closing-title" data-motion-scope>
          <div className="page-width closing-inner">
            <InfrastructureGraphic final/>
            <p className="section-marker">04 / Your move</p>
            <h2 id="closing-title"><span>What would</span><span>you keep</span><span>running?</span></h2>
            <div className="closing-actions">
              <p>The city is connected.<br/>The next decision is yours.</p>
              <a className="enter-button" href="./simulation.html">Enter Meridian <svg aria-hidden="true" viewBox="0 0 20 20"><path d="M4 16 16 4M4 4h12v12"/></svg></a>
            </div>
          </div>
          <details id="simulation" className="embedded-option" open={embeddedOpen} onToggle={event=>setEmbeddedOpen(event.currentTarget.open)}>
            <summary className="page-width">Play embedded on this page</summary>
            <div className="play-heading page-width">
              <h2 id="play-title">Embedded simulation</h2>
              <a href="./simulation.html">Open full-screen</a>
            </div>
            {playing ? <div className="game-embed">
              <p className="game-loading" role="status">{gameReady ? 'Simulation opened below.' : 'Loading the simulation…'}</p>
              <iframe src="./simulation.html" title="Ctrl Z playable simulation" onLoad={gameLoaded} allow="fullscreen"/>
            </div> : <div className="play-placeholder page-width">
              <p>Explore Meridian, remove electricity and follow the consequences.</p>
              <button className="enter-button" type="button" onClick={enterSimulation}>Start simulation</button>
              <p className="entry-note">The game loads when you choose to play.</p>
            </div>}
          </details>
        </section>
      </main>
      <footer className="site-footer page-width">
        <p>Ctrl Z <span>Undo the World.</span></p>
        <p>A project for the Embarko Student Challenge.</p>
        <a href="https://github.com/reedhan-g/Ctrl-Z">Project source</a>
      </footer>
    </div>
  );
}
