# Ctrl Z

Undo the world. A browser-based isometric city systems simulator.

## Run locally

Requires Node.js 22.18+ (Node 24 LTS recommended).

```sh
npm install
npm run dev
```

Open http://127.0.0.1:5173. The development server listens only on localhost.

```sh
npm test                    # Dependency-free simulation, interaction and scene tests
npm run build               # TypeScript check and production build
npm run test:browser         # Desktop and mobile Chromium flows
```

Before the first browser test run, install Chromium with `npx playwright install chromium`.
To test on a phone on your own Wi-Fi, explicitly start `npm run dev -- --host 0.0.0.0`, then open your computer's LAN address on port 5173. This is optional and is not enabled by default.

## First playable milestone

- React + TypeScript + Vite interface; PixiJS vector city; Zustand simulation state.
- Four inspectable buildings, backed by a dependency model.
- Electricity deletion activates hospital (18h), water (6h) and residential (2h) backups.
- Homes with remaining battery power still lose water when pumping stops.
- Two delivery teams each add eight hours of reserve to one building. Supplies delivered after depletion restart that backup with eight hours remaining.
- Pause, 1Ã— / 4Ã— / 12Ã— speed, restore grid, reset, and undo interventions.
- Timeline scrubbing replays the original outage at any point from 0â€“24h and clears interventions. Undo restores the exact time and state before the latest manual intervention.
- Drag camera, wheel/pinch zoom, reset camera; mobile inspection sheet and touch-sized controls.
- Keyboard: Space pauses/resumes when the map is focused, Ctrl/Command Z undoes, Escape closes inspection/help. Focused buttons retain their native Space action. Building buttons provide a keyboard alternative to canvas selection.

At 1Ã—, one real second advances ten simulated minutes. The experiment pauses at 24 hours. This is a deterministic demonstration, not a predictive infrastructure model. State is in memory and resets on page reload.

## Structure

- `src/simulation.ts`: building data, backup reserves and derived service states.
- `src/gameState.ts`: pure, tested state transitions and intervention snapshots.
- `src/game.ts`: Zustand adapter for those transitions.
- `src/CityScene.ts`: persistent PixiJS layers and incremental visual updates.
- `src/City.tsx`: renderer lifecycle and DOM interaction binding.
- `src/geometry.ts`: shared isometric projection, visible faces and depth-aware picking.
- `src/camera.ts`: tested pan/pinch/zoom gestures.
- `src/keyboard.ts`: tested shortcut policy.
- `src/App.tsx`: experiment controls, inspection, timeline and onboarding.
- `src/style.css`: dark navy / amber / muted cyan art direction and mobile layout.

All city art is procedural geometry; there are no remote assets, fonts, accounts or APIs required at runtime. Internet, GPS and digital payments are future scenarios, not part of this milestone.

## Current validation

Dependency installation and TypeScript/Vite production builds now pass. The shared dependency graph, incident log and hospital water cascade are covered by unit and desktop/mobile browser specifications. See DEVELOPMENT_STATUS.md for current results, limitations and roadmap progress.
