# Ctrl Z — Cinematic Scroll-led Landing Page Redesign

## Mission

Redesign **only the Ctrl Z marketing / landing page** around one combined reference direction:

- **Jake Roberts (Framer):** smooth native-feeling scrolling, confident full-viewport sections, powerful typography, intentional transitions, precise Swiss/editorial spacing and subtle interaction detail.
  Reference: https://www.framer.com/marketplace/templates/jake-roberts/
- **Young Minds (Aura):** near-black cinematic visual language, off-white oversized headline, very sparse navigation, muted monochrome metadata, restrained analog / film texture, and significant negative space.
  Reference: https://www.aura.build/templates/cinematic-portfolio-80

The result should be an original, premium **interactive film-like introduction** to the existing Ctrl Z game. Take design inspiration, not source code or unlicensed fonts/assets. Do not attempt a pixel-for-pixel replica.

This brief supersedes earlier landing-only stylistic guidance where conflicting. Preserve the actual gameplay interface and city artwork exactly.

## Review before changes

1. Read `AGENTS.md`, `PROJECT_BRIEF.md`, `PROJECT_VISION.md`, `DESIGN.md`, `docs/landing-page/REVIEW.md` and current source.
2. Inspect `src/Landing.tsx`, `src/landing.css`, `src/BlackoutPreview.tsx` and associated preview styles/assets. The site already has a working scroll-driven blackout reveal; **refine it, do not blindly rebuild it**.
3. Review the latest homepage screenshot at desktop, tablet and phone widths. Create a brief plan identifying what is preserved versus replaced.
4. Use installed design skills where applicable, but treat this brief as the final authority when generic guidance conflicts with the two selected references.

## Visual language — Young Minds as art direction

- Background: near-black `#090909` with very subtle alternative near-black surfaces such as `#101112`. No prominent teal panels, card grids or cyberpunk UI chrome in the landing page.
- Typography: striking off-white `#F2F1EE`, secondary silver `#A5A5A3`, tertiary `#666769`; use the existing local Manrope family (or another legitimately available existing local font) and achieve drama through weight, scale, spacing, alignment and contrast.
- Accent: primarily **white/black/gray**. Allow one sparing cyan interaction to bridge into the existing game, but do not use cyan as the dominant landing-page CTA/panel color. The game itself keeps its approved teal/gold/neon system.
- Oversized clean uppercase display text. Tiny mono-style high-contrast support labels (e.g. `FIELD REPORT / 001`, `MERIDIAN — 00:00`, `SCROLL TO CONTINUE`). Labels are supportive, not clutter.
- Use thin charcoal divider rules and powerful negative space. Minimal film grain/analog texture only if it genuinely improves the feel: CSS-based, low opacity, never reduce text contrast and never add a heavy canvas effect.
- No meaningless numbers, fabricated live statistics, fake awards or stock imagery. Use **actual existing screenshots of Meridian**.

## Interaction language — Jake Roberts as motion reference

- Scrolling should feel deliberate, exceptionally smooth, and fluid. Use browser-native scroll behavior and progressive enhancement, not forced scroll-jacking or wheel interception.
- Use subtle scroll-linked transforms: headlines drifting at a different rate than supporting copy, section introductions revealed as they enter view, and carefully paced pinned/sticky moments.
- Preserve keyboard, touch, accessibility and anchor navigation. On reduced-motion devices, all information must be available immediately without motion dependence.
- Use IntersectionObserver, modern CSS scroll timelines where supported, or a minimal requestAnimationFrame scroll-progress calculation. No new runtime dependency unless there is a demonstrated benefit.
- Avoid delayed first paint, fake loader cinematics, excessive blur, 3D transforms, or full-page animations that fight natural input.

## Required scroll story

### 01. First viewport — near-black typographic statement

- Tall, dramatic hero near 90–100svh on desktop, responsive to smaller heights.
- Minimal fixed-or-subtle header with `Ctrl Z` and simple `About / The city / Play` navigation.
- Large white heading: `CTRL Z` with `UNDO THE WORLD.` as the following supporting line. Type should dominate the empty black screen. Do not hide essential accessibility labels.
- Small editorial subtitle: `AN INTERACTIVE INFRASTRUCTURE SIMULATION`.
- One short sentence: `Remove electricity. Watch a city unravel. Rewind the consequences.`
- Clear primary action `Enter simulation` and a small `Scroll to discover` hint.
- The actual city art should **not** fill the hero; allow a tiny cropped teaser only if it supports the cinematic treatment. Put the main media below the fold.
- Intro movement: headline's subtle scroll displacement / perspective-free motion, delicate fade/translate of supporting text. No obnoxious letter-by-letter entrance that slows access.

### 02. Editorial premise — one switch

- After the first scroll, the headline yields to a spacious two-column editorial statement:
  `ONE SWITCH.` / `A CITY OF CONSEQUENCES.`
- Short real-mechanics copy describing hospitals, water, communications and reserve buffers. Typography and spacing carry this section, not icons/cards.
- A tiny section index and hairline rule reference Young Minds' archival feeling.

