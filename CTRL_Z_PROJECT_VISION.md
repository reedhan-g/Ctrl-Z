> Historical source, retained for provenance. PROJECT_VISION.md is the current consolidated vision. CODEX_TASK.md makes design/pixel-city-reference-2.png primary and design/ctrl-z-city-reference.png secondary; older reference paths and priorities below are superseded.

# Ctrl Z — Canonical Product Vision

> **Title:** Ctrl Z (never CTRL+Z as the displayed game title)
>
> **Tagline:** Undo the World.
>
> **Core pitch:** An interactive browser game in which players remove infrastructure or technologies from a living fictional city, trace cascading consequences, investigate unexpected failures, intervene with limited resources, and rewind to see alternate outcomes.

## IMPORTANT: Visual direction — approved by the creator

The primary visual reference is **`design/city-reference.png`**. Inspect it directly. It supersedes any earlier AI-generated concept art or generic sci-fi dashboard designs.

The approved direction is a **dense, consistent, handcrafted-looking 2D isometric neon city**, reminiscent of an indie management/strategy game:

- Fixed isometric projection, tightly packed geometric buildings, layered streets, recognizable blocks, intersections, vehicles, transit infrastructure, rooftops and varied skyline.
- Deep navy/charcoal nighttime palette. Cyan/teal luminous windows and architectural accents, warm yellow/orange window and streetlight clusters, occasional restrained red/coral warning tones.
- Crisp geometric edges and deliberate stylization; consistent perspective, modular sprite/atlas vocabulary, legible streets and roofs.
- A cohesive city of real interactive entities, **not** a single static background image, and not a generic AI-generated illustration pasted behind a dashboard.
- Avoid excessive bloom, photorealism, heavy 3D, arbitrary futuristic holograms, random glowing labels, blurry textures, crowded HUDs, oversaturated gradients, and visual inconsistencies.
- The city is the star: minimal unobtrusive UI; context panels only when needed. Buildings should be selectable and highlight subtly.
- The final appearance needs to be judged by comparison with `design/city-reference.png` on actual desktop and mobile screenshots, not merely by passing code tests.

**Implementation:** Prefer PixiJS/Canvas/WebGL-accelerated 2D, layered isometric building sprites, sprite atlases, procedural/tiled roads, selective overlay lighting, visible state changes (window lights out, red warning signals, stopped vehicles, active generators). Build original assets as separate layered entities so the world responds to simulation state. Optimize rendering and load only visible/relevant content. Original reference is for visual direction, not a flattened map to reuse as the complete game.

## Player experience

### First visit

1. Land in a living, animated city called **Meridian**: streets, trains, delivery trucks, hospitals, data center, communications tower, power infrastructure, warehouse district, shops, residents.
2. Minimal, easy-to-understand onboarding and two entries: **Sandbox** and **Investigation**.
3. In Sandbox, choose a system to remove (first playable: electricity). Trigger the disruption and visibly see the city respond in seconds.
4. Advance time with play/pause and a scrubber; examine events at several simulated times.
5. Tap a building or vehicle to focus on it, inspect status, dependencies, reserves and the reason for degradation.
6. Use **Causal Vision / Trace Cause** to illuminate paths through the system dependency graph.
7. Apply interventions, spending limited resources, then **rewind**, branch from an earlier state and compare outcomes.
8. Finish with a clear Resilience Report that can be saved/shared.

### Investigation mode

Start from an observed failure without revealing its cause. The player explores the city and evidence, follows dependency paths, correctly identifies the disruption, chooses a recovery strategy and tests the result. Cases should make players reason; avoid instant one-click answers or merely scripted quiz cards.

## Core simulation — actually causal, not an animation script

- Keep **simulation logic entirely separate from rendering**.
- Use deterministic fixed-step updates and a dependency graph of operational entities.
- Entities have capacity, demand, relevant dependencies, time-limited reserves, fallback systems, health/status, inventory and recovery actions.
- Examples: hospital uses grid power but can switch to generator until fuel expires; telecom equipment may use battery backup; deliveries depend on roads, fuel, dispatch and communication; water pumps need electricity but reservoirs buffer the outage.
- Scenario configuration specifies initial conditions. Reserves, failure delays and services are modeled assumptions displayed transparently, not claims of universal real-world forecasts.
- Removing electricity should propagate through dependents according to rule-based state and elapsed time. Interventions must change the outcome in a reproducible way.
- Keep snapshot/event history for robust rewind, replay and branching timelines. Scrubbing must preserve consistency.
- Avoid impossible simplistic effects: a power outage does not instantly disable every hospital; GPS unavailability does not immediately crash all aircraft; internet failure does not necessarily shut down independent local networks.

## Scenarios

