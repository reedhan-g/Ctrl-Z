# Ctrl Z — Exact Animated Preview Match + Efficient Codex Finish Pass

**Type:** Targeted reference-matching and performance/UX optimization task — **not a new redesign**\
**Project:** `C:\Ctrl Z` / `reedhan-g/Ctrl-Z`\
**Reference (primary):** `CTRL_Z_ANIMATED_PREVIEW.html` at repository root\
**Specification (secondary):** `docs/landing-page/CTRL_Z_ANIMATED_LANDING_PAGE.md`\
**Current website:** `https://reedhan-g.github.io/Ctrl-Z/`\
**Standalone game:** `https://reedhan-g.github.io/Ctrl-Z/simulation.html`

## Your assignment

Make the **existing React/Vite Ctrl Z homepage** an **as-close-as-technically-possible visual and motion replica** of `CTRL_Z_ANIMATED_PREVIEW.html`. Preserve the specific typography, composition, graphics, section proportions, animations, transitions, responsive behavior, and interaction rhythms in that file. **Do not invent another design or choose a loosely inspired aesthetic.**

The codebase has ALREADY implemented most of this. **Audit before editing. Reuse and refine working code; do not start over.** In particular, the existing implementation already includes:

- Oversized `CTRL Z` / outlined `THE` hero and moving orbit/circuit SVG.
- Animated ticker and a dependency network.
- City-focused, matched powered/blackout gameplay captures and a reversible scroll reveal.
- Three consequence beats and a final `ENTER MERIDIAN` action.
- A direct full-screen game route and optional lazy embedded game.

**Priority is closing measurable reference gaps, not adding more features or generating planning prose.**

## Current baseline and evidence — verify before starting

When this task was written, `origin/main` was at `f793f37c` (`chore: exclude the immutable landing reference from audits`), with green unit/build and Pages workflows. **Do not assume this SHA is still current**: fetch and inspect actual HEAD, Git status, differences from upstream, and latest browser captures.

The repository already contains screenshots of the reference and implementation:

| Scene | Standalone HTML reference | Existing React implementation |
| --- | --- | --- |
| Desktop opening | `docs/landing-page/animated/reference/desktop-opening.png` | `docs/landing-page/animated/final/opening-1440.png` |
| Mobile opening | `docs/landing-page/animated/reference/mobile-opening.png` | `docs/landing-page/animated/final/opening-390.png` |
| Desktop infrastructure diagram | `docs/landing-page/animated/reference/desktop-network.png` | `docs/landing-page/animated/final/page-1440.png` (section crop) |
| Desktop city reveal | `docs/landing-page/animated/reference/desktop-city.png` | `docs/landing-page/animated/final/blackout-powered-1440.png` |
| Mobile city reveal | `docs/landing-page/animated/reference/mobile-city.png` | `docs/landing-page/animated/final/blackout-powered-390.png` |
| Complete pages | `docs/landing-page/animated/reference/desktop-page.png` and `mobile-page.png` | `docs/landing-page/animated/final/page-1440.png` and `page-390.png` |
| Reference closing | `docs/landing-page/animated/reference/desktop-closing.png` and `mobile-closing.png` | `docs/landing-page/animated/final/closing-1440.png` and `closing-390.png` |

**Open the actual images**, don't merely compare filenames. Inspect `CTRL_Z_ANIMATED_PREVIEW.html`'s HTML, CSS, JavaScript, keyframes, breakpoints and component dimensions. Use the standalone reference in a browser at the same viewport and scroll state as the current site. Compare still images **and movement**, not just a screenshot.

## Required fidelity improvements (in priority order)

### A. Hero — match reference geometry and impact

1. Compare the reference and current first viewport at **1440×900 and 390×844**. Current implementation is close, but its desktop **CTRL Z wordmark is noticeably smaller / positioned differently** than the reference, and the small `MERIDIAN / ...` identifier has moved below the main description rather than sitting **above the wordmark** as in the original reference. Restore the reference's hierarchy and approximate bounding boxes while preserving responsive fit.
2. Match the preview's **font appearance, font-weight, line-height, tracking, headline scale and exact text line breaks**. The HTML uses Arial/Helvetica for primary type; current app uses Manrope. Font choice may be changed **for the landing only** when needed to achieve close visual equivalence; do not globally replace fonts in `simulation.html` or the game. No external proprietary fonts.
3. Match black `#08090a`, off-white `#f3f3ef`, subdued gray, and the **fine mint circuitry**. Keep the large headline legible above the orbits: graph behind text, no text obscuring or clipping.
4. Align right-side orbit ring center, radius, diagonal paths, glowing dots, low-intensity pointer light, and parallax travel with the reference. Avoid oversized extra ornamentation.
5. Align the description, `WITNESS THE BLACKOUT` action, `SCROLL TO DISCOVER` hint, arrows, and vertical spacing so that the complete first-view experience matches the standalone HTML on short desktop, phone and landscape.
6. Preserve the existing **Pause motion / Resume motion** affordance and keyboard focus, but position it discreetly so it does not compete with the reference's hero composition. A static reduced-motion screenshot is not proof that the full animations work: test both preferences.

