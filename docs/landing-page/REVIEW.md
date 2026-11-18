# Ctrl Z landing-page review

## Cinematic redesign — 18 November 2026

CTRL_Z_JAKE_SCROLL_YOUNG_MINDS_REDESIGN.md replaces the previous compact homepage direction. Frontend Design and Impeccable informed the code-first **Meridian, interrupted** system: near-black ground, oversized local Manrope, white controls and sparse navigation. The native-scroll story moves through a full-viewport opening, two-column premise, real city interruption, three consequence beats and the final invitation. The city remains below the opening; the existing game still loads only on request.

The existing aligned captures now dissolve through opacity in a bounded sticky scene. The complete stage must fit the visual viewport before it pins; short/zoomed screens retain ordinary scrolling. Reverse scroll, direct/repeated preview links, manual priority, keyboard/touch alternatives and instant reduced motion remain tested. Only the opening headline/copy drift and two already-visible introductions accompany this dominant interaction. No wheel interception, loader, heavy effect or runtime dependency was added.

### Current validation

- Production TypeScript/Vite build and 100 unit checks pass. Landing JS is 12.46kB / 4.20kB gzip, CSS 11.61kB / 3.02kB gzip. The previous completed landing was 10.87kB / 3.80kB gzip JS; these are bundle measurements, not a field-performance score.
- All 25 distinct landing/blackout/motion/embedded-save/full-screen cases pass (1.0m), three deliberate duplicate skips. The final landscape correction also passes 15 interaction/editorial/responsive cases (25.7s), one duplicate skip. The complete opening action and single-line title are measured at every matrix width; an earlier partial-viewport assertion was strengthened.
- Actual [published Pages](https://reedhan-g.github.io/Ctrl-Z/) verification passes 19 cases, one duplicate skip (5.7m): native reveal/reversal, touch/keyboard/manual/reduced motion, game entry, embedded inspection/minimap/save, full-screen/home navigation and direct anchors. Remote networking uses the existing ignored 120s scenario /20s assertion configuration. Local repeated cold game/navigation uses the separately tested 120s scenario /15s canvas budget from 76b61be; all other assertions remain intact.
- Additional unchanged game/minimap/persistence/performance regression: the initial 14-case run had eight passes and six mobile startup/navigation/time-limit failures (5.0m). Five of those six pass with the original assertions/limits in an isolated follow-up (4.9m). The mobile canvas/camera case times out locally again, including its final isolated attempt, but passes against the actual production build (2.2m) with the existing remote configuration. Thus 13/14 are validated locally and the remaining case on production; this is not a single clean 14-case local run. Initial/follow-up traces remain in ignored review storage. No protected game code or test assertions were changed for these follow-ups.
- Runtime f873746 is pushed and remote-verified. [CI 44237906102](https://github.com/reedhan-g/Ctrl-Z/actions/runs/44237906102) and [Pages 44237906096](https://github.com/reedhan-g/Ctrl-Z/actions/runs/44237906096) succeeded.

### Visual evidence and protected scope

Actual browser screenshots were opened at 320/360/390/430/768/1280/1440 and 844×390, with all powered/halfway/blackout/manual/reduced-motion states on desktop and phone. Evidence: [baseline](cinematic/before/page-1440.png), [desktop](cinematic/responsive/page-1440-900.png), [phone](cinematic/responsive/page-390-844.png), [landscape](cinematic/responsive/page-844-390.png), [published desktop](cinematic/deployed/desktop-page.png), [published phone](cinematic/deployed/mobile-page.png), [published halfway](cinematic/deployed/desktop-halfway.png) and [published mobile inspector](cinematic/deployed/mobile-embedded.png). The sibling directories retain the complete reviewed matrices/states. These are Chromium desktop/mobile emulation, not physical-device or Safari testing.

The fresh Impeccable reviewer inspected all 20 supplied viewport/state captures, matched every visual/behavioral contract promise and found no material runtime correction. Its sole `fix`, stale design-system persistence, is resolved by DESIGN.md and .impeccable/design.json at 4e0f5e4. The verdict pass scores that fix resolved, disposition `ship` at fix-list scope. The shipped documenter validates canonical sections, 11 source colors, 17 font roles, seven specimens, token references and schema-v2 narrative/extensions. One explicit consolidated detector scan has no primary findings and 24 advisory rows for intentional new type/corners/hover values; these are captured by the refreshed documentation, without a second detector run. The narrow shared Consolas exception records the brief's requested local support-label font fallback; it adds no downloaded font.

Against 429c1a2, runtime source changes are restricted to Landing, landing.css, BlackoutPreview, useBlackoutReveal and the new useLandingMotion hook, plus the homepage theme color. No game source/style, simulation.html, renderer/camera/atlas, vehicle/minimap/domain/save/replay or workflow changed. Production game hashes remain simulation-DVUPtH0j.js, City-DcboKiRo.js and simulation-6iVPjC5g.css. The separately checkpointed Embarko compatibility profile remains intact; its stopped claim/authentication workflow was not resumed.

Jake Roberts' live reference was inspected for hierarchy/spacing. Young Minds' public preview remained on a loader, so its exact palette/type/composition supplied by the creator governs; no claim of a complete live-template inspection or pixel match is made. No template art, code or fonts were imported. The original actual-game capture files and provenance remain unchanged. Remaining external verification: physical phones and Safari.

## Historical review — 17 November 2026

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