### 03. Signature city reveal — preserve actual blackout comparison

- Refine the existing `BlackoutPreview` so the screen features a large **actual game capture** with a cinematic framed presentation.
- As the user advances through this section, use a native-scroll-linked, pinned/sticky scene where the powered city transitions into the powerless city.
- A clear `POWER CONNECTED` → `GRID DISCONNECTED` textual indicator updates alongside image progress.
- Use correctly aligned before/after images from the existing repository. No synthetic visual misrepresentation.
- Reveal should be smooth with real browser progress, avoid sudden flicker or layout shift, and should work backwards when scrolling up.
- Keep manual controls / accessible equivalent to move between states without scrolling. Keep the existing preview semantics when practical.
- The blackout is the ONE dominant animation moment; avoid unnecessary competing effects.

### 04. The consequences — scroll-led feature narrative

- Three spacious vertical story beats, inspired by Jake Roberts' project reveal rhythm:
  1. `01 / WHAT FAILS` — dependencies between city systems.
  2. `02 / WHAT YOU CAN SAVE` — two limited interventions and building inspection.
  3. `03 / WHAT YOU CAN UNDO` — rewind, replay and comparison.
- Use oversized headings and concise editorial prose, with occasional actual cropped gameplay evidence if useful. Do not create generic service icon cards.
- At larger widths, a sticky left-side title with advancing right-side content is acceptable; on mobile, simplify to natural vertical flow.

### 05. Final frame — play invitation

- Return to near-total black, giant white concluding line: `WHAT WOULD YOU KEEP RUNNING?`
- Single prominent accessible `ENTER MERIDIAN` action plus quieter `Open full-screen` action.
- Preserve the **existing embedded on-demand game** and the `simulation.html` full-screen route. Keep state/save semantics unchanged.
- Where a click jumps to the embed, allow the user to reach an immediately visible Start control; do not autoload the heavy simulation when viewing only the initial hero.

## Mobile-specific requirements

- Hero typography must remain bold without clipping at 320, 360, 390 and 430 CSS px.
- Scroll sections should feel shorter and less fatiguing than desktop; do not force users through dozens of screens before the play CTA.
- Blackout imagery must remain visually legible at mobile sizes. Use the already available mobile captures when suitable.
- All buttons and switches must have comfortable tap targets and be reachable without overlapping content.
- No hover-only functionality, scroll locks, frozen sticky regions, horizontal overflow, or excessive paint cost.
- Test embedded and full-screen game entry on mobile without altering the game itself.

## Non-negotiable protection

Do not modify `simulation.html`, `src/App.tsx`, city rendering or atlases, camera, vehicles, minimap, building positions/highlights, simulation dependencies, scoring, report, investigation, replays, saves or GitHub Pages configuration except for a narrowly necessary and fully tested compatibility fix.

Keep prior website routes and links working. Do not add new gameplay mechanics, 3D or heavy effects. Do not replace the actual city art with mockups or stock photography.

## Implementation approach and milestones

1. **Audit + style tokens:** inspect current source, preserve working features, adapt landing tokens to the Young Minds aesthetic; screenshot baseline.
2. **Opening + structure:** implement immersive typographic hero and section pacing, maintain clear CTA and anchors; validate keyboard/mobiles.
3. **Scroll motion + blackout:** enhance scroll rhythm and the existing blackout reveal, keep independent accessible before/after control; compare captured states with existing real imagery.
4. **Responsive finish:** polish mobile, reduced motion, high-contrast text, loading behavior and performance.
5. **Validation + checkpoint:** production build, tests including all existing landing/embedded game flows, screenshots at 320/390/768/1280/1440, check actual scroll/touch behavior, commit discrete tested milestones and push to origin/main only if authorized in project instructions.

## Acceptance criteria

- A first-time visitor sees almost entirely black, oversized white title and a clear action above the fold.
- The visual identity follows **Young Minds**, while scrolling behavior and section pacing feel **Jake Roberts-inspired**.
- The city enters naturally as the primary visual reveal below the fold.
- The blackout crossfade responds both ways to scrolling, and is also directly accessible without scrolling.
- No unnecessary neon chrome or generic SaaS card layout appears.
- The playable existing simulation remains unchanged, loads only on demand, and works when embedded or opened full-screen.
- Full responsive tests pass; no reduced-motion or keyboard regression.
- Capture before/after screenshots and state what changed; do not claim physical-device testing if only browser emulation was done.

## Copy-paste Codex instruction

Read `CTRL_Z_JAKE_SCROLL_YOUNG_MINDS_REDESIGN.md` fully and follow it. Review the current homepage and the already-implemented scroll-driven blackout reveal before editing. Make the landing page adopt **Young Minds' near-black monochrome cinematic aesthetic** with **Jake Roberts-inspired smooth scroll storytelling and subtle reveals**, preserving the existing game and its artwork. Use the installed frontend-design, motion and UI-audit skills only when useful. Implement incrementally, visually inspect desktop/mobile screenshots, run regression tests, and commit tested milestones. Do not redesign the gameplay interface.
