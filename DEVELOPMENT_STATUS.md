# Ctrl Z - Development Status

## Active development - 2026-11-13

CODEX_TASK.md is now explicitly invoked. Automatic tested commits and pushes to origin/main in reedhan-g/Ctrl-Z are authorized, superseding the earlier documentation-review pause. Repository visibility and public deployment remain unchanged. The prior investigation milestone 8f1d335 was already pushed.

The documentation milestone preserves the local vision review and both supplied reference images, corrects reference priority to the newer neon pixel-art image, and aligns Git authorization. No source work is discarded. The unintegrated replay helper and tests are reserved for the next gameplay milestone.

## References inspected

- Secondary inspiration, design/ctrl-z-city-reference.png: opened directly; dense urban blocks, varied skyline, cyan architectural lighting, warm windows, coherent intersections, vehicles and transit details.
- Primary direction, design/pixel-city-reference-2.png: opened directly; crisp pixel-influenced architecture, charcoal streets, cyan/magenta signage, detailed rooftops, sidewalks and vehicles.

The creator confirmed the first filename corrects the older design/city-reference.png spelling. The references are available and inspected; the old statement that they were absent is obsolete. No fresh side-by-side rendered-game screenshot review has been completed, so visual fidelity is not approved.

## Implemented and integrated

- React/TypeScript/Vite, PixiJS rendering and Zustand state, with simulation transitions in a pure reducer.
- Four individually selectable buildings: North substation, St. Mira Hospital, Waterworks and Maple residences; additional scenery is decorative, not independently simulated.
- Electricity removal/restoration, 0-24h clock, play/pause, 1x/4x/12x speed and reset.
- Rule-based electricity/water cascades: residential reserve 2h, waterworks reserve 6h, hospital fuel 18h and hospital water buffer 12h after pump reserve exhaustion. These are fixed game assumptions.
- Two distinct supply actions, each extending a reserve by eight hours; late supplies restart depleted backups. Actions are instantaneous: no dispatched trucks or route simulation.
- Exact undo snapshots for manual interventions; seek/scrubbing currently clears supplies and replays the baseline outage.
- Shared dependency graph, source inspection links, upstream paths, state-colored dependency overlay, diagnosis and time-indexed incident log, including failure before late delivery and subsequent recovery.
- Persistent scene objects and incremental graphic updates, depth-aware building picking, pan, cursor/midpoint-anchored zoom, drag/pinch selection suppression and pointer cancellation handling.
- Responsive mobile inspection sheet, touch-sized main buttons, accessible building list, explicit mobile Undo/Dependencies names, keyboard undo/pause/Escape and help focus management. Reduced-motion CSS currently disables transitions only.

## Unfinished work present in the workspace

src/replay.ts and tests/replay.test.mjs were started before the review pause. They contain a decision-journal/branch helper and two unit checks. They are untracked and **not imported by the reducer or UI**. No playable branch selection, preserved-intervention scrubbing or outcome comparison is implemented. These files were left untouched during the documentation review.

The supplied vision source and design images are included as design references, not loaded into the game. Their contents were inspected; they contain city artwork, with no credentials or personal material observed. They are supplied by the creator for this project; external artwork licensing is not independently established, so no runtime reuse or public deployment is implied.

## Validation evidence and limits

- Dependency installation succeeded with elevated network access; package-lock.json is committed. npm reported zero vulnerabilities at that install, not a continuing security guarantee.
- The integrated baseline's 37 unit/regression checks passed. The latest unit run passed 39 checks including the two unintegrated replay-helper checks.
- TypeScript and the Vite production build passed. Vite warned that the main minified chunk exceeds 500 kB (approximately 546 kB); loading work remains.
- All 10 existing desktop/mobile Chromium specifications passed after fixing an ambiguous supply locator and accessible names on icon-only mobile controls. The investigation setup was shortened; suite timeout is 60 seconds.
- Existing browser checks cover outage/supplies/undo/recovery, canvas selection, camera interaction, hospital water tracing and help focus. Scene allocation checks use a PixiJS test double. Gesture unit tests are not evidence of real-device pinch performance.
- Mobile emulation used iPhone 13 dimensions with Chromium; it is not iOS Safari or physical Android/iOS testing. No measured FPS, battery, memory, hidden-tab behavior or full landscape QA is recorded.
- Reference images have been viewed, but no new actual game screenshots were captured/reviewed in this documentation pass. Current art mismatch is established from the scene code and reference comparison, not an asserted screenshot fidelity check.
- Documentation validation checks reference PNG signatures/paths, consistent authorization and visual priority, and Git whitespace/staged-file review. Unit/build checks are rerun before code milestones.

