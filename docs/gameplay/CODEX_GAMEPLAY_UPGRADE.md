# Codex Task — Ctrl Z Gameplay Upgrade

Implement the three features defined in **`docs/gameplay/README.md`** (or the `README.md` in this package if copied elsewhere):

1. Emergency Crisis Mode.
2. Reactive City Emergencies.
3. Rewind & Compare Futures.

## Read first

- `AGENTS.md`, `docs/PROJECT_VISION.md`, `docs/DEVELOPMENT_STATUS.md`, then this task and the companion gameplay README.
- Inspect existing `src/gameState.ts`, `src/simulation.ts`, `src/ScenarioPanel.tsx`, `src/BuildingInspector.tsx`, `src/Timeline.tsx`, `src/CitySystems.tsx`, `src/replay.ts`, `src/report.ts`, `src/cases.ts`, and save/load paths.
- Check Git status before editing; preserve all pre-existing changes and installed skills. If the user is working concurrently, don't overwrite their files.

## Goal

Make gameplay immediately more compelling **without expanding the world or redesigning approved interfaces**. The player should have an understandable 12-hour objective, see true cascading incidents, and compare genuinely different responses at the same moment in time.

Treat the companion README as the functional and UI specification. Work directly on the existing game components. Use screenshots from the concept only for layout inspiration; figures displayed in any concept mockup are NOT real game results and must not be hardcoded.

## Absolute boundaries

- **Do not edit the landing page**, cinematic scrolling effects, or marketing visuals.
- **Do not redesign the city**: no changed city art, buildings, lighting, vehicles, district placement, texture atlas, roads, minimap or camera behavior.
- Keep current Sandbox, both Investigation cases, restore, two-supply budget, time/rewind/branches, inspector, report export, and saves fully functioning.
- New mode-specific rules may restrict actions only **inside active Crisis Mode**. Never apply those restrictions globally.
- Don't introduce new game engines, heavy packages, fake simulations, fake values, or a second Pixi canvas.
- Preserve accessibility, reduced motion, touch interaction, and existing animation performance.
- Do not silently change old save schemas; migrate safely if persistent state changes.

## Work order — optimized for speed

### A. Crisis Mode

- Add a third mode selector alongside Sandbox and Investigation.
- Implement deterministic 12-hour mission and resource objective as detailed in the README.
- Ensure the 36/60 service-hour plus >=3 non-grid active-at-deadline win condition is attainable and meaningfully challenging with two boosts; validate with unit scenarios rather than assuming.
- Mission progress, team budget, service availability, result screen, retry; prevent early restore only in Crisis.
- Correct branch, rewind, seek and save semantics.
- Run a small focused domain test subset and build; commit a working milestone.

### B. Reactive emergencies

- Derive alert events from actual `status`/`serviceCapacity` transitions and recorded branch state.
- Add concise incident card/history, dismissal, recovery communication, and user-initiated Inspect navigation.
- Avoid duplicates on remount, seeking, fast-forward, replay and branches; no camera hijacks.
- Run event-focused tests and one desktop/phone browser flow; commit.

### C. Compare Futures

- Build a real two-branch comparison using `replayAt`, `branchOutcome`, and existing service-status calculations, normalized to the same time/horizon.
- Add a visually strong but minimal two-column comparison on desktop, stacked on phones, with actual service-hour delta and per-facility changes.
- Add lightweight service difference markers/highlights via existing UI/map APIs only if they can be implemented without disturbing city rendering or selections. Otherwise ship the useful comparison list first and document the visual-overlay follow-up.
- Scrub comparison time without mutating recorded branches. Tests must verify the math; commit.

### D. Final finish / verification

- Compare the finished crisis, incident and futures screens at 1440px desktop and 390px phone. Check 320px and 430px if clipping occurs; check short landscape if affected.
- Run one final production build, relevant unit tests, and focused browser checks for existing Sandbox/Investigation, mission, incident, comparison, saves and mobile game interactions.
- Fix only observed regressions. Do not repeatedly run the entire repository suite after every CSS change.
- Commit and push tested checkpoints to `origin/main`, as permitted by the project's current Git instructions. Verify the final build/deployment state; if push is blocked, report the blocker rather than discarding work.

## Token/time-efficiency rules

- This is **not** another design exploration. Do not brainstorm alternate game modes, new assets, or unrequested systems.
- Inspect relevant source once, make a short internal plan, then implement. Avoid repo-wide repeated auditing.
- Batch related file edits and tool operations.
- Use existing simulation, replay, camera, status and inspector APIs; don't rewrite them unless necessary to fix a concrete correctness issue.
- Test each new *behavior* with focused checks; keep the comprehensive regression pass for the end.
- Reuse existing screenshots where nothing changed; take new screenshots only of the three new UI states.
- Minimize documentation: update existing `docs/DEVELOPMENT_STATUS.md` with completed checkpoints and important constraints if required; don't generate many extra Markdown reports.
- Don't disable critical tests or report passing tests that weren't run. Don't hide failing tests by repeatedly tweaking timeout budgets without diagnosing why.
- If you hit a usage limit or must stop: save tested changes in a meaningful commit, preserve uncommitted work, and record exact next steps in the existing status file. Never commit knowingly broken code as a checkpoint.

## Completion response

Briefly report:

1. The three mechanics and how to access them.
2. Files changed and commit SHAs.
3. Tests/build actually run and their results.
4. Desktop and mobile screenshot paths.
5. Any unfinished or intentionally deferred part.

**Proceed with implementation. Do not ask for additional design references or rework the approved landing page.**
