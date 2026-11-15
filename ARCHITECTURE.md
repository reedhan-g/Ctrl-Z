# Ctrl Z architecture

## Directional vehicles

traffic.ts samples a single deterministic VehiclePose (road tile, projected z=4 point, outgoing segment and world-axis direction). vehiclePosition remains the compatibility wrapper for minimap, camera and picking. Route coordinates, fleet offsets and integrated dispatch/capacity rules are unchanged; orientation is derived from the segment delta, never from screen displacement or the previous frame. At a vertex the outgoing segment owns the heading.

scripts/vehicle_art.py projects original body/cabin/lamp/wheel geometry into four perspectives for each existing courier color. It writes a separate 512x192 vehicle-atlas.png and vehicleAtlas.ts; the full city-art generator invokes it too. Twenty-four 64x64 frames share one nearest-sampled GPU source and a centered (32,40) road-contact origin. vehicleArt.ts swaps frames on retained sprites with no rotation/reflection/filter. Moving sprites cancel the existing pose's four-pixel height at wheel contact; parked Y-axis cars retain their old footprint. Legacy city-atlas car slots remain for atlas-index stability but are no longer used to draw cars.

CityScene caches rounded position plus direction, so a turn updates even within one rounded pixel. Depth uses the same sampled road tile; culling includes the compact frame. The geometry-only test fallback follows the same directions. City publishes actual texture frame/pose diagnostics alongside existing camera/selection diagnostics for browser verification. No direction/camera fields are persisted in v1 experiments and no additional animation ticker is introduced.

## Building inspection and presentation selection

selection_art.py generates selection-atlas.png and compact spriteHitRows.json from original lit/unlit alpha. spriteHit.ts tests opaque rows in painter order, including transparent roof setbacks; geometry remains the no-texture test fallback. CityScene/worldArt retain sprite-aligned highlight children within each building's depth/cull layer. Desktop preview is weaker than persistent selection; no lighting/outline ticker or GPU readback is needed.

BuildingInspector and inspection.ts reuse real state/actions for service conditions, reserves, dependencies and recovery requirements; InspectionShell owns mobile collapse/focus. SceneryInspector/sceneryInfo present informational roles only. selection.ts and the game adapter coordinate exclusive service/scenery selection; scenery IDs live only in navigation.ts, never GameData/replay/save schema. The minimap and accessible SceneryBrowser share those identities. spriteBounds derives visual extents from the same alpha masks. City measures real overlay rectangles after layout; unobstructedViewport/frameInspection fit the whole silhouette in the largest free rectangle. ResizeObserver tracks sheets/minimap/canvas changes; a transient inspection request also handles repeated selection. The finite edge-roof allowance is cleared by Reset; no page or world resizing is used.

## Visible overhaul on main

CODEX_CURRENT_TASK.md now authorizes tested direct main pushes. Runtime architecture is original offline pixel art from city_architecture.py, infrastructure_art.py and lantern_art.py; light_art.py bakes paired architectural illumination. streetPlan.json defines the connected named street segments; world.ts roadAt/chunkRoadMask and minimapGeometry.ts consume the same data. street_art.py provides sixteen cached ground masks with on/off states. worldArt swaps these only when grid power changes, while service frames follow real status/reserves. neighborhoods.ts explicitly composes seventeen civic/Lantern blocks (including two vacated-service infill blocks). City initialization, Reset and minimap Home use the pure frameOpening helper; low-power renderer recreation retains the player's camera. Domain, replay and v1 persistence remain independent and unchanged.

## Continuation contract — 2026-11-14

Approved source baseline: `9fcac4a`. The primary reference is Antahonist Neon City; `design/pixel-city-reference-2.png` is secondary. `docs/NEON_NEIGHBORHOOD_PLAN.md` defines the proposed original-art exemplar and its origin/footprint/entrance/height contract. No new rendering system or third-party kit is integrated in the documentation milestone. Rejected commit-28/29 art, lighting, picking and overview code must not be imported.

Keep the existing 39:20 projection and atlas origin (128,140) for the original-art pilot. Authored placements and new model silhouettes must update geometry, painter order and culling bounds together. If streets later change, ground rendering, minimap and courier routes must consume one shared street definition. The current road-axis implementation remains the baseline until that separate tested milestone.

## Pixel-art pipeline

