import {useState, type SyntheticEvent} from 'react';
const powered = new URL('./assets/previews/meridian-powered.png', import.meta.url).href;
const blackout = new URL('./assets/previews/meridian-blackout.png', import.meta.url).href;
const poweredMobile = new URL('./assets/previews/meridian-powered-mobile.png', import.meta.url).href;
const blackoutMobile = new URL('./assets/previews/meridian-blackout-mobile.png', import.meta.url).href;

const previews = [
  {
    label: 'Quiet evening', desktop: powered, mobile: poweredMobile,
    alt: 'Meridian with illuminated isometric buildings, all six services operational and the simulation timeline at zero.',
    caption: 'The city before the power cut. All six services are operational.',
  },
  {
    label: 'Power removed', desktop: blackout, mobile: blackoutMobile,
    alt: 'The same playable Meridian after electricity is removed: windows darken and the hospital and other services switch to backup.',
    caption: 'Electricity is offline. Other services draw on their remaining reserves.',
  },
];

export default function Landing() {
  const [preview, setPreview] = useState(0);
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
          <h1 id="site-title">Ctrl Z</h1>
          <div className="opening-copy">
            <p className="tagline">Undo the World.</p>
            <p className="intro">An infrastructure simulation about the things that keep a city alive. Remove one. See what follows.</p>
            <a className="enter-button" href="#simulation" onClick={enterSimulation}>Enter Simulation</a>
            <p className="entry-note">Play in your browser. No download needed.</p>
          </div>
        </section>

        <section id="about" className="concept page-width editorial-split" aria-labelledby="concept-title">
          <h2 id="concept-title">One switch.<br/>A city of consequences.</h2>
          <div className="concept-copy">
            <p>A power cut is only the beginning. Hospitals switch to backup. Water keeps flowing, until reserves run out. Every service depends on something else.</p>
            <p>Ctrl Z makes those connections playable. Explore Meridian, follow a failure as it spreads, and decide where to intervene. Then rewind and try another response.</p>
          </div>
        </section>

        <section id="preview" className="preview-section page-width" aria-labelledby="preview-title">
          <div className="preview-heading">
            <div>
              <h2 id="preview-title">Inside Meridian</h2>
              <p>A quiet city. A single disruption. Your next decision.</p>
            </div>
            <div className="preview-switch" role="group" aria-label="Gameplay preview state">
              {previews.map((item, index) => (
                <button key={item.label} type="button" aria-pressed={preview === index}
                  aria-controls="game-preview" onClick={() => setPreview(index)}>{item.label}</button>
              ))}
            </div>
          </div>
          <figure id="game-preview">
            <div className="preview-images">
              {previews.map((item, index) => (
                <picture key={item.label} className={preview === index ? 'preview-active' : 'preview-inactive'} aria-hidden={preview !== index}>
                  <source media="(max-width: 600px)" srcSet={item.mobile} width="1170" height="2637"/>
                  <img src={item.desktop} alt={preview === index ? item.alt : ''} width="1280" height="768" loading="lazy" decoding="async"/>
                </picture>
              ))}
            </div>
            <figcaption>
              <span aria-live="polite">{previews[preview].caption}</span>
              <span>Actual gameplay capture</span>
            </figcaption>
          </figure>
          <p className="preview-note">These are previews of the playable simulation. <a href="#simulation" onClick={enterSimulation}>Explore the city yourself</a>.</p>
        </section>

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
