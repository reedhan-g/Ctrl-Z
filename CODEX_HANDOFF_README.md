# Ctrl Z — complete Codex account handoff

## Cinematic homepage task — 18 November 2026

Milestone 1 palette/audit is complete and tested; the production game bundle hashes remain unchanged. Fifteen distinct browser cases are validated (13 initial plus two focused cold-game/navigation checks), three duplicate skips. The independently passing startup-budget test correction is pushed at 76b61be. Baselines and palette evidence are docs/landing-page/cinematic/{before,palette}; the new creator brief is included in this checkpoint. Next implement the cinematic opening/story, then refine the existing reveal with bounded sticky progress and page motion. The Young Minds live template stalled at its loader; use the creator's explicit palette/type/composition specification, without importing template content.

The latest task is CTRL_Z_JAKE_SCROLL_YOUNG_MINDS_REDESIGN.md, read completely. It supersedes the earlier compact homepage style: Young Minds monochrome/cinematic visuals, Jake Roberts native scroll pacing, preserve/refine the working blackout reveal in a bounded sticky scene. Main/origin/main start at 429c1a2. All game UI/code/art/render/saves and existing Pages workflow remain protected; do not resume the stopped Embarko claim. Fresh desktop/tablet/phone baselines are captured and reviewed. Follow docs/landing-page/CINEMATIC_PLAN.md and small tested pushes to origin/main. Next: monochrome token checkpoint, then opening/story, sticky reveal/motion, responsive and published verification. Preserve unrelated user skills/config.

## Current continuation — 17 November 2026

Pushed/verified checkpoints: 9ecd6ce preserves the prior Embarko CSP work; 84ec59c captures aligned real scenes/baselines; 330d4e5 refines first-viewport composition; aba609a implements the signature reveal; fcc1844 finishes responsive targets/microinteractions. A–D are complete. Actual evidence is docs/landing-page/redesign/{before,editorial,reveal,responsive}. Game code/art/workflows remain unchanged, with identical game bundle hashes.

E is complete. DESIGN.md/sidecar refresh is pushed at 5f9fd61; the fresh Impeccable review matched the visuals and scored its sole documentation finding resolved (ship at fix-list scope). Production build and 100 units pass. Full browser run: 97 passed, two intentional duplicate skips, five timeouts (35.9m); exact five follow-ups passed with original limits/assertions (2.7m), validating all 102 distinct cases. Published Pages: 15 passes, one duplicate skip (1.5m). CI 44114530187 and Pages 44114530202 succeeded at 5f9fd61. All eight current published captures were opened in docs/landing-page/redesign/deployed; docs/landing-page/REVIEW.md records evidence/performance/limits. The final evidence commit leaves runtime unchanged. No requested implementation remains. Next follow creator feedback and external physical-device/Safari testing; do not restart completed visual work or the paused Embarko authentication. No further game/UI redesign is authorized.

UI_REDESIGN.md is the new task and was read completely. Preserve the existing editorial world and game; make a local natural-scroll powered/blackout reveal the signature interaction. Main/origin/main began at e60ae32 with uncommitted Embarko compatibility work and unrelated user skills. That prior fix is preserved separately after fresh 100-unit/two production-CSP browser validation. The earlier claim operation was stopped; no local success receipt confirms permanence. Do not publish credentials or resume authentication as part of the landing redesign. Read DEVELOPMENT_STATUS.md and the new landing redesign plan/evidence as milestones progress; continue tested verified pushes to main without resetting or discarding work.

## Embarko continuation checkpoint - 2026-11-16

New task: deploy anonymously to Embarko (no token/account), verify the playable game, then ask for email. Quickstart was read fully. Anonymous app ctrl-z is at https://ctrl-z.embarko.app, ID cmwj82l6f01t37w6h5hox7m5n; expiry 2026-11-17T12:10:59.894Z (17 November, 5:40 PM IST). Initial host CSP startup failure is fixed by an Embarko-only profile; actual hosted desktop gameplay is verified. URL/expiry were given and the email question has now been asked. No answer/token/claim yet; never assume permanence. Public appId is in embarko.json; no credentials were read or used.

The compatibility checkpoint adds an Embarko-only Vite profile, official no-eval Pixi bootstrap, HTML-image decoding and production-policy browser test. Default Pages path/workflows and every existing game/UI/render/domain source file remain unchanged. 100 unit checks, both builds and local desktop/mobile CSP cases pass. Corrected anonymous redeploy returned live/claimed false/same ID and no warnings. Hosted desktop's three cases pass; mobile homepage passes, gameplay checks remain running. See docs/EMBARKO_DEPLOYMENT.md for build/archive/API recovery details. Temp archive/replies/claim links/config are ignored under .impeccable/review; never commit them or credentials. Next finish mobile checks/evidence, push tested checkpoints to main, and handle the email/token flow only after the creator replies.

## Editorial homepage complete and deployed - 2026-11-16

The latest landing-only request is complete. Audit 247c51e and runtime 5dd71931ec762cbf6e941071bf8adf9209791a49 are pushed/verified on origin/main. Runtime CI 43813326844 and Pages 43813326830 succeeded. Root now has the text-led Ctrl Z opening, concept, real desktop/mobile powered/blackout previews, capabilities and final CTA. The creator chose embedded play below the landing page and code-first. CTAs load the untouched simulation at #simulation in an isolated same-origin frame; simulation.html remains the full-screen entry. Existing game source/styles, city artwork/rendering, controls, simulation, minimap and saves are protected and unchanged.

100 unit tests/build and the full browser gate pass: 89 passed in 11.5m, one intentional duplicate mobile matrix skip. All 13 actual deployed desktop/mobile cases are validated through the initial 11 passes and two focused follow-ups; final published homepage capture checks also pass on both devices. Initial network sandbox denial and transient HTTP 503/cold-load timing were handled with authorized networking and temporary remote-only 120s test / 20s assertion budgets; no production code, local limit or assertion changed. Final navigation follow-ups passed in 31.3s. See docs/landing-page/REVIEW.md for exact receipts and nine local/six published inspected captures.

Independent Impeccable review returned ship without material fixes. PRODUCT.md, DESIGN.md, .impeccable/design.json, .impeccable/config.json and the surface brief preserve scope, actual landing tokens and confirmed workflow. This final checkpoint is documentation/evidence only; no requested runtime work remains. Preserve unrelated untracked user skills/config files. Keep both workflows, Antahonist/secondary reference, commit-27 lineage and rejected-design exclusions; do not restart completed UI/city briefs. Physical devices/Safari and creator feedback are the remaining external follow-ups. Inspect Git status and latest commits when continuing.

## Current landing-page task - 2026-11-16

The creator now requests only a minimal editorial website landing page. The prior UI overhaul below is finished and remains protected in full, along with all city artwork/rendering, gameplay, controls, minimap, saves and workflows. Do not resume older city/HUD redesign tasks. Start from main 0ac6f5a; fetched origin/main and origin/UI_FIX match that commit. PR #1 is already incorporated at 0334947; do not repeat its documentation import or merge branches automatically.

Read docs/landing-page/PLAN.md for the audit, pinned design and checkpoints; PRODUCT.md captures confirmed constraints. The creator chose embedded play below the landing page and code-first. Root is now an editorial homepage with actual game previews; entry CTAs mount an isolated same-origin iframe at #simulation, with direct simulation.html/full-screen access. The wrapper forwards the existing embedded game's home link to the outer homepage. Game source/styles, city renderer/art, simulation and saves remain unchanged. Existing gameplay tests change only their entry URL.

Audit checkpoint 247c51e is pushed/verified. 100 unit tests, production build and the full browser gate pass: 89 passes in 11.5 minutes, one intentional duplicate mobile matrix skip. Actual 320/390/768/1280/1440 captures were inspected. All game assertions remain, including embedded minimap/inspection and save/entry/home/full-screen checks. Independent Impeccable reviewer returned ship with no material fixes; detector/hook findings are empty. DESIGN.md/sidecar were generated and validated, with landing-only tokens and explicit game protection; final curated evidence/deployment receipts follow the runtime commit. Existing user-added skill/config files are unrelated and preserved. Continue small tested commits and verified pushes to origin/main; keep Antahonist primary, design/pixel-city-reference-2.png secondary, commit-27 lineage and exclusion of rejected commit-28/29 designs.

## Deployed UI overhaul verified - 2026-11-15

All five runtime milestones are complete and pushed to origin/main: 8d4beb4, 8ed65c0, e2ed567, 427bf3f and c0ba5ab. Runtime SHA c0ba5ab3c3c840bb0c2230d639bb8b62d2342695 has successful CI (43739791304) and Pages deployment (43739791251). Actual https://reedhan-g.github.io/Ctrl-Z/ passed four desktop/mobile guide and gameplay review cases in 29.1 seconds after deployment. The real published flow includes blackout, pause, facility inspection, supplies, timeline seeking, restoration and undo; guide tests verify actual-action progression, skip/replay and preserved experiment time. Deployed opening/guide images are in docs/ui-overhaul/deployed and were visually reviewed.

Local validation: 100 unit tests and production build pass; 80 browser cases validated via the full run and 14 focused follow-ups described below. Reviewed before/after evidence and exact viewport/benchmark receipts are in docs/ui-overhaul/README.md. Protected map/render/camera/art/domain/save/workflow files remain unchanged from 6cb71f8. This final checkpoint records evidence only, with no runtime changes. No unfinished requested implementation remains. Physical Android/iOS/Safari usability, battery and memory measurements remain external follow-ups; short viewports can scroll to expanded details. Next work should follow creator feedback/new instructions and preserve the approved city.

## UI overhaul implementation complete - 2026-11-15

CODEX_CTRL_Z_UI_OVERHAUL.md is implemented through five tested runtime checkpoints, based on approved city 6cb71f8. Pushed milestones: 8d4beb4 (design system/header/hierarchy), 8ed65c0 (real six-system summary/timeline), e2ed567 (inspection/feedback) and 427bf3f (mobile). Each has successful CI/Pages results. The final guide/polish changes are in the commit containing this receipt; hosted verification follows its push.

The UI now presents a plain-language premise and one electricity CTA, live derived states and capacity, readable controls, all six desktop summaries above the fold, a phone-first system strip/map stage, progressive timeline details, contextual scrollable inspection and honest startup/save feedback. The optional guide starts only from How to Play, waits for real blackout/selection/intervention, supports skip/close/replay and never resets or persists experiment data. Help scrolls on short phones; sticky inspection controls cover scrolled content. Fonts/tokens use existing assets; no dependencies were added.

