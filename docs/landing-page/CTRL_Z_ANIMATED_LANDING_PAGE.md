# CTRL Z — Motion-Rich Cinematic Landing Page

**Status:** Codex implementation brief  
**Project:** Ctrl Z — Undo the World (`reedhan-g/Ctrl-Z`)  
**Target:** Existing React + TypeScript + Vite landing page, published at `https://reedhan-g.github.io/Ctrl-Z/`  
**Objective:** Implement the **most recent motion-rich interactive landing-page preview** from this conversation as the real homepage. The finished page must feel like a premium interactive digital exhibition about a city's infrastructure, rather than a conventional SaaS page or static portfolio.

> **Critical scope boundary:** This is a **landing-page-only redesign**. The current isometric city, game renderer, buildings, scenery, golden landmarks, animated couriers, gameplay controls, simulation logic, routes, saves and reports are approved. **Do not redesign or regress the game.**

---

## 1. The design concept

Combine three ingredients:

- **Young Minds visual identity:** Near-black canvas, enormous off-white editorial typography, finely controlled white space, restrained monochrome supporting text, purposeful contrast.
- **Jake Roberts-inspired scrolling:** A fluid native scrolling story, oversized kinetic headlines, subtle depth/parallax, sections that arrive with intention, and a few memorable pinned sequences. Take *principles*, not third-party source code or assets.
- **Ctrl Z's own personality:** An animated infrastructure network, graphic dependencies, the beautiful existing pixel-art city, its visually reversible blackout, and a decisive invitation to play.

**The intended emotional sequence:** intrigue → connected systems → mounting tension → city goes dark → choices matter → enter the simulation.

The result should be **noticeably more animated and visually substantial** than the currently deployed cinematic landing page. It should retain a sophisticated editorial quality: purposeful motion and graphics, not decorative effects pasted onto every section.

### Non-negotiable artistic rules

- Keep predominantly **near-black `#08090A` / `#090909`**, off-white `#F3F3EF`, gray `#A9ACAA`, and hairline borders near `#303335`.
- Use muted mint/cyan (`#8CE7D9`) **sparingly for animated network signals, small light sources, focus and interactive states**, not huge glowing UI cards or gradients. A small warm alert color may appear only for the blackout status.
- Retain self-hosted Manrope for the editorial type where available. Use a local monospace stack for little technical labels, indices and status captions.
- Giant headline `CTRL Z`, strong `UNDO THE WORLD.`, uppercase section headings, small archival metadata, generous negative space.
- Original graphic compositions should look engineered, precise and restrained: thin lines, nodes, orbital rings, section dividers, sparse annotations.
- **No stock imagery, no AI-generated replacement city, no unrelated space/galaxy graphics, no template code copied from paid references.** The city shown must come from actual Ctrl Z gameplay.
- Do not make the whole site look like the game's HUD. The landing remains editorial; the **actual game** retains its existing neon-city aesthetic.

---

## 2. Examine the actual project before editing

First:

1. Check the current branch, `git status`, recent commits, and the published result. Respect unrelated untracked skill folders and user work. Do not reset or overwrite uncommitted files.
2. Read `AGENTS.md`, `docs/PROJECT_BRIEF.md`, `docs/PROJECT_VISION.md`, `DESIGN.md`, `docs/DEVELOPMENT_STATUS.md`, `docs/landing-page/CINEMATIC_PLAN.md` and `docs/landing-page/REVIEW.md` **at their actual current paths**. Follow any applicable project instructions.
3. Inspect the current landing source, especially:
   - `src/Landing.tsx`
   - `src/landing.css`
   - `src/BlackoutPreview.tsx`
   - `src/useBlackoutReveal.ts`
   - `src/useLandingMotion.ts`
   - `src/landing-main.tsx`
   - `index.html`, `simulation.html`, and any current landing browser tests
   - `src/assets/previews/` and the provenance notes.
4. Open the existing desktop and mobile captures in `docs/landing-page/cinematic/` as a baseline and inspect the live deployed homepage when practical.
5. Inventory working behavior: direct anchors, keyboard focus, reduce-motion, manual before/after controls, reversible native-scroll blackout, on-demand game iframe, full-screen entry, home-link bridge, local saves and mobile navigation.
6. **Reuse** those working mechanisms. Do not rebuild or replace tested infrastructure simply because this brief proposes a different presentation.

