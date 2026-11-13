# Ctrl Z - Development Status

## Current result - 2026-11-13

The electricity slice now supports the complete small-scale loop: explore Meridian, disrupt electricity, trace service failures, choose limited interventions, replay preserved decisions, compare branches, investigate two observed failures, verify recovery, export a Resilience Report, and explicitly save/resume experiments on this browser.

56 unit/regression checks, all 32 desktop/mobile Chromium specifications and the production build pass. TypeScript/Vite production build passes with split entry (~265 kB) and city renderer (~300 kB) bundles. No large-chunk warning remains. Physical-phone FPS, battery and Safari behavior have not been measured.

The creator's existing static.yml is preserved, including automatic deployment on every main push and workflow_dispatch. ci.yml runs only locked installation, tests and production builds with read-only permissions. No duplicate deployment workflow was added; repository visibility was not changed. Each completed milestone is committed and pushed without rewriting history; upstream contributions were merged intact. Latest hosted results are checked after publishing.

## Implemented

- Six independently selectable service locations: substation, hospital, waterworks, residences, telecom and delivery hub. Three selectable courier vehicles expose their hub dependency; keyboard/touch lists complement canvas selection.
- Pure domain/reducer modules own electricity/water/communications rules, reserve deadlines, fractional dispatch capacity, late recovery, two supply teams and restoration. Existing working buildings and controls are retained.
- Fixed-step elapsed-time clock, 0-24h timeline, pause/speeds, hidden-tab/stall policy, exact manual undo, time-indexed journals, response branching and same-time comparison. Recorded future interventions replay at the correct time.
- Dispatch totals integrate real capacity changes. Reports integrate five service capacities over equal horizons and download actual decisions/incidents/evidence as JSON. All values are explicit game assumptions.
- Two Investigation cases require time-stamped readings, reject unsupported diagnoses, constrain recovery until supported, and verify success against actual service state. Evidence remains labeled knowledge across rewind.
- Original modular city geometry has crisp neon facades, roof details, crosswalks, differentiated lighting and a compact city-first UI. Primary reference: design/pixel-city-reference-2.png; secondary: design/ctrl-z-city-reference.png. Both supplied images are preserved as references and are not runtime backgrounds.
- Fleet progress follows dispatch capacity and is reproducible on replay. Nominal preview animation is visual only, capped at 30 updates/sec, and suppressed offscreen, hidden and under reduced motion. Experiment pause stops motion. Scene objects persist; paused/reduced-motion GPU checks confirm idle rendering stops.
- Touch pan/pinch, anchored zoom, cancellation handling, mobile inspection sheet, large action buttons, low-power rendering, selection framing, accessible names, keyboard shortcuts and focus-managed help. Browser tests cover portrait and short landscape layouts.
- Explicit Save experiment / Resume saved stores one versioned local slot with branches, undo history, evidence and controls. Saves are validated for structure, sizes and journal consistency; resume is paused. Invalid saves or unavailable storage leave the current experiment intact. Reset/reload starts fresh unless Resume saved is chosen.

## Validation and limitations

Current checks include full outage/late-supply/recovery/undo, preserved replay/forks, communications and water cascades, vehicle stop/recovery, evidence-based diagnoses, report JSON contents, reload/resume and corrupt saves. GPU idle checks use browser instrumentation; scene allocation tests use a Pixi test double. Neither is a physical-device performance benchmark.

Actual desktop and portrait screenshots were captured/opened and compared with both references; short-landscape inspection was also exercised. Art is improved but remains a small authored geometric district, below the primary reference's density and handcrafted pixel detail. Screenshots and browser traces remain in ignored test-results/.

Save format v1 intentionally bounds branch/history/evidence counts and payload size. Storage is local to the current browser/origin, not cloud sync; there is one explicit slot and no automatic overwrite on reload. Downloaded reports can be shared as files; social publishing and shareable scenario seeds are not implemented.

## Remaining milestones / external verification

