import {useState, type SyntheticEvent} from 'react';
import BlackoutPreview from './BlackoutPreview';

export default function Landing() {
  const [playing, setPlaying] = useState(() => window.location.hash === '#simulation');
  const [gameReady, setGameReady] = useState(false);
  const enterSimulation = () => setPlaying(true);
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
    <div className="landing">
      <a className="skip-link" href="#content">Skip to content</a>
      <header className="site-header page-width">
        <a className="site-brand" href="./" aria-label="Ctrl Z home">Ctrl Z</a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#preview">The city</a>
          <a className="entry-link" href="#simulation" onClick={enterSimulation}>Play</a>
        </nav>
      </header>

      <main id="content" tabIndex={-1}>
        <section className="opening page-width" aria-labelledby="site-title">
          <div className="opening-title">
            <h1 id="site-title">Ctrl Z</h1>
            <p className="tagline">Undo the World.</p>
          </div>
          <div className="opening-bottom">
            <div className="opening-copy">
              <p className="opening-label">An interactive infrastructure simulation</p>
              <p className="intro">Remove electricity. Watch a city unravel. Rewind the consequences.</p>
            </div>
            <div className="opening-actions">
              <a className="enter-button" href="#simulation" onClick={enterSimulation}>Enter simulation</a>
              <a className="scroll-hint" href="#about">Scroll to discover</a>
            </div>
          </div>
        </section>

        <section id="about" className="concept page-width" aria-labelledby="concept-title">
          <p className="section-marker"><span>01 / The premise</span><span>Meridian</span></p>
          <div className="editorial-split">
            <h2 id="concept-title">One switch.<br/>A city of consequences.</h2>
            <div className="concept-copy">
              <p>Hospitals need water as well as power. Communications shape dispatch. Every reserve buys time for the next service.</p>
              <p>Explore Meridian, follow a failure through its connections and decide where limited help goes. Rewind to compare another response.</p>
            </div>
          </div>
        </section>

        <BlackoutPreview onEnter={enterSimulation}/>

        <section className="possibilities page-width editorial-split" aria-labelledby="possibilities-title">
          <h2 id="possibilities-title">The consequences.</h2>
          <ol className="feature-list">
            <li><span className="story-index" aria-hidden="true">01 /</span><h3>What fails</h3><p>Electricity, healthcare, water, homes, communications and logistics. Follow the dependencies to see how one failure reaches beyond its source.</p></li>
            <li><span className="story-index" aria-hidden="true">02 /</span><h3>What you can save</h3><p>Two supply interventions. Six essential services. Inspect buildings and send limited support where it can buy time.</p></li>
            <li><span className="story-index" aria-hidden="true">03 /</span><h3>What you can undo</h3><p>Pause, rewind and branch your response. Compare the consequences, restore power and save an experiment to return to later.</p></li>
          </ol>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="page-width closing-inner">
            <h2 id="closing-title">What would you keep running?</h2>
            <div className="closing-actions">
              <a className="enter-button" href="#simulation" onClick={enterSimulation}>Enter Meridian</a>
              <a className="fullscreen-link" href="./simulation.html">Open full-screen</a>
            </div>
          </div>
        </section>
        <section id="simulation" className="play-section" aria-labelledby="play-title">
          <div className="play-heading page-width">
            <div>
              <h2 id="play-title">Play Ctrl Z</h2>
              <p>The live simulation. Your experiment starts here.</p>
            </div>
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