**Resolve conflicts:** This document supersedes **previous landing-page design styling and layout instructions** where they conflict, but **never** supersedes protected game behavior, legal/licensing requirements, reliability or accessibility requirements.

---

## 3. Exact page flow and visual treatments

Implement the following five-part story in this order. Content must be readable before JS enhancements finish loading.

### SECTION A — Animated infrastructure hero

**Purpose:** A visually striking first viewport, mostly black with huge white words and a living schematic behind them.

**Composition:**

- Simple header: `CTRL Z.` at left; `THE CITY` and `PLAY` at right. Can retain `ABOUT` if it does not overcrowd mobile. Navigation must use real anchors and work with keyboard.
- Tiny top label: `MERIDIAN / AN INTERACTIVE INFRASTRUCTURE EXPERIMENT`.
- Oversized `CTRL Z` headline with editorial letter-spacing and responsive size. Below it: `UNDO THE WORLD.`; selectively outline the word `THE` only if legibility is excellent.
- Concise introduction: `A city runs on invisible connections. Break one, and watch the consequences spread.`
- Clear functional CTA: `WITNESS THE BLACKOUT ↗`, scrolling to the city reveal. A quieter `PLAY` action is always available from the header.
- Bottom `SCROLL TO DISCOVER ↓` hint with a tiny, very gentle arrow bob.

**New animated hero graphic, as seen in the preview:**

- Build an **original lightweight SVG infrastructure/connection graphic** positioned mainly toward the right/rear of the hero, partly disappearing behind/around the large title.
- Two or three thin orbital/circular paths, intersecting circuit-style orthogonal lines, tiny junction points, one or two small mint-lit nodes, and quiet monospace annotations such as `SYSTEM INTERDEPENDENCY` and `MERIDIAN / NODE 01`.
- Dotted electrical/signal routes slowly travel along the network. Circles rotate extremely slowly in opposing directions; nodes breathe gently. Use CSS transforms and/or SVG stroke-dash offsets, not an always-running heavyweight canvas shader.
- Optional faint pointer-reactive illumination/position shift on pointer-equipped desktop browsers. **Very subtle:** the user should not perceive a big spotlight following the pointer.
- Scroll-linked title drift and modest graphic parallax create depth. On scroll, headline and network separate at slightly different speeds; do not distort fonts or use aggressive 3D.
- Text must stay crisp and maintain contrast over the background. Graphic opacity should remain low enough that title dominates.
- For touch/reduced-motion or low-power contexts, show a clean static version with no loss of information.

**Success condition:** The first viewport is immediately recognizable as Ctrl Z, visually alive without obscuring the title, and has an obvious way to play or discover the city.

### SECTION B — Moving editorial ticker and animated dependency network

**Purpose:** Make the idea of interconnected systems visible, not just written in paragraphs.

**Part 1: Thin editorial ticker**

- Following the hero, create one restrained horizontal monochrome ticker behind top/bottom hairline rules.
- Text repeats a small purposeful sequence, e.g. `EVERYTHING IS CONNECTED · ONE FAILURE. MANY CONSEQUENCES. · REWIND THE WORLD`.
- Animate at a slow readable pace. It must never steal focus, block click targets or announce duplicated text continuously to screen readers (`aria-hidden` for decorative duplication).
- Pause/stop for reduced motion; consider pausing on hover/focus if interactive links are included (prefer **no interactive ticker links**).

**Part 2: Editorial premise**

- A clean left/right composition introducing `ONE SWITCH. EVERYTHING CHANGES.` and a short paragraph explaining power, water, hospitals, communications and logistics.
- The headline should arrive with a deliberate translate/fade as it enters the viewport—not a slow word-by-word delay.
- Maintain concise writing and generous spacing.

**Part 3: Animated infrastructure diagram**

- Add a real, understandable connection diagram in a dark technical frame, with a very subtle grid substrate and generous space.
- Visually communicate electricity powering multiple services, with the **actual dependencies reflected accurately**. Read `src/dependencies.ts` and simulation logic first; do not invent dependencies or imply all services are exclusively direct power dependents.
- Include named nodes such as ELECTRICITY, WATERWORKS, TELECOM, HOSPITAL and LOGISTICS as appropriate; include RESIDENCES only if layout remains clean.
- Use thin animated dashed signals traveling between connected boxes, illuminated node dots, and explicit directional lines. Pulse should be slow and visually meaningful.
- Section title `MERIDIAN / DEPENDENCY NETWORK`; a small secondary caption may say `SIMPLIFIED SCHEMATIC` so it is not mistaken for live telemetry.
- If actual gameplay capacities/statuses are not connected to this schematic, never label it `LIVE CONNECTIONS` or claim it is live data.
- The diagram should be readable at 320px through 1440px. On mobile, simplify/reflow the graph, keep proper directionality, and avoid overflow or microtext.
- Prefer accessible DOM/SVG; provide a brief readable equivalent describing the dependency relationships. Decorative animated path layers should be hidden from assistive technology.

