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
