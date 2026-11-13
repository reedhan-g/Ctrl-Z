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
- Exact undo snapshots for manual interventions; seek/scrubbing reconstructs recorded supplies on the selected branch.
- Shared dependency graph, source inspection links, upstream paths, state-colored dependency overlay, diagnosis and time-indexed incident log, including failure before late delivery and subsequent recovery.
- Persistent scene objects and incremental graphic updates, depth-aware building picking, pan, cursor/midpoint-anchored zoom, drag/pinch selection suppression and pointer cancellation handling.
- Responsive mobile inspection sheet, touch-sized main buttons, accessible building list, explicit mobile Undo/Dependencies names, keyboard undo/pause/Escape and help focus management. Reduced-motion CSS currently disables transitions only.

## Replay milestone

The previously untracked replay helper is integrated with the pure reducer and Timeline UI. Scrubbing preserves earlier deliveries and hides future actions; playback reapplies recorded actions and stops at a recorded restoration. A past intervention forks without deleting the original response; exact undo restores branch state as well as reserves and teams. A branch selector and same-time online-service comparison expose the original outage and alternate responses. Switching branches clears manual undo checkpoints to avoid applying a different response's history.

41 unit/regression checks pass, including integrated replay/restoration, fork preservation and exact undo. Production build passed; all 12 desktop/mobile specifications passed (11 in the full run and the interrupted mobile replay check in an isolated rerun). No code is removed from the prior local work.

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
| Replay | Manual undo, preserved-decision replay and branch comparison exist | Reliable journal/snapshots, preserved earlier decisions, branches and outcome comparisons |
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

- Upstream integration: 94213fb pushed and remote SHA verified; 39 unit checks, 10 browser checks and production build pass with /Ctrl-Z/.
- CI: ci.yml validates main pushes and pull requests on Node 24 with npm ci, npm test and npm run build. YAML/commands/read-only permissions checked locally; the same unit/build commands pass. It has no deployment steps and does not replace static.yml. Hosted results require checking GitHub Actions after push.

- Hosted verification: GitHub CI and existing Pages deployment both succeeded for 66395d2. Replay preserves the earlier helper rather than replacing it.

## Clock and rendering milestone

43 unit checks, production build and all 14 desktop/mobile browser checks pass. The fixed-step clock accumulates 100ms steps, discards hidden-tab time and stalls over one second, and does not dispatch idle ticks. Pixi renders on changed visuals/camera/resize instead of running a continuous ticker; browser GPU instrumentation confirms idle draw calls stop on desktop and mobile and camera actions draw again. Lazy city loading splits the entry (~250 kB) and renderer (~298 kB), removing the large-chunk warning.

Actual desktop/mobile screenshots were captured and inspected. They confirm the city remains too sparse/muted relative to the primary pixel reference and the promotional mobile heading needs layout cleanup. These are the next visual milestone, not claims of finished art. No physical-device FPS/battery claim is made.

## Telecom and logistics milestone

Added selectable Meridian telecom and East delivery hub, preserving all four original buildings. Telecom uses 4h batteries; the hub uses 8h power reserves, 70% dispatch on backup and 35% manual dispatch without telecom, stopping only when its own power is lost. Inspection explains assumptions and displays dispatched/delayed consignments. Capacity is integrated between actual state transitions, so late recovery and seeking agree. Two limited supply teams create a meaningful choice between communications, hub power and other district services. Dispatch is modeled; physical truck routes and fuel inventories are still future work. Mobile building buttons now use a three-column grid and the heading wraps.

45 unit checks and production build pass. Desktop/mobile logistics recovery and undo checks pass; full suite completion is recorded before commit.

## Neon modular city art milestone

45 unit checks, production build and all 18 browser specifications pass, including short landscape inspection. Desktop/portrait screenshots were opened and compared with the supplied references: cyan/magenta/yellow accents, stepped facades, rooftop service details, fire escapes, cornices and street crossings now replace the earlier uniform muted shell. The sidebar is smaller and Meridian replaces the oversized promotional headline; initial mobile overflow is corrected. Original geometry remains interactive and state-responsive, with no flattened reference images or new image dependencies.

This is a validated incremental art improvement, not a claim of matching the density/detail of the primary handcrafted pixel-art reference. More silhouette variety, street activity, transit and district scale remain. Screenshot artifacts stay in ignored test-results/.