**Success condition:** The network graphic is useful context for what the player's decisions affect, not a generic sci-fi loading animation.

### SECTION C — Cinematic, city-first blackout experience (main event)

**Purpose:** This is the page's **biggest graphic and animation moment**.

**Layout:**

- Editorial intro label `02 / THE INTERRUPTION`.
- Big white heading: `WATCH THE CITY GO DARK.`
- Subtle live-state-style *preview* indicator: `POWER CONNECTED` → `GRID DISCONNECTED`. Do not mislabel this static preview as real live data.
- The **actual isometric city fills a large panoramic visual frame**, much larger than the old embedded control-room screenshot. It should be the undisputed centerpiece.
- A tiny `MERIDIAN / VISUAL FEED 001` caption and subtle technical corner/rule framing are acceptable. Keep badges and overlays minimal.

**Create clean, authentic paired imagery:**

- The existing assets `src/assets/previews/scene-powered.png` and `scene-blackout.png` contain some control-room UI, header, minimap and timeline. **Do not merely blow those up and make them look pixelated or blurred.**
- Generate matched **city-focused screenshot assets from the actual current game** at identical camera center, zoom, crop and deterministic conditions. Hide game HUD **only in the screenshot capture process** (e.g. Playwright screenshot-time styles or a safe capture-only approach), not in gameplay and not by editing the real game UI.
- Show real authored buildings/roads/lighting; choose a composition that makes the visual difference between powered/blackout obvious. Preserve crisp pixel-art nearest-neighbor scaling.
- For each desktop and mobile pair, match the frame exactly (location, size, zoom, camera orientation). Ensure the fade doesn't cause elements to jump.
- Where possible, produce dedicated compressed desktop and portrait/mobile assets with appropriate responsive `<picture>` or equivalent loading behavior; document asset provenance.
- No fabricated outage image. All differences must be grounded in the actual game state and rendering.

**Scroll behavior:**

- Native page scrolling drives a **bounded sticky/held scene** when the entire preview including controls comfortably fits the viewport. If short/zoomed/mobile layouts cannot safely pin, use the existing tested non-sticky fallback.
- As visitors scroll through this section, the city fades smoothly from lit to dark. Scrolling backward restores the lit scene—the interaction metaphorically previews Undo.
- Use the already proven `useBlackoutReveal` machinery and preserve manual selection priority, re-entry behavior, direct links and reduced-motion handling.
- Make progress reversible and continuous. No abrupt snap, state desync, blank image, delayed image jank, wheel-hijacking, or blocked natural scrolling.
- Show a thin progress rail. A short status message appears after the transition: `GRID DISCONNECTED / BACKUP SYSTEMS ACTIVE`.
- Optionally give the power-loss crossing a **single gentle interruption flicker** (max one very brief, low-opacity flash or non-flashing color shift). **Never strobe**, rapidly repeat flashes or create seizure-risk flicker. Prefer no flash when scrolling back quickly; disable the effect on reduced-motion/mobile if uncertain.
- Very subtle scan-line travel or border/mask movement may overlay the scene, but it must not obscure pixel art or create frame-rate cost.

**Manual and accessible controls:**

- Preserve explicit `POWER ON` and `POWER OFF` buttons / switch with actual pressed state. Keyboard users can trigger the reveal without scrolling. Screen-reader status should be concise rather than constantly announcing a numerical scroll progress.
- Reduced-motion uses two fully visible/selectable states without automatic crossfade.
- A visitor can jump directly to this section, scroll past it, return, reverse, tap buttons, resize and navigate by keyboard without the section becoming stuck.

**Success condition:** A judge watches the **city itself** lose its lights as they scroll, with the controls minimized, and instantly understands the concept.

### SECTION D — Kinetic consequences story

**Purpose:** Replace an overly long textual explanation with three visually rhythmic decision beats.

