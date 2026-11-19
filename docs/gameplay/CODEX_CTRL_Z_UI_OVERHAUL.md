# Ctrl Z — UI/UX Overhaul Brief for the Embarko Student Challenge

> **Instructions to Codex:** Read this entire document, `AGENTS.md`, `docs/PROJECT_BRIEF.md`, `docs/PROJECT_VISION.md`, `docs/ARCHITECTURE.md`, and `docs/DEVELOPMENT_STATUS.md` before changing code. Treat this file as the active task specification for the **website UI/UX only**. The creator has approved the **current city map and its art**. Do not redesign it. Implement the work in small, tested milestones and push completed milestones to `origin/main` as already authorized by the project's current instructions.

## 0. Objective and competition context

Build a polished, distinctive, easily understood, responsive **interactive infrastructure-simulation game interface** around the existing isometric city. The goal is to maximize the relevant **Work** judging criteria supplied by the user:

1. **How the app looks:** polished, memorable, well-composed and cohesive.
2. **Originality of the idea:** communicate the “remove a system, observe cascading consequences, intervene, undo, compare” mechanic immediately.
3. **Whether it works on a phone:** fully usable touch-first gameplay, not merely a desktop layout squeezed onto a small viewport.

The submission video is assessed separately on its hook, clarity, story and how it shows Embarko. Make Ctrl Z easy to demonstrate in a short recording, but **do not** add artificial or fake functionality for a video, promise a score, fake metrics, invent Embarko integration, add engagement manipulation, or change the application's hosting without explicit direction. Reach is determined by actual post performance; this task concerns the app itself.

**Main mandate:** Upgrade the *interface around the map*, not the already-approved map. Maintain the existing character of the game: restrained, dark, cyberpunk, engineering/control-room inspired, slightly retro, with premium typography and purposeful color. Avoid the generic SaaS dashboard look and avoid making everything neon and glowing.

## 1. Immutable constraints — do not break these

- **Preserve the current isometric city exactly:** no changes to city architecture, street plan, camera math, map bounds, infrastructure coordinates, route geometries, vehicle sprites, scenery, atlas assets, building illumination, gold landmark effects, building labels or world rendering unless an objectively necessary, narrowly scoped UI-overlap fix is identified and documented.
- Preserve the visually approved map's relative space and zoom. The city must remain the dominant visual feature of the page.
- Preserve all six infrastructure buildings; their distinct sprites; golden persistent and hover treatments; selection silhouettes; service labels; ordinary scenery inspection; minimap and existing navigation.
- Preserve gameplay and simulation logic: electricity outage, reserves, water/communications/logistics dependencies, delivery teams, investigation cases, diagnosis, reports, save/resume, timeline, branching, undo/rewind and clock behavior.
- Preserve accessibility and correctness of existing controls, including their disabled states and explanatory messages.
- Preserve stable entity IDs, save format, replay behavior and GitHub Pages deployment. Do not silently migrate, reset, erase or invalidate users' saved experiments.
- No fabricated data, metrics, operating states, achievements or animations disconnected from the simulation.
- Do not add paid design assets, change deployment provider, expose secrets, or add Embarko branding/deployment claims without verified requirements and creator approval.
- Do not force onboarding or any blocking modal on every visit. Skip, replay and returning-user pathways must exist.
- Avoid expensive WebGL effects, blur layers on the canvas, heavy animation libraries and needless dependencies. Prefer React, CSS, existing Lucide icons, existing fonts and reusable components.
- Respect reduced-motion, low-power mode, performance-sensitive phones and keyboard navigation.
- **Do not overwrite working functionality or force-push.** Inspect live `main`, local status and tests before implementation; reconcile any new concurrent changes.

## 2. Source-of-truth review

Inspect the code **as it currently exists**, especially:

