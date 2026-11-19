# Ctrl Z — Landing Page UI Redesign

**Codex implementation brief · November 17, 2026**

## Mission

Elevate the **public-facing Ctrl Z landing page** from a clean editorial introduction to a distinctive, polished, memorable interactive experience—without redesigning or risking the playable simulation. Optimize for the Embarko Student Challenge's **Work** criteria: the app's visual quality, the originality of its idea, and whether it works on a phone. Make the first impression and product story clear enough to support a compelling short demo video; do not mistake UI polish for fulfilling separate video, reach, or deployment requirements.

**Central idea:** A city is an interconnected system. One interruption triggers consequences. The visitor should experience this concept visually **before** entering the real simulation.

**Signature improvement:** An elegant **scroll-driven blackout reveal** that changes a real screenshot of Meridian from fully powered to electricity disconnected as the viewer moves through the preview section. The effect must feel purposeful, restrained, and technologically polished—not like a gimmick or scroll-jacked animation.

---

## 1. Inspect the current project before editing

Read `AGENTS.md`, `DESIGN.md`, `docs/PROJECT_VISION.md`, `docs/DEVELOPMENT_STATUS.md`, and the current landing-page notes in `docs/landing-page/`. Inspect:

- `src/Landing.tsx`
- `src/landing.css`
- `src/landing-main.tsx`, `index.html`
- `simulation.html` and its lazy/on-demand integration
- `src/assets/previews/` and `src/assets/previews/PROVENANCE.md`
- `tests/browser/landing.spec.ts` and current screenshot/testing infrastructure

Current approved homepage direction (preserve its strengths):

- Minimal **editorial**, not a conventional game-site template.
- Dark graphite background (`#111418`), off-white text (`#eef0eb`), muted cool-grey copy (`#abb5b9`), restrained cyan (`#8bd9d2`).
- Self-hosted **Manrope** typeface, oversized typography, asymmetrical two-column hero, generous whitespace.
- Story sections: **Ctrl Z / Undo the World** → **One switch. A city of consequences.** → **Inside Meridian** → **Follow the connections. Change the outcome.** → **What would you keep running?** → **Play Ctrl Z**.
- Existing *Quiet evening / Power removed* preview toggle uses **actual gameplay screenshots**.
- Embedded simulation loads only after explicit user action; separate **Open full-screen** entry uses `simulation.html`.

Do not blindly replace this layout. Identify what already works and make intentional improvements.

### Skills to consult (only if actually installed)

Use the installed local Codex skills when relevant:

1. `ui-skills-root` — consistent UI craft and design decisions.
2. `frontend-design` — purposeful typography, composition, interaction, originality.
3. `css-motion-systems` — tasteful motion and motion accessibility.
4. `web-design-guidelines` — accessibility and quality review.
5. `landing-page-art-direction` / `ui-ux-pro-max` — optional critique, not conflicting design directives.
6. `vercel-react-best-practices` — performance when needed.

Discover actual skill instructions first. A named but missing skill is **not** a blocker; proceed from this brief and project standards rather than inventing its contents. Do not install arbitrary packages or scripts merely to satisfy a skill mention. Project instructions and this explicit scope override generic template suggestions.

---

## 2. Non-negotiable boundaries

1. **The existing Meridian isometric map is approved. Do not change it.** Do not alter buildings, golden landmark glows, street layouts, lighting, cars, sprite atlases, Pixi rendering, zoom/camera logic or game mechanics.
2. Do not change existing simulation calculations, dependencies, case studies, reports, replay/branches, saves, experiment controls, selections, inspector or minimap.
3. Keep the landing page architecturally isolated from the game: avoid modifying `src/App.tsx`, `src/City.tsx`, `src/CityScene.ts`, `src/style.css`, `src/console.css`, `src/traffic.ts`, or gameplay modules unless an unavoidable, clearly documented integration bug is found. Prefer **zero game-code changes**.
4. Preserve the game entry points (`simulation.html`, embedded iframe and full-screen link), same-origin saves, navigation, direct `#simulation` links, and loading-on-demand. The initial landing page must not eagerly download/start Pixi or the simulation.
5. Reuse **real**, already captured powered/unpowered screenshots; no fake screenshots, invented metrics, testimonials, badges, or implied features. No third-party paid assets copied from visual references.
6. Preserve accessibility, keyboard support, reduced-motion behavior, touch interaction, and reasonable mobile performance.
7. Do not add Embarko logos, badges, or deployment claims that are not verified. Do not add an artificial competition banner as decoration.
8. Avoid generic neon gaming clichés: enormous glowing cards, glassmorphism, fake terminals, random particle fields, 3D gimmicks, giant gradients, excessive motion and unnecessary libraries.