1. Physical Android/iOS and Safari playtests, measured midrange-phone FPS/memory/battery, and user feedback are not possible with the current Chromium desktop/emulation setup. No claim of the target 30/60 FPS is made.
2. Improve primary-reference fidelity further: richer silhouettes, denser districts, transit, signage and original pixel/sprite art. Low-power mode now caps resolution and suppresses continuous motion; add measured culling/detail/asset loading when expansion warrants it. Current art is not declared final.
3. Refine camera transitions, onboarding and broader accessibility/real-touch QA. Automatic framing now places new selections in clear space around contextual panels. Current manual pan/zoom and responsive inspection remain functional.
4. Deepen logistics with individual cargo, inventory/fuel/road constraints and delivery routing; current aggregate dispatch and route progress are real but deliberately compact. Supplies still take effect immediately.
5. Expand investigation cases and report presentation from the two authored causal cases. Larger entity counts and six districts are aspirations, not complete.
6. Internet/GNSS/payments/standalone water and simultaneous disruptions remain optional later scenarios after the first experience is polished. Cloud saves and shareable deterministic seeds are not implemented.

## Preservation and chronology

AGENTS.md, PROJECT_VISION.md and PROJECT_BRIEF.md reflect explicit automatic tested commit/push authorization and preservation of the existing Pages setup. CODEX_TASK.md is executed subject to the creator's subsequent Pages clarification. The historical vision source and both reference assets remain available. No force-push, history rewrite, unrelated-work deletion or visibility change was performed.

The chronological notes below record validation as each milestone was completed; earlier counts/descriptions are historical, not the current feature inventory.

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

## Delivery fleet milestone

Three original pixel-style courier entities follow a shared road route, expose their hub dependency through canvas/list selection, and derive route progress from integrated dispatch capacity. Power failure stops fleet progress; late hub/telecom recovery changes motion, and replay reproduces positions. Nominal first-visit traffic is a visual-only preview; it does not advance simulation or consignments. Animation is capped at 30 updates/sec, suppressed offscreen/hidden and under reduced motion, and stopped when a running experiment is paused. Idle GPU checks now explicitly use reduced motion. No per-agent physics or new runtime image assets were introduced.

47 unit checks and production build pass. Fleet and existing browser checks are verified before commit. Route detail, collision simulation and individualized cargo inventories remain outside this small slice.

## Investigation cases milestone

Added Sandbox/Investigation entries and two observed-symptom cases: Silent dispatch and A generator is not enough. Cause is initially unconfirmed. Players inspect connected entities and explicitly record three time-stamped readings at the observation time, propose a failing dependency, and test a recovery only once evidence supports the diagnosis. Diagnosis checks actual failed upstream capacity and surviving target reserves; a wrong diagnosis does not unlock interventions. Recovery is derived from current simulated target capacity and disappears when undone. Recorded evidence remains knowledge across rewind, labeled with its original time. These are two authored cases over the causal electricity engine, not a general randomized case generator.

49 unit checks and production build pass; both cases pass desktop/mobile evidence, wrong-diagnosis, recovery and undo flows. Full browser suite is verified before commit.

## Resilience report milestone

Reports integrate service availability and fractional dispatch across actual event boundaries, compare all branches over one equal observation horizon, show delayed consignments and export decisions/incidents/evidence as JSON. Reports never expose future decisions and are withheld during an unconfirmed case. The metric transparently sums five service capacities, excludes the substation, and is a game assumption. 51 unit checks and production build pass; browser download validation reads the exported JSON and checks the eight-hour water intervention benefit. Existing CI and Pages runs for a6caf04 both succeeded.

## Local-save milestone

53 unit checks, all 30 browser specifications and production build pass. Browser checks verify save/reload/paused resume, retained branch and exact undo, and rejection of an incompatible save without changing the current outage.

## Mobile quality and framing milestone

Low-power mode recreates the renderer at at most 1x resolution and suppresses continuous fleet animation, preserving the experiment, selection and camera state. New building/vehicle selections are framed away from contextual panels while zoom is preserved. Mobile sheets are shorter and scroll internally; camera controls move into a clear area while inspection is open. The initial quality test caught inspector interception of Low power; layout was corrected and coverage now also clicks zoom with inspection open. Unit camera projection checks and production build pass. All 32 browser specifications pass, including low-power resolution, state retention, accessible zoom while inspection is open and scroll reset on selection. Final desktop/mobile inspection screenshots were opened: the selected hospital is visible above/beside the sheet and controls are unobstructed.

## Repository bug-fix review

Reviewed application/domain/rendering modules, persistence, UI controls, tests, package/build configuration and GitHub workflows. Preserved the existing Pages deployment setup.