- `src/App.tsx` — application structure, header, sidebar, map overlays and page-level help.
- `src/style.css` — design rules and many responsive overrides; consolidate incrementally rather than piling on contradictory `@media` declarations.
- `src/ScenarioPanel.tsx` — Sandbox/Investigation choice and Remove/Restore Electricity.
- `src/BuildingInspector.tsx`, `src/InspectionShell.tsx`, `src/SceneryInspector.tsx`, `src/InvestigationPanel.tsx` — service/scenery information and actions.
- `src/Timeline.tsx` — elapsed time, play/pause, speed, timeline scrubbing, undo, reset, branch comparison and event messages.
- `src/Minimap.tsx` — viewport navigation, landmark selection and phone layout.
- `src/ReportPanel.tsx`, `src/SaveControls.tsx`, `src/SceneryBrowser.tsx` — secondary tools currently occupying sidebar space.
- `src/City.tsx`, `src/worldCamera.ts`, `src/navigation.ts` — **read to prevent overlay collisions and camera-regression problems**; do not rewrite map internals.
- `src/simulation.ts`, `src/inspection.ts`, `src/gameState.ts`, `src/game.ts`, `src/logistics.ts` — existing domain state for truthful dashboard and onboarding.
- Existing `tests/` and `tests/browser/` suites, Playwright configuration, and current deployment scripts.

Capture baseline **real** desktop and mobile screenshots before changing anything. Record pre-change build and test results. Inspect the current deployed UI as a user, not only the component tree.

## 3. Visual direction

### Concept

**“The city's operating console.”** A beautifully art-directed interface for a systemic crisis, not a form-heavy admin panel. The map is the cinematic stage, and the controls feel like a thoughtfully designed engineering terminal.

- Dark charcoal/navy surfaces, not flat black everywhere.
- Teal/cyan = navigation, intelligence and regular interactions.
- Muted gold/amber = landmark emphasis and important observations, matching **existing golden building highlights**.
- Warm coral/red = disconnected systems, critical outages and destructive actions.
- Green/teal = healthy, connected and recovered states.
- Use one strong primary action at a time; secondary and destructive actions must have clearly different visual weight.
- Subtle 1px strokes, depth separation and purposeful shadows; restrained corners and geometric details. Avoid generic giant gradient cards, excessive rounded pills and glow everywhere.
- Continue existing `Space Grotesk` for headlines, `DM Sans` for body/UI and monospace only for numeric system telemetry where it aids readability. Avoid introducing many new fonts.
- Use consistent spacing, padding, radius, icon sizes, hover/focus/active feedback, and a centralized token set in CSS variables.
- Prefer layered, compact panels that complement pixel art without competing with its colors.

### Suggested design tokens (adapt after inspecting real screenshots)

Define coherent tokens such as `--ui-bg`, `--ui-surface`, `--ui-surface-raised`, `--ui-border`, `--ui-text`, `--ui-muted`, `--ui-cyan`, `--ui-gold`, `--ui-success`, `--ui-warning`, `--ui-danger`, `--ui-radius`, `--ui-space-*`, and `--ui-shadow`. Existing project colors may be retained and rationalized; don't blindly replace the site's entire palette.

**Readability matters:** stop using 8–10px as the default for important labels, buttons and descriptions. Aim for readable, compact desktop text (~13–15px body, 12px minimum for important secondary info where practical) and appropriately sized mobile text (~14–16px for controls and descriptions). Small ornamental eyebrows may stay smaller only when never required to understand or operate the app. Maintain WCAG-friendly contrast and visible focus rings.

## 4. Desktop composition and hierarchy

### 4.1 First viewport

On normal laptop screens (especially 1366×768 and 1440×900), the first screen must communicate these within 5–10 seconds:

1. **Identity:** Ctrl Z — *Undo the World*.
2. **Premise:** “Remove electricity. Watch a city unravel. Change the outcome.” (wording may be refined, but keep it this direct).
3. **Primary action:** a prominently labeled **Remove Electricity / Start Blackout** button, with a clear reversible state after activation.
4. **Feedback:** at least one prominent visual indication that city systems change as the blackout progresses.
5. **Main attraction:** the live isometric city in a large, unobstructed area.

A judge should not have to read multiple paragraphs or open the help panel to understand what to do. The initial screen must show the map immediately; any onboarding overlay should be optional and small.

### 4.2 Top bar

- Refine Ctrl Z branding; retain the distinctive logo/title and subtitle but prioritize legibility.
- Remove or replace `PLAYABLE PROTOTYPE` with an accurate, confident state indicator such as **CITY SIMULATION** or **SIMULATION READY** (not an unverifiable “production ready” claim).
- Show a compact live operating state drawn from real game state: **Systems nominal**, **Grid disconnected**, **Case in progress**, or **Power restored**, as appropriate.
- Keep About/How to Play and an unobtrusive reset/help affordance accessible.
- Keep the top bar compact so it does not waste vertical space.