### B. Ticker / animated infrastructure network

1. Match the reference's ticker **height, speed, spacing, repeated phrases, glyph rhythm, thin edges** and seamless continuous loop. It must never leave a blank gap; pause or become static under reduced-motion/save-data/offscreen/hidden states.
2. Match the reference diagram's dark technical-grid background, subtle dashed flowing connections, cyan nodes, border and header/footer layout. **However, keep the current six real service nodes and truthful dependency edges** instead of reverting to the simplified four-node illustrative reference. This is an intentional functional improvement, not a visual defect.
3. Match reference density, node typography and precise alignment at desktop/tablet/mobile. Nodes, captions and lines must remain legible; nothing may bleed outside containers.
4. Do not present a static schematic as live telemetry; retain an honest label and current accessible text alternative.

### C. Cinematic city blackout — highest-impact scene

1. The preview includes a dominant **wide city scene**. The current app has **better clean, HUD-free, matched real-game city captures** in `src/assets/previews/city-powered*.png` and `city-blackout*.png`. **Preserve them** rather than restoring the old screenshot's minimap, headers or controls. This is another intentional improvement on the raw HTML reference.
2. Match the original's **large cinematic frame, aspect ratio, viewport dominance, centered crop, black surround, small visual-feed label, status display, manual ON/OFF switch, and scroll progress indicator**. Desktop frame currently appears more compact than the reference; check exact side-by-side geometry and increase its impact where safe.
3. Restore subtle graphical finishing touches from the reference where currently absent: a faint vignette, carefully constrained moving scan, thin frame-corner lines and **one restrained transient blackout flash** near the transition midpoint. Keep the flash extremely low opacity; no seizure-inducing/strobing effect; disable in reduced motion.
4. Scroll down should smoothly transition power on → power off; scrolling back should reverse it accurately. Preserve **manual button override**, reset behavior on leaving/reentering, touch, keyboard and reduced motion. Support full-blackout and full-powered stable endpoints (no rounding glitches, partially lit stuck state or flicker).
5. Pin/hold the scene only when the entire controls and caption fit the viewport. On short-height, mobile or zoomed screens, scroll normally instead of obscuring controls.
6. Keep the imagery sharp in nearest-neighbor pixel art; no blurry postprocessing, fabricated city imagery or runtime game-state changes.

### D. Story / ending — exact narrative rhythm

1. Match the reference's **three consequence rows**: title size, row separators, mono indexes, entrance distance/duration (subtle ~350–700 ms) and generous vertical pacing. No extra paragraphs, cards or new content.
2. Match the large closing line breaks, circular ring/orbit background, quiet accompanying text and decisive single `ENTER MERIDIAN` CTA. Preserve existing direct link to `./simulation.html`; the HTML reference's behavior is the guide but the production route is authoritative.
3. Preserve `Play embedded on this page` as a **secondary, collapsed, lazy** option for existing users, without giving it a second large competing marketing section.
4. On phone, keep all content readable, first-screen action visible, and final full-screen play link prominent.

### E. Motion fidelity and efficiency

Match the **actual reference keyframes, easing, relative timing, and scroll progression** where visually meaningful:

- Moving circuit dash offsets and counter-rotating ring orbits.
- Pulsing signal nodes and subtle pointer-responsive hero glow.
- Gentle hero drift as the visitor scrolls.
- Seamless kinetic ticker.
- Dashed animated network paths.
- Deliberate heading/row entrances.
- Sticky city powered→blackout crossfade with brief soft flash, progress rail and status changes.
- Slow breathing orbit on the final scene.

Use lightweight CSS/SVG and the existing scheduled `requestAnimationFrame` / `IntersectionObserver` architecture. **No new Three.js/GSAP/Framer Motion dependency unless an existing implementation demonstrably cannot reproduce an essential feature.** Keep React renders out of per-scroll animation loops; prefer transforms and opacity, pause continuous effects when invisible or the document is hidden; respect `prefers-reduced-motion`, touch and save-data where appropriate. Keep the landing-only JS/CSS small, city images responsive and the game lazy-loaded.

