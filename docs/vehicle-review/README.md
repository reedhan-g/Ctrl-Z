# Directional vehicle review

Original Ctrl Z car artwork, consistent with the existing Antahonist-inspired city. No downloaded/source-pack pixels, runtime raster rotation, mirroring or antialiasing.

The [vehicle atlas](../../src/assets/vehicle-atlas.png) contains amber, cyan and pink rows. Each row contains world X+, X-, Y+, Y- pairs; the first frame of each pair has lit lamps, the second unlit lamps. Body color remains constant. Opposite directions change hood/cabin geometry and visible head/tail lamps while world-space light remains fixed. Wheels are projected in their actual longitudinal/vertical planes.

Rebuild only vehicles with `python scripts/vehicle_art.py`, or use the existing full `python scripts/build-city-art.py` pipeline. Run `python -m unittest discover -s tests/art -p test_vehicle_art.py` for offline raster/provenance consistency; Node builds consume committed PNG/metadata and need no Python/Pillow. The shared origin is (32,40) in each 64x64 frame, centered at road contact. The atlas is 512x192, about 8.82 kB PNG / 0.375 MiB decoded. Loading uses nearest-neighbor sampling.

All parked cars occupy the same Y-axis street footprints as before. Moving sprites now select a direction from their actual world-coordinate route segment. Position, direction, road contact and depth share one pose; turns invalidate the position cache even within the same rounded pixel. Routes, fleet IDs/colors/offsets, dispatch integration, minimap and save schema remain unchanged. Foreground architecture keeps its normal occlusion.

Actual Chromium screenshots below were captured using the existing timeline and courier controls, with restoration recorded at 0h so the normal route can be reviewed throughout the 24h horizon. No route overrides, debug movement controls or altered simulation rules were used. Turn checks cover all route vertices in unit tests and four intersections in desktop/mobile browser tests. Additional browser checks cover all three colors, zoom, pause/resume, speed, recovery, undo, scrubbing and response branch changes.

| Review | World direction | Timeline | Desktop | Mobile |
| --- | --- | --- | --- | --- |
| Freight Square approach | Y+ | 0.25h | [View](desktop-turn-1-before.png) | [View](mobile-turn-1-before.png) |
| Freight Square departure | X- | 0.5h | [View](desktop-turn-1-after.png) | [View](mobile-turn-1-after.png) |
| West arterial approach | Y- | 15h | [View](desktop-turn-3-before.png) | [View](mobile-turn-3-before.png) |
| Eastbound departure | X+ | 16h | [View](desktop-turn-3-after.png) | [View](mobile-turn-3-after.png) |
| Cyan courier | X+ | 15.75h | [View](desktop-cyan.png) | [View](mobile-cyan.png) |
| Pink courier | X+ | 15.75h | [View](desktop-pink.png) | [View](mobile-pink.png) |

The art matches the existing city palette/proportions and uses crisp nearest sampling at default and closer zooms. Final validation: 94 unit checks, two offline artwork checks, production build and all 62 desktop/mobile browser specifications pass. Idle draw count remains zero and the scripted drag records 32 draws on both projects. Physical-device/Safari performance is not established by emulated Chromium captures. Further validation details are recorded in DEVELOPMENT_STATUS.md.