### 4.3 Primary left/control area

Make the sidebar smaller in *cognitive* complexity, not simply thinner:

**Always visible, above the fold:**
- Small experiment identifier or mode label.
- Clear, short game premise.
- Sandbox / Investigation switch, with an understandable distinction.
- Large, obvious contextual CTA: **Remove Electricity**, then **Restore Electricity** (existing methods, same state rules).
- Compact, scannable **City Systems** summary — see §5.

**Progressive disclosure:**
- Infrastructure destinations with health status and quick-jump behavior (existing left-panel selection).
- Informational-scene browser.
- Report and comparison tools.
- Save/Resume controls.
- Technical details, evidence and advanced controls.

Use purposefully labeled accordion/section toggles; default open only what a first-time player needs. Advanced sections must remain readily discoverable, not buried in hidden menus. Preserve controls and keyboard accessibility.

### 4.4 Center stage — city

- Keep current Pixi canvas and map aesthetic untouched.
- Ensure left panel, top bar, minimap, inspector, tutorial cues and timeline do not collide with each other or hide critical city landmarks.
- Keep existing golden landmark glow/hover, readable floating service names and service inspection behavior.
- Maintain sensible map focus after sidebar/inspection selections, accounting for actual unobstructed viewport.
- No overlaid generic illustrations, stock photos or decorative dashboards over the city.
- Do not implement dramatic camera movements that disrupt the user's current exploration.

## 5. Real-time City Systems dashboard

Add a premium, compact system-summary component that updates from **actual game state**. It should communicate the game's unique systemic dependencies at a glance.

Suggested system groups, subject to actual existing domain mappings:

| Group | Source / representation | Notes |
| --- | --- | --- |
| Electricity | grid/substation state | Distinguish connected vs disconnected; no false extra reserve |
| Water | waterworks service status | Honor pumps, stored reserve and downstream dependencies |
| Communications | telecom status | Reflect reserve/power/communications behavior |
| Healthcare | hospital status | Respect generator and water dependencies |
| Logistics | logistics hub status and actual capacity | Only use real capacity values if existing code calculates them |
| Residences | homes status | Reflect electrical and water effects |

Show meaningful textual statuses (e.g. Operational, On backup, Interrupted, Offline) with color and **not color alone**. Where useful, use a small dot/line/bar visual without implying unsupported continuous metrics. If there are six services, show all six or a deliberate 4+2 compact summary with an expand affordance — do not secretly drop one.

When an event changes state, give concise, non-spammy visual feedback. No fake “city stability 87%” score. If making a composite metric, formally define and test its calculation and label it transparently.

A tap/click on a system summary must use existing building selection/camera navigation to jump to the actual relevant facility.

## 6. A clear moment of consequence

When the player clicks **Remove Electricity**, make the interface convey the action through an intentional sequence, driven by the real simulation:

- The primary action changes to **Restore Electricity**; status and system dashboard update immediately.
- The city itself reacts with its existing lighting/power state; do not re-author this effect.
- A prominent but modest status/event message explains what changed: e.g. “Grid disconnected — backup systems are taking over.” Use existing outage messaging/derived status rather than invented outcomes.
- As reserves expire, genuine changes in real building states appear in the systems dashboard, inspector and timeline.
- Use short, distinct transitions (around 150–250ms) to make state changes feel intentional. Reduced-motion users should see instant state updates, no animated bouncing/flashing.
- Avoid gratuitous particle effects, screen shakes, full-screen red flashes, fictional casualty counts, fake countdowns or alerts not backed by the domain model.

The simulator's originality should be instantly visible: **an invisible dependency network becomes tangible when one system is removed**.

## 7. Simulation timeline redesign

Preserve the actual timeline and all behavior, but clarify the hierarchy:

- A large, easy-to-read **elapsed simulation time**.
- One recognizable play/pause control with descriptive label/accessible name.
- Obvious speed indicator/control, Undo, Reset and scrubbing functionality.
- Visible 0–24 hour progression with clear markings, adequate touch target and readable time labels.
- Concise status message derived from `outageMessage()` or existing incident sources.
- Reveal replay branch/outcome comparison only when branches/history make the information meaningful.
- Mobile: use a compact transport strip and an expandable full timeline/details view when needed. The main timeline must never cover all usable map space.