## Gaps and inconsistencies against the product vision

| Area | Current implementation | Intended direction / remaining work |
| --- | --- | --- |
| City identity and composition | North District, four inspectable buildings, repeated muted vector prisms | Meridian; dense coherent urban streets, varied modular architecture, moderate pixel influence and cyan/pink/purple/yellow lighting |
| City activity | Static scenery; no vehicles or transit | Animated and selectable vehicles/infrastructure with relevant causal states; believable delivery degradation |
| Vertical slice entities | Substation/hospital/waterworks/residences | Add telecom tower and delivery hub while preserving existing buildings |
| UI | Large permanent promotional sidebar; contextual inspector | City-first compact controls and readable contextual panels |
| Investigation | Known outage, immediate diagnosis, graph links and incident log | Separate hidden-cause cases, evidence gathering, player diagnosis, strategy testing and outcomes |
| Simulation | Pure reducer, fixed reserves and small shared graph | Configurable entities with relevant capacity/demand/inventory/fallbacks; fixed-step time policy independent of render FPS |
| Replay | Manual undo works; scrubbing deletes interventions | Reliable journal/snapshots, preserved earlier decisions, branches and outcome comparisons |
| Resources and recovery | Two instantaneous supply boosts; grid restore | Broader meaningful constraints, logistics and recovery tradeoffs |
| Completion | No report or explicit scenario outcome | Resilience Report with clear impacts, actions and save/share support |
| Persistence | In-memory state, lost on reload | Local saved experiments; optional later shareable deterministic seeds |
| Performance | Reused scene objects, but default Pixi continuous rendering; 100ms timer | Profile actual devices; manage idle/background work and animation; batching, culling/detail/loading and quality options as needed |
| Mobile/accessibility | Touch gestures and sheet exist; portrait Chromium checks | Landscape/Safari/device QA, selected-object visibility, comfortable controls and motion-aware world behavior |
| Other disruptions | Electricity playable; water only a dependency | Internet/GNSS/payments/standalone water later, after polishing electricity |

Earlier brief/status claims about blocked npm, missing references, unborn Git history and prohibited pushes without the subsequently granted permission were stale. Those are corrected here. The earlier proposed roadmap was not authoritative; it must not override the creator's clarified product vision.

## Next milestones

1. Validate, commit and push documentation alignment; review architecture and make only useful incremental refactors, then add unit/build CI.
2. Finish the electricity slice: missing telecom/logistics entities, responsive causal effects and city-first presentation, preserving tested functionality.
3. Implement consistent time/history/branching with deterministic scenario tests; add relevant engine detail for actual gameplay needs.
4. Build reference-aligned original modular city art and meaningful vehicles; review real desktop/mobile screenshots against both images.
5. Add genuine investigation cases, constrained recovery and reports, then persistence and measured mobile optimization/playtests.
6. Expand disruptions only when the first experience is complete. Any public deployment remains subject to explicit approval.

## Milestone log

- Documentation alignment: 55a17c2 pushed and remote SHA verified.
- Architecture/playback extraction: ARCHITECTURE.md records module responsibilities; Timeline.tsx now owns existing playback controls. 39 unit checks and all 10 browser specifications pass. Production build passed. Commit 2ac2b7d was created; its push encountered independent upstream commits.

- Upstream integration: retained the creator's Vite /Ctrl-Z/ base path and Pages workflow. The creator clarified that the existing Pages push trigger must remain active; static.yml was restored byte-for-byte to the upstream version before committing. Browser tests now use the configured base path. No deployment was invoked.

GitHub Pages clarification: the creator explicitly authorizes preserving the existing .github/workflows/static.yml deployment on every push to main, with workflow_dispatch also available. Do not disable its push trigger or add a duplicate deployment workflow. ci.yml is testing/build only. This supersedes earlier no-deployment wording for this existing Pages setup; repository visibility remains unchanged.
