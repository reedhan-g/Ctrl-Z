Fix these two navigation and map-layout problems in Ctrl Z **before continuing any other visual redesign or gameplay expansion**.

### Fix 1 — Center selected buildings properly

Currently, selecting a building from the left sidebar positions it toward the upper-left of the visible game area.

I identified the likely cause in `src/worldCamera.ts`: `frameInspection()` deliberately uses a desktop target of approximately `34%` viewport width and `38%` viewport height.

Change this behavior:

- When selecting any building from the sidebar, center it within the **usable, unobstructed city viewport**.
- Account for the minimap, building inspector, timeline and other overlays when determining the usable viewing area.
- The selected building should appear approximately in the center of the available viewing space, not noticeably toward the upper-left.
- Frame the building's actual visual silhouette, accounting for its height, not just its ground coordinates.
- Ensure the building remains clearly visible while the inspector is open.
- Apply consistent framing to selections made from the sidebar, minimap and directly on the map.
- On mobile, center the building in the area remaining above the inspection sheet.
- Preserve smooth camera movement, zoom controls and map boundaries.
- Do not resolve this by resizing the viewport or moving the entire webpage.

### Fix 2 — Spread important buildings throughout the city

Currently, the six simulated buildings are clustered around coordinates `(0–6, 0–6)` in `src/simulation.ts`, while the world extends from `-25` to `35`.

This makes almost the entire larger map decorative, defeating the purpose of exploration.

**Distribute the six important buildings across geographically appropriate districts of the 60×60 world.**

Use a believable town layout:

- **North substation:** Electrical/industrial infrastructure area.
- **St. Mira Hospital:** Civic or medical district with road access.
- **Waterworks:** Municipal utility district.
- **Maple residences:** Residential neighborhood.
- **Meridian telecom:** Commercial/communications district.
- **East delivery hub:** Logistics or transport district.

Requirements:

1. Distribute these buildings across different parts of the map, with meaningful travel distance between some locations.
2. Avoid placing all six near the center or pushing them into inaccessible extreme corners.
3. Preserve their distinctive Neon City architecture.
4. Align each building correctly with the road network, sidewalks and neighboring structures.
5. Ensure there are no overlapping buildings, blocked entrances or misplaced scenery.
6. Update all relevant map coordinates, minimap markers, dependency lines, picking geometry, camera navigation, vehicle paths and road connections.
7. Ensure selecting any building from the left sidebar automatically takes the camera to its new location and centers it correctly.
8. Keep the underlying simulation behavior and dependency relationships unchanged.
9. Preserve stable building IDs and compatibility with existing saves, investigations and replay data.

### Implementation

Inspect `src/worldCamera.ts`, `src/City.tsx`, `src/simulation.ts`, `src/world.ts`, `src/streetPlan.json`, `src/worldScenery.ts`, `src/CityScene.ts`, `src/Minimap.tsx`, `src/minimapGeometry.ts`, `src/traffic.ts` and relevant tests.

Implement in two separate, tested commits:

1. `fix: center selected buildings within unobstructed viewport`
2. `fix: distribute infrastructure landmarks across city districts`

Add tests verifying camera centering and navigation to all six locations on desktop and mobile.

Capture screenshots showing several selected buildings at their new locations, with the inspector open.

Run the existing tests and production build. Preserve the current visual style, selection highlight, inspector, gameplay and deployment setup.

Commit and push the completed fixes directly to `origin/main` as authorized.

**Important: Do not start another major city redesign. Complete these two corrections first, verify they work visually, and report the results.**
