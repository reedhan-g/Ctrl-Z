# Ctrl Z — Expanded Pixel-Art City: Visual Overhaul

> **Highest-priority corrective task.** The existing expanded world and minimap work, but the city is too crowded, the individual buildings are hard to read, and the art does not yet match the creator's intended cyberpunk pixel-art style. Fix visual quality and composition without losing the larger explorable world or functioning game systems. This brief supersedes earlier instructions that led to maximizing procedural building count.

## 1. Reference hierarchy — inspect the actual images

1. **PRIMARY / authoritative art reference:** `design/pixel-city-reference-2.png` — the creator's supplied image of an isometric neon pixel-art city. **The entire playable city should consistently look like a larger, explorable interpretation of this image**, not only one showcase street.
2. **SECONDARY / supplementary composition reference:** `design/neon-city-secondary-reference.jpg` — the additional city visual the creator wants included. Use it to support readable composition, visible roads, and urban atmosphere **without overriding the primary image's architecture or pixel-art style**. If this file is not yet present, say so and continue using the primary reference; do not invent its contents.
3. **TERTIARY / earlier world reference:** `design/ctrl-z-city-reference.png` — supplemental isometric-world/road composition guidance only, never a reason to weaken the primary pixel-art direction.

**First open these images and inspect them visually**; filenames alone are not evidence of appearance. Compare real game screenshots against the primary reference repeatedly. All new runtime assets must be original, locally stored, and legitimately usable; do not use either reference image as a flattened game background or copy its exact signs/artwork.

### What the primary image actually establishes

- Strong **pixel-art appearance** in a consistent, oblique isometric projection; buildings have carefully authored silhouettes instead of smooth generic vector prisms.
- **Mid-rise and taller multi-story buildings**, with different building widths, roof shapes, facades, entrances, recessed storefronts and heights.
- **Vivid signage**: vertical neon signs, projecting lightboxes, large illuminated panels, awnings and intricate storefront lettering, all scaled to the buildings.
- **Physical city detail**: roof machinery, railings, fire escapes, balconies, pipes, lampposts, curbs, marked crosswalks, parked/moving vehicles, sidewalks and carefully lit windows.
- A clear **crossroads/street network** visible between buildings; road surfaces provide breathing room despite a dense metropolitan environment.
- Deep black/charcoal/purple architectural masses against controlled **hot pink, cyan, lavender and amber** lighting. Not every edge glows; dark space is essential.
- Buildings remain **individually distinguishable and interesting at normal gameplay zoom**. Not a solid wall of tiny repeated boxes.

## 2. The current problem — fix it, not just the count

The current implementation expanded Meridian to a **finite 40 × 40 world with approximately 248 scenery buildings**, much of it procedurally placed from four basic building variants (`src/worldScenery.ts`, `src/worldArt.ts`, `src/cityArt.ts`). In the current camera view, repeated tall facades overlap, roads are difficult to see and the art is far less detailed than the reference.

**Do not interpret the word "dense" as "fill every available lot with a tower."** Reducing the building count alone will not complete this task; the building designs, spatial composition, default camera, scale and original art assets also require work.

Priority order:

1. Pixel-art visual fidelity and handcrafted architectural quality.
2. Readable roads, intersections, important buildings and attractive default framing.
3. A genuinely larger connected, explorable map.
4. Building quantity, only where it serves the first three goals.

## 3. Make the actual map bigger, while keeping the city visible

