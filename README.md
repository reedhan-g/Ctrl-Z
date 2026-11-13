# Ctrl Z

Undo the World. Explore Meridian, disrupt electricity, investigate causal failures, intervene and compare alternate outcomes.

## Run

Requires Node.js 22.18+; CI uses Node 24.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173/Ctrl-Z/. The server binds to localhost. The /Ctrl-Z/ base path preserves the creator's GitHub Pages setup.

```sh
npm test
npm run build
npx playwright install chromium
npm run test:browser
```

## Play

- Sandbox: remove electricity, inspect any of six service locations or three couriers, follow Dependencies, and spend two supply teams. Scenario reserves and dispatch assumptions are explained in inspection.
- Pause, change speed, scrub 0-24h, Undo or restore power. Scrubbing preserves decisions. Intervening before a future decision creates a response branch; choose Original outage to compare without supplies.
- Investigation: gather readings for Silent dispatch or A generator is not enough, test a failing-dependency diagnosis, and verify recovery through the simulation. Incorrect or unsupported diagnoses do not unlock repair.
- Resilience report compares equal time windows and exports decisions, incidents and evidence as JSON. Service-hours and consignments are game metrics, not infrastructure forecasts.
- Save experiment explicitly writes one local browser slot. Resume saved restores branches, undo and evidence, paused. Reset/reload starts fresh until Resume saved is chosen. Invalid/unavailable storage does not replace the current experiment.
- Drag to pan; scroll/pinch to zoom; tap to inspect. Building/fleet buttons provide keyboard alternatives. Space pauses when the map is focused, Ctrl/Command Z undoes, Escape closes inspection/help. Focused controls retain native keyboard behavior.

At 1x, one real second advances ten simulated minutes. Hidden tabs and stalls over one second do not consume reserves. Nominal traffic preview does not advance the simulation. Reduced motion suppresses continuous traffic animation. Low power mode also caps renderer resolution; selection framing keeps new inspections clear of panels. Current validation: 56 unit checks, production build and 32 desktop/mobile Chromium checks pass; physical-phone/Safari performance remains unverified.

## Modules and product direction

See ARCHITECTURE.md for module ownership, PROJECT_VISION.md for the product vision, PROJECT_BRIEF.md for priorities, and DEVELOPMENT_STATUS.md for completed milestones and remaining work. Pure simulation/history/case/report modules are separate from React/Pixi adapters. All runtime city art is original geometry; no remote images/fonts/accounts are required.

Primary visual direction: design/pixel-city-reference-2.png. Secondary inspiration: design/ctrl-z-city-reference.png. Reference images are design inputs, not runtime backgrounds. The district has improved neon facades but is not declared a final match for reference density or detail.

Follow AGENTS.md and CODEX_TASK.md. Automatic tested commits/pushes are authorized. The existing static.yml deploys Pages on every main push and supports workflow_dispatch; preserve it. ci.yml only tests/builds. Never force-push, change visibility, discard unrelated work or commit dependencies/secrets/build artifacts.