- Tiny section index: `03 / THE CONSEQUENCES`.
- Giant statement: `ONE CITY. A CHAIN REACTION.`
- Three large editorial rows separated by thin horizontal rules:
  1. **THE FAILURE.** — The grid goes dark; backup reserves help temporarily; other services depend on one another.
  2. **THE DECISION.** — Two limited emergency supply interventions: which essential services do you protect?
  3. **THE REWIND.** — Rewind and compare the outcome after a different intervention.
- Each row has small mono numbering, a confident headline and one compact explanatory sentence.
- As each row approaches view, translate upward around 18–28px and fade from a partially visible start to full clarity. Use IntersectionObserver or efficient CSS progressive enhancement. Avoid every-word animation.
- A very restrained dashed line, node, or signal passing between the numbered rows can tie the section back to the network graphic **only if it adds cohesion**. No gratuitous 3D/particle effects.
- On large screens, allow asymmetric grid alignment; on phones, stack cleanly and keep the narrative short.

**Success condition:** The reader encounters meaningful gameplay features through typography and controlled movement—not three generic feature cards or another wall of copy.

### SECTION E — Decisive final play frame

**Purpose:** End the story with one unforgettable question and immediately launch the actual game.

- Return to near-total black and generous whitespace.
- Add one understated large outline/orbital network graphic behind/right of the text—faint, slow breathing, nothing competing with the question.
- Tiny index `04 / YOUR MOVE`.
- Very large: `WHAT WOULD YOU KEEP RUNNING?` with intentional line breaks and responsive fit.
- A short closing line: `The city is connected. The next decision is yours.`
- ONE primary CTA, `ENTER MERIDIAN ↗`, which opens the **existing full-screen gameplay** at `./simulation.html`. Ensure correct relative base-path resolution on GitHub Pages and on Embarko if applicable.
- Small secondary navigation is acceptable (e.g. jump to city, view source) but **do not append a second large 'Play Ctrl Z' promotional section** that introduces the game all over again.
- Preserve the existing optional on-demand embedded game capability if reasonably possible, but relocate it to a small accessible secondary option (or an unobtrusive expandable area); do not auto-fetch the heavy Pixi game while users simply read the landing page. On phones, full-screen/direct gameplay is primary.
- Preserve the game's same-origin save/resume semantics and `simulation.html` functionality.

**Success condition:** The final question is the climax. One click transitions the visitor to the real game, without another redundant explanatory stage.

---

## 4. Motion choreography and performance budget

This is an animated design, but its motion should feel **premium, intentional and stable**:

| Visual | Desired motion | Performance/accessibility rule |
|---|---|---|
| Hero circuitry | Slowly moving dotted signals and faint node pulse | SVG/CSS only; subtle opacity and low animation count |
| Hero rings | Extremely slow opposing rotation | Only `transform`; static under reduced motion |
| Pointer lighting | Faint halo near pointer on desktop | Pointer-capable only, throttled/rAF, no large blur repaint |
| Hero typography | Light scroll-linked vertical drift | Bounded movement, never lose first-view CTA |
| Ticker | Quiet horizontal repeated message | Slow, noninteractive, hidden decorative duplication |
| Premise/feature headings | Once-on-entry translate/fade | 350–700ms, no locked scrolling |
| Network diagram | Moving signal paths | SVG stroke-dash, no fake live readings |
| City blackout | Matched screenshot opacity crossfade from scroll | One dominant staged moment; reversible and crisp |
| Interruption highlight | One brief safe subtle pulse or tonal change | No strobes; suppress under reduced motion |
| Final orbit | Very slow faint breathing | Background-only, reduced-motion static |

Implementation principles:

- Prefer CSS transforms, opacity, SVG and `IntersectionObserver`; only use a small rAF-backed scroll handler when needed and cancel/cleanup it correctly.
- No global scroll hijacking, wheel-event interception, forced smooth-scrolling library, user-agent-dependent scroll delay, or unnecessary GSAP/Three.js/Framer Motion dependency just to reproduce this concept.
- Do not tie React rerenders to every scroll pixel. Update CSS custom properties imperatively when appropriate, with semantic discrete state in React.
- Avoid excessive filters, background blurs, heavy full-screen box shadows, large constantly moving gradients, and giant animation timelines on phones.
- Pause nonessential animation when content is off-screen or document is hidden if useful.
- Use native `scroll-behavior: smooth` only for user-triggered anchor actions and disable it under `prefers-reduced-motion`.
- Distinguish decorative elements (`aria-hidden`) from actual information/status controls.
- Keep page content readable while JS loads and if JS motion enhancement fails.
- No fake loading screen or initial animation that delays CTA availability.

