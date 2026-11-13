# Ctrl Z development status

## Reviewed

Read AGENTS.md and preserved it unchanged. The repository has an unborn main branch: no commits, all prototype source files untracked. No remote push or public deployment was attempted.

## Implemented features

React/TypeScript/Vite app, PixiJS city, Zustand state, four inspectable buildings, electricity deletion/restoration, reserves, water dependency cascade, two supply teams, pause/speed controls, 0-24h scrubber, exact intervention undo, dependency overlay, pan/zoom/pinch, mobile inspection sheet and keyboard controls.

## Fixes in this session

- Late supplies now replenish depleted reserves with eight hours, including restored pumping for homes.
- Simulation transitions extracted into a dependency-free reducer; invalid clock updates are rejected, reset clears experiment controls, playback cannot resume beyond 24h.
- Building picking uses projected visible faces in reverse drawing order; foreground roofs correctly win overlap tests.
- Scene geometry and labels persist. Unchanged ticks do not allocate or redraw scene objects. Failure, selection and dependency changes update existing graphics.
- Each building's walls, windows, roof and label share the same depth layer.
- Pinch/drag gestures do not select buildings; cancelled pointers cannot trigger inspections. Zoom stays anchored at the cursor or pinch midpoint.
- Ctrl/Command Z and Escape work after buttons receive focus; native button Space activation is preserved. Help traps focus and returns it on close.
- Timeline messages derive from actual reserve states and describe the 24h endpoint.
- Mobile controls have 44px minimum touch targets. Existing responsive layout and dark city palette remain.

## Validation

30 unit/regression checks pass via npm test. This includes a full outage/intervention/rewind/recovery sequence. Scene allocation checks run the production scene builder against a small PixiJS test double, not a GPU renderer.

Desktop/mobile Playwright specifications cover the original flow plus late supply recovery, keyboard undo, foreground roof picking and help focus. These remain unexecuted.

## Blockers

1. npm install fails with ENOTFOUND registry.npmjs.org. No dependencies or package lock can be generated. npm run build fails because tsc is unavailable; npm run test:browser cannot find Playwright. Build and real browser rendering must be verified before declaring the playable milestone complete.
2. git add fails with "Unable to create C:/Ctrl Z/.git/index.lock: Permission denied". No files were staged and no local commits were created. Existing instructions prohibit committing broken or untested code; do not bypass the remaining build/browser checks.

## Resume in order

1. In a session with npm access, run npm install, npm test, npm run build.
2. Install the Chromium test browser with npx playwright install chromium; run npm run test:browser. Fix failures and visually inspect desktop and narrow mobile layouts against the original reference.
3. With Git metadata writable, review staged files, ensure caches/build artifacts are excluded, then create the initial Conventional Commit for the verified prototype. Make subsequent tested changes as separate descriptive commits. No push without approval.
4. After completing this validation gate, add richer event history/branching replay, then expand city dependencies. Internet, GPS and payments remain future scenarios.
