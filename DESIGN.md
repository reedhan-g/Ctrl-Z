---
name: "Ctrl Z — Cinematic Homepage"
description: "Meridian, interrupted: a monochrome introduction to the existing Ctrl Z simulation."
colors:
  page-ground: "#090909"
  page-raised: "#101112"
  page-ink: "#f2f1ee"
  page-muted: "#a5a5a3"
  page-index: "#666769"
  page-accent: "#f2f1ee"
  page-edge: "#303133"
  page-warning: "#f2f1ee"
  page-focus: "#8bd9d2"
  action-hover: "#d8d7d4"
  game-loading-ground: "#10171d"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(5rem, 24vw, 24rem)"
    fontWeight: 800
    lineHeight: 0.86
    letterSpacing: "-0.04em"
  tagline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2rem, 5.6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2rem, 4vw, 4rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  premise:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.3rem, 5.2vw, 5rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  story:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(2.4rem, 5.6vw, 5.5rem)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.04em"
  closing:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(3rem, 8.5vw, 8rem)"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.04em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  editorial:
    fontFamily: "Manrope, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.65
  intro:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "ui-monospace, Consolas, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.06em"
  navigation:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  action:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 700
    lineHeight: 1.65
  caption:
    fontFamily: "Manrope, sans-serif"
    fontSize: "12px"
    fontWeight: 400
    lineHeight: 1.65
  brand:
    fontFamily: "Manrope, sans-serif"
    fontSize: "23px"
    fontWeight: 800
    lineHeight: 1.65
    letterSpacing: "-0.035em"
  preview-title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.6rem, 2.8vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.08
    letterSpacing: "-0.04em"
  preview-option:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.65
  preview-state:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: 1.65
rounded:
  preview-option: "1px"
  action: "2px"
  preview-group: "2px"
spacing:
  inset: "4px"
  tight: "8px"
  compact: "12px"
  small: "16px"
  reading: "20px"
  regular: "24px"
  intermediate: "28px"
  group: "32px"
  compact-section: "40px"
  mobile-section: "48px"
  opening: "56px"
  section: "64px"
  mobile-major: "72px"
  major-section: "80px"
  closing-opening: "112px"
  cinematic-section: "128px"
components:
  button-primary:
    backgroundColor: "{colors.page-ink}"
    textColor: "{colors.page-ground}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "15px 28px"
  button-primary-hover:
    backgroundColor: "{colors.action-hover}"
    textColor: "{colors.page-ground}"
  preview-group:
    backgroundColor: "{colors.page-raised}"
    rounded: "{rounded.preview-group}"
    padding: "4px"
  preview-option:
    backgroundColor: "transparent"
    textColor: "{colors.page-muted}"
    typography: "{typography.preview-option}"
    rounded: "{rounded.preview-option}"
    padding: "10px 14px"
  preview-option-selected:
    backgroundColor: "{colors.page-ink}"
    textColor: "{colors.page-ground}"
  navigation:
    textColor: "{colors.page-ink}"
    typography: "{typography.navigation}"
  support-label:
    textColor: "{colors.page-muted}"
    typography: "{typography.label}"
  documentary-preview:
    backgroundColor: "{colors.page-raised}"
    height: "clamp(280px, 57svh, 620px)"
  consequence-beat:
    textColor: "{colors.page-ink}"
    typography: "{typography.story}"
    padding: "48px 0 64px"
  closing-invitation:
    backgroundColor: "{colors.page-ground}"
    typography: "{typography.closing}"
    padding: "112px 0 80px"
  game-frame:
    backgroundColor: "{colors.game-loading-ground}"
    height: "max(760px, 100svh)"
    width: "100%"
---

# Design System: Ctrl Z — Cinematic Homepage

## Overview

**Creative North Star: "Meridian, interrupted"**

Near-black space, oversized Manrope and restrained archival support text give the homepage a deliberate cinematic pace. Young Minds supplies the creator-pinned monochrome direction; Jake Roberts supplies the native-scroll rhythm. Actual city captures carry the color and the central interruption, while white actions make entry clear. The implementation uses local assets and browser primitives rather than template code or an animation library.

This system covers `src/Landing.tsx`, `src/landing.css`, `src/BlackoutPreview.tsx`, `src/useBlackoutReveal.ts` and `src/useLandingMotion.ts`, mounted through `src/landing-main.tsx` and `index.html`. The isolated game at `simulation.html` remains a separate approved system: `src/console.css`, `src/style.css`, all game UI/HUD, controls, service identities, city artwork, renderer, camera, simulation and saves are protected. Landing tokens never replace game tokens. Retain the game's Antahonist Neon City reference, secondary `design/pixel-city-reference-2.png` inspiration and commit-27 lineage; rejected commit-28/29 designs remain excluded.

**Key Characteristics:**
- Near-black monochrome with white entry controls and silver supporting text.
- Oversized uppercase Manrope with a local mono support role.
- Native scrolling, generous space and open editorial structure.
- One dominant, reversible crossfade between aligned real game captures.
- Bounded sticky enhancement with natural-flow and reduced-motion fallbacks.
- An isolated simulation loaded only when a visitor chooses to play.