scripts/build-city-art.py authors original raster architecture and one reusable street texture offline. Committed PNGs and cityModels.ts make Node builds independent of Python/Pillow. pixelArt.ts loads Vite-hashed local assets, sets nearest-neighbor filtering, shares atlas frames and positions sprites using the same projection. City waits for textures before exposing the canvas. CityScene and worldArt retain sprites and swap powered/unpowered textures only on state changes; services follow actual status, scenery follows grid power. Domain/replay/save data do not contain texture or camera fields. The Graphics fallback exists for geometry/scene unit checks; browser checks exercise actual atlas rendering.

world.ts now derives the finite 60x60 bounds/roads/chunks and defines six outer scenery destinations. worldScenery.ts composes non-overlapping street-clear parcels, with explicit destination overrides; minimap markers/navigation share those coordinates. Timeline.tsx measures its actual occupied vertical clearance through ResizeObserver so mobile controls and inspection do not overlap wrapped branch/event content. This adapter only publishes a CSS layout variable, never domain state.

Keep modules separated by responsibility; move files only when an actual dependency or ownership problem warrants it.

| Boundary | Modules | Rule |
| --- | --- | --- |
| Domain and scenario rules | simulation.ts, dependencies.ts | Pure TypeScript; no React, Pixi, DOM or storage dependencies |
| Decisions and history | gameState.ts, replay.ts | Pure transitions; replay decisions by time; retain branches and exact undo checkpoints |
| Evidence and outcomes | investigation.ts, cases.ts, report.ts | Derive evidence and outcomes from domain state; no independent scripted failure timeline |
| State adapter | game.ts | Zustand actions delegate to domain transitions; UI does not mutate snapshots |
| Playback UI | Timeline.tsx | Time, replay and comparison controls; never implement service rules here |
| Inspection and app UI | InvestigationPanel.tsx, App.tsx | Present state and dispatch actions; extract case/inspection/report components as gameplay grows |
| Rendering | City.tsx, CityScene.ts | Lifecycle/input binding versus persistent scene presentation; consume state without advancing simulation |
| Interaction geometry | geometry.ts, camera.ts, keyboard.ts | Shared projection/picking and independently tested input policies |

The deterministic clock (`clock.ts`/`time.ts`), modular city art, cases, reports and persistence adapters are now implemented. Future scenario configuration can be extracted when new rules need it. Keep changes incremental. A worker, generalized ECS, large directory migration or additional state library is not justified by the current six-service model.

The initial extraction puts playback UI in its own component so branch/comparison work can proceed independently of inspection, onboarding and the city shell. Existing controls, accessible names and state transitions remain unchanged. CI will run the dependency-free domain checks and the TypeScript/Vite production build; Playwright remains the browser interaction gate for gameplay milestones.

## Expanded city boundaries

world.ts owns finite land, district/road coordinates and stable chunk descriptors. geometry.ts owns projection and inverse projection. worldCamera.ts bounds the projected viewport using inverse-projected corners, independent of DOM/page scrolling. navigation.ts is a separate camera bridge for the minimap and renderer; it never writes simulation state. World and screen coordinates must cross these shared transforms. The six stable service IDs now occupy road-connected industrial, civic, utility, residential, commercial and logistics districts. Coordinates live in simulation.ts metadata; projection, depth, links, culling and minimap markers derive from them. The v1 experiment schema stores IDs/decisions rather than geography, so old saves require no migration.

worldScenery.ts generates stable scenery identities and bounds separately from simulation entities. worldArt.ts creates original chunk ground and depth-layered scenery once. CityScene.cull toggles retained objects with a safety margin; CityScene.pick tests both service faces and scenery occluders in painter order. No chunk streaming is needed for this measured first expansion.

minimapGeometry.ts caches the same projected districts/roads/landmarks used by the scene and implements footprint grab math. Minimap.tsx retains SVG geography with memoization, reads service state directly, maps pointers through the SVG screen CTM, and sends free-map camera commands through navigation.ts. Foundry/Freight use explicit open-forecourt destination targets; other district centers retain their original targets. Marker pointers are checked against visible symbol bounds to reject native touch retargeting from empty land. Service markers and the desktop chooser invoke the existing select action, sharing sidebar/canvas framing; marker Enter/Space is supported. It does not own a second world renderer or a second simulation graph.

traffic.ts owns a continuous road-aligned route from the relocated hub's east dispatch frontage around the finite world; cumulative dispatch capacity still determines route progress. CityScene exposes the selected courier's rendered position through the separate navigation bridge so its minimap selection follows visual interpolation. Other courier markers derive from the reproducible experiment snapshot. Camera fields are not saved: the unchanged v1 schema resumes existing branches and decisions without a world migration. Culling toggles presentation only; offscreen services still update, report, replay and resume normally.