Validation: 100 unit checks and the final production build pass. All 80 desktop/mobile browser cases are validated through 75 full-run passes (78 cases, 14.1 minutes) and 14 passing focused follow-ups, including two new combined-overlay cases. Corrected fixtures now open mobile timeline details and zoom to the actual limit; exact center/outcome assertions remain. The real two-pixel toolbar gap was fixed. Tests retain explicit spacing and short-phone inspection-size assertions. All-six silhouettes/names stay clear with timeline and inspection expanded together. Simulation, investigation, dispatch, report export, v1 saves, replay/undo, vehicles/directions, minimap/touch/keyboard and low-power behavior remain covered.

The UI-only exception reserves a 620px stage for short-phone inspection and 760px when full timeline details and inspection coexist, allowing approved tall silhouettes at the unchanged minimum zoom. Short screens can scroll vertically to full details; pan/pinch remains isolated to the canvas. Approved map assets, renderer/world/roads, service coordinates, gold/name rendering, camera calculations, route geometry, domain/replay/save modules and workflows have zero diff from 6cb71f8. Antahonist and secondary reference remain preserved.

Actual before/after views are in docs/ui-overhaul/README.md with 36 final captures, including opening, blackout, hospital/hub, active timeline, restore/replay, guide and combined overlays. Tested sizes: 320x800, 360x800, 375x812, 390x844, 430x932, 768x1024, 1366x768, 1440x900 and 844x390 landscape, plus default desktop/mobile Chromium projects. Benchmark samples retain zero idle calls and 32/30 drag draws (desktop/mobile), ready 3016/1774 ms and drag 3576/3343 ms. These are software GPU samples, not physical phone FPS or a startup-speed improvement claim. Physical Android/iOS/Safari, battery and memory measurements remain external follow-ups.

Hosted CI/Pages and actual deployed guide/gameplay verification are complete; see the current receipt above. Do not restart the older city redesign or change the approved map. Preserve completed work and continue from main only when creator feedback or a new task warrants changes.

## UI milestone 4 - phone console

Inspection milestone e2ed567 is pushed with successful CI/Pages. Mobile now shows a compact mode/action row, six horizontally scrollable real system cards and the city before secondary tools. A compact transport retains native scrubbing; Timeline details reveals branches/events. Sheets remain independently scrollable and collapsible. Explicit facility accessible names preserve navigation when location text is visually hidden. Safe-area padding and dvh are used. A minimum 600px inspection stage on short phones is a narrowly scoped UI-overlap accommodation: smaller stages cannot fit tall approved sprites at existing minimum zoom. No camera/render/domain code changed.

Build and 12 focused desktop/mobile cases pass, covering all-six framing, offscreen rules, save/resume, replay/facing and real UI captures. Earlier mobile naming/clearance failures were fixed rather than weakening assertions. Viewport captures/checks cover 320/360/375/390/430/768/1366/1440 widths; actual opening/selected renders reviewed in docs/ui-overhaul/mobile. Replay-related tests now explicitly open mobile Timeline details before using branch controls. Next: optional guide, final all-suite/performance/landscape checks and deployed verification.


## UI milestone 3 - inspection and feedback

Resumed preserved changes at 8ed65c0 (systems milestone; CI/Pages succeeded). Inspector presents purpose, real condition and supply/reconnection actions before metrics; typography, disable explanations and secondary details are clearer. Save result has inline contrast; honest startup messaging remains until the canvas exists. Build and six inspector/low-power/real UI-review desktop/mobile cases pass; actual hospital screenshots reviewed and saved in docs/ui-overhaul/inspection. Approved map code/assets, simulation and persistence remain untouched. Next: map-first mobile shell, optional action-driven guide and final regression/deployed verification.


## UI milestone 2 - live systems and timeline

Shell milestone 8d4beb4 is pushed; CI/Pages succeeded. CitySystems now renders all six domain statuses and the real logistics capacity, with existing facility selection. Timeline controls, clock, range labels and outageMessage feedback have readable hierarchy and 44px transport buttons. Domain/clock/replay and protected map files remain untouched. Build and six desktop/mobile systems/replay/review checks pass, including actual 0/4/6/18/24h status thresholds and all six navigation targets. Actual blackout screenshots reviewed; evidence in docs/ui-overhaul/systems. Next: inspector/feedback, dedicated mobile layout, optional guide, final regression and deployed review.


## Active UI-only overhaul - 2026-11-15

Read CODEX_CTRL_Z_UI_OVERHAUL.md completely. It supersedes prior visual tasks: current city/art are approved and protected. Work through shell, live systems/timeline, inspector feedback, mobile and optional guide milestones, with tested commits/pushes to origin/main. Started from verified 6cb71f8; baseline 100 unit/build and eight browser checks pass, plus a real deployed desktop gameplay review. Before captures are in docs/ui-overhaul/before. Shell work is in progress; consult DEVELOPMENT_STATUS.md for completion receipts. Preserve all unfinished changes and approved map/domain/workflow files.


## Curbside/landmark polish complete - 2026-11-15

CODEX_PARKED_CARS_POI_HOVER.md was read completely twice, including the updated persistent-glow requirement. Both focused improvements are complete on main: parking checkpoint 4e26042 is already pushed with successful CI/Pages runs, followed by the independently tested landmark commit containing this receipt. Earlier car work (84b3466 artwork / e9ec4c8 orientation), map corrections and approved commit-27 gameplay lineage are preserved. Origin was fetched/inspected at 4e26042 before the second checkpoint. No reset/discard, rejected commit-28/29 import, simulation rewrite or deployment change occurred. Antahonist remains primary; design/pixel-city-reference-2.png remains secondary.

parking.ts derives 31 deterministic, geometry-validated curbside asphalt pockets with continuous rear sidewalks and sparse district quotas. It omits invalid crossings/T-junctions, access/driveways, occupied/landscaped ground and props. Only stationary cars moved; all three moving/ambient couriers retain existing routes and direction sprites. The parking checkpoint passed 96 unit checks/build and 12 focused desktop/mobile street/direction/idle checks.

Landmark emphasis uses a new original offline six-service alpha atlas: subtle persistent gold/cream, stronger finite 140 ms desktop hover, full gold touch selection, existing teal persistent selection and unchanged scenery hover. Lit/unlit alpha union preserves the real silhouette and depth occlusion, independent of actual outage status. Reduced motion/Low power use immediate changes; no full-screen blur, scaling or continuous animation. Full real names use high-contrast 12/14 px CSS plates, camera/overlay-aware positioning, priority/decluttering and an accessible selected-name announcement. Selection retains the existing clear-viewport center with symmetric roof/name clearance. Hover is transient navigation data; saves are unchanged.

Final checks: 100 unit tests, three offline art tests and production build pass. All 70 desktop/mobile browser cases are validated by 69 full-run passes (10.3 minutes) plus four passing expanded-integration reruns after replacing a six-click maximum-zoom assumption with the actual zoom limit. No runtime simulation change or weakened assertion/timeout was used. All-six golden hover/names, touch/selection, outage/Low power, finite idle rendering, moving-car directions/replay, camera/minimap, saves and gameplay pass. Benchmark sample: zero idle draws on both projects, 32 desktop / 30 mobile scripted-drag draws. Physical phone/Safari performance remains unverified.

Before/parking evidence and 27 reviewed after captures, provenance and benchmark samples are in docs/curb-hover-review; DEVELOPMENT_STATUS.md records exact validation and the fixture correction. No unfinished runtime work remains in this brief. Check current remote SHA/CI/Pages when resuming. Future work should start by inspecting current main and creator feedback, with small tested commits and verified pushes directly to origin/main. Preserve both existing workflows and all gameplay/minimap/inspection/saves; do not restart the old redesign automatically.

## Vehicle orientation complete - 2026-11-15

CODEX_CAR_FIX.md is complete in two tested checkpoints on main: original-art commit 84b3466 (already pushed/verified) and the route-orientation fix containing this receipt. One VehiclePose owns world direction, road tile, projected point and depth; vehiclePosition remains the old minimap/camera/picking adapter. All three retained color sprites swap frames at route turns, including same-rounded-pixel turns; fallback geometry and culling use the same direction/contact contract. Routes, fleet IDs/offsets, integrated dispatch, game/replay/persistence data and both workflows remain unchanged. No new ticker, runtime rotation or mirroring is used.

94 unit checks, two offline raster checks, production build and all 62 desktop/mobile browser specifications pass. The final serial gate took 10.2 minutes and supersedes the interrupted, resource-heavy two-worker attempt. It covers orientation in all four world directions, every route vertex, three colors, pause/resume, speed, undo, scrubbing, branch changes, gameplay/minimap/v1 saves, zoom/mobile and retained rendering. Both benchmark projects retain zero idle draws and 32 scripted-drag draws. Twelve reviewed before/after/color captures and provenance are in docs/vehicle-review. Tests force an actual slider endpoint change rather than mistaking its rounded DOM value for exact simulation time; runtime clock behavior is preserved. Keep Antahonist direction, commit-27 lineage, map corrections and existing main-triggered Pages. Physical-device/Safari verification and creator feedback remain outstanding; await the next creator-directed task instead of restarting the older redesign.

## Directional vehicle artwork checkpoint - 2026-11-15

CODEX_CAR_FIX.md is the active focused task. Origin was fetched/inspected at bf69179; continue tested commits and verified pushes directly to main. The first artwork checkpoint introduces original 3D-projected car perspectives for amber/cyan/pink in all four world-axis directions, with paired light states. scripts/vehicle_art.py generates vehicle-atlas.png and vehicleAtlas.ts; build-city-art.py invokes it too. The separate 512x192 atlas adds 8.82 kB PNG / 0.375 MiB decoded, loads with nearest sampling and shares a centered ground-contact origin. vehicleArt.ts swaps retained texture frames without rotation or mirroring. Parked cars use the new Y-axis frame with their existing footprints; their placement is checked against real roads. No third-party artwork or rejected design was imported.

Two art checks, 89 unit checks, build and six focused desktop/mobile browser checks pass; actual opening captures inspected. Moving orientation remains unfinished in this checkpoint: traffic.ts returns positions and CityScene still uses one fixed legacy car sprite. Next implement a shared route-segment pose/direction for all three couriers, preserve routes/dispatch integration/replay/save/minimap behavior, validate every turn and capture desktop/mobile before/after views at multiple zooms. Keep Antahonist direction, prior map fixes, commit-27 gameplay lineage and existing main-triggered Pages workflow.

## Current map-fix completion ? 2026-11-15

CODEX_MAP_FIX.md is complete in exactly two tested checkpoints on origin/main: ac8d869 (camera centering) followed by the facility-distribution checkpoint containing this receipt. PR #1 documentation remains incorporated at 0334947; no repeat import or old-branch merge occurred. Historical branch/coordinate restrictions below are superseded by current main authorization and the explicit relocation brief. Antahonist remains primary, design/pixel-city-reference-2.png remains secondary, approved runtime lineage remains commit 27 and rejected commit-28/29 designs remain excluded.

