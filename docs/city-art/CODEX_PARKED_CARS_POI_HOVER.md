# Ctrl Z — Parked Cars and Landmark Hover Polish

## Priority and scope

**Current task:** Make two focused visual/placement improvements to the existing Ctrl Z city:

1. Park **stationary/decorative cars** neatly along the **side of roads in available curbside space**, rather than in the middle of active streets.
2. Give the six **buildings of interest** a **warm golden glow and brighter appearance on hover**, and make their **building-name labels substantially easier to read**.

Treat this as a **targeted polish pass**, not another full city redesign. Preserve the existing Antahonist Neon City–inspired pixel-art direction, the large scrollable world, minimap, building inspection, and all working simulation systems.

Read `AGENTS.md`, `docs/DEVELOPMENT_STATUS.md`, and the relevant rendering and gameplay files before editing. Check the current working branch and uncommitted work first. Keep existing improvements intact.

## 1. Park stationary cars realistically

### Current issue

Some decorative cars sit in or near the center of streets, even though they are not moving. They look like obstacles in a traffic lane instead of parked vehicles.

### Required result

- Identify **stationary/parked scenery cars** separately from the **three actual moving couriers** and any recently added **ambient moving traffic**.
- Reposition *only parked cars* into genuine **unoccupied curbside parking spaces**, street shoulders, parking bays, or suitable paved areas along road edges.
- Each parked car must be **parallel to its adjacent road** and face the correct isometric street direction. Use the existing direction-specific vehicle sprites; do not put a vehicle sideways across a road.
- Keep parked-car tires on the road/parking surface, not on sidewalks, roofs, landscaped areas, or building footprints.
- Maintain a believable small clearance from the curb and neighboring cars. Leave enough space for moving vehicles to pass.
- **Never obstruct intersections, crosswalks, turning areas, driveways, emergency access, loading-bay entrances, pedestrian paths, or important building entrances.**
- **Do not fill random empty lots with cars** simply to clear the roadway. Only use designated and geometrically valid parking areas.
- Match parking availability and car density to each neighborhood. It is acceptable to **omit a parked car when no valid space is available**.
- Ensure placement derives from actual road geometry (`streetPlan.json` / `roadAt` or its current successor), not hard-coded visual offsets that happen to look correct in one screenshot.
- Preserve depth ordering, culling, world boundaries, zoom, and mobile rendering.
- If necessary, introduce explicit roadside parking-bay/curb geometry that integrates naturally with the existing streets and building layouts.

**Likely files to inspect:** `src/worldArt.ts`, `src/world.ts`, `src/streetPlan.json`, `src/traffic.ts`, `src/vehicleArt.ts`, `src/vehicleAtlas.ts`, `src/CityScene.ts`, and relevant asset-generation scripts. Verify paths against the current repository.

## 2. Golden hover glow for buildings of interest

### Buildings to include

Apply the new effect only to the **six simulated infrastructure / buildings of interest**, using their stable IDs and existing names:

- North substation (`grid`)
- St. Mira Hospital (`hospital`)
- Waterworks (`water`)
- Maple residences (`homes`)
- Meridian telecom (`telecom`)
- East delivery hub (`logistics`)

Do not automatically apply the stronger landmark effect to ordinary decorative scenery buildings.
Buildings of interest should have a subtle, persistent golden glow and slightly brighter illumination even when not hovered over, making them naturally distinguishable from ordinary buildings. On hover, the golden glow should become noticeably stronger and brighter, with smooth transitions while preserving the Neon City pixel-art style.

### Appearance and interaction

- On desktop hover, the hovered landmark should **visibly brighten** and receive a **noticeable but tasteful warm gold / amber outline or glow** that follows its **actual rendered building silhouette**, not a rectangular sprite box or ground-only diamond.
- Preserve the architecture's recognizable teal/pink pixel-art lighting; the golden effect should add emphasis rather than recolor the entire building flat yellow.
- Favor **crisp, pixel-compatible highlight assets or lightweight sprite layering** over expensive full-screen blur/bloom filters. The building should still look like part of the same Neon City scene.
- A slight visual lift/emphasis is acceptable only if it **does not move the building's world coordinates, hitbox, road footprint, or depth alignment**. Do not introduce noticeable scaling that makes buildings overlap roads or neighboring structures.
- The hover effect should appear promptly and disappear when the pointer leaves; avoid flickering at sprite boundaries and during camera pan/zoom.
- Maintain a clear distinction between **hover preview** and **persistent click/tap selection**. Clicking must still select the building and open its inspector; do not regress existing selection outlines, actions, or hover picking.
- When a building is selected, maintain a visible selection state even after hover ends. A selected + hovered state should remain readable rather than stacking excessive glow effects.
- Do not make the golden glow depend on the electricity being online: a landmark must still be discoverable when its own lights are off. Show the real outage/operating status separately.
- Respect `prefers-reduced-motion`; no flashing, pulsing loops, or animation necessary. Keep GPU impact low, including in Low power mode.
- On touch devices, which lack hover, use the **selected/focused** state for equivalent discoverability without introducing phantom hover behavior.