---

## 5. Responsive design — non-negotiable

Test at minimum **320, 360, 390, 430, 768, 1280, 1440 CSS px**, plus a short **844×390 landscape** viewport.

- Hero title and `UNDO THE WORLD` remain readable without clipping, overflow or overlap. CTA always appears within the first viewport when height allows; on short landscapes prioritize title readability and action visibility over graphic decoration.
- On mobile, reduce/reposition orbital network artwork. Never cover crucial copy or use full-size desktop graphics squeezed into the phone.
- The dependency diagram adapts properly: simplify lines/positions while retaining true connectivity, no 8px node labels that require zoom.
- The city capture has a well-composed, **actual-game** mobile crop; no huge HUD/timeline blocking the buildings.
- Short-height and zoomed viewports should not trap the visitor in a sticky city section.
- Power toggle buttons and CTA targets meet minimum 44×44px where practical and have visible keyboard focus.
- No horizontal scroll, unusable overlapped controls, scroll snapping, accidental page scroll captured by an iframe, or hover-only affordances.
- Mobile entry should strongly prefer direct/full-screen simulation, keeping current game behavior intact.
- Test both touch scrolling over the city preview and manual power toggles.

---

## 6. Preserve everything already working

**Protected files/systems include:**

- `simulation.html` and the existing game mounting code
- `src/App.tsx`, `src/City.tsx`, `src/CityScene.ts` and world renderer/atlases
- Gameplay city geometry, six important service buildings, signage, golden building highlights, camera and minimap
- Dynamic traffic, directional vehicle sprites and static parked cars
- Power/water/telecom/logistics dependencies and simulation state
- Save/load, undo, replay/branch comparison, investigation, reports and guided experiment
- Existing GitHub Pages workflow and base path
- Existing playable mobile controls and inspection behavior

Do not edit these merely for visual consistency with the new landing page. Any exception must be narrowly justified, isolated, tested and documented before proceeding. Avoid changing `src/style.css` or `src/console.css` if the redesign can stay in landing-only styles.

Landing assets may be added to `src/assets/previews/` with accurate provenance. Do not import template media or fonts without a valid license.

---

## 7. Expected source changes

**Primary files to adapt (verify actual paths):**

- `src/Landing.tsx` — page sequence, hero, ticker, dependency network and streamlined ending.
- `src/landing.css` — cinematic palette, responsive layout, SVG graphic appearance and transitions.
- `src/BlackoutPreview.tsx` — much larger HUD-free city presentation and manual power switch.
- `src/useBlackoutReveal.ts` — preserve and refine reversible scroll-progress handling only where necessary.
- `src/useLandingMotion.ts` — hero depth, section introductions, low-cost scroll effects and lifecycle cleanup.
- `src/assets/previews/` — verified aligned, actual-game city-first desktop/mobile assets and provenance.
- Landing/blackout/responsive browser tests — update assertions for the new page structure and add new coverage.
- `DESIGN.md` and `docs/landing-page/` — update **after implementation** to reflect the actual shipped system.

You may create small focused landing-only components such as `InfrastructureGraphic.tsx`, `DependencyNetwork.tsx`, `KineticTicker.tsx`, `Consequences.tsx`, but **do not create an unnecessarily complex framework or duplicated animation system**. Reuse current hooks and CSS.

---

## 8. Milestones and deliverables

### Milestone 0 — baseline and implementation contract

- Audit the current deployed and local code, git status, assets and tests.
- Capture current desktop/mobile opening, blackout and final CTA.
- Check installed design skills (`ui-skills-root`, Frontend Design, CSS Motion Systems, Web Design Guidelines, Impeccable, or whatever is actually present) and use only relevant safe guidance. **Do not install new dependencies or run unreviewed hooks just to use skills.**
- Record a short implementation plan and asset capture strategy. Avoid spending the majority of the task writing docs.

### Milestone 1 — animated hero and ticker

- Implement the giant hero and custom SVG rings/circuit pathways/node pulses.
- Add subtle cursor response, controlled text drift and editorial ticker.
- Inspect actual 1440/390/844×390 screenshots; verify hero and CTA are unobstructed.
- Validate tests and create a descriptive Git commit.

