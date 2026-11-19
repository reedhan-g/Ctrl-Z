# Ctrl Z — Crisis, Emergencies & Rewind Comparison

> Product and implementation brief for the next **gameplay** iteration of Ctrl Z.\
> The existing map, city artwork, mobile game controls, and landing page are already approved. **Do not redesign them.**

## 1. Vision

Make Ctrl Z feel like a game about consequential decisions, rather than only a city simulation that the user observes.

**Primary loop:** **Start a crisis → spot a failure → inspect a facility → spend scarce support → reach the deadline → compare the outcome → rewind and try differently.**

Implement **exactly three** additions:

1. **Crisis Mode:** a short, winnable, measurable blackout challenge.
2. **Reactive Emergencies:** important state changes lead the player to facilities and real response actions.
3. **Rewind & Compare:** compare the same simulated instant across two genuine decision branches.

No new districts, buildings, vehicles, elaborate AI, new infrastructure systems, new sprite packs, or unrelated visual redesigns are required.

## 2. Existing systems to reuse

The current React / TypeScript / Vite / PixiJS / Zustand game already provides:

- Six services: **North substation, St. Mira Hospital, Waterworks, Maple residences, Meridian telecom, East delivery hub**.
- The blackout, reserve deadlines, water/communications dependencies, and service-capacity calculations in `src/simulation.ts` and `src/dependencies.ts`.
- Two backup-supply interventions (`boost`) that add **eight hours** to a facility's reserve deadline.
- A 24-hour deterministic simulation, play/pause, speed, timeline scrubbing, undo, branch/replay, and restore in `src/gameState.ts` / `src/replay.ts`.
- Existing map selection, camera framing, building inspector, incident log, fleet visuals, responsive UI, and save/resume.
- Two investigation cases (`dispatch`, `wards`) in `src/cases.ts`.
- Service-hours, dispatch backlog and branch comparisons calculated by `src/report.ts` and `src/logistics.ts`.

**Do not duplicate these engines.** Add a thin mission layer and presentations on top. Sandbox and Investigation keep their existing rules.

## 3. Mechanic 1 — Emergency Crisis Mode

### Player experience

Offer a third mode alongside **Sandbox** and **Investigation** named **Crisis**. It must be discoverable but not auto-start on visitors' behalf.

The introduction says:

> **CRISIS 001 · Meridian Blackout**\
> The regional grid is unavailable for 12 simulated hours. Maintain essential services until repair crews restore power. You have two emergency supply interventions.

Show an unobtrusive mission strip / panel containing:

- **Time remaining:** `12:00` down to `00:00` in simulation hours.
- **Emergency teams:** `2 / 2` initially, decreasing when a legitimate `boost` is recorded.
- **Service conditions:** current operational/degraded/offline statuses from the existing simulation.
- **Main goal:** preserve as much essential service availability as possible, with a visible target.
- **Progress:** timeline-based, not a disconnected real-world timer.

### Rules

- **Time horizon:** exactly **12 simulated hours** after the blackout starts.
- **Supply budget:** keep the existing limit of two interventions, existing reserve semantics, and all existing restrictions.
- **No early grid restore** during active Crisis Mode; this is the primary constraint that makes resources matter. Sandbox and Investigation retain their existing restore behavior. Make this restriction understandable in the interface, not a mysteriously disabled button.
- **Win condition:** at the 12-hour mark, at least **36 service-hours** across the five non-grid services (60% of the theoretical maximum `5 × 12 = 60`) **and at least three of those five services providing nonzero capacity at the deadline**. The score must come from the real service-capacity and replay logic; no fake percentages. Reassess this threshold against real integration tests and adjust only if demonstrably unattainable or trivial; record any change in this brief.
- **Failure:** 12 hours are reached but the win conditions are not both met. Display what was actually preserved and let the player retry.
- **Deadline:** stop Crisis gameplay at 12h and show the outcome. If depicting automatic regional grid repair, ensure it is recorded deterministically in the mission's event/replay model, rather than secretly altering shared Sandbox state or bypassing history.
- **Seeking/rewinding:** reconstruct mission status and scores from recorded simulation state; never trigger duplicate completion events or double-spend resources when scrubbing.
- **Existing saves:** remain loadable. If adding a serialized `mode` or mission payload, migrate old saves safely with defaults and tests.

### Completion panel

Display actual calculated outcomes:

- **City stabilized / Crisis unresolved** (based on defined success conditions).
- **Service-hours preserved** (for example `41.2 / 60`; actual value calculated, not hardcoded).
- **Services active at deadline**.
- **Interventions used**.
- **Difference from no-intervention baseline** at 12h, using `replayAt` and `branchOutcome`.
- **Replay / Try a different response / View comparison** actions.

A completed challenge should lead naturally to the Rewind & Compare mechanic.