## Colors

The palette is almost entirely black, off-white and silver; the real city supplies its own approved color.

### Primary
- **Signal white** (`page-accent`, `page-ink`): primary text, entry fill, selected preview fill and text selection. The action-hover token supplies the softer hover fill.

### Neutral
- **Cinema black** (`page-ground`): the opening, editorial sections, closing and inverse control text.
- **Frame black** (`page-raised`): the comparison switch and image-loading ground.
- **Silver copy** (`page-muted`): reading text, support labels and captions.
- **Quiet charcoal** (`page-edge`): hairline separators and scrollbar thumb.
- **Reserved index grey** (`page-index`): declared source token, currently unassigned; do not substitute it for readable silver support text.
- **Interruption white** (`page-warning`): retained compatibility token, currently unassigned; visible phase status remains off-white.
- **Game loading ground** (`game-loading-ground`): the iframe's protected game-colored background, not a landing panel color.

**The Monochrome Frame Rule.** Keep entry and selection white; reserve cyan (`page-focus`) for the visible keyboard-focus outline and let real captures carry the city palette.

## Typography

**Display Font:** Manrope, with sans-serif fallback.
**Body Font:** Manrope, with sans-serif fallback.
**Label/Mono Font:** ui-monospace, Consolas, monospace.

Manrope is self-hosted from `src/assets/fonts/manrope-variable.ttf`, with weights 200–800 and swap loading. Large uppercase display type supplies the drama. The mono stack supports the creator-requested archival labels without downloading a second font. Its Consolas fallback has an existing narrow detector exception in `.impeccable/config.json`.

### Hierarchy
- **Display / Tagline:** opening title and following line; desktop endpoint sizes, weights, tracking and line heights are recorded above. The title is never held behind an entrance animation.
- **Headline / Premise / Story / Closing:** observed size ramps for default section titles, editorial statement, consequence headings and concluding question. Premise and closing use uppercase; the consequence sidebar remains sentence case at 22px, weight 500, tracking −0.02em.
- **Editorial / Intro / Body:** editorial reading roles and default text. Premise copy uses a 48ch measure, consequence prose 44ch and intro 39ch.
- **Label:** uppercase support text with modest tracking; mobile opening and section labels become 10px. Scroll hint and story indices retain 11px.
- **Navigation / Action / Caption:** quiet links, heavier white actions and smaller explanatory copy; preserve distinct weights.
- **Brand / Preview title / Preview option / Preview state:** compact wordmark, comparison heading, endpoint choices and uppercase status. Preview-heading support and play support text are 14px; preview notes 13px; instructions and captions 12px.

**The Scale Before Ornament Rule.** Use size, weight and space for hierarchy; archival labels support meaningful content rather than inventing metrics or decorative information.

## Layout

The centered container is capped at 1440px, with 56px side gutters. At 900px and below gutters become 32px and the editorial gap halves from 64px to 32px. At 600px and below gutters become 20px and editorial columns stack. The normal-flow header has minimum height 88px (72px mobile); all three navigation links remain available on mobile. Section anchors have a 32px scroll margin.

The opening occupies `calc(100svh - 88px)`, with title above and copy/actions along the bottom. Mobile uses `calc(94svh - 72px)` and stacks the bottom content. Desktop opening padding is 40px/44px; mobile 44px/32px. Premise padding is 32px/128px, mobile 24px/72px. Preview bottom spacing is 128px, mobile 72px. Consequences use a 1:2 grid with a sticky 22px left title at 48px and three open rows of at least 52svh; mobile removes that sticky title and minimum row height. Closing uses the same black ground, at least 78svh with 112px/80px padding; mobile uses natural height and 72px/64px padding. Play follows with 64px top padding, mobile 48px.

Mobile title is `clamp(4rem, 24vw, 9rem)`, tagline `clamp(1.65rem, 6.3vw, 2.75rem)`, premise `clamp(2rem, 8.5vw, 3rem)`, story `clamp(2.2rem, 8.4vw, 3rem)` and closing `clamp(2.5rem, 12vw, 4.5rem)`. Intro, premise and story prose become 16px; wordmark becomes 20px and nav 12px. At widths 601px and above with height at most 600px, opening title/tagline form two columns: title `clamp(4rem, 12vw, 9rem)`, tagline `clamp(1.5rem, 3.5vw, 2.5rem)`, header 64px and compact 24px opening padding.

The comparison frame uses its frontmatter height on desktop and `clamp(280px, 42svh, 380px)` on mobile. Aligned captures use cover cropping at 50% 0; mobile assets are selected at 600px and below. Status and caption reserve at least 36px/48px on desktop and 68px/104px on mobile. At 900px the comparison heading stacks; mobile endpoint choices fill the group width. The full-width game frame is capped at 1920px.

Review evidence covers widths 320, 360, 390, 430, 768, 1280 and 1440, plus 844×390 landscape. Browser emulation does not establish physical-device or Safari verification.

## Elevation & Depth

