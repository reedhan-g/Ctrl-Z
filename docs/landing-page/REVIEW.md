# Editorial landing-page review

2026-11-16. Scope: homepage and presentation of the unchanged playable simulation. The creator confirmed embedded play below the content and code-first development.

## Independent finish review

Shipped Impeccable finish reviewer, fresh context, disposition: **ship**. No material fixes. All nine required captures were valid: resting homepage at 320, 390, 768, 1280 and 1440 CSS-pixel widths, focused powered-off preview on desktop/mobile, and active embedded game on desktop/mobile. No approved comp or QUALITY BAR card exists for this explicitly code-led, brief-pinned build.

Reviewer findings: typography/material/ground, opening, story, preview interaction, embedded play and pinned form match the direction contract. Mobile stacking is a valid responsive adaptation. The restrained typography, generous separation, honest gameplay evidence and isolation of the existing game should be preserved. This verdict covers the inspected homepage and wrapper; it does not redesign or certify physical-device behavior of the protected game.

## Validation

- Baseline and implementation: 100 unit tests and production build pass.
- Landing-specific gate: nine passes, one intentional duplicate mobile viewport-matrix skip. Covers preview keyboard/pressed state, skip-link, reduced motion, no initial simulation load, entry/home/full-screen flow, saved experiments, direct anchor and explicit start control, plus 320/768/1440 layout bounds.
- Full 90-case browser gate: 89 passed in 11.5 minutes, one deliberate duplicate mobile matrix skip. Includes the embedded minimap/inspection assertions and all existing gameplay, vehicle, rendering-idle, investigation, replay, save, report, touch/camera and minimap coverage. Benchmarks retain zero idle draws and 32 desktop / 30 mobile scripted-drag draws (emulated software GPU, not hardware FPS).
- Source hook scans and one explicit detect pass returned no deterministic design issues. No second detector is needed.
- Foreground contrast on graphite/raised graphite: off-white 16.09/14.62, muted copy 8.83/8.02, cyan 11.39/10.35. The cyan CTA uses graphite text.
- Build emits separate landing and simulation CSS/JS entries. Landing-specific JS is approximately 7.25 kB (2.56 kB gzip), plus shared React runtime. No new package dependency. PNG previews load lazily and use mobile sources; the city renderer and simulation load only when requested.

## Screenshot evidence

| State | Desktop | Mobile |
| --- | --- | --- |
| Resting homepage | [1280px](review/desktop.png) | [390px](review/mobile.png) |
| Power-removed preview and keyboard focus | [Desktop](review/desktop-blackout.png) | [Mobile](review/mobile-blackout.png) |
| Active embedded game after pause/save | [Desktop](review/desktop-embedded.png) | [Mobile](review/mobile-embedded.png) |

Additional full-page layout captures: [320px](review/user-320.png), [768px](review/user-768.png), [1440px](review/user-1440.png). These are the nine captures the independent reviewer assessed. Standard emulated viewports were 1280x720 and 390x664; the explicit matrix used 900px height. Full-page image height includes all editorial content. Mobile DPR is 3; screenshot pixel dimensions differ from CSS viewport dimensions. Embedded captures intentionally retain the game's inner scroll position after saving; they are not opening views.

## Provenance and limits

Actual captured game imagery is documented in src/assets/previews/PROVENANCE.md. Original city art and all previous references remain intact. The font and OFL are documented in src/assets/fonts; public/licenses retains the license in built output. No generated city mockup, imported reference pack, invented award, metric or testimonial was added.

Chromium desktop and mobile emulation are tested, not physical iOS/Android/Safari, battery or memory. The embedded game uses its existing scrolling behavior; Open full-screen remains available. Unsaved game state retains existing reload/navigation semantics; Save experiment/Resume saved retains the same browser slot and version.

## Published verification

Runtime commit: 5dd71931ec762cbf6e941071bf8adf9209791a49, verified on origin/main. Both [CI](https://github.com/reedhan-g/Ctrl-Z/actions/runs/43813326844) and [Pages deployment](https://github.com/reedhan-g/Ctrl-Z/actions/runs/43813326830) succeeded. The existing workflow and its main push trigger remain unchanged.

Actual https://reedhan-g.github.io/Ctrl-Z/ passed the homepage, preview, keyboard/reduced-motion, direct anchor/start, guided experiment and existing blackout/inspection/intervention/replay checks on desktop/mobile. Thirteen cases were validated through eleven passes in the initial network-enabled run and two passing focused navigation follow-ups (31.3s); the single duplicate mobile matrix was intentionally skipped. Final homepage capture checks passed twice more in 6.8s.

The first attempt was blocked by the network sandbox before loading any page. Authorized networking resolved that. The longer remote flows subsequently encountered total-test deadlines, one HTTP 503 and an atlas request still pending at the default five-second assertion deadline. A temporary configuration derived from playwright.config.ts disabled the local server, set the published base URL and used remote-only timeout 120000 / expect timeout 20000. The two navigation follow-ups then passed with all original expected outcomes. Local defaults, test assertions and production source remained unchanged; this is not a cold-start performance claim. Temporary config/traces remain ignored under .impeccable/review.

The following actual published captures were opened and visually verified:

| State | Desktop | Mobile |
| --- | --- | --- |
| Homepage | [Desktop](deployed/desktop.png) | [Mobile](deployed/mobile.png) |
| Power-removed preview | [Desktop](deployed/desktop-blackout.png) | [Mobile](deployed/mobile-blackout.png) |
| Embedded hospital inspection after pause/save | [Desktop](deployed/desktop-embedded.png) | [Mobile](deployed/mobile-embedded.png) |

The runtime is unchanged by the documentation/evidence checkpoint containing this receipt. No requested implementation remains unfinished. Future work should follow creator feedback and retain the protected game.