---

## 3. Visual direction — **Editorial, with consequence**

The redesigned landing page should feel like a premium interactive editorial for a systems-thinking game—not a SaaS dashboard or an AI-generated landing-page kit.

### Art direction

- Keep near-black graphite surfaces and excellent typography.
- Use a **small amount of bright cyan** strategically for the main invitation, active states, focus and the moment of power restoration.
- Introduce a restrained **warm amber** only when communicating the power disruption, backup state or a consequence—matching the real game palette. Never plaster it everywhere.
- Let *actual gameplay imagery* provide color, detail and texture; avoid adding decorative city renderings that aren't part of the game.
- Retain asymmetry, quiet negative space, clean alignment, and deliberate breaks in typographic rhythm.
- Use refined interaction states with subtle underline, contrast and transitions; effects should support meaning.

### Improve the first impression

- Make **Ctrl Z** the unmistakable hero wordmark. Keep **Undo the World.** and a short, immediately comprehensible premise.
- The opening should convey **what you do**: remove electricity → see connected services react → intervene → rewind.
- Keep one highly visible **Enter Simulation** CTA. Avoid competing buttons.
- Add a **tasteful visual hint of the city earlier** if it helps the first viewport (for example, a narrow cropped authentic gameplay strip or small, well-composed still adjacent to/below the hero). This must not overpower the typography, turn into a generic full-screen hero, or slow the initial render.
- Avoid excessive vertical emptiness on phones. The user should understand the premise and reach the preview quickly.

### Stronger editorial composition

- Establish a consistent responsive grid, type scale and spacing rhythm.
- Make the transitions between **One switch**, **Inside Meridian**, the feature explanation and the final invitation feel intentionally composed.
- Use purposeful headline breaks and a few bold typographic statements instead of many additional UI elements.
- Refine button alignment, focus rings, captions, section boundaries and end-of-page closure.
- Ensure each section contributes new information. Remove duplicate copy and unnecessary repeated CTAs where they dilute hierarchy, while retaining an obvious entry point.

---

## 4. Signature interaction: scroll-driven blackout reveal

**This is the top-priority new visual interaction.**

### Visitor experience

1. The visitor arrives at **Inside Meridian** and sees a legitimate screenshot of the city fully powered.
2. As they scroll through the preview's natural section, the scene **progressively reveals the power-cut version of that same screenshot**. Lit windows fade/darken, service statuses update, and the overall atmosphere shifts because the *underlying authentic before/after captures* differ.
3. A short accompanying statement such as **“One switch. Every system feels it.”** transitions from **POWER CONNECTED** to **GRID DISCONNECTED** (or equivalent plain language) in sync with the visual reveal.
4. The moment completes naturally without halting, trapping, snapping, pinning a tall scroll region, or hijacking page scrolling.
5. The visitor can still directly choose **Quiet evening** or **Power removed** using the existing accessible buttons.
6. The effect communicates a real simulation consequence, not an invented cinematic state. A caption notes the preview is **actual gameplay capture** and the active experiment is available below.

### Implementation requirements

- Use the **existing paired powered/unpowered screenshots** from `src/assets/previews/` and preserve provenance. Match each pair at equivalent camera/crop/scale. If alignment is imperfect, correct the preview assets using actual browser captures—not imaginary replacements—before shipping a wipe effect.
- Prefer a composited two-image **clip-path reveal**, mask/wipe or subtle crossfade that keeps the screenshots aligned; choose whichever has the clearest and smoothest real-world result. No GPU-intensive shaders.
- Keep reveal progress tied to a limited **natural-scroll progress window** of the preview section; do not use the whole page's scroll percentage. A small amount of scroll should communicate the transition.
- No sticky full-screen scrollytelling panels, forced scrolling, oversized blank spacer, or delayed page controls.
- Use performant rendering (transform/opacity/clip with measured cost), passive scroll observation plus `requestAnimationFrame` if necessary, or a well-supported progressive-enhancement CSS approach. Avoid layout thrashing. Clean up observers/listeners on unmount.
- Keep the existing manual toggle operable with mouse, touch, keyboard and screen readers. **Manual choice wins** over automatic scroll control; when the user presses one of the buttons, do not immediately overwrite that state on the next scroll event. Define a simple, predictable way to return to scroll-controlled behavior (e.g. a reset control only if needed, or revert when the preview is re-entered after leaving the section). Don't add confusing controls if a simpler design works.
- Respect `prefers-reduced-motion: reduce`: disable the animated/progressive reveal and present a stable powered image with accessible manual before/after switching (instant change, no animation).
- Handle screenshots' portrait/landscape variants appropriately. On mobile, do not make a 2,600px-tall image dominate the page; present a useful **framed responsive crop or a controlled-height image** without concealing the essence of the status changes. A tap/manual comparison must remain available.
- Images should have accurate alternative text, relevant captions, reliable layout dimensions, lazy loading and no large layout shifts. Decorative duplicate image layers must not be read twice by screen readers.
- Animate only **preview presentation state**. Never disconnect electricity inside the playable simulation or change its save/replay state just because someone scrolls.
- Verify behavior after changing viewport size, zooming, scrolling up and down, switching tabs, direct navigation to `#preview`, and manual toggle usage.