All six stable service IDs now occupy appropriate separated districts; see docs/map-fix-review/README.md for exact coordinates and twelve real desktop/mobile inspector-open captures. Every site has clear road frontage, at least five tiles of world-edge margin and twelve tiles between facilities. A municipal utility subdistrict reuses existing original models; overlapping scenery is excluded and vacated civic blocks receive limited infill. Current scenery count is 280. Shared metadata automatically drives scene depth/culling, alpha picks/highlights, dependency lines and minimap markers. Courier geography begins beside the new hub; dispatch rules are preserved. Explicit Foundry/Freight forecourt targets avoid service lots and camera-bound clamping; other destinations retain their centers. Minimap marker selection rejects native touch retargeting outside the visible symbol.

Camera framing measures real overlays after layout and fits full sprite-alpha bounds, with repeated selections, mobile sheet collapse/expansion and sidebar/minimap/canvas paths covered. World/canvas/page dimensions and ordinary bounded gestures are preserved. Validation: 86 unit checks, production build and all 58 browser cases validated via the full run and focused correction reruns detailed at the top of DEVELOPMENT_STATUS.md. All twelve facility renders were visually inspected. Simulation logic/reserves/dependencies, pure reducer, investigations, replay, v1 persistence and both workflows remain unchanged; old v1 fixture load/replay passes. There is no new art redesign in this task. Physical device/Safari verification and creator visual feedback remain external follow-ups. Wait for the next creator-directed milestone; do not restart the older overhaul.

## Map corrections in progress ? 2026-11-15

CODEX_MAP_FIX.md is the active bounded task: camera centering first, facility distribution second, exactly two tested commits pushed to origin/main. Origin was fetched/inspected at d2bee90 before this checkpoint; PR #1 is already incorporated at 0334947. Do not repeat the handoff import or restore the historic development-branch restrictions below. Keep Antahonist primary, the secondary PNG and approved commit-27 runtime lineage; rejected commit-28/29 designs remain excluded.

The first correction measures actual overlays after React layout and centers/fits sprite-alpha bounds in the largest unobstructed rectangle. Navigation requests handle reselecting the same service; minimap service markers/chooser select consistently, while free-map taps and footprint dragging remain camera-only. Inspector resizing/collapse and minimap changes reframe; manual pan/zoom do not continuously recenter. Camera/page dimensions and v1 data remain unchanged. 82 unit checks, production build and ten focused desktop/mobile browser checks pass; actual hospital renders inspected. Next commit must move the six stable service IDs into appropriate districts, preserve simulation/dependencies/saves, verify clear entrances/roads/scenery and new courier geography, then run full regression/build and capture selected facilities at new locations. No further redesign is part of this task.

Prepared: 14 November 2026. Project root: `C:\Ctrl Z`. Repository: <https://github.com/reedhan-g/Ctrl-Z>.

This document is for a Codex account with no conversation history. It records the creator's requirements, the approved development baseline, verified implementation details, rejected experiments, and a practical continuation plan. It does not grant permissions that the new account's environment lacks.

## Continuation receipt — 14 November 2026

### Building interaction continuation — 15 November 2026

Building brief delivery is complete through three tested runtime milestones plus an independent test checkpoint. The final tests require actual visible mobile camera movement rather than an offscreen drag, and save/resume while scenery is selected proves that transient selection is not serialized and clears on resume. Four focused checks pass; valid desktop/mobile benchmark samples show zero idle draws and 32 drag draws including hover. All 81 unit checks, build and 56 browser specifications are validated, including serial reruns of the loaded parallel run's failures. Physical devices/Safari and creator visual feedback remain outstanding; do not claim hardware FPS. Source task and curated desktop/mobile evidence are committed. Keep all subsequent work on main under the current authorization.

Scenery inspection now covers the existing 284 informational parcels via the canvas and grouped keyboard-accessible chooser. sceneryInfo.ts supplies honest role/district content; selection.ts coordinates the existing game adapter and navigation store without extending GameData or v1 saves. Service/scenery selection is exclusive; outlines share the real art layer, and the minimap marks selected scenery. Resume/reset/service selection clear transient scenery. frameInspection permits finite roof margin for authored edge selections; Reset removes that allowance. Close/collapse controls stay available in scrolling sheets. 81 unit checks/build pass; all 56 browser specs were validated via 49 parallel passes plus seven successful serial reruns (startup/timeouts and a corrected offscreen mobile test target). Curated real desktop/mobile service/scenery evidence is in docs/building-interaction-review. A separate benchmark visibility correction follows; do not use its offscreen zero-draw sample as performance evidence.

Inspector milestone extracts the existing service panel into BuildingInspector with a shared collapsible InspectionShell. inspection.ts derives live capacities, water buffer, upstream/downstream links and disabled-action explanations from the existing state; no statistics or actions are decorative. Hospital generator fuel is distinct from its water buffer. Existing investigation/evidence, logistics fleet, supplies, grid recovery and tracing remain wired to the reducer. Mobile collapse and focus return work. 78 unit checks, build and ten focused browser checks pass, with the isolated rerun of a concurrent desktop logistics timeout; desktop/mobile actual inspector images were reviewed.

The current additive brief is `CODEX_BUILDING_IMPROVEMENT.md` (singular filename). It extends the existing selection/inspector rather than replacing the simulation. The first tested checkpoint generates true sprite-alpha teal highlights and compact opaque-pixel hit rows offline (`selection_art.py`). Persistent selection is stronger than desktop hover, remains aligned through camera transforms/outages, and respects foreground paint order. No rejected commit code or external art was imported. 75 unit checks, build, ten existing focused browser checks and two new selection checks pass; desktop highlighted hospital inspected. Detailed inspection, contextual disabled explanations, scenery information/mobile sheet/minimap integration follow next. The six already-distinct infrastructure designs are preserved.

### Active task and publishing destination — supersedes earlier branch restrictions

The substantial visible overhaul is implemented across the main playable city: all ten general scenery designs and all six service designs replaced; fifteen authored civic/Lantern block programs; eighteen shared connected street segments with courts/gardens; baked state-responsive architecture/junction lighting; and a new opening/reset frame. The full Lantern junction now comprises the original court block plus three authored adjacent blocks. Source remains original offline art, with no rejected commit-28/29 implementation or paid kit pixels. Large roof labels are selection-only and mobile inspection leaves roof clearance. Continue development directly on main.

Validation receipt: 73 unit checks, 50 desktop/mobile browser specifications and production build passed. Final presentation refinements received focused gameplay/quality/review checks and build validation. `tests/browser/redesign.spec.ts` captures opening, central intersection, all six facilities, two Lantern neighborhood views and four map edges; curated real screenshots are in `docs/current-city-review/`. Antahonist's public banner was reopened and compared with the new renders; the local secondary PNG is preserved. Both Chromium projects still record zero idle GPU draws and 30 scripted-drag calls; real-device/Safari performance and creator visual acceptance remain outstanding. Keep those limitations distinct from the delivered visible changes and the preserved causal game systems.

Lighting checkpoint adds offline original light spill/pools (`scripts/light_art.py`) and paired ground frames. Ground lighting follows grid outage; facility lighting still follows real backup/dependency status. A new retained-scene test covers dark junctions with a still-powered hospital. 72 unit checks, build and six focused browser checks pass; actual lit/mobile and outage renders inspected. Idle GPU checks still pass; no animation ticker was introduced.

Infrastructure checkpoint uses `scripts/infrastructure_art.py` for all six facility identities. It changes rendered architecture, not entity IDs, coordinates, failure rules or save schema. The hospital has separate emergency/patient wings; grid has a transformer yard; water has paired tanks; homes has terraces; telecom has an antenna exchange; logistics has loading bays. 71 unit checks, build and eight focused browser checks pass, with actual opening review.

Street/layout checkpoint now shares 18 named partial/arterial street segments between world ground and minimap (`src/streetPlan.json`). `scripts/street_art.py` rasterizes sixteen shared ground masks; no per-frame ground drawing was added. Fifteen authored civic/Lantern block programs replace generic layouts in the key neighborhoods. 71 unit checks, build and ten browser checks pass, including full-route road validation and unchanged offscreen/replay/save behavior. Roads remain rectilinear in the isometric world, but no longer form an every-five-tile full-map crosshatch.

Main artwork checkpoint replaces the ten general scenery sprites city-wide using `scripts/city_architecture.py`; this is original code-authored art with setbacks, balcony housing and role-specific shop/industrial silhouettes, not purchased kit pixels. 69 unit checks, build and eight focused browser checks pass; opening screenshot inspected. Continue with shared street layout, service identities, lighting and presentation; do not treat this first city-wide asset change as the completed overhaul.

The creator's edited CODEX_CURRENT_TASK.md now authorizes development and verified pushes directly to `origin/main`, with the existing automatic Pages deployment preserved. Main was fetched/inspected and safely fast-forwarded to `76f8d8e` (PR #2), whose tree matched the existing development checkout. The untracked current task was preserved and is now included for continuity. No reset, rejected-design import or history rewrite occurred. Earlier branch-only/main-approval wording below describes the previous phase and no longer governs this work.

The current priority is a substantial visible redesign throughout the opening/main playable city, plus a complete Lantern Yard neighborhood: distinct street-facing architecture, purposeful connected streets, unique six-service identities, architectural lighting and default camera presentation. Deliver those as separate tested runtime milestones with inspected desktop/mobile screenshots. Keep Antahonist primary, the local pixel PNG secondary, commit-27 gameplay lineage, minimap, replay, v1 saves, mobile quality and both workflows. Planning and a single remote block are insufficient visual completion.

PR #1 merged the documentation checkpoint into GitHub main as `0334947d0762868dccd25895919ca677fce46db5`. Origin was fetched and inspected before the next development commit: this merge has parents `9fcac4a` and `154fd5b`, and its tree exactly matches the development branch's documentation checkpoint. Runtime source, tests, assets and workflows at that merge remain identical to commit 27. No repeat documentation import or branch merge was needed. The local main ref remains at commit 27; `origin/main` records the merge. Continue on `neon-city-antahonist-from-27` and check live branch state before future integration.

The first runtime checkpoint now implements the Lantern Yard block with three original project models, 24-pixel floor modules, street-facing shop entrances, a lower corner café, stepped apartment roof, and a paved/seated/planted court. `scripts/lantern_art.py` extends the existing offline atlas generator; `src/lanternYard.ts` owns authored placement. Paired frames retain grid-responsive scenery lighting. No paid kit pixels or rejected designs are used. Validation and remaining visual work are recorded in DEVELOPMENT_STATUS.md; the broader neighborhood and street-network redesign remain unfinished.

Runtime checkpoint validation: 69 unit checks, 46 existing browser specifications and two new desktop/mobile neighborhood checks pass; production build passes. The final roof/sign refinement passed the focused neighborhood checks, unit suite and build. Actual normal/close/outage/restored renders were inspected; curated desktop/mobile close views are in `docs/lantern-review`. Existing surroundings remain repetitive, and no whole-city visual completion is claimed. Next: adjacent authored repair/loading and residential blocks, followed by deliberate streets shared by ground/minimap/routing. The atlas is 163.35 kB with 23 models; the new ground variant is 4.83 kB. All service IDs/coordinates, simulation, minimap, v1 saves and deployment configuration remain unchanged.