- The **world must remain larger than the display** and explorable by panning horizontally and vertically. Increase useful land beyond the current 40 × 40 footprint when it makes sense; **aim for an initial 60 × 60-tile coherent world** if profiling supports it, but do not sacrifice art quality or mobile performance just to hit a number.
- The **gameplay viewport remains fixed in the page layout**. Moving the camera reveals genuinely new terrain while previous terrain disappears at the opposite edge. Do not enlarge the entire webpage, loop a fake background, or allow camera movement beyond actual land.
- **Keep the interactive minimap** accurate as the world expands: real roads and landmarks, camera footprint, click/tap/drag recentering, service-state markers, mobile collapse and keyboard navigation.
- **Readability at default zoom is mandatory.** Do not simply zoom far out to fit more terrain. At the opening view, clearly show a substantial street intersection or recognizable street corridor, several distinct facades, readable storefronts, road markings, and an important landmark. The player should understand the city immediately.
- Provide a practical **overview/zoom-out mode** to navigate districts, but keep ordinary exploration close enough for architectural details to be visible. Scale pixel art crisply and avoid rendering tiny buildings as an unreadable mass.
- Allow players to move to districts via the minimap/landmark controls. Offscreen world and simulation state persists unchanged when panning, zooming, or saving/loading.
- Treat city expansion and density separately: the map can gain many additional *distinct places* without forcing more buildings into the same visible area.

## 4. Recompose the whole city, district by district

- Plan **deliberate streets, sidewalks, intersections, crossings, courtyards, setbacks, service alleys and open sightlines**. Intersections and storefront entrances must remain visible rather than hidden behind over-tall foreground facades.
- Replace repetitive, uniformly spaced towers with **curated city blocks and purposeful parcels**, mixing 2–6 story shops and housing, occasional 7+ story landmarks, and lower utility/industrial structures. Exact heights should serve the reference's composition.
- Use variations in **footprint**, facade depth, roof structures, signage orientation, setbacks, entrances, street-facing walls and window patterns—not just randomized color and height.
- Group buildings into coherent, distinctive areas: neon market/commercial entertainment, apartments, civic/medical, utilities/industry and logistics/transport. All should share the **same primary-reference art style**; district identity comes from believable usage and accents, not switching to a different art style.
- Preserve continuous road connectivity and valid courier travel; display some parked cars or modest traffic without crowding every street.
- Ensure the six simulated service buildings are **findable and distinguishable** from scenery. Important services must not be hidden by decorative foreground towers; preserve correct depth and picking.
- Avoid walls of foreground buildings blocking the useful play area. Consider partial roof or contextual occlusion treatment when a selected building would otherwise be hidden, while retaining authentic isometric depth.
- Prefer fewer thoughtfully crafted building models with meaningful variety over hundreds of repetitive procedural cuboids. Do not enforce an arbitrary scenery count if screenshot quality says otherwise.

## 5. Change the art pipeline if necessary

The requested visual standard is **not** achieved by generic PixiJS `Graphics` blocks plus window dots. Use an appropriate original art workflow, for example reusable pixel-art sprite facades, layered modular building textures, signage atlases, architectural prop sprites and nearest-neighbor texture filtering.

- Maintain a consistent projection, tile scale, edge treatment, light direction and pixel-density vocabulary.
- Author a **small set of excellent original building exemplars first**, compare them with the primary image, and only then extend the language to every district.
- Detail facades with believable doors, windows, neon panels, awnings, ducts, external stairs, roof units, fences and signs; avoid random text, illegible glyph spam, placeholder flat colors or distracting bloom.
- Distinguish stores/apartments/hospitals/telecom/waterworks/logistics by their built form and usage.
- Make roads look intentionally constructed: lanes, intersections, visible crosswalks, sidewalks, curbs, light pools, street furniture and occasional vehicles.
- Preserve outage-reactive lighting: neon, windows and functional infrastructure visibly react to lost power while unpowered buildings remain readable.
- Use original textures/atlases and culling to avoid an excessive GPU cost. The goal is **fewer more meaningful draw calls** and better fidelity, not a larger pile of primitives.
- **Be truthful about fidelity.** If the image cannot be matched closely through code alone, document the remaining asset work and use the best original art achievable; do not declare success on test pass alone.

## 6. Preserve the game and navigation

Do not remove or regress the current functional features:

