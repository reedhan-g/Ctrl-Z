# Directional vehicle review

Original Ctrl Z car artwork, consistent with the existing Antahonist-inspired city. No downloaded/source-pack pixels, runtime raster rotation, mirroring or antialiasing.

The [vehicle atlas](../../src/assets/vehicle-atlas.png) contains amber, cyan and pink rows. Each row contains world X+, X-, Y+, Y- pairs; the first frame of each pair has lit lamps, the second unlit lamps. Body color remains constant. Opposite directions change hood/cabin geometry and visible head/tail lamps while world-space light remains fixed. Wheels are projected in their actual longitudinal/vertical planes.

Rebuild only vehicles with `python scripts/vehicle_art.py`, or use the existing full `python scripts/build-city-art.py` pipeline. Run `python -m unittest discover -s tests/art -p test_vehicle_art.py` for offline raster/provenance consistency; Node builds consume committed PNG/metadata and need no Python/Pillow. The shared origin is (32,40) in each 64x64 frame, centered at road contact. The atlas is 512x192, about 8.82 kB PNG / 0.375 MiB decoded. Loading uses nearest-neighbor sampling.

Artwork checkpoint: all parked cars occupy the same Y-axis street footprints as before; desktop/mobile actual opening renders inspected. Two offline art checks, 89 unit checks, production build and six focused browser checks pass. Moving couriers and turn screenshots follow in the route-orientation checkpoint.