The landing page has no shadows, glass, decorative glow or film overlay. Typography, empty black space, thin charcoal rules and the small raised comparison switch establish depth. Actual city captures retain their existing lighting.

**The Documentary Depth Rule.** Let the real city supply visual depth; keep surrounding editorial chrome flat.

## Shapes

Images and editorial regions remain rectangular. Entry actions and the preview group use minimally softened corners; endpoint options use the smaller radius token. Hairline rules structure the premise, consequence rows, closing and play boundary. Image overflow is clipped to its frame; the blackout layer crossfades by opacity. There is no directional wipe, reveal edge or card grid.

## Components

### Entry Actions

White entry controls use primary tokens and a 54px minimum height. Hover uses the softer white token over 160ms ease-out; pressing moves the control down 1px over 120ms ease-out. All links and buttons have a 2px cyan keyboard-focus outline with 6px offset. Reduced motion removes action transitions and press movement. A keyboard skip link appears at the upper left on focus.

### Navigation and Support Labels

The sparse header uses a bold wordmark and three links with 44px minimum width/height, spaced 40px apart (12px mobile). Play is always underlined; others gain an underline on hover with a 160ms ease-out state transition. Mono support text carries the meaningful premise marker, Meridian location, story indices and scroll hint. Source wording supplies the content; do not invent live counters or reports.

### Preview Switch

Two 44px-minimum sentence-case buttons sit in a raised group with a 4px gap. Selection is white with dark text and `aria-pressed=true`; unselected text brightens on hover. During partial progress neither endpoint is pressed. The group has an accessible name and both options describe the same frame and instruction.

### Documentary Blackout Scene

Use actual aligned captures documented by `src/assets/previews/PROVENANCE.md`. A powered base and absolutely positioned blackout layer share the same crop; `opacity: var(--blackout-progress, 0)` crossfades the latter. The scene sticks at 16px only when its complete measured stage plus 32px fits the visual viewport and reduced motion is off. An after-block adds bounded scroll distance, `min(60svh, 600px)` on desktop or `min(40svh, 360px)` on mobile. Short or zoomed viewports keep natural flow, with automatic progress over a viewport-relative window capped at 420px. Scrolling reverses the effect. No wheel interception or runtime animation dependency is present.

Passive listeners batch progress writes with requestAnimationFrame; React changes only for semantic phase, manual choice and reduced-motion state. Status and captions describe connected, interruption and disconnected phases. A manual endpoint persists until the entire outer preview section leaves view. Direct and repeated `#preview` navigation starts connected; resize, visual-viewport changes, font readiness, observed layout changes and tab return remeasure. Reduced motion disables pinning and automatic progression, leaving connected content immediately available until an instant manual endpoint choice.

The descriptive base image supplies alternative text; the duplicate blackout layer is decorative. Image dimensions and bounded frames reserve space. Both layers defer initially, then prepare together within 400px of the viewport. Captions identify actual gameplay captures. Preview presentation imports no game module and changes no simulation or save state.

### Editorial Premise and Consequence Rows

Open text, thin rules and generous space carry the explanation. Three ordered consequence beats combine meaningful indices, oversized headings and real-mechanics prose. The first row omits its border and top padding. Keep these rows open rather than turning them into service cards.

### Restrained Page Motion

Passive rAF updates drift the opening title by at most 48px and supporting copy by at most 15px across the first 600px of native scroll. Only the premise's editorial split and closing heading receive arrival treatment: already-visible opacity 0.72 and a 14px offset settle over 560ms with `cubic-bezier(.16, 1, .3, 1)`. Content initially in view or reached directly never waits for an entrance; observer threshold is 0.12 and each arrival completes once. Reduced motion sets transform to none, opacity to 1 and transitions to none. These enhancements remain secondary to the blackout scene.

### Closing and Game Entry

The giant closing question returns to the same near-black ground with a white Enter Meridian action and quieter full-screen link. The following play section supplies a visible Start simulation control until requested. Entry actions or direct `#simulation` navigation mount the isolated same-origin iframe, with loading status, accessible title and full-screen permission; the route remains `./simulation.html`. The existing embed home-link bridge returns to the site. The iframe loading ground belongs to the protected game boundary.

## Do's and Don'ts

### Do:
- **Do** preserve the monochrome frame, oversized Manrope and meaningful mono support text.
- **Do** use white entry and selection controls with visible cyan keyboard focus.
- **Do** use real, aligned game captures with readable captions and accurate alternative text.
- **Do** keep native scroll, bounded sticky enhancement and manual preview choice available together.
- **Do** preserve natural-flow, reduced-motion, touch and keyboard alternatives.
- **Do** keep landing presentation isolated from the approved game and its saves.

### Don't:
- **Don't** introduce teal panels, generic service cards, glass, decorative glow or fake film/loading effects.
- **Don't** invent metrics, testimonials, awards or unimplemented gameplay scenarios.
- **Don't** replace the protected game UI, city artwork, renderer or tokens with this landing system.
- **Don't** intercept scrolling, hide essential content behind motion or extend the held scene beyond its bounded runway.
