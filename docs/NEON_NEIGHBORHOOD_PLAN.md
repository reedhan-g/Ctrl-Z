# Authored Neon City neighborhood plan

Prepared 14 November 2026 against `9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f`. This is a design and implementation plan, not a claim that the new neighborhood is rendered or visually accepted.

## Reference and asset route

Primary: [Neon City: Cyberpunk Pixel Building Kit by Antahonist](https://antahonist.itch.io/neon-city-cyberpunk-pixel-building-kit). Secondary: `design/pixel-city-reference-2.png`. The official banner and local secondary image were opened during this continuation. Mekai Games is not the governing reference. The public banner is retained only in ignored `test-results`, not shipped or committed as game art.

Visual interpretation: dark teal/charcoal masonry, consistent floor modules, stepped roofs, cyan/white glazing, selective warm windows and restrained violet/pink signs. Give lights an architectural source: a window recess, shop fascia, entrance canopy or lamp head. Preserve readable unlit masonry. These are design observations and proposed choices, not promises about a downloaded pack.

No licensed pack or entitlement has been verified locally. The initial route can extend the project's original offline-authored pixel art. If licensed files are supplied instead, inspect `LICENSE.txt`, `manifest.json`, actual PNG pivots and ground definitions before designing an adapter or committing derived assets. The publisher describes 64×32 cells; Ctrl Z currently projects 78×40. Do not stretch purchased sprites independently along each axis or silently change world coordinates to fit them.

## Baseline understanding

`world.ts` owns the 60×60 land, five regions, roads, chunks and six outer destinations. `worldScenery.ts` currently places two parcels per ordinary block using three repeating layout patterns, with destination overrides. `scripts/build-city-art.py` supplies 16 architectural models using broadly shared wall, window and roof routines. This explains much of the repeated silhouette visible in the inspected captures.

`pixelArt.ts` places a 256×256 frame at `iso(x,y) - (128,140)` with nearest sampling. `CityScene.ts` and `worldArt.ts` retain and cull scene objects; service illumination uses actual status, scenery follows the grid. Polygon picks and painter order are shared with building geometry. An art change must update geometry and bounds with the model, rather than independently replacing a sprite.

Gameplay is separate: pure snapshots/dependencies drive reserves and capacity; reducer/replay own deliveries, restoration, exact undo and branches; cases validate time-stamped evidence; reports integrate five service capacities over equal horizons; persistence validates the v1 journal. Three couriers derive road progress from integrated dispatch. Camera/minimap navigation does not enter saves or experiment history. The art milestone must preserve these boundaries and stable service coordinates.

## First composition: Lantern Yard

Use the existing `lantern` destination at `(-20,-20)` as the first authored neighborhood. Its existing minimap navigation makes the exemplar discoverable without changing the opening camera or relocating a service. Begin with its five-tile block, then compose the three neighboring blocks around the `[-16,-15)` road junction. Expand to other districts only after reviewing desktop and mobile renders.

First-block ground plan, in world tiles (proposed new footprints, not existing model dimensions):

| Element | Origin | Footprint | Height / role | Frontage |
| --- | --- | --- | --- | --- |
| Yard House | (-19.65,-19.65) | 1.65×1.50 | 3 floors, approximately 76 px; stepped apartment roof | Door toward the internal court; restrained warm upper windows |
| Lantern Noodles | (-17.65,-19.65) | 1.20×1.50 | 2 floors, approximately 48 px | +x facade toward the east sidewalk; amber fascia |
| Corner café | (-17.65,-17.70) | 1.20×1.25 | 1 floor, approximately 28 px | +x/+y street corner; cyan entrance and short violet blade sign |
| Yard court | (-19.65,-17.70) | 1.65×1.25 | Open paved social space | Bench, planter and a clearly connected entrance path |

The road bands remain `x=[-16,-15)` and `y=[-16,-15)` for the first exemplar. Continuous 0.28-tile sidewalk bands run immediately inside their block edges. Street-facing building edges end at -16.45, keeping doors, awnings and signs behind the curb. A 0.35-tile passage separates the western and eastern building columns; a 0.45-tile passage separates rear buildings from the café/court. Keep these passages visibly paved and useful rather than unexplained gaps. Check actual awning/stair extents as well as masonry footprints.

Place the taller apartment mass behind the low corner café in the isometric view. Roof plant belongs on rear roof edges. Avoid a billboard above every building. The café exposes the junction; the noodles frontage anchors the approach; the court gives the apartment entrance a real destination. Original short signs should read at ordinary zoom, with facade-projected lettering and consistent pixel density.

The next three blocks provide a small repair shop/loading court, a residential frontage and a market arcade. Give each a distinct mass and access purpose. The neighborhood expansion should replace selected repeating streets with an authored local network, including an arterial, a narrower access lane and a pedestrian court. Specify those roads once as shared data for ground art, minimap and routing. The pilot retains baseline roads to isolate the architectural contract; removing city-wide crosshatch repetition is a later milestone, not already accomplished by this plan.

## Alignment and rendering contract

- Preserve `iso(x,y,z) = ((x-y)*39, (x+y)*20-z)` for the original-art pilot. Use a coherent floor interval (24 projected pixels for the exemplar) and integer raster coordinates; allow parapets and equipment above the nominal floor stack.
- Store explicit authored origin, width, depth, height, model and entrance-facing data. Keep scenery IDs stable when replacing an existing parcel at the same origin; document any deliberate identity change. Existing simulated service IDs and positions stay fixed.
- Raster origin, ground contact, model metadata, picking faces and culling bounds must agree. Include signs, balconies, roof machinery and awnings in visual bounds. Keep props clear of doors, crossings and vehicle paths.
- Validate painter order where a taller rear building meets a low foreground shop. Preserve polygon/paint-order picking initially; no rejected per-pixel picker, additive lighting implementation or overview code is imported.
- Use paired powered/unpowered atlas frames with matching pivots. Scenery windows, signs and lamps switch with grid power. Hospital/other service frames continue to follow their own reserve/dependency status. Use existing status text/indicators to distinguish backup from operational power.
- Keep light accents inside shared textures where practical. Add no perpetual flicker loop for this milestone. Preserve zero idle draws under reduced motion, low-power traffic suppression and offscreen culling.

## Small delivery sequence

1. Documentation foundation: preserve the handoff, verify exact local/remote baseline, inspect gameplay/rendering, align reference hierarchy and record this plan. Fresh baseline gate: 67 unit checks, 46 browser specifications, build; all passed during continuation.
2. Architectural exemplar: add the three original models and explicit Lantern Yard placements; update model geometry/bounds and entrance orientation together. Add targeted footprint/road/occlusion checks and inspect normal-zoom desktop/mobile captures before expanding.
3. Neighborhood streets: author the surrounding blocks and purposeful local roads through shared world data. Update minimap geometry and traffic routing together where roads change. Preserve all six service positions and the large map.
4. Core/service composition: carry the reviewed vocabulary into the opening intersection and six landmarks, with operational/backup/offline/restored captures. Avoid multiplying an unreviewed model across the world.
5. District expansion and quality: deliberate distinct blocks, all four edge views, mobile touch and performance regression checks. Commit and verify each small tested checkpoint on `origin/neon-city-antahonist-from-27`. No automatic main integration or branch deployment. Preserve both existing workflows.

## Acceptance evidence

For each art milestone, inspect actual screenshots: normal opening, close frontage/door/sign crop, Lantern Yard and all four districts, selected hospital, outage with hospital still on backup, exhausted backup, restoration, wider overview, mobile opening/inspection and short landscape. New neighborhood captures must be compared directly with the official reference and secondary PNG. Passing tests does not constitute visual acceptance.

Run unit geometry/scenery/scene regressions, relevant browser picking/minimap/gameplay checks and production build. Before delivery, run the full browser suite including both cases, replay, report downloads, v1 save/resume, native pinch and offscreen services. Verify all four map boundaries at ordinary and overview zoom when street/camera changes begin. Keep the existing bounded overview unless a separate tested change is justified.

Record atlas size, visible draw calls and idle work using matched viewports/settings. Baseline continuation recorded 30 drag draw calls and zero measured idle calls in each Chromium project; timings came from concurrent software-rendered checks and are not physical-device FPS. Safari, phone GPU/memory and battery remain unverified.

The first documentation milestone changes no runtime art, roads, gameplay, minimap, camera or workflow. Rejected commits `9a7707f` and `b11256d` supply no implementation or acceptance criteria.
