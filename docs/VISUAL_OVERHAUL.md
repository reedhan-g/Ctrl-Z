# City visual overhaul — 2026-11-14

CODEX_CITY_VISUAL_OVERHAUL.md supersedes maximizing scenery count. All three references were opened: pixel-city-reference-2.png is authoritative, neon-city-secondary-reference.jpg supports street composition, ctrl-z-city-reference.png is tertiary world guidance.

## Audit

The 40x40 map puts four 1.65-tile buildings in nearly every five-tile block. Heights reach 160 projected pixels; narrow roads hide behind foreground facades. Tiny window dots and bands repeat. Opening scale is not the principal problem: setbacks, height hierarchy and distinct frontage are missing. The six service coordinates, minimap, bounded camera, domain, replay and saves must remain stable.

Actual opening screenshots are in visual-review/before/. Previous drag measurements: 1553 desktop / 1702 emulated-mobile draw calls, zero idle draws. Software GPU measurements are not phone FPS.

## Plan

1. Recompose the existing 40x40 map: street-facing parcels, setbacks, low foreground silhouettes, intersections and service sightlines. Verify screenshots, picking and navigation before growth.
2. Author pixel-art exemplars with a reproducible local atlas pipeline: shop fronts/awnings, roof machinery, railings, stairs and legible original names. Nearest-neighbor atlas sprites replace primitive piles; include powered/unpowered variants.
3. Apply the language throughout five districts and service landmarks. Refine roads, sidewalks, crossings, street furniture and restrained vehicles. Inspect multiple districts and outage state.
4. Extend useful land toward 60x60 while preserving core geography, connected streets, shared minimap transforms, finite bounds and v1 saves; measure rendering.
5. Full regression/build and screenshot review of opening, districts, overview, selection and outage. Document visual and device gaps; commit/push tested milestones while preserving both workflows.

No reference artwork or exact signage is copied into runtime assets. Dark architectural mass, purposeful cyan/pink/amber light, pixel edges and readable streets take priority over quantity.

## Implemented review

- Readability, commit 8af6813: retained the 40x40 world, opened service approaches and lowered primitive scenery. Before views were captured and opened. Tests/build passed before push.
- Pixel pipeline, commit e1d6ae2: 16 original architectural models and four street/vehicle props, powered/unpowered frame pairs, nearest-neighbor filtering, one reusable street block. All five districts and services use the atlas; the opening scale is closer, without fitting more terrain into the viewport. Doors/glazing, original bitmap sign lettering, posters, awnings, external stairs, roof machinery and service roof features replace window-dot facades. 65 unit checks, build and 16 browser checks passed before push.
- World/polish: 60x60 land, 144 shared street sprites, 284 scenery buildings across three regular parcel layouts and six distinct destination blocks. Lantern Yard/Neon Passage use shop courts; Foundry Court leaves an open works yard; Maple Court combines housing/cafe; Freight Square/Station Court use depot frontage. Roads/couriers/minimap share actual coordinates. No new live service is implied.

QA found and corrected a real small-drag snap-back on the enlarged minimap. Footprint dragging now recognizes sub-four-pixel precision movements; short taps recenter at release. Facade picking now covers the atlas masonry footprint above the plinth. A screenshot test's fixed-viewport assertion was corrected to compare dimensions while allowing normal document scrolling.

Final mobile screenshot inspection also caught partial camera-control overlap with the taller branch timeline. Timeline clearance is now measured, with controls and the scrollable sheet positioned above it. Assertions check the entire control/panel bounds rather than only whether their centers accept clicks. Updated mobile inspection screenshots were opened after the fix.

Actual desktop and mobile opening, four outer districts, broad overview, outage and hospital inspection screenshots are captured by tests/browser/visual-city.spec.ts for manual inspection. Persistent before/after selections are in visual-review/. At normal scale, roads/crossings, facades, awnings and hospital roof remain separated. Outage textures remove neon but retain readable dark architecture. Overview is deliberately a wide navigation view; it is not the normal art scale.

Remaining fidelity: this is original modular pixel art, not an exact reproduction of the reference. More individual roof profiles, richer illustrated signage, pedestrians and bespoke transit/utility props would reduce remaining repetition. The current models share a masonry vocabulary and some roof/window components. Physical Android/iOS/Safari FPS, memory and battery are unmeasured; no phone-performance claim is made.
