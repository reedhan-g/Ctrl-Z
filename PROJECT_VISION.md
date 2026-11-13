# Ctrl Z - Product Vision

## Authority and reference images

This is the current consolidated product vision, aligned with the creator's instructions and reference review on 2026-11-13. Use it with AGENTS.md for development workflow and DEVELOPMENT_STATUS.md for actual implementation status. It supersedes conflicting product/style statements in older briefs and CTRL_Z_PROJECT_VISION.md; that original source is retained for provenance. Planned behavior below is not a claim that it already exists.

The primary visual direction is **design/pixel-city-reference-2.png**, the uploaded neon pixel-art reference. **design/ctrl-z-city-reference.png** is secondary inspiration for urban composition and consistent isometric streets. Both images were opened and inspected. CODEX_TASK.md explicitly establishes this priority, superseding the earlier ordering. References guide original interactive assets, not flattened game backgrounds. Neither image is a runtime asset or an assertion that its artwork may be redistributed in a released game.

## Identity and complete gameplay loop

The displayed game title is **Ctrl Z**, without a plus sign. Tagline: **Undo the World.** This is a browser-based isometric city simulation and investigation game set in the fictional living city of **Meridian**.

Players explore an interconnected city, remove or disrupt a critical system, observe consequences spreading through dependencies, investigate unexpected failures, spend limited resources on interventions, restore services, and rewind to compare alternate outcomes. The city itself is the primary play surface. Buildings, infrastructure and vehicles are independently interactive entities with meaningful states.

The complete intended experience is:

1. Arrive in a living city with readable streets, lights, animated vehicles and infrastructure. Short onboarding explains the mechanic and offers Sandbox and Investigation.
2. In Sandbox, choose a disruption. Electricity is the first complete scenario; internet, GNSS/GPS, digital payment authorization and municipal water disruptions are later options.
3. See immediate and delayed effects driven by service rules, reserves and elapsed simulated time. Advance, pause, change speed and scrub time.
4. Select a building or vehicle to inspect its services, dependencies, reserves, fallback behavior and reasons for degradation.
5. Use Causal Vision / Trace Cause to follow direct and indirect dependencies. State must be legible through text and visual changes, not color alone.
6. Apply recovery actions with limited resources. Actions change simulation outcomes reproducibly rather than merely changing labels.
7. Rewind, preserve past decisions, branch from an earlier state and compare outcomes against the baseline or another response.
8. Finish with a Resilience Report explaining impacts, actions, tradeoffs and recovery; support saving/sharing the report. Local save states should preserve experiments.

Investigation mode begins with an observed failure and withholds its cause. Players gather evidence by exploring entities and service histories, develop and test a diagnosis, choose a recovery strategy and evaluate the result. A dependency inspector that immediately reveals the known outage is useful infrastructure but is not the complete investigation mode. Avoid instant one-click answers or scripted quiz cards in place of reasoning.

## Approved visual style

Create a dense, urban, handcrafted-looking 2D isometric city with **moderate pixel-art influence**, like a polished indie simulation/strategy game.

- World: crisp, readable, slightly pixel-inspired buildings, roads, vehicles and infrastructure. Consistent fixed isometric projection, deliberate edge treatment, modular asset vocabulary and coherent scale. This is not full retro 8-bit art.
- Composition: tightly arranged blocks, legible intersections and sidewalks, varied skyline and roof silhouettes, rooftop equipment, transit and logistics details. Density must preserve navigation, selection and dependency readability.
- Palette: dark charcoal/black and deep navy base; cyan, pink, purple and warm yellow highlights. Use controlled neon architectural accents, windows, signs and streetlight clusters; reserve warning treatment for meaningful system changes.
- UI: modern, clean, minimal and readable. Keep city status and time controls compact; show contextual panels when useful. The city takes visual priority over promotional copy or large permanent dashboard panels.
- Effects: smooth, restrained neon overlays are acceptable for selection, system tracing and warnings. Avoid excessive bloom and oversaturated gradients.
- State: windows and streetlights respond to power, generators visibly operate, communications and logistics show degradation, and vehicles respond to relevant simulation conditions.

Avoid photorealism, heavy 3D, smooth generic concept-art visuals, glossy vector-dashboard aesthetics, random holograms, blurry textures and inconsistent perspectives. Procedural geometry may support roads or original modular assets, but the current smooth repeated prisms are not the final art standard. A static AI-generated city image cannot replace interactive entities.

Judge visual completion using actual desktop and mobile game screenshots beside both references. Passing functional tests alone does not establish visual fidelity. The references and actual desktop/mobile screenshots have been inspected. The small current district is an incremental improvement, not a final fidelity match.

## Intended simulation architecture

Keep simulation entirely separate from rendering. React + Vite + TypeScript provide the interface; PixiJS provides accelerated 2D rendering; Zustand connects simulation/UI state. Pure TypeScript simulation owns rules, entity state and transitions. A worker may be added if profiling warrants it; no full 3D engine is required.

Use deterministic fixed-step simulation, independent of rendering FPS, over a graph of operational entities. Scenario configuration defines initial conditions and modeled assumptions. Entities should carry the capacity, demand, health, inventory, reserves, fallbacks and recovery actions relevant to their role. Derive degradation from those rules and dependencies rather than a scripted sequence of animations.

