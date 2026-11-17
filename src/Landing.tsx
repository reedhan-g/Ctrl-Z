import {useState, type SyntheticEvent} from 'react';
import BlackoutPreview from './BlackoutPreview';
const cityGlimpse = new URL('./assets/previews/scene-powered.png', import.meta.url).href;
const cityGlimpseMobile = new URL('./assets/previews/scene-powered-mobile.png', import.meta.url).href;

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
          <a href="#about">The idea</a>
          <a href="#preview">Preview</a>
          <a className="entry-link" href="#simulation" onClick={enterSimulation}>Enter Simulation</a>
        </nav>
      </header>

      <main id="content" tabIndex={-1}>
        <section className="opening page-width" aria-labelledby="site-title">
          <div className="opening-title">
            <h1 id="site-title">Ctrl Z</h1>
            <figure className="city-glimpse">
              <picture><source media="(max-width: 600px)" srcSet={cityGlimpseMobile}/><img src={cityGlimpse} width="1205" height="792" alt="A lit intersection in Meridian, before the power cut." loading="lazy" decoding="async"/></picture>
              <figcaption>Meridian, before the interruption.</figcaption>
            </figure>
          </div>
          <div className="opening-copy">
            <p className="tagline">Undo the World.</p>
            <p className="intro">Remove electricity. Watch connected services react. Intervene, then rewind.</p>
            <a className="enter-button" href="#simulation" onClick={enterSimulation}>Enter Simulation</a>
            <p className="entry-note">Play in your browser. No download needed.</p>
          </div>
        </section>

        <section id="about" className="concept page-width editorial-split" aria-labelledby="concept-title">
          <h2 id="concept-title">One switch.<br/>A city of consequences.</h2>
          <div className="concept-copy">
            <p>Hospitals need water as well as power. Communications shape dispatch. Every reserve buys time for the next service.</p>
            <p>Explore Meridian, follow a failure through its connections and decide where limited help goes. Rewind to compare another response.</p>
          </div>
        </section>

        <BlackoutPreview onEnter={enterSimulation}/>

        <section className="possibilities page-width editorial-split" aria-labelledby="possibilities-title">
          <h2 id="possibilities-title">Follow the connections.<br/>Change the outcome.</h2>
          <dl className="feature-list">
            <div>
              <dt>See the whole system</dt>
              <dd>Electricity, healthcare, water, homes, communications and logistics. Inspect buildings to discover how a failure reaches beyond its source.</dd>
            </div>
            <div>
              <dt>Choose what to protect</dt>
              <dd>Time and backup supplies are limited. Send support where it matters, or investigate a failure to understand what went wrong.</dd>
            </div>
            <div>
              <dt>Make a different decision</dt>
              <dd>Pause, rewind and branch your response. Compare the consequences, restore power and save an experiment to return to later.</dd>
            </div>
          </dl>
        </section>

        <section className="closing" aria-labelledby="closing-title">
          <div className="page-width closing-inner">
            <h2 id="closing-title">What would you<br/>keep running?</h2>
            <div>
              <p>The city is connected.<br/>The next decision is yours.</p>
              <a className="enter-button" href="#simulation" onClick={enterSimulation}>Enter Simulation</a>
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
