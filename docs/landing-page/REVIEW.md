# Ctrl Z landing-page review

17 November 2026. UI_REDESIGN.md milestones A–E are complete. Frontend Design and Impeccable refined the existing editorial homepage; the playable game remains protected.

## Result

The stronger text-led opening places the play action before a shallow authentic city glimpse on phones. The signature comparison wipes between camera-aligned real captures over a short natural-scroll window. Connected/interruption/disconnected text follows the image. Manual choices persist until the complete preview leaves view; reduced motion keeps a stable image with instant manual switching. There is no pinned stage, scroll interception, new animation library or game-state mutation.

All landing targets meet 44×44px minimums. Navigation and entry feedback are restrained, the phone preview is bounded, and its status/caption stay grouped. The same-origin game still loads only on explicit entry or #simulation, with the existing full-screen link and saved-experiment flow.

## Validation

- 100 unit tests and the production TypeScript/Vite build pass.
- The complete 104-case browser run finished with 97 passes, two intentional duplicate matrix skips and five timeouts (35.9m). The exact five failed cases passed with `--last-failed --workers=1` (2.7m), retaining all original assertions and time limits. Thus 102 distinct cases are validated across the run and follow-up, rather than a single clean full-run claim. Follow-ups covered desktop systems/vehicle/world and mobile camera selection/embedded save-navigation. Initial traces are retained in ignored review storage.
- All new reveal, responsive, keyboard and reduced-motion cases pass. Widths: 320, 360, 390, 430, 768, 1280, 1440 and 844×390 landscape. Checks cover target bounds/overlap, first-screen entry, reverse scroll, manual re-entry, delayed-image layout stability, resize, emulated visual-viewport zoom, tab return, and no eager game load/storage mutation.
- Actual [published Pages](https://reedhan-g.github.io/Ctrl-Z/) verification: 15 desktop/mobile cases passed, one intentional duplicate skip (1.5m). Includes the reveal, keyboard/touch/manual/reduced motion, embedded minimap/inspection/save, full-screen/home navigation, direct #simulation and explicit start. The temporary remote-only configuration uses 120s test/20s assertion budgets for networking; local tests and production source were unchanged.
- Protected game source/styles, renderer/camera/artwork, vehicles, simulation/replay/saves and workflows have zero diff from e60ae32. The pre-existing Embarko compatibility bootstrap was preserved separately at 9ecd6ce; default game bundle hashes remain identical.

## Design and performance

The fresh Impeccable full review matched the visual contract and found only stale design documentation. The documenter refreshed DESIGN.md and its schema-v2 sidecar; YAML/JSON, component schema and token-reference checks pass. The reviewer scored that sole material fix resolved, disposition **ship** at fix-list scope. Four detector advisories concerned deliberate existing 23/13/17px roles, now documented; there were no primary findings and no second detector run.

Landing-specific JS is 10.87kB / 3.80kB gzip versus the 7.25kB / 2.56kB baseline; CSS is 9.12kB / 2.50kB gzip. No dependency was added. The selected screenshot pair is approximately 510kB desktop / 545kB phone, down from 571kB / 665kB; the opening reuses the powered image. React and the on-demand game remain split. Scroll work batches through requestAnimationFrame and writes a CSS property; React updates only discrete state. Benchmark samples retain zero idle draws and 32/30 desktop/mobile drag draws. These are software-GPU observations, not physical-device FPS or startup-speed claims.

Off-white/muted/cyan contrast on graphite remains 16.09/8.83/11.39; amber is 9.88. Cyan actions use graphite text. Focus is visible, duplicated imagery is decorative, and actual-game provenance/camera receipts remain beside the captures.

## Actual screenshot evidence

Every linked capture below was opened. Full-page views begin at the document top. Reveal states are viewport captures at the actual scroll position, avoiding full-page capture altering progress.

| State | Desktop | Mobile |
| --- | --- | --- |
| Before this task | [Before](redesign/before/desktop.png) | [Before](redesign/before/mobile.png) |
| Published homepage | [1440px](redesign/deployed/desktop.png) | [390px](redesign/deployed/mobile.png) |
| Published halfway reveal | [Halfway](redesign/deployed/desktop-halfway.png) | [Halfway](redesign/deployed/mobile-halfway.png) |
| Published blackout | [Blackout](redesign/deployed/desktop-blackout.png) | [Blackout](redesign/deployed/mobile-blackout.png) |
| Published paused hospital inspection in embed | [Game](redesign/deployed/desktop-embedded.png) | [Game](redesign/deployed/mobile-embedded.png) |

Additional evidence: [all five reveal states on both devices](redesign/reveal/README.md), [complete responsive/resize matrix](redesign/responsive/README.md), [editorial checkpoint](redesign/editorial/desktop.png), and [direction contract](REDESIGN.md).

## Release and limits

Runtime milestones 330d4e5, aba609a and fcc1844 and documentation refresh 5f9fd61 were pushed/verified on origin/main. For the published verification above, [CI](https://github.com/reedhan-g/Ctrl-Z/actions/runs/44114530187) and [Pages](https://github.com/reedhan-g/Ctrl-Z/actions/runs/44114530202) succeeded at 5f9fd61. This final evidence checkpoint changes documentation/captures only; the runtime is identical.

Chromium desktop and emulated touch are tested. Physical iOS/Android/Safari, battery and memory remain unverified. The protected embed retains its existing internal scrolling; Open full-screen remains available before play. The original homepage review remains in Git history and its capture directories are preserved.
