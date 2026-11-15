# Ctrl Z UI overhaul review

The active brief is CODEX_CTRL_Z_UI_OVERHAUL.md. The approved city baseline is 6cb71f8. All atlas assets, map rendering, roads, service coordinates, labels/gold effects, camera math, courier routes, simulation/replay/save modules and both GitHub workflows remain unchanged. UI container dimensions and measured overlays adapt around that map.

## Completed checkpoints

- 8d4beb4: console tokens, brand/live header, plain-language premise, one electricity CTA, clearer control hierarchy. Build and six gameplay/review cases passed; CI/Pages succeeded.
- 8ed65c0: six real system statuses and logistics capacity, navigation through existing selection, readable elapsed time/transport/event feedback. Six systems/replay/review checks and build passed; CI/Pages succeeded.
- e2ed567: purpose/condition/action-first inspection, readable metrics/disabled reasons, startup and save feedback. Six inspector/quality/review checks and build passed; CI/Pages succeeded.
- 427bf3f: phone-first compact mode/action row, horizontal six-service strip, map before secondary tools, native slider with expandable timeline details and independently scrolling sheets. Twelve targeted browser cases and build passed; CI/Pages succeeded.
- Final guide/polish checkpoint: manually opened from How to Play; Skip, Close, Next and replay are available. Progress follows real blackout, facility selection and intervention. No automatic outage, timer progression, save migration, experiment reset, or recurring onboarding prompt. Desktop/mobile guide and combined-overlay checks pass. Final hosted receipt follows the runtime push.

## Real screenshot comparison

These are actual rendered Chromium captures, including mobile emulation. Before captures use the original approved baseline. All state changes come from normal game controls.

| State | Desktop before | Desktop after | Mobile before | Mobile after |
| --- | --- | --- | --- | --- |
| Opening | [View](before/desktop-opening.png) | [View](final/desktop-opening.png) | [View](before/mobile-opening.png) | [View](final/mobile-opening.png) |
| Blackout | [View](before/desktop-blackout.png) | [View](final/desktop-blackout.png) | [View](before/mobile-blackout.png) | [View](final/mobile-blackout.png) |
| Hospital expanded | [View](before/desktop-hospital.png) | [View](final/desktop-hospital.png) | [View](before/mobile-hospital.png) | [View](final/mobile-hospital.png) |
| Delivery hub expanded | [View](before/desktop-logistics.png) | [View](final/desktop-logistics.png) | [View](before/mobile-logistics.png) | [View](final/mobile-logistics.png) |
| Active timeline | [View](before/desktop-timeline.png) | [View](final/desktop-timeline.png) | [View](before/mobile-timeline.png) | [View](final/mobile-timeline.png) |
| Restored response | [View](before/desktop-restored.png) | [View](final/desktop-restored.png) | [View](before/mobile-restored.png) | [View](final/mobile-restored.png) |
| Undo/replay | [View](before/desktop-replay.png) | [View](final/desktop-replay.png) | [View](before/mobile-replay.png) | [View](final/mobile-replay.png) |

[Desktop guide](final/desktop-guide-complete.png) / [mobile guide](final/mobile-guide-complete.png).

Intermediate reviewed captures remain in shell/, systems/, inspection/ and mobile/. Opening checks cover widths 320, 360, 375, 390, 430, 768, 1366 and 1440; landscape is exercised by the existing 844x390 browser case. The mobile project uses Chromium emulation, not a physical iPhone or Safari.

The short-phone inspection stage has a 620px minimum (760px when full timeline and inspection are open together) because tall approved sprites cannot fit a shorter clear region at the existing minimum zoom. This is an explicit UI-overlap accommodation, preserving camera calculations and art. The ordinary phone opening shows the map and primary action immediately; secondary report/save/scenery tools follow the stage. System cards scroll horizontally and retain full accessible facility names. Detailed branch controls are revealed with Timeline details; the native range remains directly operable.

## Validation

100 unit checks and production build pass. All 80 desktop/mobile browser cases are validated: the full 78-case run passed 75 in 14.1 minutes; all 14 focused follow-ups pass, including two new expanded-timeline/inspection cases. The fixed-click zoom and hidden branch-selector fixtures were corrected while retaining exact centering/outcome assertions. A real two-pixel toolbar clearance issue was fixed; explicit spacing assertions remain.

[Desktop benchmark](desktop-metrics.json) / [mobile benchmark](mobile-metrics.json): zero idle calls, 32/30 scripted-drag draws; ready 3016/1774 ms, drag 3576/3343 ms. Host/cache/software GPU timing varies; these samples do not establish startup improvement or physical-device FPS. Physical Android/iOS/Safari, memory and battery testing remain unverified.

[Desktop combined overlay](final/desktop-expanded-timeline-homes.png) / [mobile combined overlay](final/mobile-expanded-timeline-homes.png). The same strict all-six roof/name framing checks pass with timeline details and inspection open together.

The five implementation milestones are complete. The final runtime push is followed by actual deployed desktop/mobile guide/gameplay verification; its receipt is recorded after the hosted run.