**Design acceptance:** A judge who scrolls past the preview should instantly understand, without explanatory voiceover, how turning off electricity changes Meridian. It should look like a deliberate design feature rather than a gimmick.

---

## 5. Subtle motion and interaction polish

Use motion only where it adds clarity:

- A small, elegant hero/section entrance reveal (subtle opacity and Y offset at most). Content must remain visible if JavaScript does not run or animation is disabled.
- Refined nav-link underline or contrast interaction.
- Polished but quiet primary CTA hover/press/focus feedback; no floaty, continuous pulse.
- Purposeful change in preview caption and status text during the blackout reveal.
- Optional subtle divider or text emphasis tied to the visitor's arrival at a section.
- Avoid animation loops and perpetual glowing effects on the landing page; the **actual city** already carries the visual energy.
- Maintain visible focus states and never make hover the only way to discover an action.

Make reduced motion a first-class option and validate it in the browser.

---

## 6. Desktop layout

- At **1280px and 1440px**, the hero should be bold and balanced without making visitors scroll past an empty opening.
- Keep the **left-aligned title + offset premise/CTA** arrangement unless screenshot review demonstrates a better editorial alternative.
- Provide a small visual hint of the city without sacrificing the title's dominance.
- Make the screenshot comparison an intentionally designed feature, with legible controls and caption close to the image.
- Increase the visual hierarchy of the single most important action and reduce secondary navigation noise.
- Preserve clear content reading measures and intentional whitespace.
- The playable embed should be easy to find and obvious to start, while the **Open full-screen** link remains accessible.
- Do not bury the CTA beneath excessive explanation.

---

## 7. Mobile-first quality

Treat phone usability as a **primary judging criterion**, not an afterthought.

- Audit **320, 360, 390, 430, 768, 1280 and 1440 CSS-pixel widths**; check portrait/landscape where meaningful.
- On small phones, make the first screen unmistakably identify **Ctrl Z**, state the premise, and offer a prominent tap target to play.
- Reduce unnecessary scrolling by tightening mobile spacings and summarizing repeated prose, but retain the concept and feature story.
- Keep the blackout preview compact and legible; the before/after control must be reachable and easy to tap.
- Use minimum **44×44 CSS-pixel** interactive touch targets and adequate spacing.
- Prevent horizontal overflow, clipped headlines, tiny captions, sticky overlap or unexpected scroll traps.
- The embedded simulation remains useful on mobile, but a clearly visible **Open full-screen** path should be available before the user wrestles with a long embed. Do not automatically force navigation away from the page.
- Preserve mobile camera/pinch/touch behavior inside the untouched game.
- Validate real interactions under emulated touch; physical-device/Safari behavior should be noted as unverified unless actually tested.

---

## 8. Originality and story clarity

The experience should communicate what makes Ctrl Z different:

- It is not merely an electricity toggle or a decorative city website.
- Services are interconnected. Hospitals need power and water, the telecom network affects dispatch, and residents experience downstream failures.
- The visitor has limited emergency resources, can investigate failures, and can **rewind or branch decisions**.
- Express the **cause → consequence → intervention → replay** idea in a concise typographic sequence and the authentic before/after preview.
- Do not overwhelm new visitors with six paragraphs of systems terminology.
- Avoid vague clichés and unsupported claims such as “the world's most realistic simulation.”
- Preserve the game's actual rules; don't imply independent behavior for decorative scenery or functionality that isn't implemented.

---

## 9. Quality, performance and accessibility