### Milestone 2 — the network graphic and scroll-driven editorial beats

- Implement real dependency-aware schematic and three kinetic consequence rows.
- Confirm actual source dependency relationships and the simplified labeling.
- Review screenshots and reduced-motion behavior; test and commit.

### Milestone 3 — real city-first blackout

- Capture clean paired actual-game powered/off visual assets at aligned coordinates, desktop and mobile.
- Upgrade the existing scroll scene using those assets without changing the game.
- Verify manual toggle, scroll forward/back, re-entry, direct anchors, responsive fallback, visual stability and no flashing.
- Capture powered/halfway/blackout screenshots; test and commit.

### Milestone 4 — final play destination and mobile polish

- Replace duplicate landing-page ending with the single high-impact CTA.
- Keep full-screen route, optional on-demand embed, saves and home navigation working.
- Test full responsive matrix, touch, keyboard, accessibility, reduced motion and slow image loading. Verify no accidental heavyweight game bundle loading on initial page view.
- Capture full-page desktop/mobile, first viewport, middle scroll scene, final CTA and actual game entry screenshots. Test and commit.

### Milestone 5 — verification and handoff

- Run production TypeScript/Vite build and existing unit/landing/browser tests; include regression of the **unchanged** game's save/replay/navigation and camera/inspection where feasible.
- Check GitHub Pages deployment and the real published URL, including subpath links; note whether remote testing is possible.
- Update design docs with implemented details and any exact remaining limitations.
- Push **tested** commits to `origin/main` only if the current repository instructions authorize doing so, otherwise follow the repo's authorization/approval process.
- Summarize modified files, screenshot locations, tests passed/failed, commits and deployment state. Never claim unperformed physical-device tests or automatic score improvements.

---

## 9. Objective acceptance checklist

A successful landing page should meet **all** of the following:

- [ ] Uses the near-black Young Minds / editorial visual system with bold white CTRL Z identity.
- [ ] The opening has a clearly visible animated original infrastructure graphic with tiny living nodes, pathways and slow orbital rings.
- [ ] Pointer reaction is subtle and does not interfere with navigation.
- [ ] A restrained ticker separates the introduction and the next section.
- [ ] The diagram meaningfully and accurately visualizes existing power/dependency relationships.
- [ ] Headings and story rows have refined viewport-entry transitions, not distracting motion everywhere.
- [ ] The main city reveal fills most of its visual frame and shows **actual Ctrl Z pixel art with minimal/no game HUD in the capture**.
- [ ] Powered/blackout image pairs line up exactly, with no object jump or scaling artifacts.
- [ ] Scroll down cuts city power visually; scroll up reverses it.
- [ ] Keyboard/touch users can select powered/blackout states directly.
- [ ] No rapid flashes or motion accessibility regression; reduced-motion mode displays all content and state changes clearly.
- [ ] Ending is one large `WHAT WOULD YOU KEEP RUNNING?` scene that leads straight to `simulation.html`.
- [ ] Gameplay, city art, cars, camera, saves, replay and current game UI are unchanged and work normally.
- [ ] Readable at narrow mobile sizes and short landscape, without horizontal overflow or sticky-scroll traps.
- [ ] Browser/production tests pass or any remaining failures are accurately described.
- [ ] Full-page desktop/mobile and powered/halfway/blackout evidence is captured and visually reviewed.
- [ ] UI changes are implemented, not merely planned or documented.

---

## 10. Final instruction for Codex

**Implement this file fully as the new live Ctrl Z landing page.** Work incrementally and spend your effort on actual visual results. The design should be noticeably more animated and graphically expressive than the previous monochrome homepage—specifically including the circuit/ring hero, moving ticker, accurate animated infrastructure schematic, stronger city-focused blackout, kinetic text and a single final play invitation.

Use the latest interactive concept preview in this conversation as the **visual/interaction target**, but adapt it properly for a real React/Vite production website: clean real gameplay captures, accurate labels, accessible behaviors, responsive composition, native page scroll, lightweight implementation, and the actual existing site's paths/semantics. The conceptual prototype's CSS values/HTML are not source code to copy blindly.

**Keep the approved game untouched.** Capture and review real screenshots at each milestone, run relevant tests, commit verified progress, and follow existing project instructions for pushing/deployment.