- Electricity, water, telecom, logistics, outage dependencies, reserve timers and recovery interventions.
- Sandbox and evidence-based Investigation cases, selectable facilities/couriers and causal tracing.
- Time controls, undo, deterministic replay/branching, outcome comparisons, Resilience Reports and local saves.
- Persistent large world, bounded two-axis camera panning, scroll/pinch zoom, hit detection, reset/framing, offscreen culling and low-power mode.
- Interactive minimap and accurate camera/location mapping, desktop/mobile inspection and keyboard accessibility.
- Existing GitHub Pages auto-deployment and separate CI workflow.

Keep world coordinates, camera projection, rendering, screen picking and the underlying simulation separated. Expanding decorative scenery must not silently invent new live simulation entities or falsify the state of infrastructure.

## 7. Work in incremental, verifiable milestones

1. **Audit and document:** inspect the latest source, Git status, primary/secondary reference images, actual live/local desktop and mobile gameplay screenshots, camera/default zoom, scenery counts and measured bottlenecks. Identify exactly why the roads, facades and service buildings are difficult to see.
2. **Readability first:** correct opening camera scale/framing, height hierarchy, foreground occlusion, roads and intersections. Preserve the 40 × 40 world and minimap before attempting further growth. Compare screenshots.
3. **Art exemplars:** create several original, reference-faithful pixel-art buildings and a representative intersection. Use a repeatable sprite/modular asset pipeline where appropriate. Verify at normal zoom and on mobile.
4. **City-wide visual replacement:** redesign all districts using the approved style and composed blocks, including utility landmarks and vehicles. Avoid obvious visual repetition.
5. **Meaningful world enlargement:** extend to a larger useful map (around 60 × 60 if feasible), preserving geography, performance, navigation, service accessibility and minimap accuracy. Add distinct streets and places, not filler.
6. **Polish and QA:** refine signage, architecture, lighting, animation, performance and mobile readability. Review screenshots at opening view, different districts, max zoom-out, nighttime/outage, desktop and portrait mobile.

At each completed milestone:

- Run unit/regression checks, `npm run build` and relevant Chromium/Playwright browser tests.
- Add/adjust tests for camera bounds, minimap navigation, picking through overlapping geometry, culling, responsiveness, saves/replay and lighting.
- **Visually inspect real rendered screenshots against `design/pixel-city-reference-2.png`**. Functional tests cannot certify visual quality.
- Record findings and remaining gaps in `DEVELOPMENT_STATUS.md`; update `PROJECT_VISION.md` to make these corrected priorities authoritative.
- Commit and push the completed, tested milestone to `origin/main`, as already authorized in `AGENTS.md`. Never force-push, rewrite history, discard unrelated changes or change repo visibility. Preserve `.github/workflows/static.yml` automatic deployment.

## 8. Acceptance criteria — do not mark done prematurely

- At the default view a player can immediately distinguish **the roads, one intersection, multiple separate storefronts/buildings, vehicles and an important service landmark** without panning or extreme zoom.
- The **majority of the city**, not just one screenshot-worthy block, uses consistent, clearly recognizable **neon cyberpunk pixel-art architecture and street detail** inspired primarily by the supplied image.
- The world is **meaningfully larger than before**, contains coherent districts and reveals new land naturally during bounded horizontal/vertical camera movement while the viewport remains fixed.
- Minimap, hit testing, camera, mobile touch, simulations, all two investigation cases, replay, reports and saves still work.
- No excessive render churn on mobile; provide measured desktop/emulated-browser performance and disclose if physical phone/Safari testing remains unverified.
- Actual before-and-after screenshots demonstrate improved readability and much closer reference fidelity; do not claim an exact pixel-for-pixel match or misrepresent placeholder art as finished.

**One-sentence mandate:** *Make Ctrl Z feel like a large, explorable, genuinely interactive version of `pixel-city-reference-2.png`: bigger world, visually detailed individual buildings, readable streets and a useful minimap—not a gigantic mass of generic cubes.*