## Protected boundaries — non-negotiable

- Do **not** edit or refactor the PixiJS game renderer, simulation physics, buildings, vehicles, camera, minimap, scenario rules, inspector, replay/rewind, saves or gameplay UI.
- Do **not** alter `simulation.html` or the GitHub Pages hosting arrangement unless required to fix a proven broken navigation regression.
- Preserve `AGENTS.md` and scope instructions, existing unrelated user files, Git state and installed design skills. **Do not overwrite `CTRL_Z_ANIMATED_PREVIEW.html`; it is the immutable comparison reference.**
- Never replace the actual city with generated art, stock images or licensed sprites. Do not fake test results or call documentation proof of browser behavior.
- Keep the competition deployment/claim workflow out of scope.

## Efficient implementation workflow — reduce Codex time and usage without compromising quality

**Do not execute another broad, multi-hour, five-milestone rebuild.** Work as an incremental reference-match pass:

1. **Audit once (short):** fetch HEAD, read `AGENTS.md`, `CTRL_Z_ANIMATED_PREVIEW.html`, `docs/landing-page/CTRL_Z_ANIMATED_LANDING_PAGE.md` and only the relevant landing source components. Read the existing `docs/landing-page/ANIMATED_PLAN.md` / latest documented tests. Identify what already matches. Record a concise **mismatch list ordered by visual impact** (avoid duplicating plans).
2. **Baseline once:** render reference HTML and current landing at the same desktop/mobile dimensions and corresponding scroll positions. Save a small comparison contact sheet or paired screenshots for hero, network, powered/halfway/blackout city and closing. Prefer reusing valid existing reference captures rather than regenerating them repeatedly. Test with **motion enabled** as well as reduced-motion.
3. **Fix the top 3–5 visible mismatches** one area at a time (hero, city, network/story). Make the smallest edits needed. No speculative rewrite, no new broad framework, no repeated content rewrites.
4. **Fast inner loop:** for CSS-only changes, use hot reload and one relevant browser screenshot. For JS/interaction changes, run the affected focused Playwright spec plus a visual check. Run `tsc`/Vite build **once per meaningful completed checkpoint**, not after every tiny CSS tweak. Do not invoke the same test suite multiple times without a changed source or a diagnosed flaky reason.
5. **Once at the end:** run unit tests, production build, landing/blackout/entry responsive browser tests, and a compact smoke test of the standalone game/save/full-screen link. Use existing established timeouts for cold GPU startup rather than masking failures with arbitrary skips. Avoid a full unrelated browser suite unless a protected file was modified or a regression suggests it is necessary. Treat CI on the push as an additional check.
6. **Visual QA:** confirm viewport widths **320, 390, 768, 1440** plus **844×390 short landscape**. Check the opening, infrastructure network, powered / ~50% / blackout scene, closing, focus states, reduced motion and manual switch. Compare against `docs/landing-page/animated/reference/*`; retain the two deliberate production improvements (accurate dependency graph and HUD-free city). No horizontal scroll, clipped heading, obscured CTA or inert button.
7. **Git checkpoint:** after each **tested and complete** logical area, create one descriptive commit. Push to `origin/main` as previously authorized. Don't create excessive cosmetic commits or push partially broken work. Reuse existing results for unchanged code. If the usage limit approaches, commit tested work and append precise remaining mismatch/progress notes to `docs/DEVELOPMENT_STATUS.md` so a later `codex resume --last` can continue without repeating tasks.
8. **Finish:** report the exact files changed, side-by-side before/after evidence, which reference differences were fixed, what remains deliberately different, tests run (including any failures), final commit SHA, CI/Pages status and published URL. Don't announce a pixel-perfect result without corresponding comparison evidence.

### Definition of done

- It is immediately recognizable as the **same design** as `CTRL_Z_ANIMATED_PREVIEW.html` at desktop and mobile, not merely a similar theme.
- Top-level layout, type scale, spacing, animation timing and interactive behavior match the reference closely within accessibility, performance and protected-game constraints.
- The improved, truthful **six-system diagram** and **actual HUD-free city** remain.
- All reference interactions work in both directions; page is smooth and usable on phone and desktop, with meaningful reduced-motion support.
- Landing tests, production build, unit checks and full-screen entry pass; no game functionality is lost.
- The work is finished **within this task** without another unconstrained redesign cycle.

**Start now. Do not ask for the reference URL; the HTML and comparative screenshots already exist locally in this repository.**