Preserve semantic slider labeling and keyboard operation. Do not introduce broken custom sliders for aesthetics alone.

## 8. Building inspection UI

The selection system already exists and is valuable. Refine its **interface**, not its domain behavior:

- Strong and readable building title, consistent category label, truthful operational state.
- The most important actionable information appears first: what the facility does, what is failing/at risk, and the primary available action.
- Summarize reserves/metrics in two-column compact tiles on wide layouts, stacked when necessary.
- Keep the real action set: inspect connections, trace dependencies, send supplies when allowed, restore/disconnect grid, investigate and select couriers where relevant.
- Advanced dependency chains, incident logs and forensic evidence should open progressively.
- Disabled actions must clearly state why they are unavailable, without relying solely on low opacity.
- Panel must not cover the selected building; preserve `unobstructedViewport` behavior and existing recenter logic.
- On desktop: make inspector a clear, aesthetically integrated floating dock/card, not a blocking modal.
- On mobile: make it a compact, accessible collapsible bottom sheet; expanded panel should scroll independently without losing the close/collapse action.
- Preserve existing golden landmark highlight, names, hover priority and accurately linked selection.

Decorative buildings remain **informational scenery** with concise truthful metadata; do not make them pretend to control simulated resources.

## 9. Guided first experiment — optional and real

Add a short, **skippable, non-blocking** first-use guide that teaches the unique interaction. It should be contextual rather than a multi-screen marketing tutorial.

Suggested four stages:

1. **“This is Meridian.”** Short line explaining the live city. Highlight the key action without hiding the map.
2. **“Remove electricity.”** Invite the user to click the actual Remove Electricity button. Do not automate the outage without their action.
3. **“Follow the cascade.”** Direct attention to the truthful changed City Systems indicators, then let the user inspect a real affected building.
4. **“Change the outcome.”** Explain available supplies, restoration and Undo/replay. Let the user act naturally. End with a concise “Explore freely” message.

Implementation requirements:
- User can **Skip**, **Next** (when applicable), close and later replay from **How to Play**.
- Never block the actual main gameplay controls or swallow click/touch events needed for the step.
- Progress only when an actual relevant game action happens, rather than timer-based fake progress.
- Do not reset an existing run or overwrite saved experiments just to start the guide.
- Honor accessibility: focus management, keyboard controls, sensible reading order, no intrusive announcements.
- Keep state transient or persist only an opt-out/seen flag safely; don't modify the replay journal.
- Guide must not automatically pop up on every return or during an active restored experiment.
- Do not add a cinematic 5-second splash screen that delays the playable map.

## 10. Phone-first redesign — essential judging criterion

**Treat phone usability as a product feature, not a responsive CSS afterthought.** Evaluate 360×800, 375×812, 390×844 and 430×932, plus a landscape phone; also test 320px if feasible. Check desktop 1366×768, 1440×900 and a tablet-width view.

### Mobile viewport layout

- Small, readable top bar: Ctrl Z identity, live status, compact Help/Menu.
- City canvas occupies the majority of the remaining first viewport; the map must be visible **without scrolling through a long sidebar first**.
- Contextual primary experiment action (Remove/Restore) must be reachable while the map is visible.
- Persistent but minimal controls for map zoom/overview, minimap access and timeline play/pause, with no overlap with the selected inspector.
- Use collapsible drawers/tabs/sheets for destinations, detailed systems, reports, saves and scenario mode controls.
- Show a concise City Systems summary strip/card without consuming half the screen.
- On selection, open a bottom sheet with a compact handle/header and key status, expandable for full details; retain view of the selected building above it.
- Preserve map pan, pinch-to-zoom, touch target selection and minimap gestures; ensure sheets/overlays do not hijack touch events outside their bounds.
- Support device safe-area insets (`env(safe-area-inset-*)`) and dynamic browser chrome (`dvh` where appropriate).
- Avoid horizontal overflow and accidental body scrolling while navigating the map.
- Buttons/touch controls approximately **44×44 CSS px minimum**, unless a justified adjacent large target makes an exception safe.
- Make all essential actions possible without keyboard or hover.

### Mobile success test

A new user on a 390px phone must be able to: load the game, recognize the concept, start a blackout, see consequences, select a relevant building, read its condition, perform a permitted intervention, close/collapse the inspector, pan/zoom, use the timeline, restore/undo and access reports/save tools **without rotating their phone or relying on a desktop-style sidebar**.