### Suggested small UI

```text
CRISIS 001  /  MERIDIAN BLACKOUT
Keep essential services running until repairs finish.
REPAIR ETA      08:00 HOURS
SUPPLY TEAMS    1 / 2
SERVICES ACTIVE 4 / 5  (excluding grid)
[ Mission progress ---------------- ]
```

These lines are a *visual example only*: the real application must display actual game values.

## 4. Mechanic 2 — Reactive City Emergencies

### Player experience

State changes should generate a concise, non-blocking incident card near the map or HUD, rather than merely changing a small status label.

Example at the real telecom battery deadline:

> **04:00 · COMMUNICATIONS LOST**\
> Meridian telecom exhausted its battery. The delivery hub is switching to manual dispatch.\
> **[Inspect telecom]**  [Dismiss]

Selecting **Inspect telecom** should reuse the current building selection/camera focus and building inspector. From the inspector the player may choose the existing backup-supplies action if legitimately available.

### Trigger design

Use real transitions from `status(id, snapshot)`, `serviceCapacity`, reserve deadlines and the dependency graph; suggested important moments include:

- **Maple residences:** common-area battery depleted, ~2h in an unsupported blackout.
- **Meridian telecom:** battery depleted, ~4h; this may degrade delivery hub dispatch.
- **Waterworks:** pumps stop when its reserve ends, ~6h, affecting downstream homes/hospital with modeled buffers.
- **East delivery hub:** its reserve runs out, ~8h unless extended.
- **St. Mira Hospital:** generator-fuel or water availability becomes critical according to the *actual* modeled state, not an invented fixed 12h failure.

