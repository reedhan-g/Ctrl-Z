# Ctrl Z — Expanded Isometric City & Interactive Minimap

> **Task status:** Current development priority. This is an additive feature specification for the existing Ctrl Z project, not a request to rebuild it. Implement in small, tested milestones.

## 1. Read first and preserve existing work

Before changing code, read and follow the relevant existing files:

- `AGENTS.md` — workflow, Git and safety requirements.
- `PROJECT_VISION.md` — authoritative product vision and approved visual style.
- `PROJECT_BRIEF.md` — product scope and priorities.
- `DEVELOPMENT_STATUS.md` — implemented features and current blockers.
- `CODEX_TASK.md` — previous roadmap (retain it; this task takes priority for now).
- `ARCHITECTURE.md` — module boundaries and implementation decisions.
- `design/pixel-city-reference-2.png` — **primary visual reference**.
- `design/ctrl-z-city-reference.png` — secondary composition reference.

Inspect the current source code, especially the camera, isometric projection, scene rendering, hit testing, simulation, replay, persistence, UI layout and existing tests. If any file or image is unavailable, report that clearly; do not pretend to have inspected it.

Preserve all existing working functionality: electricity, water, telecom and logistics dependencies; the current interactive buildings and couriers; Sandbox and Investigation modes; interventions; timeline branching/undo; Resilience Reports; local saves; accessibility; and low-power mode. Do not discard unrelated uncommitted edits.

## 2. Main objective: a larger real city viewed through a fixed window

Expand Meridian into a **significantly larger, finite, persistent, freely explorable 2D isometric city**. The actual land/world should be substantially larger than the visible viewport.

**The main game viewport must remain the same responsive size within the website.** The page or canvas container must not grow to the dimensions of the world.

When the player pans horizontally or vertically:

- The land, roads, buildings, vehicles and scenery move relative to the camera.
- New **real map sections** enter the visible viewport while older sections leave at the opposite edges.
- The viewport stays fixed and clips offscreen content.
- The city remains one coherent world, rather than a looping background, repeated visual trick or static image.
- Simulation state for an entity persists even after that entity moves out of view.

Aim initially for roughly **4× the current map width and 4× the current map height** (about 16× the explorable land area), adjusting the size if real performance measurements and useful city density justify a smaller or larger first milestone. These are targets, not a mandate to create vast empty terrain.

Use deterministic world coordinates and structured city data. Separate **world coordinates**, **isometric projection**, **camera transforms** and **screen coordinates**. Make scene framing independent of browser page scrolling.

## 3. City districts and art direction

Design an interconnected, urban-feeling city with distinguishable yet cohesive districts, such as:

- Residential neighborhoods and apartment blocks.
- Commercial streets, stores and offices.
- Medical and emergency-service areas.
- Industrial and municipal utilities.
- Transport corridors, logistics facilities and transit connections.

Connect these areas with continuous roads, intersections, sidewalks and purposeful infrastructure. The city must look dense and varied, not like a sparse grid of copied blocks. Add distinctive silhouettes, rooftops, signs, pedestrian/vehicle details, landmarks and functional infrastructure. Avoid creating decorative infrastructure that misleads players about the actual dependency model.

**Approved visual direction:** dark neon cyberpunk isometric city with **moderate, handcrafted pixel-art influence**. Use crisp edges, coherent geometry and a controlled palette of charcoal/deep navy, cyan, magenta/purple and warm yellow. Keep the UI clean, compact and contemporary. The visual should resemble a polished independent simulation game, **not** generic smooth AI concept art, photorealistic 3D or an oversaturated dashboard. The two reference images are guidance, not runtime backgrounds to flatten into a noninteractive map.

Preserve the six existing service locations and three interactive couriers. Add new simulation-connected entities only when the rules and investigations can account for them. Distinguish simulated entities from purely decorative world objects.

## 4. Camera controls and navigation

Implement accurate, bounded two-dimensional panning over the expanded world:

- Desktop mouse drag pans the city freely along both screen axes.
- Mobile one-finger drag pans; two-finger pinch zoom remains supported.
- Mouse wheel zoom, existing zoom buttons and Reset View remain functional.
- Where useful, support horizontal/vertical trackpad navigation without breaking the established wheel-to-zoom contract; explicitly choose and document a coherent input mapping rather than overloading the same gesture ambiguously.
- Allow keyboard-accessible alternatives to navigate between important locations.
- Clamp camera bounds according to projected world extents, viewport dimensions and zoom. Avoid exposing blank land beyond the map edges or trapping users at restrictive bounds.
- Keep entity selection and hit testing accurate after pan, pinch, zoom and animated camera recentering.
- Never treat a drag or pinch as an accidental click/tap on a building.
- Allow regular document scrolling **outside** the interactive viewport.
- If the camera automatically frames a selected entity, keep it visible and unobstructed by context panels, including on narrow screens.

Use smooth, restrained camera transitions where appropriate; honor `prefers-reduced-motion` and provide an immediate/reduced-motion alternative.

## 5. Required interactive minimap

A **fully functional minimap is mandatory**, not optional decoration.

### Display

- Place a compact, readable minimap overlay in a corner of the **main city viewport**, positioned clear of the timeline, inspection sheet, zoom buttons and other important actions.
- Show a simplified yet **geographically accurate representation of the full finite city**: districts, major road network, key landmarks and infrastructure.
- Distinguish the power substation, hospital, waterworks, telecom facility and logistics hub with legible markers. Indicate the selected entity.
- Show major disruptions and degraded service states using data-driven status markers; do not rely on color alone.
- Draw the **actual currently visible camera footprint** as an outlined rectangle or polygon, using a projection-consistent mapping. The indicator must update as the camera pans and zooms.
- Keep text and line work readable at desktop and mobile sizes.