## 11. Microinteractions, content and presentation polish

### Interactions

- Clear pressed/selected/disabled/loading states for every action.
- Context-sensitive, short tooltips or captions where a term is technical. Do not rely on desktop-only hover.
- Smooth panel entry/exit that never reflows the game unpredictably or causes canvas input loss.
- Brief, purposeful visual cues when system health changes, but no constant pulsing on all cards.
- Attractive empty, paused, saved, restored and no-selection states.
- If save/resume succeeds or fails, show a clear inline status/notification tied to the real result.

### Copy

Replace vague, overly technical or overly long introductory text with plain-language, action-oriented writing. Useful examples (adjust to actual game mechanics):

- **Hook:** “What happens when a city loses electricity?”
- **Subheading:** “Break one system. Watch the consequences. Change the outcome.”
- **Primary CTA:** “Remove Electricity”
- **Restored state:** “Power restored”
- **Inspector prompt:** “Select a building to see what it depends on.”
- **Context hint:** “Backup reserves buy time. Your decisions change what survives.”

Avoid invented claims about science/real-world accuracy. Represent the mechanics as a **simulation** with assumptions, not a forecasting tool for actual infrastructure emergencies. Preserve required disclaimers where already present.

### Loading/error/fallback

- Show a branded, restrained canvas loading state with honest progress wording (don't show fake percentages).
- Show clear recovery text if WebGL/assets fail or if device performance requires low-power mode.
- Keep default load fast. Never autoplay a long intro animation/video before interaction.
- Consider lazy-loading secondary panels if it improves real performance, but test startup and suspense transitions.

## 12. Make short video recording easy without creating fake demos

A judge should be able to capture a compelling real app sequence in 40–90 seconds:

1. Reveal the beautiful city and one-sentence premise.
2. Click **Remove Electricity** — real visual and system-state change.
3. Show system degradation and inspect an impacted facility.
4. Deliver supplies or restore electricity and show an actual resulting change.
5. Rewind/compare to communicate the unique Ctrl Z mechanic.

This is guidance for **app clarity**, not instructions to fake outcomes. Do not add watermark clutter or distracting camera automation. Leave Embarko deployment demonstration to the user's actual deployment workflow; don't put unverifiable Embarko badges in the product.

## 13. Proposed implementation milestones

Use meaningful, independently testable commits. Adjust sequencing for technical dependencies, but **do not spend the entire task writing plans**.

### Milestone 0 — Audit and baseline
- Verify `git status`, HEAD, origin/main and current deployment status.
- Read `AGENTS.md` and relevant handoff/status documents.
- Capture desktop/mobile screenshots of existing state and interactions.
- Identify exact clutter and collision points in the currently rendered UI.
- Establish working unit/build/browser baseline.

### Milestone 1 — Design system + brand/header + layout hierarchy
- Establish CSS tokens, type scale, spacing, status colors and consistent controls.
- Improve brand, top bar, first-screen premise and primary CTA.
- Rationalize left sidebar; make secondary tools collapsible and discoverable.
- Keep desktop city dominant and preserve all actions.
- Verify screenshots and major functional flows.
- Suggested commit: `style: refine Ctrl Z interface hierarchy and design system`.

### Milestone 2 — Truthful live system dashboard + simulation controls
- Create reusable City Systems display sourced from real domain state.
- Improve outage feedback and timeline clarity without changing clock mechanics.
- Verify all health statuses, color semantics, time/history interactions.
- Suggested commit: `feat: surface live city systems and clearer simulation controls`.

### Milestone 3 — Building inspector and feedback
- Improve service/scenery inspector layout, action hierarchy and statuses.
- Preserve accurate disable reasons, gold highlights and camera framing.
- Refine notification, loading, empty and error states.
- Suggested commit: `style: polish contextual building inspection and feedback`.

### Milestone 4 — Dedicated mobile experience
- Implement mobile-first map-stage composition and progressive panels.
- Make controls reachable; ensure minimap, inspector, timebar and main CTA do not overlap.
- Validate 360/390/430 widths, touch, orientation and safe-area behavior.
- Suggested commit: `feat: introduce touch-first Ctrl Z interface`.

### Milestone 5 — Optional guided experiment + final art direction
- Add a non-blocking, skippable interactive guide tied to real actions.
- Polish subtle animations and visual hierarchy; honor reduced motion.
- Run all regression/performance/accessibility gates and record before/after captures.
- Suggested commit: `feat: add optional interactive first-experiment guide`.

You may further subdivide or reorder commits if needed. **Only commit tested, coherent milestones** and push to `origin/main` as previously authorized, verifying the remote SHA each time. Never force-push. Update `docs/DEVELOPMENT_STATUS.md` with tangible changes and honest remaining limitations. If interrupted, leave an actionable status note, preserving all unfinished local changes.

## 14. Required test coverage and acceptance criteria

### Functionality

- All existing unit and browser tests remain passing; add/update tests intentionally rather than relaxing assertions.
- Remove Electricity and Restore Electricity still change the real simulation correctly.
- Mode switching, investigation, evidence/diagnosis, supplies, dependencies, replay, undo, reset, branching and persistence continue to work.
- City Systems indicators always match underlying `status()` / `serviceCapacity()` / appropriate domain results.
- Sidebar quick-navigation, service selection, ordinary scenery inspection and minimap work.
- Inspector action disabled reasons and availability reflect real reducer rules.
- Any new tutorial advances only from real user actions; Skip/replay work; no state corruption.
- Gold hover/glow and service name labels retain their current behavior.
- Existing car movement/parking and courier direction work as before; unrelated changes avoided.

### Visual quality

- Screenshot before/after for **desktop first load, mobile first load, blackout, selected hospital, selected logistics hub, inspector expanded, active timeline, and a restored/replay state**.
- Map assets and approved environment visuals stay unchanged; compare screenshots and source diffs to verify the UI did not degrade them.
- No overlapping minimap, timebar, inspector, toolbars, tutorial or top header at tested resolutions.
- Initial layout shows the main map plus one obvious primary action above the fold on phone and laptop.
- Important text is readable without extreme zoom; status colors remain legible at night and for color-impaired users.
- Avoid clipped labels, horizontal scrolling and noninteractive click targets.

### Performance

- Benchmark cold-load canvas readiness, frame activity, map panning/zooming, idle draw calls and memory-impact where tooling permits.
- Do not regress mobile playability to gain desktop polish.
- Respect low-power mode and `prefers-reduced-motion` without unintentionally freezing essential game state updates.
- Keep UI animation state separate from simulation clock, deterministic replay and data persistence.

### Accessibility

- All visible controls have semantic labels, keyboard focus order, visible focus indicators and useful accessible status announcements.
- Buttons should not use color alone to communicate success, error or enabled state.
- Close Escape and sheet/menu focus behavior must be predictable.
- Touch-only and keyboard-only users can reach the primary workflows.

### Deployment

- `npm run build` and the project's relevant test scripts must pass (inspect actual package scripts before invoking).
- GitHub Actions and GitHub Pages must still deploy cleanly.
- Verify the actual built site after deployment, not just the successful workflow badge.
- Report exact completed milestone commits, screenshots/test evidence and unresolved limitations; never claim physical phone testing if only Chromium emulation was used.

## 15. Strict scope guards

**DO:** redesign page structure, UI layout, CSS tokens, headers, typography, panel composition, dashboards, mobile drawers, contextual hints and optional onboarding that uses existing simulation events.

**DO NOT:** regenerate buildings, recreate the map, change city colors/roads, change the golden landmark art, move service buildings, adjust route geometry, add new simulation mechanics, remove reports, change save semantics, change deployment or claim Embarko integration. No fake gameplay and no generic template takeover.

If a desirable UI change requires touching protected map code, first try adapting the UI overlays. If that fails, make the smallest possible reversible change, explain why, add regression coverage and preserve approved visuals. Avoid asking for approval on routine in-scope decisions; follow existing project instructions and take sound defaults.

## 16. Definition of done

The task is complete only when **the map still looks exactly like the creator-approved map**, and a first-time visitor on both laptop and phone can immediately grasp the premise, act, observe truthful system changes, inspect a facility, make an intervention and undo/compare — with a clear, visually impressive interface that is easier to operate than the original.

**Final report must contain:** summary of visible improvements, actual screenshots and tested viewport widths, tests/build results, commits pushed to `origin/main`, GitHub Pages deployment verification, and any known issues. Do not mark it done solely because code builds or documentation was updated.