Trigger times can change because of interventions; never fire an alert at a hardcoded time regardless of state. Avoid misleading alert copy (e.g., don't claim a hospital has failed when it still has an active water buffer).

### Anti-spam and determinism

- A transition should create one *relevant* event per branch crossing, not a notification every render, tick, or frame.
- Keep a short visible incident history and a single prominent current notification. A dismissed notification should not repeatedly reappear at the same point in the same run.
- During fast-forward, summarize multiple skipped transitions in chronological order without an overwhelming animation cascade.
- Rewind, seek, replay and branch changes should show the correct current incidents; do not emit fake new emergencies just because the React component remounted.
- Make notifications keyboard accessible, dismissible, and readable on phones.
- A building can be emphasized with a restrained existing-outline/marker effect and optional camera focus **only when the user chooses Inspect**; never wrest control from someone dragging or zooming the map.
- If state changes back to available, clearly report recovery. Do not claim courier delivery animation is physically linked to the action: supply actions currently apply immediately by simulation design.

### Suggested UI

```text
⚠ 04:00  /  CRITICAL SERVICE CHANGE
Communications lost
Meridian Telecom's backup battery is exhausted.
East Delivery Hub has switched to manual dispatch.
[ Inspect facility ]    [ Dismiss ]
```

## 5. Mechanic 3 — Rewind & Compare

### Player experience

Make rewind the identity of Ctrl Z. After the player has at least two genuinely different replay branches, expose a clear **Compare Futures** action.

At a common chosen hour, evaluate both branches via existing deterministic replay:

- **Original outcome** versus **Revised outcome**.
- Available/limited/offline status and actual capacity for each of the five services.
- **Service-hours saved or lost** over the same 12-hour crisis window (or the common selected time when comparing mid-run).
- Dispatch backlog and interventions used, where appropriate.
- A brief plain-language description of which decisions explain the difference, grounded in recorded events. Do not manufacture causal certainty beyond the dependency model.

### Map visualization

Keep the **existing single Pixi map**. Provide a lightweight difference overlay or existing highlight mechanism:

- **Improved service:** restrained green/mint outline and `↑ improved` label.
- **Worsened service:** muted amber/red outline and `↓ worsened` label.
- **Unchanged:** no additional glow.
- **Selection:** inspecting a marked building shows side-by-side **original vs revised** service status at the same hour.
- **Scrubbing:** differences follow the selected comparison time using replay state; no second simulation loop or second world render.

If map overlay integration becomes costly or risky, implement a clear **City Systems comparison list first** (same benefits and controls), then add map highlights as a separate targeted step. Do not hold the whole release for elaborate overlays.

### UI concept

```text
TWO FUTURES. ONE DECISION.
At 12:00 simulated hours

ORIGINAL RESPONSE      REVISED RESPONSE
Service-hours: 28.2   Service-hours: 42.4
Teams used:    0       Teams used:    2

+14.2 service-hours preserved
[ Compare on map ]   [ Rewind and retry ]
```

Values are examples only. Compute from the current branches with `replayAt`, `branchOutcome`, and `serviceCapacity`, not fixed demo numbers.

## 6. Visual direction

- Preserve the dark neon isometric city as the dominant canvas; **no map/art rebuild**.
- Keep the existing functional inspector, timeline, minimap, selected-building framing, accessibility and mobile interactions.
- New mission/incident/comparison UI should look like the existing restrained control-room system, not a separate dashboard pasted over the map.
- Use semantic status accents only: muted gold for warnings, red for disruption, cyan/mint for valid recovery/improvement. Readability must not depend solely on color.
- Animations: modest alert entrance, icon pulses only when meaningful, brief improvement highlight. Avoid modal interruptions, confetti, heavy effects, and continuous new rendering loops.
- On phones, prioritize **one-line mission status + bottom-sheet details**; don't block panning, pinching, building labels or timeline controls.
- Avoid fabricated numerical telemetry. All comparison values must come from the simulation.

## 7. Implementation scope and suggested code organization

Inspect and reuse before creating new modules:

- `src/ScenarioPanel.tsx`: third mode entry and mission summary.
- `src/gameState.ts`, `src/game.ts`, `src/replay.ts`: coherent, deterministic game transitions and mode/mission state; preserve existing action behavior in other modes.
- `src/simulation.ts`, `src/dependencies.ts`: sources of truth; avoid changing domain rules except demonstrated mission necessities.
- `src/Timeline.tsx`: deadline/progress and comparison entry.
- `src/BuildingInspector.tsx`, camera/selection utilities: route Inspect actions through existing behavior.
- `src/CitySystems.tsx`, existing map overlays: service comparison markers.
- `src/report.ts`: reuse or wrap calculation of comparable service-hours and branch outcomes.
- Save/load migration utilities and affected tests.

Consider small separate modules such as `src/crisis.ts`, `src/incidentEvents.ts`, `src/CrisisPanel.tsx`, `src/IncidentToast.tsx`, and `src/CompareFutures.tsx` **only if needed**. Names are suggestions, not a request to create empty scaffolding. Avoid duplicated stores and large dependency changes.

## 8. Acceptance tests

### Crisis

- Existing Sandbox & Investigation workflows behave exactly as before.
- Crisis starts at t=0 in a reproducible blackout state.
- Crisis cannot restore power prematurely; 12h deadline ends the mission.
- Two legitimate supply interventions maximum; resources are not double-counted after rewind/seek.
- Win/fail reflects **real calculated state**, not arbitrary UI values.
- A deterministic no-intervention baseline is calculated over the same window.
- Old saves remain loadable; new crisis saves round-trip correctly if supported.

### Incidents

- Real status transitions trigger alerts at the correct modeled times.
- Fast-forward across multiple thresholds does not spam duplicates.
- Dismiss, inspect and recovery work; auto-camera focus is user-initiated.
- Seeking backward / replaying / changing branches updates the incident list consistently.
- Touch/keyboard and notification dismissal work.

### Comparisons

- Both branches are reconstructed at the **same** time.
- Service-hours are integrated over the **same horizon** and derived from actual model data.
- Changed facilities get correctly labeled status differences; unchanged facilities do not.
- Compare mode does not affect simulation state, replay history or camera position unless the user explicitly selects a facility.

### Release / regressions

- Desktop: 1280–1440px. Mobile: 320, 390, 430px; at least one short landscape viewport.
- No obscured start/mission actions, overlapping inspector/timeline, or blocked gestures.
- No landing page, city geometry, assets, save slot, or basic camera changes.
- Run focused domain tests per milestone, focused browser tests for visible behavior, one final production build and relevant regression pass.
- Screenshots should include **mission start**, **incident alert**, **comparison** at desktop and phone widths.

## 9. Efficient work plan

1. **Checkpoint A — Crisis Mode:** implement objective, limited restore, timer, deterministic end result. Test and commit.
2. **Checkpoint B — Reactive Emergencies:** transition-derived alerts and Inspect action. Test and commit.
3. **Checkpoint C — Compare Futures:** actual branch numbers and concise results, followed by lightweight map/status markers only where safe. Test and commit.
4. **Checkpoint D — Finishing:** responsive UI, accessibility, screenshot review, build, targeted regression, deployment verification. Avoid rewriting completed milestones or repeating the entire test suite after every CSS tweak.

Keep short checkpoint notes in the project's existing development-status file if required by `AGENTS.md`. Do not create a chain of repetitive reports. Do not commit broken work just to make a checkpoint.

## 10. Definition of done

The player can start an emergency mission, understand what they must preserve, react to a real cascading failure, make a resource trade-off, complete a 12-hour run, and **see how changing that trade-off changes the city**—with no regression in Sandbox, Investigation or the original art.

This README defines the intended feature set. **The companion `docs/gameplay/CODEX_GAMEPLAY_UPGRADE.md` gives the agent execution instructions.**