**Likely files to inspect:** `src/CityScene.ts`, `src/pixelArt.ts`, `src/selection.ts`, `src/spriteHit.ts`, `src/City.tsx`, `src/CityScene.ts`, and existing selection/highlight asset pipeline.

## 3. Make building names significantly more visible

The names of important buildings need to be easy to recognize, not washed out or hidden among rooftops and bright signage.

- Improve the **name labels of the six buildings of interest** with larger, appropriately scaled legible text, strong contrast, and clear spacing.
- Prefer a restrained dark translucent plate, contrast outline/shadow, or other pixel-art-compatible treatment to separate letters from the busy scene; use gold/cream or high-contrast off-white text where appropriate.
- On hover or selection, **emphasize the building name** and ensure it is easily readable at ordinary desktop and mobile zoom levels.
- Show a modest always-visible landmark identifier at normal zoom **when it fits without collisions**; use sensible decluttering/priority rules if several labels would overlap. Hovered/selected names take precedence over ordinary labels.
- Keep labels anchored to the correct building and following its camera transform. Position labels **above the relevant building**, avoiding the roof, neighboring facades, inspector, minimap, and timeline as far as practical.
- Preserve existing building names and roles; do not rename facilities or replace labels with generic IDs.
- Ensure text remains clear in both lit and outage states. Keep it sharp at variable device-pixel ratios and zoom settings.
- Make focused/selected landmark names available accessibly to keyboard and screen-reader users where the current UI supports them.

## 4. Preserve existing functionality

Do **not** break or change the intended behavior of:

- Moving couriers and their directional sprites, route motion, dispatch dependencies, pause/resume, replay, and speed controls
- Any ambient moving vehicles recently introduced
- Building click/tap picking, selection and inspector actions
- Real service status, electricity outages, reserve supplies, investigation, dependencies, saves, and reports
- Map exploration, minimap, camera framing, mobile layout and performance
- Existing automatic GitHub Pages deployment on pushes to `main`

Do not turn parked cars into animated vehicles. This task is about placing **stationary cars** correctly, not reversing the recent motion fix.

## 5. Validation and acceptance criteria

Before considering the task complete:

1. **Actually run the game** and inspect several roads and districts at normal gameplay zoom, both desktop and mobile.
2. Verify parked cars are near road edges, appropriately oriented, and never block traffic lanes, crosswalks, junctions, or building access. A car should disappear from a candidate placement if no valid curbside position exists.
3. Confirm moving couriers still move visibly and turn with the correct directional sprites.
4. Hover each of the six landmarks and verify a **bright, clean golden full-silhouette highlight** is visible and disappears on pointer exit.
5. Click/select each landmark and verify the inspector still opens, the selection stays visually clear, and its name is readily legible.
6. Verify mobile tap/focus, low-power behavior, reduced motion, outage lighting, scrolling, zoom and occlusion.
7. Capture **before/after** screenshots of at least one corrected street-parking area and at least three distinct landmarks in normal, hover and selected states. Visually review them, not just DOM/test metadata.
8. Add focused regression tests for roadside parking validity, orientation, hit detection, hover/selection state, and label visibility/decluttering where practical.
9. Run relevant unit/browser checks and `npm run build`. Verify no errors or serious performance regressions.

## 6. Git and reporting workflow

- Implement this as **small, meaningful, tested commits**, ideally one for parked-car placement and one for landmark hover/labels (plus relevant tests when separable).
- Follow the currently authorized `AGENTS.md` rules; use `origin/main` if that remains the approved development destination. Do **not** force-push, reset, or overwrite unrelated work.
- Suggested commit messages:
  - `fix: park decorative cars in valid curbside spaces`
  - `style: add golden landmark hover and readable labels`
- Push each tested milestone and verify the remote commit and CI status.
- Update `docs/DEVELOPMENT_STATUS.md` and `docs/handoff/CODEX_HANDOFF_README.md` with what was actually implemented, screenshots, validation and remaining limitations.

**Success means a player sees realistic curbside-parked cars instead of cars abandoned in driving lanes, and can immediately spot and identify any important facility through a polished golden hover effect and readable label.**