### Interaction

- Clicking/tapping a minimap location **recenters the main camera** on the corresponding world point, while respecting camera bounds.
- Dragging the visible camera-footprint indicator navigates the main world reliably.
- A minimap interaction must not accidentally click the world behind the minimap, drag the browser page or trigger map entity selection.
- Allow an **expand/collapse control** on mobile and preserve a usable touch-target size. The expanded minimap must not permanently cover gameplay.
- Provide accessible labels, focus indicators and keyboard controls or landmark-navigation alternatives.
- Markers and camera indicator must stay accurate after viewport resizing, zooming, selecting entities and switching modes.

### Implementation/performance

- Compute minimap positions from shared world/projection data; do not maintain an unrelated hand-drawn layout that can become misaligned.
- Render simplified cached paths/shapes and update only when necessary; avoid rendering the full detailed city a second time.
- Prefer deriving building status directly from the existing simulation state.
- Do not recreate minimap graphics or all city assets on every animation frame.

## 6. Rendering and mobile performance

- Clip rendered content to the fixed viewport.
- Implement camera-aware culling of offscreen world decoration and buildings, with a safety margin to prevent visible pop-in during movement.
- Use structured chunks or chunk-based loading/unloading **if profiling or the expanded world size warrants it**; avoid unnecessary architecture for its own sake.
- Preserve entity identity, interactive state and simulation activity even while offscreen.
- Avoid flicker, blank edges, abrupt geometry changes, redundant resource creation and excessive Pixi draw calls.
- Keep the slightly pixel-art look crisp across device pixel ratios and zoom levels; use appropriate scaling/texture sampling for assets.
- Preserve low-power mode and reduced-motion behavior. Where appropriate, cap background animation and viewport work on mobile.
- Keep the viewport layout responsive without introducing horizontal page overflow.

Measure and document browser performance before/after the expansion. Do not claim physical-device FPS or battery results unless actually measured on devices.

## 7. Simulation and gameplay integration

The expanded environment must be a meaningful simulation space, not a decorative infinite-looking backdrop.

- Keep system dependencies, recovery mechanics, evidence, time-indexed replay/branching, saving and reports logically consistent.
- Represent new infrastructure in shared domain/world data where it has gameplay consequences.
- Ensure failures affect all relevant entities regardless of whether their district is visible.
- Make outage indicators, road/vehicle changes and minimap markers reflect **real** state rather than independent scripted appearances.
- Keep visuals and camera state decoupled from simulation time so panning does not change outcomes.
- Maintain deterministic replay and safe persistence when entity/world structures grow; introduce save migration/versioning if necessary rather than silently invalidating saves.

## 8. Implementation plan and acceptance criteria

Start by inspecting the existing code and documenting a concise incremental plan; then implement it. Suggested milestones:

1. **World geometry and camera:** add the finite expanded world, viewport clipping, reliable pan/zoom and camera bounds. Verify old controls and selection still work.
2. **Dense district layout:** build coherent roads, landmarks and varied original pixel-inspired modular assets without breaking simulation state.
3. **Performance:** add camera-aware culling/caching and validate low-power behavior for the larger map.
4. **Minimap rendering:** accurately depict the full world, landmarks and current viewport footprint.
5. **Minimap interaction:** click/tap recenter, drag footprint, responsive expand/collapse and accessibility.
6. **Gameplay integration and polish:** map service markers, world-correct vehicle movement, inspection framing, replay/persistence stability and mobile usability.

**Acceptance tests must include:**

- Fixed viewport dimensions while revealing different world locations by panning in both axes.
- Correct world boundaries at minimum and maximum zoom, across desktop and mobile viewports.
- Correct selection/picking and no tap/drag confusion after pan and zoom.
- No blank world edges or obvious seams when moving across district boundaries.
- Accurate minimap landmark positions and viewport footprint at different zooms and browser sizes.
- Minimap recentering and dragging that move the camera to the intended location.
- Minimap touch behavior without blocking game controls or causing page overflow.
- Continued simulation, replay, case evidence, reporting and saved experiments when relevant entities are offscreen.
- No unnecessary idle rendering, with low-power mode and reduced motion respected.
- All relevant unit tests, Playwright desktop/mobile browser checks and the production build pass.

## 9. Documentation, commits and deployment

- Update `PROJECT_VISION.md` to include the larger persistent city, fixed viewport, camera navigation and **required minimap**.
- Update `DEVELOPMENT_STATUS.md` after each completed milestone with specific implemented features, validation results, limitations and next steps.
- Update `ARCHITECTURE.md` if the world/camera/minimap module boundaries change significantly.
- Preserve `CODEX_TASK.md` and the existing Git history.
- Follow the user's existing authorization in `AGENTS.md`: **commit and push each successfully completed, tested logical milestone** using descriptive Conventional Commit messages. Verify each push; request command approval when required.
- Preserve the existing `.github/workflows/static.yml` automatic GitHub Pages deployment on `main`, including `workflow_dispatch`. Do not replace it, disable its push trigger or create a duplicate deployment workflow.
- Preserve the separate CI testing workflow. Never force-push, rewrite history, delete unrelated work, expose secrets, change repository visibility or deploy to an additional public service without permission.

## 10. Definition of done

The feature is complete when Ctrl Z has a **genuinely larger, persistent, dense neon pixel-art-influenced isometric city**, navigable in both screen directions inside a **fixed-size viewing window**, with a **working, accurate, interactive minimap** and no regressions in the current simulation and mobile experience.

Do not satisfy this request by resizing the entire webpage, adding a repeating background, stretching the existing district, displaying a static map image, or implementing a decorative minimap with fake controls.

At completion, report the tested milestones, commit hashes, GitHub push results, deployment result if available, remaining limitations and recommended next tasks.