1. **Electricity outage** — initial end-to-end vertical slice. Substation, hospital, telecom tower, delivery hub; lighting changes, backup generator, delivery degradation and interventions.
2. Internet connectivity interruption — offline systems and local backups continue where appropriate.
3. GNSS/satellite-navigation outage — alternate navigation may be available.
4. Digital payment authorization failure — cash/offline alternatives.
5. Municipal water distribution disruption — storage, sanitation and backup pumping.

Future scenarios and simultaneous disruptions are optional; perfect the first scenario before expanding.

## Map and interaction

Target a coherent city with six districts eventually: downtown, medical, industrial, logistics, residential, technology. Roughly 25–35 selectable locations and 80–120 meaningful simulation entities is an aspiration, not a mandate for the first milestone.

- Desktop: mouse drag/pan, wheel to zoom about cursor, tap/click to select, keyboard shortcuts where useful, responsive side panels.
- Mobile browser: tap to select, one-finger drag to pan, pinch to zoom, contextual bottom sheet, large touch targets, no mandatory hover, support portrait and landscape.
- Zoom levels: city overview, district view, building inspection. Selected objects stay visible; camera movement should be smooth and predictable.
- Sparse context UI: current city status, elapsed time, scenario, investigate/repair/rewind buttons. Avoid huge panels covering the city.

## Performance and accessibility

- No full 3D city scene. Use optimized 2D isometric sprites, atlases, frustum culling, detail levels, lazy asset loading, low-quality mode and reduced-motion preference.
- Favor stable responsive interaction on normal Windows laptops and modern Android/iOS browsers; aim for 60 FPS on a typical modern laptop and at least ~30 FPS on a supported midrange phone, subject to real profiling.
- Decouple rendering FPS from simulation time-step; avoid per-agent physics for every visual pedestrian/car.
- Provide fallback/accessible building list, keyboard navigation where feasible, readable contrast, clear status beyond color alone.

## Architecture

- React + Vite + TypeScript for interface.
- PixiJS for isometric graphics; Zustand for shared UI state as appropriate.
- Simulation engine in pure TypeScript; optional Web Worker for heavier calculations.
- GSAP only where needed for focused UI/camera transitions, not excessive effects.
- Local save states via IndexedDB/local storage; shareable deterministic scenario seeds may be added.
- Vitest for simulation unit tests and Playwright for interaction/end-to-end smoke tests.
- Deploy static app to Embarko for competition only when approved. Keep repository and source under the creator's control.

## Roadmap / order of operations

**Milestone 1 — playable vertical slice:** Create a small actual isometric district containing substation, hospital, telecom tower and delivery hub. Working pan/zoom, click selection, time controls, electricity removal, backups, event log and reliable build/tests.

**Milestone 2 — reliable causal engine:** Graph dependencies, capacity, reserves, interventions, snapshots/rewind, deterministic tests, explainable impacts.

**Milestone 3 — polish original neon city:** Modular art aligned with reference, windows/streetlights, responsive animations, believable vehicles, coherent districts and careful HUD.

**Milestone 4 — investigation gameplay:** Root-cause tracing, evidence, cases, resource constraints, outcomes and reports.

**Milestone 5 — mobile performance and competition delivery:** Browser QA, optimized assets, onboarding, real playtests, compelling demo, review and deploy.

## Non-negotiable acceptance criteria

- The game is **called Ctrl Z**, with no plus sign in its branding.
- The approved **dark neon isometric reference** outranks previously generated concept art.
- The city contains real independently interactive entities; it cannot be a noninteractive hero image.
- The first outage must be genuinely simulated and respond differently to different recovery actions.
- Mobile is a first-class platform, not a desktop site squeezed into a phone.
- A new user can understand the core mechanic quickly, then discover deeper consequences.
- Build a complete, testable feature before adding more scope; do not silently replace working code.
- The user's GitHub repository remains the source of truth. Test, commit and push completed milestones where authorized and where Git permissions actually permit; never force-push or commit secrets.

## Verification instructions for a coding agent

Before making major changes, read `AGENTS.md`, `PROJECT_BRIEF.md`, `DEVELOPMENT_STATUS.md`, this file and inspect `design/city-reference.png`. Explain any contradictions. Summarize product goals, approved visual style, primary mechanic, first milestone and known limitations, citing file paths. Update documentation to resolve stale `CTRL+Z` naming or old art direction only after reviewing existing implementation. Do not claim to see the image unless it actually exists on disk and can be opened.
## Visual Style Update
Ctrl Z should use a dark neon isometric city style with slight pixel-art influence.
The city should feel like a handcrafted indie simulation game rather than smooth vector art or generic AI-generated concept art.
Primary palette: cyan, pink, purple, warm yellow, dark charcoal streets and buildings.
UI remains modern and clean, while world assets use a lightly pixelated, crisp game-art aesthetic.