- Keep the landing bundle lightweight and code-split from the Pixi game as it is today.
- No large motion library unless native React/CSS cannot meet the quality bar and the measurable cost is justified; try CSS/DOM tools first.
- Prefer local existing assets and self-hosted fonts. Avoid third-party runtime dependencies, tracking scripts and heavyweight embeds.
- Reserve layout space for preview imagery, avoid cumulative layout shift and ensure images load reliably on slower phones.
- Meet WCAG-conscious text contrast, visible focus, semantic headings, skip link and understandable button names/states.
- Support `prefers-reduced-motion`, keyboard-only navigation, mobile touch and screen readers.
- Make interactions graceful in browsers where a progressive scroll animation API is unavailable.
- Do not use a fake interaction overlay that looks clickable but does nothing.

---

## 10. Deliverables and milestones

Implement in **small independently tested commits**, pushing completed, verified checkpoints to `origin/main` under the project's existing authorization. Do not force-push or overwrite unrelated work.

### Milestone A — Audit and design decisions

- Confirm clean Git status and current `main`/remote status; preserve uncommitted changes.
- Read the landing-page implementation, visual review and installed skills.
- Capture current **desktop and mobile** baseline screenshots.
- Record a brief, concrete design plan: what stays, what changes, why.
- Confirm the exact before/after preview assets align sufficiently for a reveal.

### Milestone B — Editorial polish / first viewport

- Improve first-viewport hierarchy, CTA emphasis, spacing and restrained authentic gameplay hint.
- Refine copy and section rhythm without replacing the existing design language.
- Capture screenshot comparisons at 390px and 1440px.
- Commit only once tests and visual review pass.

### Milestone C — Scroll-driven blackout preview

- Implement aligned before/after authentic-image reveal with local progress and direct manual toggle.
- Add status/caption transition and reduced-motion fallback.
- Validate reverse scroll, manual override, keyboard operation, mobile portrait framing, and no gameplay state mutation.
- Capture **powered, halfway reveal, blackout, manual toggle, reduced-motion** views on desktop and mobile.
- Commit only after actual screenshots confirm an obvious, polished blackout effect.

### Milestone D — Mobile and microinteraction finish

- Refine mobile spacing/preview, controls and full-screen gameplay entry.
- Polish hover/press/focus interactions and section transitions.
- Validate 320–1440px viewport matrix, no overflow and no overlapping controls.
- Check reduced motion, touch, keyboard and slower-loading assets.

### Milestone E — Final verification and finish review

- Run unit, browser/Playwright and production build checks (including existing game regression suite).
- Verify direct full-screen simulation, embedded gameplay, `#simulation`, navigation, and saved experiment behavior are unchanged.
- Test deployed GitHub Pages after successful release, not only local Vite.
- Visually inspect **actual** desktop/mobile captures; do not claim completion based solely on passing tests.
- Check load performance; compare landing bundle weight with baseline and avoid regressions.
- Update `DESIGN.md` and `docs/landing-page/REVIEW.md` with concise, factual changes and any remaining limitations. Avoid excessive process documentation.

### Suggested commit sequence

1. `style: refine editorial homepage composition`
2. `feat: add accessible scroll-driven blackout reveal`
3. `style: polish mobile preview and page interactions`
4. `test: verify responsive landing and game entry regression`

Adjust commit boundaries to actual working milestones, but keep them meaningful.

---

## 11. Explicit acceptance criteria

A task is complete **only if**:

- [ ] The homepage still feels minimal/editorial, not a generic neon template.
- [ ] **Ctrl Z**, its premise and **Enter Simulation** are immediately understandable on desktop and mobile.
- [ ] A natural scroll produces a compelling, aligned **powered → blackout** visual reveal using **real game screenshots**.
- [ ] Manual **Quiet evening / Power removed** controls still work, with correct pressed states and accessible semantics.
- [ ] Reduced-motion users see a clear static alternative and can switch states manually.
- [ ] Mobile preview is legible without consuming an unreasonable amount of page height.
- [ ] All CTAs navigate correctly; embedded/full-screen game launches and saves still work.
- [ ] Nothing inside the actual game/city/simulation has been redesigned, reset or inadvertently modified.
- [ ] No fake visual features, unsupported metrics, heavy animations, or misleading claims.
- [ ] The responsive width matrix shows no horizontal overflow, tap obstruction or broken text.
- [ ] Unit tests, browser regression tests, production build and actual screenshot review pass.
- [ ] Completed work is committed and pushed to `origin/main` with no force-push.

---

## 12. Final instruction for Codex

**Implement, do not merely write a concept document.** Begin by auditing the existing landing page and checking installed skill guidance; then ship the scoped visual improvements milestone by milestone. **Make the scroll-driven blackout reveal the signature interaction**, keep it genuinely polished and accessible, and use the approved city as the visual centerpiece. Show before/after desktop/mobile evidence. Preserve everything about the existing playable simulation.