- Reproduced floating-point drift: 120 one-minute ticks left homes on backup at 1.9999999999999978h; 1440 ticks left playback running just below 24h. Simulated-millisecond normalization now hits deadlines and the endpoint; the timeline/incident log share a formatter that correctly displays times such as 2.05h as 02:03. Clock fix e709bf2 was committed and pushed after 56 unit checks, build and six targeted browser checks passed.
- Rewinding a diagnosed case before its observed failure falsely reported recovery. Recovery now requires reaching the observation time as well as actual service availability.
- Re-recording the same confirmed evidence after a repair overwrote the readings supporting the diagnosis, making a legitimate save fail validation. Confirmed readings at the same entity/time are now retained and their Record evidence control is disabled; new readings at other times remain possible. Both authored cases have regression coverage for rewind and save consistency.

Investigation fixes pass all 56 unit checks, production build and the full 32-spec desktop/mobile browser suite. These changes do not add scenarios, restructure the project or alter deployment workflows.

## Current priority: expanded city and interactive minimap

CODEX_EXPANDED_CITY.md is additive and takes priority over the older roadmap. Plan: (1) shared finite 40x40 world coordinates and bounded camera, preserving the original service coordinates; (2) deterministic dense district scenery with continuous streets; (3) camera-aware culling and before/after Chromium measurements; (4) projection-correct minimap display; (5) minimap recenter/drag/keyboard/mobile collapse; (6) offscreen simulation, existing-save compatibility, fleet routes, inspection and complete browser QA. The responsive viewport/container dimensions remain independent of the world size. Both reference PNGs were opened; all requested documents and relevant source were inspected. No runtime reference backgrounds or simulation rewrites are planned.

### Expanded milestone 1: world geometry and camera

40x40 deterministic finite land surrounds the unchanged six service coordinates. Shared inverse projection and viewport-to-world transforms support bounded pan/zoom; bounds contain all four viewport corners at zoom extremes. The actual canvas/window dimensions remain unchanged. Arrow keys on the city navigate both axes; wheel zoom remains anchored, Shift+wheel pans horizontally (deltaX/deltaY trackpads are supported). Reset returns to the original core. Mobile service selection uses a closer framing zoom to keep the entity above the sheet. Camera state lives separately from experiment state and v1 saves remain unchanged. 58 unit checks and production build pass; original picking/quality browser checks pass. The viewport boundary tests run on desktop/mobile. Baseline metrics are recorded in docs/performance-baseline.json; no device-FPS claims are made.

### Expanded milestones 2-3: dense districts and culling

Five geographically defined district styles now contain over 200 stable, original scenery objects plus the unchanged services/couriers. Continuous streets and crossings use shared world coordinates; rooftops, balconies, shop signs and mixed-height silhouettes vary deterministically. Scenery is not a new simulated service. Foreground scenery blocks click-through selection. Geometry is retained, depth-sorted and culled with a 100-world-pixel safety margin; 64 road/land chunks and per-building bounds prevent offscreen decoration from being drawn without unloading simulation state. Unit coverage confirms stable scene identities, offscreen outage updates, district diversity and no service footprint collisions.

60 unit checks, production build and all 36 desktop/mobile specifications pass. Actual screenshots were inspected against the references; this is a denser original geometric/pixel-influenced city, not a copied reference backdrop. docs/performance-expanded.json records Chromium measurements: desktop canvas ready 1587ms, drag 2421ms/1553 draw calls; mobile 1048ms, drag 3164ms/1702 calls. Both remain at zero idle calls under reduced motion. Draw calls increased substantially with visible density versus the small-map baseline; timings depend on software GPU, warm caches and concurrent workers and do not establish device FPS or a speedup. Minimap work follows next.

### Expanded milestone 4: minimap display

The SVG minimap renders cached shared district polygons/roads, six projected service markers, selection and real operational/reserve/interrupted states. Letters and !/~ symbols complement colors. Its outlined rectangle is the exact projected viewport footprint from the camera bridge, updated on navigation/zoom/resize. Mobile disclosure starts collapsed and collapses when a new entity is selected; the expanded map stays above the shorter inspection sheet. Scenery is explicitly labeled as non-simulated. 61 unit checks and production build pass; six focused desktop/mobile picking, quality and minimap display/resize specifications pass. Pointer and keyboard navigation are the next milestone.
