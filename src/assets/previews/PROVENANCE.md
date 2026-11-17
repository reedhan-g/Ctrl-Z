# Actual Ctrl Z game previews

## Aligned reveal captures — 17 November 2026

scene-powered.png / scene-blackout.png are real world-region captures at a 1440x900 viewport (1205x792 PNGs, DPR 1). scene-powered-mobile.png / scene-blackout-mobile.png use 390x844 (1170x1773 PNGs, DPR 3). tests/browser/preview-capture.spec.ts captures both states with reduced motion, pauses the outage and seeks to exactly zero. It asserts equal camera pan, zoom, origin and world-region dimensions. Receipts are in docs/landing-page/redesign/before/*-camera.json. All four PNGs were opened and visually checked for identical building/street geometry; the normal status/timeline controls reflect the genuine change in game state. These are unedited browser captures, not generated or recolored art. Original full-interface captures below are preserved.

These PNGs are unedited copies of real Chromium gameplay captures from the approved game at main 0ac6f5a (runtime c0ba5ab). No image generation, third-party city pack, new art or rendering change was used.

| Shipping file | Repository source |
| --- | --- |
| meridian-powered.png | docs/ui-overhaul/deployed/desktop-opening.png |
| meridian-blackout.png | docs/ui-overhaul/final/desktop-blackout.png |
| meridian-powered-mobile.png | docs/ui-overhaul/deployed/mobile-opening.png |
| meridian-blackout-mobile.png | docs/ui-overhaul/final/mobile-blackout.png |

The mobile captures document the actual mobile UI. Power is cut shortly before the second capture; reserves and elapsed time reflect the real simulation rather than an artificial synchronized comparison. The existing city is original project art inspired by Antahonist Neon City and the retained secondary reference; this task adds no licensed reference-pack art. Source images remain intact.
