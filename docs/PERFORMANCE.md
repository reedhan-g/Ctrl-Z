# Expanded-city browser measurements

Measured on 2026-11-13 with Playwright Chromium and software GPU, using the same benchmark before and after expansion. Desktop viewport: 1280x720; emulated mobile: 390x664. These are automation timings and WebGL drawElements counts, not FPS, memory, battery or physical-device results.

| Measurement | Original desktop | Expanded desktop | Original mobile | Expanded mobile |
| --- | ---: | ---: | ---: | ---: |
| Navigation to visible canvas (ms) | 2080 | 1587 | 2049 | 1048 |
| Idle draws over 300 ms | 0 | 0 | 0 | 0 |
| Scripted 30-step drag including waits (ms) | 2119 | 2421 | 2164 | 3164 |
| Draw calls during drag | 155 | 1553 | 155 | 1702 |

Raw samples: performance-baseline.json and performance-expanded.json. Run `npm run test:browser -- tests/browser/benchmark.spec.ts --workers=2` to repeat. The benchmark uses reduced motion, a settled canvas, a 300 ms idle window and the same circular mouse path on both projects. Cache state, concurrent workers and software rendering affect timings: lower startup samples do not demonstrate a startup speedup. A later full-suite sample recorded desktop 1691/2510 ms and mobile 2127/3427 ms for ready/drag, with unchanged draw counts.

The new land is 16 times the area, with 248 scenery buildings and 64 ground chunks. Ground/scenery geometry is allocated once; camera culling hides retained objects with a safety margin and preserves identity and simulation state. Idle rendering remains zero, but denser visible geometry increases drag draw calls substantially. Further profiling and batching/texture atlases may be needed on midrange phones. No physical-phone or Safari performance claim is made.

Validation covers low-power resolution/motion suppression, hidden/idle rendering, finite camera corners at zoom extremes, both-axis panning, resize, native pinch, transformed picking, minimap touch/drag/keyboard, offscreen outage/recovery/replay/report/save state and compatibility with a core v1 saved experiment. Screenshot review confirms a denser original neon city; bespoke pixel-art fidelity remains a separate improvement.