Development has resumed under the creator's new instructions. The original preparation receipt and file-only restrictions below describe the earlier handoff session, not the current authorization. The creator explicitly requests committing this handoff in the first documentation milestone.

Before edits, local `main` and live GitHub `refs/heads/main` were both verified as `9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f`. No baseline restoration or history change was needed. Only this handoff was initially untracked. `CODEX_NEON_CITY_FROM_COMMIT_27.md` subsequently appeared during inspection. The creator then explicitly requested incorporating its instructions and the frequent-checkpoint workflow. After fetching origin, the new development branch `neon-city-antahonist-from-27` was created directly at the verified commit-27 SHA, preserving all documentation work. Main remains at the baseline.

### Active continuation instructions (supersede historical workflow below)

- Work and push tested milestones on `origin/neon-city-antahonist-from-27`, not main. Never import rejected commits 28/29, force-push or rewrite history. Do not automatically merge to main or deploy this branch. Preserve `.github/workflows/static.yml` with its main push trigger and workflow_dispatch; CI remains test/build only.
- Make small, meaningful Conventional Commits after each completed, tested improvement. Separate independent features, visuals, fixes, refactors, tests and documentation; keep required implementation/regression changes together. Split large milestones into independently verifiable checkpoints, not incomplete functionality.
- Run relevant tests before every commit, build runtime changes, review explicit staged files, push each completed commit and verify its remote SHA. Preserve unrelated work. Finish an active operation safely before adopting new instructions; do not restart, reset or discard progress.
- Maintain DEVELOPMENT_STATUS.md with results, decisions, unfinished work and the next milestone. Keep this handoff synchronized with the actual branch, asset provenance and validation. AGENTS.md now records these preferences for future sessions.
- First build one authored neighborhood with aligned streets, sidewalks, entrances, footprints, signs, lighting and coherent pixel scale; inspect actual desktop/mobile screenshots beside Antahonist and the secondary PNG before expanding. Then develop purposeful streets/distinct districts, recognizable services, all four accessible boundaries and efficient culling across the large map.
- Keep minimap geography/footprint/landmark navigation correct, preserve six service coordinates, offscreen simulation, traffic, mobile gestures, causal cases, replay, v1 saves and reports. Art may change without rewriting the simulation. New shared roads must agree across ground, minimap and routing.
- Use original art if licensed Antahonist files are unavailable, or stop at that asset integration boundary and identify required files. Never present original work as purchased assets or publish proprietary source without checking redistribution terms. Promote an accepted visual branch through a reviewed non-destructive integration; verify the actual main diff so rejected work cannot survive unnoticed.

Fresh baseline validation: 67 unit checks, all 46 desktop/mobile Chromium browser specifications, and the TypeScript/Vite production build passed on Node 26.10.0 (CI remains Node 24). The full browser run took 4.1 minutes. Actual desktop opening and mobile Lantern Yard captures were inspected alongside the official Antahonist banner and the local secondary PNG. No new city art has been implemented in this documentation milestone.

The new primary reference is Antahonist Neon City; `design/pixel-city-reference-2.png` remains secondary. No Mekai Games direction or rejected commit-28/29 implementation is carried forward. See `docs/NEON_NEIGHBORHOOD_PLAN.md` for the authored Lantern Yard plan, projection/pivot contract, implementation sequence and acceptance checks. A licensed Antahonist archive has not been found in the repository; the public preview was inspected in ignored test output only, not added as runtime art.

Current milestones and validation are recorded at the top of `DEVELOPMENT_STATUS.md`. The historical roadmap below remains context; current creator instructions take precedence.

## 1. Read this before doing anything

**The approved starting point is commit 27: `9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f`.** Its title is `feat: extend pixel city districts and polish mobile navigation`.

The creator explicitly rejects the city-design changes in commits 28 and 29. Study those commits for lessons only. They are not implementation requirements, approved assets, or a newer product direction.

At the time this handoff was prepared, the working checkout and GitHub `main` were still at commit 29, `b11256d54286eeced3d384091a8ef285cbb94f73`. This handoff request authorized **creating this file only**. Accordingly, no checkout, reset, revert, source modification, commit, push, or deployment was performed. Returning the development code to commit 27 is a pending next-session operation, not something this document claims has happened.

| State | Commit | Meaning |
| --- | --- | --- |
| Approved development baseline, commit 27 | `9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f` | Preserve its gameplay, large world, minimap and quality fixes; improve its visuals from here. |
| Rejected commit 28 | `9a7707fdfe0a580ee6878906cc7832c92c02f164` | `style: rebuild city architecture and authored street composition` |
| Rejected commit 29; current checkout during handoff | `b11256d54286eeced3d384091a8ef285cbb94f73` | `feat: integrate city lighting precise picking and finite overview` |

The numbering above matches `git rev-list --count <hash>`: 27, 28, 29. First-parent counts differ because the history includes a merge. Use the full hashes as the authority.

The **new primary art reference is Neon City: Cyberpunk Pixel Building Kit by Antahonist**, described in section 4. Older task documents put `design/pixel-city-reference-2.png` first; that old hierarchy is superseded by the creator's latest request naming Antahonist as the new primary reference.

Do not read the current checkout's latest documentation as though it all describes the approved baseline. Some files were added or updated by the rejected commits. Use `git show 9fcac4a:<path>` for baseline documentation and source until a deliberate baseline restoration has been agreed and completed.

## 2. Authority, evidence and permissions

### What is confirmed, and what is not

- **Creator requirements:** commit 27 is the baseline; commits 28–29 are unwanted; Antahonist is the new primary reference; preserve existing gameplay, the larger explorable world and minimap; this task creates the handoff file only.
- **Code-confirmed facts:** the implementation descriptions below were checked against commit 27's source, tests, assets, configuration and history, rather than inferred from screenshots alone.
- **Historical validation:** baseline status and GitHub Actions record successful checks. They are not a claim that a fresh local baseline test suite was run during this document-only task.
- **Public reference verification:** the official Antahonist product page and public visual previews were inspected. A licensed downloadable pack was not obtained or inspected.
- **Recommendations:** the roadmap and proposed integration strategy below are technical proposals based on the evidence. They are not invented earlier agreements.
- **Unknowns:** purchase/license entitlement, availability of an Antahonist archive on another machine, physical-device performance, the precise future baseline-restoration method, and the creator's detailed reasons for rejecting every individual change in commits 28–29.

### Standing project instructions

Read `AGENTS.md` before edits. Its normal development workflow is: inspect existing work; implement a small logical unit; run relevant tests and the production build; fix failures; review staged files; make a descriptive Conventional Commit; push and verify.

The creator has explicitly authorized automatic commits and pushes of completed, tested development milestones to `origin/main` in `reedhan-g/Ctrl-Z`. Do not amend old commits, overwrite unrelated work, commit secrets/build caches, force-push, rewrite history, or change repository visibility. Request elevated execution permissions when the environment requires them.

**For this handoff task, the latest “create the file only; do not alter Git history or push” instruction overrides that standing automatic-commit authorization.** Do not use the historical workflow as a reason to commit this handoff or begin development without the next instruction.

Existing GitHub Pages deployment is separately authorized: preserve `.github/workflows/static.yml` with both automatic `push` to `main` and `workflow_dispatch`. Do not disable its push trigger, make it manual-only, or add another deployment workflow. `ci.yml` is testing/build only. Additional public hosting or repository-visibility changes need separate authorization.

Account credentials, GitHub login, tool permissions, approved command prefixes and local filesystem access do not transfer with this document. The new account must check its own environment. Do not put tokens, private keys or credentials in this file or the repository.

## 3. Product vision: what Ctrl Z is meant to become

Ctrl Z, with the tagline **“Undo the World,”** is a browser-based isometric city simulation and investigation game set in the fictional city of Meridian. The name is Ctrl Z, not Ctrl Z+.

The player disrupts a system and explores how its consequences spread through a functioning city. Electricity is the first complete playable scenario. Future disruptions include internet, GPS/GNSS, digital payments and water; their dependencies should eventually interact. The game should expose real modeled causes, delayed failures, reserves and recovery, rather than play a sequence of predetermined visual effects.

The intended loop is:

1. Explore a living city and understand its normal operation.
2. Remove or disrupt a system, or enter an investigation at an observed failure.
3. Inspect buildings, vehicles and infrastructure; trace upstream dependencies.
4. Record evidence and explain a failure using the actual simulation state.
5. Spend limited response resources, restore systems, and observe recovery.
6. Pause, change speed, scrub time, rewind decisions and fork an alternative response.
7. Compare outcomes over equal observation periods and export a useful account of what happened.

Sandbox experimentation and authored investigation cases are complementary modes. Investigation should reward causal reasoning, not simply clicking a highlighted correct answer. The city must remain navigable and understandable while time is paused, running, rewound or restored.

The world should feel alive: clickable service buildings, animated vehicles, visible infrastructure, distinctive neighborhoods and legible states. Decoration can enrich that world, but must not pretend to have simulation capacity it does not possess. A large number of scenery buildings is not equivalent to a deep simulation.

Earlier vision documents mention targets such as six districts, roughly 25–35 meaningful locations and 80–120 simulation entities. Treat those as aspirations, not descriptions of commit 27 or a reason to inflate counts immediately. The baseline has five visual regions, six service entities and three couriers.

### Visual and interaction principles supplied by the creator

- Dark neon isometric city; polished indie simulation/strategy-game character.
- Dense, urban, handcrafted architecture with a moderate pixel-art influence.
- Crisp, readable, game-like buildings, streets and vehicles; coherent scale and perspective.
- Modern, clean, minimal and readable UI. Smooth neon overlays are acceptable for effects.
- Charcoal/black base, with cyan, pink, purple and warm yellow highlights.
- Avoid photorealism, generic smooth AI concept-art scenery, oversized retro 8-bit pixels, and glossy vector-dashboard aesthetics.
- Expand the actual explorable world without merely packing more objects into the opening viewport.
- Mobile performance and touch usability are product requirements, not a final polish exercise.

## 4. Art reference hierarchy and the Antahonist direction

### New primary reference