Examples: hospitals use generators until fuel is exhausted and also need water; telecom uses battery reserves; deliveries depend on roads, fuel, dispatch and communication; reservoirs buffer loss of electric pumping. Internet loss need not disable independent local networks, and GPS loss need not disable all navigation. Reserve values and failure delays are transparent game assumptions, not universal forecasts.

Keep a time-indexed decision/event journal and consistent snapshots for undo, seeking, replay and branching. Seeking must reconstruct earlier decisions accurately; branching must preserve the previous response for comparison. Simulation-generated events and explanations should agree with inspection and overlays. Tests should cover reproducibility, thresholds, cascades, intervention tradeoffs, restoration and replay consistency.

The existing pure reducer and shared dependency graph are foundations, not a complete capacity/inventory engine. The clock now uses a fixed-step elapsed-time accumulator and discards background-tab time. Replay is now integrated through a time-indexed decision journal; future expansion must preserve its branch and undo consistency.

## Map, mobile interaction and accessibility

Desktop: drag to pan, wheel zoom anchored at the cursor, click to select, useful keyboard shortcuts and responsive contextual inspection. Offer overview, district and building views while keeping selection visible and camera behavior predictable.

Mobile: tap buildings and vehicles, one-finger drag to pan, two-finger pinch with zoom anchored at the gesture midpoint, and a contextual bottom sheet. No mandatory hover. Distinguish taps from drags/pinches; cancelled pointers must never inspect objects accidentally. Keep controls comfortably touch-sized, generally at least 44 CSS pixels, including time and investigation actions.

Support portrait and landscape without blocking the city, trapping page scroll or hiding the selected entity beneath panels. Provide an accessible building/entity list, focus-visible controls, keyboard alternatives where feasible, readable status text and contrast, and reduced-motion behavior for world animations as well as UI transitions.

Optimize for ordinary Windows laptops and modern Android/iOS browsers. Aim for 60 FPS on a typical modern laptop and roughly 30 FPS on a supported midrange phone, subject to actual profiling. These are targets, not measured results. Use batching/atlases, visible-region culling, zoom-dependent detail, relevant/lazy asset loading and a low-quality mode as scale requires. Avoid per-agent physics for decorative traffic. Manage idle and hidden-tab work and decouple visual animation from simulation stepping.

## Milestones and scope

1. **Electricity vertical slice:** a small coherent district with substation, hospital, telecom tower and delivery hub; pan/zoom/selection, visible outage and backup behavior, delivery degradation, interventions, time controls, event log and reliable tests/build. Preserve the existing waterworks and residences while adding missing entities.
2. **Reliable causal engine:** explainable graph effects, relevant capacity/demand/inventory and reserves, constrained interventions, deterministic updates, snapshots, rewind and branch comparison.
3. **Original neon city polish:** reference-aligned modular art, denser coherent streets and blocks, varied buildings, lighting, vehicles and responsive state changes, with unobtrusive UI.
4. **Investigation gameplay:** hidden-cause cases, discoverable evidence, causal reasoning, recovery strategy, outcomes and Resilience Reports.
5. **Mobile and delivery readiness:** quality controls, profiling, portrait/landscape and real-device QA, onboarding and playtests; review any deployment separately.

Perfect the first electricity experience before expanding to other disruptions. Six eventual districts (downtown, medical, industrial, logistics, residential, technology), 25-35 selectable locations and 80-120 meaningful entities are aspirations, not first-slice requirements. Simultaneous disruptions and shareable deterministic seeds are optional later scope. Local persistence is intended; public deployment requires explicit authorization.

## Acceptance and review discipline

Preserve working functionality. Build complete, testable logical changes; run relevant tests and the production build. Validate the appearance on actual desktop/mobile screenshots and validate performance through measurement. Do not label missing modes, replay, traffic or reports as complete merely because supporting code exists.

CODEX_TASK.md authorizes automatic tested Conventional Commits and pushes to origin/main in reedhan-g/Ctrl-Z after every completed logical milestone, superseding the earlier review pause. Review staged files and verify each push. Never force-push, rewrite history or include secrets, dependencies, caches or build output. Do not change repository visibility or deploy publicly without separate authorization.

GitHub Pages clarification: the creator explicitly authorizes preserving the existing .github/workflows/static.yml deployment on every push to main, with workflow_dispatch also available. Do not disable its push trigger or add a duplicate deployment workflow. ci.yml is testing/build only. This supersedes earlier no-deployment wording for this existing Pages setup; repository visibility remains unchanged.

## Expanded city priority

CODEX_EXPANDED_CITY.md now requires a finite, persistent expanded Meridian, initially 40x40 world tiles (four times each old map axis), explored through the existing fixed responsive window. Land and real districts move under a bounded 2D camera; the page never grows to world dimensions. A functional minimap is mandatory: shared projected geography, real service status/selection markers, actual viewport footprint, pointer recenter/drag, keyboard alternatives and mobile expand/collapse. Camera-aware culling must preserve offscreen entity state. Preserve all original gameplay and v1 saves; new scenery must be clearly distinguished from simulated services. Measure browser behavior before/after without claiming physical-phone FPS.
