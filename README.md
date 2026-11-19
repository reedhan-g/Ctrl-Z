# Ctrl Z — Undo the World

Cut power to Meridian and watch the effects spread. Water pumps stop, communications fail, and deliveries slow down. You have two emergency supply teams. Decide which services to protect, then rewind and see what a different decision would have changed.

[Explore the site](https://reedhan-g.github.io/Ctrl-Z/) · [Play Crisis Mode](https://reedhan-g.github.io/Ctrl-Z/simulation.html?mode=crisis) · [Open Sandbox](https://reedhan-g.github.io/Ctrl-Z/simulation.html)

Built for the Embarko Student Challenge.

## Play

| Mode | What to do |
| --- | --- |
| **Crisis** | Start **Meridian Blackout**, a 12-hour challenge. Use up to two supply teams and finish with at least **36 of 60 service-hours** and **three active services**. Grid restoration is unavailable during the mission. |
| **Sandbox** | Cut or restore electricity, inspect facilities and couriers, and experiment with how failures spread. |
| **Investigation** | Collect evidence and diagnose the failing dependency in **Silent Dispatch** or **A Generator Is Not Enough**, then verify the recovery. |

Tap or click a facility to inspect its reserves and dependencies. Drag to pan, scroll or pinch to zoom, and use the minimap to jump across the city. Incident notices reflect changes in the simulation and can take you to the affected facility.

Use the timeline to revisit an earlier point. Make a different decision to create another response, then open **Compare Futures** to see how both responses perform at the same simulated hour. **Save experiment** and **Resume saved** use one local browser save slot.

## Run locally

Requires **Node.js 22.18 or newer**. CI uses Node 24.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:5173/Ctrl-Z/` for the landing page or `http://127.0.0.1:5173/Ctrl-Z/simulation.html` for the game.

## Build and test

```sh
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

The default build targets GitHub Pages under `/Ctrl-Z/`. For an Embarko build served from the domain root, run `npm run build -- --mode embarko`. Run `npm run test:embarko` to build and test that configuration locally. Both build modes generate static output in `dist/`.

## How it works

Ctrl Z uses React, TypeScript, Vite, PixiJS, and Zustand. The simulation models six connected systems: electricity, healthcare, water, residences, communications, and logistics. A record of player decisions lets the game replay and compare different responses. Service-hours and delivery figures are game metrics.

The landing page and game are separate entry points. The city renderer loads when the game is opened. The build includes the pixel art and fonts locally.

- [Architecture](docs/ARCHITECTURE.md)
- [Development status](docs/DEVELOPMENT_STATUS.md)
- [Performance notes](docs/PERFORMANCE.md)