**[Neon City: Cyberpunk Pixel Building Kit — Antahonist](https://antahonist.itch.io/neon-city-cyberpunk-pixel-building-kit)** is the new primary reference named by the creator. The official publisher is [Antahonist](https://antahonist.itch.io/).

Publisher facts checked on 14 November 2026: the page describes a modular 2:1 isometric PNG kit with 64×32 cells/32-pixel floors and a 32×16/16-pixel variant. It describes pivot metadata in `manifest.json`, ground definitions in `tiles.json`, day/night variants, 16-frame living-light and 12-frame lights-on strips at 120 ms per frame, and a Godot demo. The public license summary allows personal/commercial project use and editing, but forbids redistribution as an asset pack/template; the full `LICENSE.txt` is in the downloadable archive. Verify the actual archive and terms before integration. These are publisher statements, not proof that this project owns the pack. [Source: official product page](https://antahonist.itch.io/neon-city-cyberpunk-pixel-building-kit).

The public banner and animated scene preview were visually inspected in memory. The animated preview displays v1.1 promotional material; it does not establish the contents of a later download. Observed visual qualities include dark teal/charcoal masses, consistent modular floor proportions, distinct stepped roofs and towers, strong cyan/white and warm window light, controlled pink/purple accents, and intentional small-pixel detailing. The architecture reads as a coherent game kit rather than a painted illustration. These observations are visual analysis, not extra product specifications. [Public animated preview](https://img.itch.zone/aW1nLzMxODI5Nzg4LmdpZg==/original/%2BjWhs%2F.gif), [public banner](https://img.itch.zone/aW1nLzMwODAzNjI0LnBuZw==/original/Qr%2Fg5Q.png).

No Antahonist-named archive, local reference asset, attribution manifest or matching ownership record was found in the inspected repository. **Do not assume the pack has been purchased, that the public preview can be shipped, or that its raw files may be committed to GitHub.** Obtain the actual licensed source and review its terms with the creator before an asset-based implementation. If it is used only as a reference for original work, keep that distinction explicit. Do not silently substitute a generated imitation and describe it as the purchased kit.

The pack's Godot demo is not a request to migrate the game from React/Pixi. Its documented grid also does not automatically justify changing the existing camera and world coordinates. A deliberate projection/pivot adapter may preserve the game's world while displaying differently proportioned art.

### Older local references, retained for context

All three local references were available and inspected; no local reference image was inaccessible in this review.

| Path | Role before the latest instruction | How to use it now |
| --- | --- | --- |
| `design/pixel-city-reference-2.png` | Previous primary reference for the visual overhaul/rebuild | Supplementary evidence for detailed readable pixel architecture and composed urban scenes. Antahonist now takes precedence. |
| `design/neon-city-secondary-reference.jpg` | Secondary neon-city reference | Supplementary mood/composition reference; it is not an identified Antahonist asset. |
| `design/ctrl-z-city-reference.png` | Earlier city reference, subsequently tertiary | Useful for broad neon-city density and urban connectivity; its smoother rendering must not override the requested pixel architecture. |

`design/city-reference.png` was a misspelling in earlier instructions. The actual file is `design/ctrl-z-city-reference.png`.

### Practical design interpretation for future work

Use a small, coherent architectural vocabulary with believable ground floors, upper floors, roof machinery, setbacks, entrances and signage. Build local compositions and street hierarchies rather than repeating the same box at every grid parcel. Give the six playable service locations distinctive, discoverable silhouettes. Let roads, curbs, intersections, pavement and prop scale support the buildings.

Preserve pixel readability at normal gameplay zoom. A screenshot that looks attractive only when heavily zoomed out, or a huge sprite with inconsistent pixel scale, is not enough. Neon should reveal architecture and system state; glow should not erase it. Keep controls and labels quieter than the city and legible over both lit and unlit scenes.

These are proposed implementation criteria derived from the creator's direction and the inspected references. They are not claims of approval for a particular new asset or layout.

## 5. What is implemented at commit 27

### Playable inventory

| Area | Baseline behavior |
| --- | --- |
| Electricity sandbox | Fail the grid; run a 24-hour scenario with reserves and downstream failures; deliver limited supplies; restore power. |
| Inspection and tracing | Select six services, inspect capacities/reserves and dependencies, trace upstream paths, read causal incidents. |
| Investigation | Two authored cases, explicit time-stamped evidence, diagnosis checks, gated recovery, and recovery that can be undone. |
| Time and experiments | Pause/play, 1×/4×/12× speeds, scrubbing, exact intervention undo, replayable branches and comparisons. |
| Logistics | Fractional dispatch capacity, integrated dispatch/backlog metrics and three inspectable moving couriers. |
| Reports | Equal-horizon branch comparison, integrated service availability, decisions/incidents/evidence, downloadable JSON. |
| Persistence | Explicit single-slot local save and paused resume, schema validation, old core-save fixture compatibility. |
| World | Finite 60×60 land, five visual regions, 284 scenery identities, connected streets and six non-simulated destinations. |
| Navigation | Bounded pan/zoom, reset and wider overview, mouse/touch/keyboard controls, service framing, interactive SVG minimap. |
| Rendering quality | Original pixel atlas, nearest filtering, culling, render-on-demand, traffic throttling, reduced-motion and low-power support. |
| Browser UI | Responsive inspectors and timeline, help dialog, accessible controls, mobile map disclosure and scrollable sheets. |

These are meaningful existing features to preserve. They do not constitute all of the intended final product.

### Electricity entities and scenario assumptions

Stable entity IDs are important for replay, cases and saves. Keep them unless a migration is designed.

| ID | Display name | World position | Own backup reserve | Role |
| --- | --- | --- | --- | --- |
| `grid` | North substation | `(2, 2)` | None | Electricity source; fails immediately on outage. |
| `hospital` | St. Mira | `(6, 2)` | 18 hours | Depends on electricity and water; has a 12-hour water buffer. |
| `water` | Waterworks | `(2, 6)` | 6 hours | Depends on electricity; supplies homes and hospital. |
| `homes` | Maple residences | `(6, 6)` | 2 hours | Depends on electricity and water, with no extra water buffer. |
| `telecom` | Meridian telecom | `(6, 0)` | 4 hours | Depends on electricity; supports dispatch communications. |
| `logistics` | East delivery hub | `(0, 6)` | 8 hours | Depends on electricity and telecom; drives dispatch/fleet. |

The dependency graph has five grid-to-service edges, two water edges and one telecom-to-logistics edge. Pure functions derive status from the current snapshot. This is a real, limited rule-based scenario, not a full electrical network or municipal engineering model.

Without intervention: homes lose their own backup at 2 h, telecom at 4 h, water at 6 h, logistics power at 8 h, and hospital fuel at 18 h. The hospital's water failure also reaches it at `6 + 12 = 18 h`; own-fuel failure is checked first, so the unboosted hospital reports offline rather than the water-specific condition at that instant. Supplying hospital fuel makes the water failure separately observable.

Logistics capacity is 1 with normal power/communications, 0.7 on its backup while communications work, 0.35 in manual dispatch after telecom loss, and 0 when hub power is exhausted. Dispatch integrates capacity at 12 consignments/hour across actual event boundaries; delayed consignments are the gap from nominal dispatch. This is not individual cargo inventory or road-traffic physics.

There are two response teams and at most one supply intervention per eligible building; the grid cannot be supplied. A delivery changes that entity's reserve deadline to `max(original reserve deadline, delivery time) + 8 hours`, normalized to the simulation time precision. Deliveries are immediate game interventions; couriers do not physically transport those supplies. Restoring power recovers service and stops playback at the current time.

All durations, capacities and report weights are game assumptions. Do not present them as real-world forecasts.

### Cases and evidence rules

- **Silent dispatch:** starts at 5 h. Investigate logistics, telecom and grid. The hub has surviving backup but only 0.35 capacity because telecom is down. The supported failing dependency is communications from telecom.
- **A generator is not enough:** starts at 19 h with hospital fuel supplied at time zero, consuming one response team. Investigate hospital, water and grid. Hospital fuel survives but water does not; its capacity is zero because the water buffer has expired.

Evidence must include the required buildings at the case's exact observation time and actual relevant state. A wrong diagnosis does not unlock recovery. Confirmed readings at the same entity/time cannot be overwritten after a repair. Evidence remains player knowledge across rewind and is labeled with its original time.

A case is recovered only when the diagnosis is correct, current time has reached the observation time, and target capacity improves beyond its observed failure threshold. Rewinding before the failure must not falsely count as recovery. These rules were important prior bug fixes.

### Time, replay, undo and reports

The simulation uses hours, normalized to simulated milliseconds to avoid floating-point deadline drift. The playback clock consumes 100 ms real-time steps, each advancing one simulated minute at 1×: one real second represents ten simulated minutes. Invalid, negative, paused or greater-than-one-second elapsed intervals reset clock accumulation. Visibility changes reset the clock; returning from a hidden tab must not fast-forward the city.

Replay stores delivery/restoration events, not every rendered frame. Branch 0 is the immutable original outage. Intervening on that branch or before an already recorded future decision creates a new branch while retaining the old outcome. Switching branches pauses at the same observation time. Ordinary ticks do not flood the undo stack; manual interventions create exact checkpoints. Case knowledge is not simply rolled back with a simulation checkpoint.

Reports compare branches over one common horizon, integrate five service capacities excluding the grid, and calculate dispatch/backlog from actual event intervals. UI online counts can include all six entities; that differs intentionally from the report's five-service metric. Reports are withheld during an unconfirmed case and omit future decisions. JSON export is a browser download named `ctrl-z-resilience-report.json`, not a cloud-sharing service.

### Persistence

`src/persistence.ts` stores a versioned payload under localStorage key `ctrl-z:experiment:v1`. Save is explicit; reload starts fresh unless the player selects Resume. Resume is paused and excludes transient selection/vehicle selection.

Validation checks replay consistency and known fields rather than blindly assigning untrusted state. Limits include 128 branches, 128 history entries, 128 evidence records, branch names up to 80 characters and a payload up to 2,000,000 characters. Each branch has at most two deliveries plus a restoration; event order and entity IDs are checked. Invalid saves must leave the current experiment intact. Loading state through the Zustand store must preserve its action functions.

Camera transforms, world scenery and renderer objects are not persisted. `tests/fixtures/save-v1-core.json` protects compatibility with the smaller pre-expansion game. Do not add those visual fields to the save schema merely to support new art.

## 6. Architecture and important module boundaries

The stack is TypeScript, React, Zustand, PixiJS, Vite and Playwright. It is an ESM project. `package.json` requires Node `>=22.18.0`; CI uses Node 24. The lockfile, not broad dependency ranges, determines exact installed versions. There is no backend service in the inspected game.

The main flow is: UI action → pure game-state transition/replay → derived simulation/investigation/report state → React panels and Pixi scene update. Camera/navigation state travels through a separate bridge and must not mutate experiment history.

| Modules | Responsibility and invariants |
| --- | --- |
| `src/simulation.ts` | Entity definitions, reserve deadlines, service status/capacity and immutable snapshot calculations. No rendering dependency. |
| `src/dependencies.ts` | Typed dependency graph and cycle-safe upstream paths. Shared truth for investigation and visual tracing. |
| `src/time.ts`, `src/clock.ts` | Exact time normalization/formatting and bounded real-time accumulation. |
| `src/gameState.ts`, `src/game.ts` | Pure reducer/state transitions and Zustand integration. Keep actions, case gates and replay consistent. |
| `src/replay.ts` | Deterministic event histories, forks and reconstruction at a chosen time. |
| `src/investigation.ts` | Dependency diagnosis and incident reconstruction, including failures before late deliveries and restoration. No future leakage. |
| `src/cases.ts` | Two authored cases, evidence validation, diagnosis and recovered-state rules. |
| `src/logistics.ts`, `src/traffic.ts` | Integrated dispatch and deterministic courier route positions; visual preview is distinct from simulation progress. |
| `src/report.ts`, `src/ReportPanel.tsx` | Equal-horizon metrics, comparison and JSON export. |
| `src/persistence.ts`, `src/SaveControls.tsx` | Explicit save/resume, schema and consistency validation. |
| `src/world.ts`, `src/worldScenery.ts` | Shared finite world/district/destination coordinates and deterministic decorative parcel identities. |
| `src/geometry.ts` | Isometric projection, inverse ground projection, building faces and polygon picking. |
| `src/camera.ts`, `src/worldCamera.ts` | Gesture discrimination, zoom/pan transforms and finite-world constraints. |
| `src/navigation.ts` | Separate navigation bridge: current view, recenter/reset and selected courier's displayed point. Not saved game state. |
| `src/City.tsx` | Pixi lifecycle, input, camera fitting, async asset readiness, throttled animation, visibility/resize handling. |
| `src/CityScene.ts` | Retained scene graph, depth ordering, status/selection/tracing updates, culling and picking order. |
| `src/pixelArt.ts`, `src/cityModels.ts` | Shared atlas loading, frame metadata, texture selection and sprite placement. |
| `src/worldArt.ts`, `src/cityArt.ts` | Reusable ground/scenery art and fallback geometry. Fallbacks are not the whole shipping renderer. |
| `src/Minimap.tsx`, `src/minimapGeometry.ts` | Shared-world SVG map, status markers, exact footprint and pointer/keyboard navigation. |
| `src/App.tsx`, panel components, `src/Timeline.tsx`, `src/style.css` | Responsive UI, controls, case/report/save surfaces, accessible keyboard behavior and clearance above the timeline. |

Keep simulation separate from rendering. A culled, hidden or differently illustrated building must retain exactly the same status and future behavior. Do not move failures into animation callbacks or replace event-derived values with scripted UI percentages. An ECS, worker or new engine may eventually be justified by profiling; none is required merely to change the architecture art.

## 7. Baseline world, camera, minimap and mobile details

### Finite geography

`src/world.ts` defines tile bounds `min = -25`, `max = 35`, size 60, chunk size 5: 3,600 tiles and 144 retained ground chunks. This is 36 times the original 10×10 tile area. Some older progress entries still describe the intermediate 40×40 world; that is not commit 27's final size.

The projected land bounds are approximately `x=-2340, y=-1000, width=4680, height=2400`. Roads use shared axes `-21, -16, -11, -6, -1, 4, 9, 14, 19, 24, 29, 34`. The baseline road strip is one tile; the later 1.6-tile change belongs to rejected work.

Four broad quadrants are Neon Market, Foundry Ward, Maple Heights and East Exchange. The civic core overrides their overlap around the original 0–10 coordinates. The six original services have not moved.

Non-simulated navigation destinations are Lantern Yard `(-20,-20)`, Foundry Court `(25,-20)`, Maple Court `(-20,25)`, Freight Square `(25,25)`, Neon Passage `(-20,0)` and Station Court `(25,0)`. Their IDs include `lantern`, `foundry`, `canal`, `freight`, `passage`, `station`; the `canal` ID does not imply a working canal simulation.

The 284 scenery objects are deterministic parcels with stable `scenery:x:y` identities, coordinate-based model variation and destination overrides. They are not hand-authored individual simulation agents. The core excludes most extra parcels to preserve service access. Future art changes should preserve a coherent navigable world rather than merely chase this object count.

### Projection, picking and depth

Baseline projection is `screenX = (x - y) * 39`, `screenY = (x + y) * 20 - z`. A ground tile is 78×40 projected pixels, close to but not exactly a standard 2:1 kit tile. The inverse for ground points is `x = screenX/78 + screenY/40`, `y = screenY/40 - screenX/78`. Height is not recovered by that inverse.

Service face geometry and decorative parcel bounds drive picking. The scene checks service and scenery picks in painted order so foreground scenery blocks clicks through it. Commit 27 does **not** have the later per-pixel alpha mask. Sprites must remain aligned with hit geometry; replacing art without revisiting bounds/pivots risks apparent missed clicks.

The scene uses retained children, depth ordering based on world positions/footprints, and a 100-world-pixel culling margin. Vehicles use their current projected positions. Culling hides rendering; it must not unload simulation state. Allocating new textures/graphics on every frame or increasing scene size by rendering every offscreen parcel would undo important performance work.

### Camera behavior and the overview limitation

`src/worldCamera.ts` uses base scale `min(viewWidth/650, viewHeight/480)` with a small positive floor, and an origin near `(viewWidth/2, viewHeight*0.19)`. The minimum allowed scale depends on the world size and viewport dimensions. Maximum zoom is at least 2.8; minimum zoom is at least 0.55 in the normalized camera convention.

The baseline bounds constrain all four viewport corners to land. This avoids accidental off-world dragging, but prevents viewing the entire island/diamond silhouette with surrounding space. The baseline Overview command requests the minimum allowed zoom: it is a wider navigation view, **not the full-silhouette overview added in rejected commit 29**. Treat this as a confirmed baseline limitation and a future design decision, not a reason to import rejected camera code automatically.

`screenToWorld`/`worldToScreen` and the published camera footprint are the shared transform truth. Browser tests use `data-camera` and `data-scene` diagnostics rather than old hard-coded pixel positions. A larger world must not enlarge the actual viewport/container.

### Required and implemented interactions

- Mouse: left-button tap to inspect, drag to pan, wheel zoom anchored under the pointer, Shift+wheel/trackpad horizontal pan.
- Touch: one-finger pan, tap inspect, two-finger pinch; a pinch must suppress accidental building selection. Drag/tap threshold is 6 CSS pixels in the city gesture controller. Cancel/lost capture must end the gesture safely.
- Keyboard: city arrow navigation, camera buttons, contextual native controls, help dialog; Ctrl/Meta+Z for undo when not editing; Escape closes relevant surfaces. Space playback must not hijack input/button behavior.
- Selected services are framed away from panels. Mobile service selection uses at least 1.5 normalized zoom and places the entity above the sheet. Vehicle selection opens its logistics relationship and follows the appropriate displayed point.
- Mobile inspection sheets scroll internally, controls remain reachable, and page scrolling must not corrupt world/minimap coordinates. Portrait and short landscape need separate verification.
- Touch controls should be at least 44 CSS pixels, avoid hover-only instructions, and communicate state through text/symbols as well as color.

The SVG minimap derives districts, roads and markers from shared world coordinates. It shows six service letters and states, six destinations, three courier markers and the actual camera footprint. Scenery is explicitly described as scenery. Desktop includes navigation alternatives; mobile starts collapsed at widths up to 760 px and collapses when a service is selected.

Minimap input inverts the SVG screen CTM, including scroll/resize/letterboxing. Dragging inside the footprint preserves the grab offset. Baseline commit 27 already has the fine 0.5-pixel grabbed-footprint movement threshold, versus a 4-pixel tap threshold elsewhere; do not misattribute that fix to rejected commit 29. Taps recenter on release, pointer capture and cancellation are handled, and keyboard arrows/Home work on the focused map.

The selected courier marker can use its actual interpolated renderer point through the bridge. Other courier markers use snapshot positions, so during the nominal visual preview they are not all frame-synchronized with the sprites. This is a known implementation tradeoff, not three additional independent simulations.

### Rendering and mobile performance

Pixi prefers WebGL, uses no canvas antialiasing for the pixel art, and caps device pixel ratio at 2. Low-power mode caps it at 1 and disables continuous fleet animation while retaining game state and camera/selection. Reduced motion also suppresses continuous traffic animation.

The renderer does not run a permanent unconditional ticker. Scene changes request coalesced frames. Fleet visuals update at most 30 times per second when visible and appropriate; paused experiments, hidden documents, offscreen canvas, low-power and reduced-motion states suppress them. Nominal first-visit moving traffic is a visual-only preview and must not advance consignments or simulation time.

`City.tsx` waits for assets before exposing the canvas, handles asynchronous unmount and StrictMode cleanup, and uses ResizeObserver/IntersectionObserver. `Timeline.tsx` already measures wrapped timeline clearance with ResizeObserver and publishes `--timeline-clearance`; preserve this instead of reintroducing a fixed mobile panel offset.

## 8. Baseline art pipeline and how to replace it carefully

The approved baseline uses original, code-authored raster assets:

- `scripts/build-city-art.py`: offline Pillow generator for buildings, lit/unlit variants, props, ground detail and matching metadata.
- `src/assets/city-atlas.png`: approximately 147 KB, 2048×1280 atlas; 256×256 frames in eight columns.
- `src/assets/street-tile.png`: approximately 3 KB, 400×224 cached ground tile.
- `src/cityModels.ts`: generated model/frame metadata.
- `src/assets/README.md`: asset provenance/context; read its baseline version.

There are 20 model types: 16 architectural/service models, three cars and a lamp. Architecture uses paired on/off frames, nearest-neighbor texture filtering and pixel rounding. Assets are resolved with Vite-aware URLs and loaded through a shared promise. Node builds do not need Pillow; only regenerating these source assets does.

Ground chunks reuse a tile texture; street lamps and parked cars are separately placed props. Decorative illumination follows the grid outage, while service building states follow their own reserve/dependency rules. Do not accidentally black out a hospital that is still correctly running on backup merely because the district is dark.

This art is functional and a useful approved code baseline, but its repeated silhouettes, uniform parcels and coarse detail are not a claim of matching the new Antahonist direction. The new art needs deliberate scale, pivots, floor heights, hit bounds, depth order and day/night/state variants. A service-art adapter can preserve entity IDs, world coordinates and save data while replacing appearance.

Do not treat `src/assets/city-rebuild.png`, `city-rebuild.webp`, `street-rebuild.png`, `rebuildModels.ts` or their generation/packaging scripts as approved baseline assets. They were introduced by rejected work. Purchased-kit raw source also requires separate provenance/license handling before repository publication.

## 9. Documentation map and historical context

Read these at commit 27 when reconstructing the approved state:

| Path | Purpose / caution |
| --- | --- |
| `AGENTS.md` | Development, Git and existing Pages rules. Latest creator instructions override conflicting older guidance. |
| `PROJECT_VISION.md` | Consolidated gameplay, art and architecture direction before the new Antahonist priority. |
| `PROJECT_BRIEF.md` | Product scope and practical priorities. |
| `DEVELOPMENT_STATUS.md` | Current-result section plus chronological milestones; older entries are not all current specifications. |
| `ARCHITECTURE.md` | Module architecture and extension guidance. Confirm details against source. |
| `README.md` | Run/build overview and player-facing feature summary. |
| `CTRL_Z_PROJECT_VISION.md` | Earlier vision artifact; includes aspirations and older tooling/reference assumptions. Not a literal installed-stack inventory. |
| `CODEX_TASK.md` | Earlier executable development task, superseded where later instructions change scope. |
| `CODEX_EXPANDED_CITY.md` | Origin of large-world/minimap requirements. Intermediate 40×40 work was later extended. |
| `CODEX_CITY_VISUAL_OVERHAUL.md` | Prior art correction and reference hierarchy. Its former primary image is now supplementary to Antahonist. |
| `docs/VISUAL_OVERHAUL.md`, `docs/PERFORMANCE.md` | Visual/performance evidence, methodology and remaining gaps. |
| `docs/visual-review/{before,after}/` | Committed screenshots from the approved line. Check screenshot dimensions and scenario before comparing. |

`CODEX_CITY_VISUAL_REBUILD.md`, `docs/CITY_REBUILD.md`, `docs/REBUILD_ASSET_PROMPT.md` and `docs/rebuild-review/` belong to the rejected continuation, not commit 27's approved requirements. Keep their provenance explicit if they remain visible in a later checkout.

Examples of stale historical statements: intermediate 40×40 dimensions, 248-scenery counts, earlier 56-test milestones, the misspelled image path, and proposed tooling such as Vitest or GSAP. The actual baseline test runner is Node's built-in test runner; use source/configuration to resolve these differences.

## 10. Git history, rejected approaches and lessons

### Useful milestones before the approved baseline

These short hashes are navigation aids; inspect the actual commits before modifying related behavior.

| Commit | Contribution |
| --- | --- |
| `8f1d335` | Initial causal investigation/mobile playable work. |
| `94213fb` | Merge preserving upstream GitHub Pages setup and base-path changes. |
| `66395d2` | Separate testing/build CI. |
| `fe917ae` | Replay and alternative branches. |
| `e9dae05` | Render-on-demand and fixed simulation clock. |
| `212346f` | Telecom/logistics dependency depth. |
| `b8a4c2a` | Moving delivery fleet. |
| `a6caf04` | Authored investigation cases. |
| `6c82a60` | Resilience reports. |
| `c58e86b` | Versioned local saves. |
| `aa6ba92` | Low-power and unobstructed mobile inspection. |
| `e709bf2` | Floating-point clock/deadline and formatting fixes. |
| `ff1eec9` | Confirmed evidence preservation and recovery timing fixes. |
| `5abc45b`, `1097108` | Finite expanded world, scenery and culling. |
| `2ccc9be`, `ea4ce88` | Minimap display and interactive navigation. |
| `c03630a` | Offscreen gameplay, routes and old-save integration. |
| `8af6813`, `e1d6ae2` | Sightline/art overhaul and original pixel assets. |
| `9fcac4a` | Approved 60×60 world extension and mobile navigation polish. |

The source comparison between commit 27 and commit 29 showed no changes to the core simulation, game-state/replay/persistence/case/report modules, dependency lockfile or deployment workflows checked in this review. The unwanted continuation was mainly visual/layout/rendering/camera work. That does not mean its visual changes are safe to keep by default.

### What the rejected commits did

| Commit | Observed changes | Handoff treatment |
| --- | --- | --- |
| 28, `9a7707f` | New rebuild instructions and generated atlas; new ground/model pipeline; authored 12×12 block plan with about 94 frontages replacing 284 scenery identities; wider roads, changed framing, scaled rectangular art and linear filtering; altered labels. | Historical experiment. Do not carry its scene composition, art or instruction files forward as requirements. |
| 29, `b11256d` | WebP packaging; per-pixel source-alpha hit testing; additive light pools and outage tinting; sorting changes; about 95 frontages; perimeter/exterior and a full-silhouette overview; additional tests. | Historical experiment. Do not automatically cherry-pick even apparently useful technical changes into the approved baseline. |

The rejected work's rebuild PNG was roughly 3.29 MB and WebP roughly 1.9 MB, versus the baseline's much smaller original atlas. Its reported 70 unit checks/48 browser specs and approximately 120-draw-call benchmark are not baseline statistics or acceptance targets.

### Lessons supported by the evidence

1. **Functional checks do not establish visual approval.** A test suite can pass while architecture, scale and composition miss the creator's intended game.
2. **Object count is not the design goal.** More repetitions can overcrowd a viewport; reducing the count alone does not produce convincing authored streets.
3. **Reference matching needs explicit visual review.** Compare normal-zoom crops, floor proportions, roof details, pixel scale, road width and service discoverability, not just a whole-city thumbnail.
4. **Art, geometry and interaction must agree.** Atlas pivots, projection, footprint bounds, sorting and hit tests form a contract. A new image alone cannot establish that contract.
5. **Preserve hard-won regressions.** Exact time boundaries, case evidence/save consistency, cancellation-safe input, mobile control clearance, old-save loading and offscreen simulation are already implemented before the rejected commits.
6. **Do not present generated work as an existing licensed kit.** Provenance and actual visual comparison must be clear.
7. **Do not repair Git workflow by discarding the creator's deployment.** The upstream Pages workflow was intentional and already reconciled.

The creator has not supplied a detailed causal explanation for rejecting every part of commits 28–29. Do not invent earlier conversations, claim access to internal reasoning, or turn possible shortcomings into fabricated quotes. The rejection and the new baseline/reference are explicit; other design diagnoses are analysis.

## 11. Testing, commands and verification process

### Baseline validation evidence

Commit 27's recorded completed state is **67 unit checks, 46 Playwright specifications and a successful production build**. GitHub records for that exact commit were checked during handoff preparation:

- [CI successful run for commit 27](https://github.com/reedhan-g/Ctrl-Z/actions/runs/43571386102)
- [GitHub Pages successful run for commit 27](https://github.com/reedhan-g/Ctrl-Z/actions/runs/43571386054)

These are historical results. No fresh baseline checkout/build/browser run was performed for this file-only task; doing so in the current commit-29 checkout would validate the wrong source. A new account should run the suite again after establishing the correct baseline.

### Initial inspection commands — read-only

Run from `C:\Ctrl Z`, and inspect each result:

```powershell
git status --short --branch
git remote -v
git rev-parse HEAD
git log --oneline --decorate -12
git diff --stat
git diff --cached --stat
git show 9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f:AGENTS.md
git show 9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f:DEVELOPMENT_STATUS.md
```

PowerShell's text decoding may need `Get-Content -Encoding UTF8` for local Markdown. Avoid interpreting terminal mojibake as actual file corruption.

### Build and tests — after the baseline is established and work resumes

Prefer Node 24, install from the existing lockfile, and run each step separately. Check `$LASTEXITCODE` before proceeding; do not let a later successful command hide an earlier failure.

```powershell
node --version
npm ci
npm test
npx playwright install chromium
npm run test:browser -- --workers=2
npm run build
```

Browser installation may need network/elevated permission. On Linux, Playwright may require OS dependencies as well. Do not bypass a sandbox network failure through another tool; request the needed escalation.

The unit script is `node --test tests/*.test.mjs`, not Vitest. The build is `tsc -b && vite build`. Configuration is in `tsconfig.json`, `vite.config.ts` and `playwright.config.ts`; there is no baseline `tsconfig.app.json`.

Vite's base path is `/Ctrl-Z/`. Development entry:

```powershell
npm run dev -- --port 5173 --strictPort
```

Open `http://127.0.0.1:5173/Ctrl-Z/`, not an assumed root route. Playwright manages this server itself when needed and can reuse it outside CI.

Useful focused commands, followed by appropriate wider regression checks for the completed milestone:

```powershell
npm run test:browser -- tests/browser/game.spec.ts tests/browser/minimap.spec.ts tests/browser/quality.spec.ts --workers=2
npm run test:browser -- tests/browser/expanded-integration.spec.ts --workers=2
npm run test:browser -- tests/browser/visual-city.spec.ts --workers=2
```

### What the tests cover and what they do not

Unit tests cover simulation boundaries, dependency/investigation logic, event replay, exact undo, reports, save validation, world/scenery identities, camera transforms, scene picking and resource behavior. `tests/fixtures/pixi.mjs` supplies a Pixi test double through Node hooks; it does not prove real GPU output looks correct.

Playwright covers sandbox and both cases, diagnosis/evidence/recovery, logistics and courier stopping, replay/branches, downloaded report JSON, save/resume/rejection, exact clock regressions, mobile sheets, low power, world bounds, minimap input and offscreen gameplay. Native Chromium touch/CDP checks include pinch and transformed picking. Tests also inspect actual scene/camera diagnostics.

Configured browser projects are desktop Chromium and iPhone-13-shaped Chromium emulation. Mobile emulation is not Safari or physical iOS. Desktop default tests use 1280×720; the capture script uses a different desktop height. Baseline browser timeout is 60 seconds, with longer visual checks; parallel workers can affect timing measurements.

### Screenshots and visual review

With the dev server running in another session:

```powershell
node scripts/capture-city.mjs test-results/visual-review
```

The capture script takes desktop/mobile world screenshots with reduced motion and a readiness delay. Inspect actual images; file existence or passing screenshot code is not visual review. `docs/visual-review/after/desktop-opening.png` is an approved-line artifact, not proof that every architectural detail was accepted as final.

For an art milestone, inspect at least: opening view, normal-zoom close crop, market/industry/housing/logistics, selected hospital, outage, backup reserve, restored state, wider navigation view, mobile opening and mobile inspection, plus portrait/short-landscape overlap. Compare matched viewport/zoom/scenario settings against the primary reference. Capture both beautiful compositions and difficult occlusion cases.

### Performance receipts and limitations

`docs/performance-overhaul-desktop.json` records approximately 2040 ms canvas readiness, zero idle draws in the measured 300 ms reduced-motion window, 3059 ms for the scripted drag and 30 measured draw calls. The mobile counterpart records about 1721 ms, zero idle draws, 4103 ms and 30 calls. See `docs/PERFORMANCE.md` for the measurement context.

These are Chromium automation/software-GPU observations, not hardware FPS, battery-life or Safari guarantees. Benchmark scripts, IPC, concurrent workers, cache warmth and viewport dimensions influence them. Earlier expanded-world numbers around 1553/1702 draw calls describe the intermediate primitive-heavy renderer, not the final approved atlas baseline. Do not promise a speedup by comparing unlike runs.

Keep runtime assets, draw calls, CPU activity, memory and input responsiveness under review. Batch/stream only when measurement warrants it. The baseline world uses retained objects with culling; chunk streaming is deliberately not needed yet.

## 12. Deployment and Git practice

Origin is `https://github.com/reedhan-g/Ctrl-Z.git`. The normal development target is `main`. The repository's npm `private: true` prevents npm publication; it says nothing about GitHub repository visibility.

### Preserve the existing workflows

`.github/workflows/static.yml` is the creator's existing Pages deployment workflow. It runs on pushes to `main` and manual `workflow_dispatch`, uses Node 24, installs with `npm ci`, runs unit tests and the production build, then configures Pages, uploads `dist` and deploys it. It uses the standard Pages permissions (`contents: read`, `pages: write`, `id-token: write`) and Pages concurrency/environment configuration.

`.github/workflows/ci.yml` runs testing/build on push/PR/manual invocation with read-only contents permission. It does not deploy. Baseline hosted CI runs unit tests/build; it does **not** replace the local full browser-test gate.

Expected project Pages route is `https://reedhan-g.github.io/Ctrl-Z/`, derived from the repository and Vite base. That route was not opened during this handoff, and the current deployed site must not be assumed to show commit 27: `main` was still at commit 29 when inspected. A later authorized push to `main` will trigger the existing deployment.

### Future milestone delivery, once development is authorized to resume

1. Inspect status and preserve unrelated local/staged work.
2. Implement one coherent improvement; update relevant docs honestly.
3. Run relevant tests, full required regression checks, build and visual review where applicable.
4. Stage an explicit list of files. Review `git diff --cached --check`, the staged diff and file names.
5. Commit with a descriptive Conventional Commit message.
6. Push to the authorized target without force and verify the remote SHA; check relevant CI/Pages results.

Do not stage `node_modules`, `dist`, caches, `.env*`, credentials, Playwright reports or disposable screenshots. Existing `.gitignore` covers the normal generated directories. Curated review artifacts should be deliberately selected, not bulk-added from `test-results`.

If a push is rejected because the remote advanced, fetch and inspect before deciding how to integrate. Never overwrite unrelated upstream work. A new account may need permission for network, Git metadata writes, browser processes or dependency downloads; do not interpret that as a reason to rewrite the task or silently skip required checks.

## 13. Known gaps and remaining issues

### Confirmed baseline limitations

- The city is large and interactive, but most buildings are scenery; only six services and three couriers participate in the existing model.
- Electricity is the developed disruption. Telecom, water and logistics are dependencies within it; independent internet/GPS/payment/water scenarios and combined disruptions are not implemented.
- Architecture is repetitive and procedurally selected, with limited bespoke neighborhood composition. It does not yet meet the new primary reference's level of coherent architectural detail.
- No Antahonist source pack, entitlement or local manifest was identified. Asset acquisition/integration is pending, not accomplished by naming the reference.
- Picking is polygon/paint-order based rather than per-pixel alpha based. New art must be tested for occlusion and hit-bound consistency.
- Overview is constrained to land-filled viewport bounds and does not show the full exterior silhouette.
- Couriers share a deterministic route/capacity model. There are no individual cargo inventories, collisions, pedestrian simulation or physical delivery of response supplies.
- Only two authored investigation cases exist. There is no general randomized case generator.
- Saves are one explicit local slot, with no cloud sync or automatic cross-device continuation.
- Reports use deliberately limited game metrics, not validated infrastructure forecasting.
- Physical Android/iOS and Safari performance/usability remain unverified. Hosted CI does not run the full browser suite.

### Risks to investigate, not established bugs

- Imported modular art may use a different projection, base size or pivot convention from 78×40 baseline geometry.
- Taller detailed sprites may obscure playable services or create incorrect depth/picking boundaries.
- Additional lights, texture sources or animation can break the baseline's low idle GPU use and mobile memory budget.
- Repeated parcels may continue to look generic even with better source art unless street composition changes deliberately.
- Label density and panel clearance may regress when the framing or building heights change.

Do not label a possible risk as a reproduced defect. Record reproduction steps, expected/actual behavior and validation when a real bug is found. The earlier repository review fixed clock and case regressions; it was not proof that the entire game is bug-free.

## 14. Recommended development roadmap

This ordering is a proposal for the next authorized development session, aligned with the creator's current baseline and reference. Do not execute it as part of this file-only task.

### Milestone 0 — establish the correct baseline and evidence

Preserve current work and this handoff. Agree a non-destructive way to continue from commit 27. Verify the baseline source, lockfile, workflows, old-save fixture and documented tests. Capture matched desktop/mobile baseline screenshots. Record the actual tested SHA and results before changing art.

### Milestone 1 — resolve reference assets and make one architectural exemplar

Determine whether the creator has the Antahonist kit and may supply its licensed files. Inspect actual archive contents/provenance if available; otherwise agree an original-art route explicitly. Do not buy assets, publish samples or copy the public promotional scene into the game automatically.

Implement a small street/service exemplar with the chosen art route. Define coordinate/pivot/footprint/depth/hit contracts. Show architecture at gameplay zoom, road/curb scale, an obvious entrance and readable floor/roof detail. Preserve a service's real operational/backup/offline presentation. Visually compare this before multiplying it through the world.

### Milestone 2 — compose the city around the approved art vocabulary

Expand authored block compositions and landmark silhouettes across the existing large world. Preserve the six service IDs/coordinates, reachable destinations, minimap and camera independence unless a specific migration is approved. Vary heights, roof lines, ground-floor functions, courtyards and street edges. Keep sightlines and room to navigate; do not treat 284 as a required object count or repeat the rejected layout.

Review multiple districts and service selection on mobile before declaring the composition complete. World extent and viewport density are separate design controls.

### Milestone 3 — integrate states, tracing, traffic and interaction quality

Connect building illumination and infrastructure indicators to real power/reserve/dependency states. Keep backup services visibly distinct from dead ones. Verify paint order and picking around taller architecture, couriers and blocked foregrounds. Preserve exact case evidence, replay, reports, saves and response limits.

Only introduce a new picking algorithm, full-world overview or lighting technique when independently justified and reviewed against this baseline. The rejected commits do not supply automatic approval for them.

### Milestone 4 — mobile/performance/release quality

Profile actual devices where available. Check tap/pan/pinch/cancel, map gestures, portrait/landscape, scroll, all controls with inspector open, reduced motion, low power, idle draws and hidden-tab behavior. Batch textures or simplify expensive effects when measured. Run regression/build and review screenshots before delivery.

Once normal development authorization is active again, commit and push each completed, tested logical milestone, verify the remote SHA and existing workflow outcomes, and document remaining issues honestly.

### Later gameplay roadmap

After the electricity experience and visual foundation are solid, deepen investigation and meaningful city interactions, then add independent disruptions and their shared dependencies. Candidate areas include internet/communications, GPS/GNSS, payments, water, restoration strategies and more cases. Each addition should extend pure rule-based state/replay/reporting rather than introduce a parallel decorative simulation. Preserve old-save behavior or explicitly version/migrate it.

## 15. Exact next-session procedure

### A. Inspect before taking action

Read this file and local `AGENTS.md`; inspect status, HEAD, remotes and staged/untracked work. Read the approved versions of the vision, brief, status, architecture and relevant source using the full baseline hash. Reopen the actual reference images and official new primary reference rather than relying only on this prose.

The handoff may still be untracked. A `git show` or a checkout of an older commit does not carry an uncommitted handoff to another account or machine. Ensure the creator has transferred it and any unrelated work safely before changing worktrees.

### B. Resolve baseline restoration without rewriting remote history

The creator wants development returned to commit 27 but, for the handoff task, prohibited history changes. The new session should confirm that implementation/baseline work is now authorized and choose a safe method compatible with the creator's current branch needs.

An isolated branch/worktree at commit 27 is one possible inspection/development method. Example for a **future authorized operation**, not a command run during this handoff:

```powershell
git worktree add -b continue-from-27 'C:\Ctrl Z-baseline-27' 9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f
```

That example writes outside the original workspace and may require permission. It creates a separate branch, does not restore `main`, does not copy an untracked handoff, and does not by itself solve how future changes reach `origin/main`. If the creator wants `main` returned to baseline content, agree a forward-history strategy that preserves unrelated changes rather than silently force-resetting or force-pushing. A reverting commit is still a history/deployment action and was not authorized by the handoff-only request.

Do not run `git reset --hard`, discard files, revert both commits wholesale, or cherry-pick rejected changes merely because this file mentions them. First inspect what has changed since this handoff. The remote may have advanced.

### C. Verify and continue

Once on the agreed baseline, install locked dependencies, run tests/build, capture/inspect visuals and record real results. Resolve Antahonist access and art strategy, then start the smallest reviewable exemplar. Keep gameplay regressions protected. Update `PROJECT_VISION.md`, `PROJECT_BRIEF.md` and `DEVELOPMENT_STATUS.md` when development resumes so they reflect the new reference and actual implementation rather than rejected work.

### Suggested opening prompt for the new account

> Read CODEX_HANDOFF_README.md and AGENTS.md before editing. The approved Ctrl Z baseline is 9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f (commit 27); commits 28 and 29 are rejected city-design experiments, not requirements. First inspect the current checkout, remote and uncommitted work, and report how you can safely resume from the approved baseline without rewriting history or losing work. The new primary art reference is Neon City: Cyberpunk Pixel Building Kit by Antahonist; verify licensed asset availability before integration. Preserve the 60×60 explorable world, interactive minimap, six services, electricity/investigation/replay/report/save systems and mobile quality. Preserve static.yml automatic Pages deployment on pushes to main plus workflow_dispatch. Establish the correct baseline and test evidence before implementing a small visual exemplar. Follow my current instructions about when development, commits and pushes may resume; the prior handoff task itself authorized only creating its file.

### Definition of a successful continuation

The next Codex should be able to name the tested baseline SHA, explain which visual references govern the work, show real normal-zoom desktop/mobile evidence, and demonstrate unchanged causal gameplay. It should distinguish decorative city growth from added simulation depth, reproduce both cases, preserve replay/undo/save/report behavior, and retain functional minimap/touch controls. Completed milestones should have honest validation records and, when authorized, descriptive commits with verified pushes. No unrelated work, repository visibility or existing deployment setup should be overwritten.

## 16. Handoff preparation receipt

Inspected baseline instructions/vision/status/architecture, source, tests, art generation and runtime assets, design references, Git history and diffs through commits 28–29, package/build/browser configuration, workflows and public baseline Actions records. Inspected the official Antahonist page and public previews; no paid download was inspected. The local city references and an approved-line opening screenshot were visually reviewed.

Created only `CODEX_HANDOFF_README.md`. The approved baseline was documented, not checked out. No code/assets/configuration were modified, no test/build output was generated for this document-only task, and no commit, push, history rewrite or deployment action was performed. The document should travel with the project to the new account; it is a continuity record, not a substitute for inspecting the actual repository state at the next session.
