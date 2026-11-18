---
name: "Ctrl Z — Animated Meridian Landing"
description: "The invisible network, made visible before Meridian goes dark."
colors:
  page-ground: "#08090a"
  page-raised: "#101112"
  page-ink: "#f3f3ef"
  page-muted: "#a9acaa"
  page-index: "#666769"
  page-accent: "#f2f1ee"
  page-edge: "#303335"
  page-focus: "#8ce7d9"
  signal-line: "#537775"
  signal-structure: "#7d8884"
  signal-surface: "#182123"
  blackout-warm: "#e7b491"
  game-loading-ground: "#10171d"
typography:
  display:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(105px, 19vw, 270px)"
    fontWeight: 900
    lineHeight: 0.78
    letterSpacing: "-.088em"
  tagline:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(43px, 6.9vw, 105px)"
    fontWeight: 600
    lineHeight: 0.93
    letterSpacing: "-.075em"
  headline:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(2rem, 4vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  story:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(30px, 4.5vw, 64px)"
    fontWeight: 500
    lineHeight: 1.06
    letterSpacing: "-.065em"
  closing:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "clamp(55px, 10.5vw, 145px)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-.07em"
  body:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  editorial:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.06em"
  action:
    fontFamily: "Arial, Helvetica, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.65
rounded:
  precise: "1px"
  action: "2px"
  node: "50%"
spacing:
  micro: "4px"
  tight: "8px"
  compact: "12px"
  small: "16px"
  reading: "20px"
  regular: "24px"
  group: "32px"
  opening: "48px"
  section: "64px"
  major: "80px"
  cinematic: "128px"
components:
  button-primary:
    backgroundColor: "{colors.page-ink}"
    textColor: "{colors.page-ground}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "18px 23px"
  button-primary-hover:
    backgroundColor: "#bce6df"
    textColor: "{colors.page-ground}"
  ticker:
    backgroundColor: "#111313"
    textColor: "{colors.page-muted}"
    typography: "{typography.label}"
    padding: "20px 0"
  network-node:
    backgroundColor: "{colors.signal-surface}"
    textColor: "{colors.page-ink}"
    padding: "12px 16px"
  preview-switch:
    backgroundColor: "{colors.page-raised}"
    rounded: "{rounded.action}"
    padding: "4px"
  preview-option:
    backgroundColor: "transparent"
    textColor: "{colors.page-muted}"
    rounded: "{rounded.precise}"
    padding: "10px 18px"
  preview-option-selected:
    backgroundColor: "{colors.page-ink}"
    textColor: "{colors.page-ground}"
  documentary-preview:
    backgroundColor: "{colors.page-raised}"
    height: "clamp(280px, min(62svh, calc(100svh - 380px)), 610px)"
  game-frame:
    backgroundColor: "{colors.game-loading-ground}"
    height: "max(760px, 100svh)"
    width: "100%"
---

# Design System: Ctrl Z — Animated Meridian Landing

## Overview

**Creative North Star: "Meridian / the invisible network"**

The landing page makes infrastructure legible before it makes failure visible. Near-black editorial space, monumental Arial, precise circuit/orbit geometry and restrained mint signals establish a living system; a real HUD-free city capture then becomes the dominant, reversible blackout event. Motion is native, bounded and optional, with content complete before enhancement.

This system applies only to the landing presentation: `src/Landing.tsx`, `src/landing.css` and its focused landing components and hooks. The isolated simulation at `simulation.html` remains a protected visual and functional system. Its game UI/HUD, city art, renderer, camera, services, simulation, controls and saves do not inherit these landing tokens.

**Key Characteristics:**
- Near-black and off-white editorial ground with mint reserved for signals and keyboard focus.
- Oversized and outline Arial display paired with compact mono system labels.
- Precise vector infrastructure geometry and a truthful six-node, eight-edge dependency schematic.
- Slow ticker, bounded pointer/scroll depth and once-only kinetic rows with static and reduced-motion paths.
- One dominant reversible blackout using aligned, capture-only, HUD-free actual-game imagery.
- One direct full-screen play action, followed only by a small explicit lazy same-page embed.

## Colors

The frame is nearly monochrome; cool infrastructure tones explain connectivity, mint marks active signal/focus, and authentic game captures carry the broader city palette.

### Primary
- **Signal mint** (`page-focus`): moving signal routes, network pulses, progress and visible keyboard focus. It is functional and rare, never a panel fill.
- **Signal white** (`page-ink`, `page-accent`): principal text, outline strokes, selected controls and the decisive entry action.

### Secondary
- **Infrastructure line** (`signal-line`, `signal-structure`): fine hero circuitry, orbit geometry and schematic edges.
- **Blackout warmth** (`blackout-warm`): the disconnected-state indicator only.

### Neutral
- **Meridian black** (`page-ground`): page ground and inverse action text.
- **Raised black** (`page-raised`): preview and compact control grounds.
- **Silver copy** (`page-muted`): explanatory prose, captions and support labels.
- **Quiet charcoal** (`page-edge`): hairline rules, borders and rails.
- **Index grey** (`page-index`): reserved low-emphasis support material, never essential reading text.
- **Protected game ground** (`game-loading-ground`): iframe loading surface only.

**The Mint Signal Rule.** Mint communicates flow, progress or keyboard focus; it does not become a decorative wash or general brand background.

**The City Carries Color Rule.** Keep the editorial frame restrained so actual Ctrl Z captures remain the richest color event.

## Typography

**Display Font:** Arial, with sans-serif fallback.

**Body Font:** Arial, with sans-serif fallback.

**Label/Mono Font:** ui-monospace, Consolas, monospace.

The reference’s Arial / Helvetica stack supplies the landing’s display and body type. The hero combines a heavy solid title with an outlined word; section statements stay confident and compact. Mono labels identify real structure, sequence and state without pretending to be live telemetry.

### Hierarchy
- **Display:** monumental uppercase hero identity using the normative display token; mobile resolves to `clamp(70px, 18.5vw, 110px)`.
- **Tagline:** uppercase follow-through using the normative tagline token, with “the” rendered as a one-pixel outline.
- **Headline:** section headings using the headline token; the concept statement rises to `clamp(43px, 6.9vw, 94px)`.
- **Story:** kinetic consequence rows using the story token, with concise sentence-length explanations beside them.
- **Closing:** the final question uses the closing token and intentional line breaks as the page climax.
- **Body / Editorial:** default reading at 16px and concept copy at 19px; keep prose compact and measures narrow.
- **Label:** uppercase mono at 11px with modest tracking for section markers, state, captions and diagrams.

**The Scale Before Ornament Rule.** Create hierarchy through size, outline, weight and whitespace; never manufacture badges, metrics or decorative eyebrows.

**Hero Context.** The Meridian identifier sits above the wordmark at a readable 11px.

## Layout

The durable content width is 1160px with 45px desktop side clearance. At 900px it becomes a 21px gutter; at 600px it becomes 16px. The hero spans the viewport width and nearly the viewport height, with giant left-aligned type and infrastructure artwork occupying the right/rear. The introduction, context and action sit below the identity; on phones the artwork shifts right and the lower content stacks. Short landscape reduces type and decoration rather than hiding the action.

The story progresses in five clear beats: infrastructure hero and ticker, premise plus dependency schematic, panoramic blackout, three consequence rows, and one final play invitation. The dependency schematic uses an accurate six-node/eight-edge model: electricity feeds all five other services, water feeds residences and hospital, and telecom feeds logistics. Desktop routes are asymmetric; the mobile layout repositions nodes and paths without changing connectivity.

The blackout frame is `clamp(280px, min(62svh, calc(100svh - 380px)), 610px)` on desktop and uses dedicated mobile sources at 600px and below. Its sticky enhancement is bounded and conditional; short or zoomed viewports keep natural flow. The closing occupies roughly a viewport, while the optional embedded game remains a compact disclosure below the primary full-screen action. Evidence covers 320, 360, 390, 430, 768, 1280 and 1440 CSS-pixel widths plus 844×390 landscape.

## Elevation & Depth

There are no box shadows, glass panels, bloom or film overlays. Depth comes from scale, negative space, tonal layering, one faint radial hero wash, vector overlap and the real city image. Circuit/orbit motion and pointer response remain subtle enough to sit behind typography.

**The Flat Engineering Rule.** Lines and measured layering establish structure; decorative elevation does not.

## Shapes

The form language is rectilinear and technical: thin hairline rules, square image frames, one- to two-pixel control radii, rectangular network nodes and circular junction/orbit geometry. The circles describe systems and signals, not generic decoration. The blackout is a perfectly aligned opacity crossfade with no wipe edge or object movement.

## Components

### Entry Actions
White entry controls use square corners, `18px 23px` padding and a 54px minimum height. Hover softens the fill; focus uses a 2px mint outline with 6px offset; active moves 1px. Reduced motion removes transition and translation. The hero action jumps to the blackout; the closing action goes directly to `./simulation.html`.

### Infrastructure Hero
Original SVG circuitry, junctions and counter-rotating rings sit behind/right of the hero type. Dotted mint signals and three breathing nodes are low-frequency loops. A fine pointer moves the faint background light while native scrolling shifts the circuit field and title. Loops pause offscreen, when hidden, when the visitor pauses motion, under reduced motion and for save-data/static paths.

### Kinetic Ticker
A thin ruled strip repeats “Everything is connected · One failure. Many consequences. · Rewind the world” over 42 seconds. Duplicate text is decorative and hidden from assistive technology; a complete static sentence remains available to screen readers.

### Dependency Schematic
The bordered grid surface contains six labeled nodes and eight directed edges derived from the game dependency source. Water edges use mint, telecom edges are dashed, and faint mint signals travel along the same paths. A caption states that the diagram is simplified context, not live status, and records the hospital’s 12-hour water buffer.

### Documentary Blackout
The base and blackout layers are aligned actual-game captures with identical camera, bounds, time-zero setup and dimensions. They are captured from the unchanged canvas with HUD hidden only through screenshot-time styles; provenance and receipts live under `src/assets/previews/PROVENANCE.md` and `docs/landing-page/animated/capture/`. Desktop assets are 1685×692; mobile assets are 1290×1467. The eased crossfade holds both endpoints. A two-pixel rail mirrors progress below the Power on/off controls. A vignette and inset border frame the city, with a faint animated scan and a brief pulse on midpoint crossings in active-motion mode. Reduced motion disables automatic progression but keeps instant manual comparison.

### Consequence Rows
Three open, ruled rows pair mono sequence numbers with large headings and one compact sentence: failure, decision and rewind. They arrive once with a 22px rise and partial-opacity start over 560ms; static/reduced paths show them immediately. Do not turn them into cards.

### Closing and Game Entry
The closing question, faint orbital outline and one white “Enter Meridian” action form the climax. The primary action always opens the full-screen simulation. A small disclosure may load the same-origin iframe only after explicit visitor intent; it never auto-fetches during ordinary reading and never becomes a second promotional play section.

## Do's and Don'ts

### Do:
- **Do** preserve the near-black/off-white frame, mint signal role, oversized/outline Arial and meaningful mono labels.
- **Do** keep hero geometry original, precise and secondary to the title and first-view action.
- **Do** keep the six nodes and eight dependency edges faithful to the source model.
- **Do** keep ticker, pointer depth, arrivals and sticky behavior bounded, pauseable and fully legible when static.
- **Do** use aligned HUD-free actual-game captures with dimensions, receipts and provenance intact.
- **Do** make the blackout the dominant motion and provide manual, keyboard, touch and reduced-motion alternatives.
- **Do** route the single primary final CTA directly to `./simulation.html`; keep any embed explicit, secondary and lazy.
- **Do** keep landing presentation isolated from the protected game system and save state.

### Don't:
- **Don't** add labels beside the existing Meridian identifier.
- **Don't** invent telemetry, metrics, services, testimonials, awards or dependency relationships.
- **Don't** add cards, glass, glow, particles, 3D libraries, scrolling interception or loader theatrics.
- **Don't** use mint as a large surface fill or let supporting animation compete with the blackout.
- **Don't** use HUD-bearing, misaligned, edited, generated or externally sourced city imagery.
- **Don't** append a second large play pitch after the closing question.
- **Don't** change the game UI, city artwork, renderer, camera, controls, simulation, workflows or saves to match the landing page.
