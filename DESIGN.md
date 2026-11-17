---
name: "Ctrl Z — Editorial Homepage"
description: "Minimal editorial presentation for the existing Ctrl Z simulation."
colors:
  page-ground: "#111418"
  page-raised: "#191e23"
  page-ink: "#eef0eb"
  page-muted: "#abb5b9"
  page-accent: "#8bd9d2"
  page-edge: "#343c43"
  page-warning: "#e7b56e"
typography:
  display:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(4rem, 9vw, 6rem)"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.85rem, 3.3vw, 2.75rem)"
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: "-0.035em"
  tagline:
    fontFamily: "Manrope, sans-serif"
    fontSize: "clamp(1.6rem, 2.4vw, 2rem)"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Manrope, sans-serif"
    fontSize: "20px"
    fontWeight: 600
    lineHeight: 1.65
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.65
  intro:
    fontFamily: "Manrope, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.65
  action:
    fontFamily: "Manrope, sans-serif"
    fontSize: "14px"
    fontWeight: 800
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
  preview-option:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 600
    lineHeight: 1.65
  preview-note:
    fontFamily: "Manrope, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.65
  preview-state:
    fontFamily: "Manrope, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: 1.65
rounded:
  preview-option: "3px"
  action: "4px"
  preview-group: "6px"
spacing:
  inset: "4px"
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
  invitation: "72px"
  major-section: "80px"
components:
  button-primary:
    backgroundColor: "{colors.page-accent}"
    textColor: "{colors.page-ground}"
    typography: "{typography.action}"
    rounded: "{rounded.action}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "{colors.page-ink}"
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
    backgroundColor: "{colors.page-accent}"
    textColor: "{colors.page-ground}"
  navigation:
    textColor: "{colors.page-ink}"
    typography: "{typography.label}"
  feature-list-item:
    padding: "24px 0"
  closing-invitation:
    backgroundColor: "{colors.page-raised}"
    padding: "72px 0"
---

# Design System: Ctrl Z — Editorial Homepage

## Overview

**Creative North Star: "Editorial, with consequence"**

**Direction — Editorial, with consequence (UI_REDESIGN.md).** Retain the asymmetric editorial composition, geometric Manrope and cool graphite/cyan palette. Keep motion restrained: one natural-scroll powered/blackout comparison carries the signature, with instant manual endpoints for reduced motion. Reject a full-screen cinematic hero and pinned scroll spacer. A shallow authentic city glimpse supports the wordmark; the existing playable game remains isolated and protected.

Strong typography and clean hierarchy introduce the playable city through a dark reading surface, generous spacing and restrained neon accents. Open text blocks and actual game previews carry the presentation. The mood is calm, direct and precise; the controls feel clear and restrained.

This system applies only to the homepage implemented in `src/Landing.tsx`, `src/BlackoutPreview.tsx`, `src/useBlackoutReveal.ts` and `src/landing.css`, loaded by `src/landing-main.tsx` through `index.html`. The embedded and full-screen game at `simulation.html` is a separate, approved system. Its `src/console.css` and `src/style.css`, HUD, controls, service identities, city artwork, renderer, camera, simulation and saves remain protected. These landing tokens must not replace incumbent game tokens. The city retains the Antahonist Neon City direction, secondary `design/pixel-city-reference-2.png` inspiration and commit-27 lineage; rejected commit-28/29 designs remain excluded.

**Key Characteristics:**
- Strong typography and clean hierarchy.
- Generous spacing and open text blocks.
- Dark overall theme with restrained neon accents.
- Actual gameplay imagery with clear preview captions.
- A local, aligned blackout reveal with manual control.
- An isolated, on-demand playable game below the introduction.

## Colors

Cool graphite neutrals keep the page quiet around window cyan and a restrained consequential amber.

### Primary
- **Window cyan** (`page-accent`): entry actions, the selected preview option, focus outlines and text selection.

### Secondary
- **Consequential amber** (`page-warning`): disconnected-grid status and the thin reveal edge during interruption. Transition status uses off-white; connected status uses cyan.

### Neutral
- **Graphite** (`page-ground`): page ground and dark text on cyan actions.
- **Raised graphite** (`page-raised`): the preview switch and closing invitation.
- **Off-white** (`page-ink`): primary text and the primary action's hover fill.
- **Cool grey** (`page-muted`): reading copy, captions and supporting notes.
- **Quiet edge** (`page-edge`): separators and the scrollbar thumb.

**The Restrained Neon Rule.** Use window cyan for entry, selection and focus; let the actual city previews carry the richer game palette.

## Typography

**Display Font:** Manrope, with sans-serif fallback.
**Body Font:** Manrope, with sans-serif fallback.

The variable font is self-hosted from `src/assets/fonts/manrope-variable.ttf`, supports weights 200–800 and uses swap loading. Its open forms and compact weight changes establish hierarchy without a separate decorative face. The frontmatter records the actual desktop roles; mobile changes are specified below.

### Hierarchy
- **Display:** the short Ctrl Z title, with bold weight, tight tracking and a one-to-one line height.
- **Headline:** balanced section titles with medium weight and tight tracking.
- **Tagline:** the short premise, with a more open line height than the main title.
- **Title:** feature-list terms, distinct through weight rather than a container.
- **Body:** the default reading voice; concept copy is constrained to 53ch and feature descriptions to 52ch.
- **Intro:** supporting opening copy with a 39ch measure.
- **Label / Action / Caption:** navigation, entry actions and small supporting text, respectively. Use sentence case.
- **Brand:** the compact header wordmark, deliberately separate from the large display title; mobile uses 20px.
- **Preview option / Preview note:** the existing 13px control and supporting-note roles, with weight distinguishing action from prose; do not substitute them for body text.
- **Preview state:** the readable, semibold state beside the comparison.

**The Clean Hierarchy Rule.** Establish emphasis with size, weight and space; preserve readable text rather than adding tracked eyebrows or ornamental labels.

## Layout

The centered reading container is capped at 1200px with 56px side gutters. At 900px and below the gutters become 32px; at 600px and below they become 20px. The opening, editorial sections and closing invitation use equal two-column grids with a 64px gap, reduced to 32px at the middle breakpoint and stacked at the mobile breakpoint.

The desktop opening uses 56px above and 64px below; the concept uses 48px/64px. Preview and feature sections finish with 80px below. At the middle breakpoint the opening tightens to 40px/56px. Mobile uses 28px/40px opening padding, 32px/48px for the concept and 64px below preview and features. The header has a minimum height of 88px on desktop and 72px on mobile. The closing invitation uses 72px vertical padding (48px mobile); play begins after 72px (48px mobile). Anchor targets have a 32px scroll margin.

On mobile, the display becomes `clamp(4rem, 22vw, 6rem)`, the intro deliberately becomes 17px, navigation becomes 12px and the first informational navigation link is hidden while its content remains in the page. Title and premise/CTA precede the shallow city glimpse. Preview controls fill the available width and captions stack. The footer wraps at the middle breakpoint and stacks on mobile.

The opening glimpse is a bounded crop, 132px high (104px mobile), with a 420px desktop maximum width and object position 55% 38%. The main comparison uses a controlled-height frame, `clamp(280px, 48vw, 620px)` on desktop and `clamp(320px, 102vw, 440px)` on mobile. Both aligned layers use cover cropping at 50% 0; actual mobile captures are selected at 600px and below. Status and caption reserve height to prevent phase changes from shifting the layout. The game frame is a separate full-width region capped at 1920px, with height `max(760px, 100svh)`. It appears after an explicit play action or a direct `#simulation` entry.

## Elevation & Depth

The homepage has no shadows. Raised graphite, quiet separators, typography and whitespace create depth. Actual gameplay screenshots contain their own approved city lighting; do not reproduce that lighting as decorative homepage chrome.

**The Flat Surface Rule.** Keep editorial surfaces flat; reserve tonal layering for the preview switch and closing invitation.

## Shapes

The main composition and image figures are rectangular and open. Small, gently softened corners identify controls: entry actions, preview options and the enclosing preview switch use the frontmatter radius tokens. Thin separators organize prose and feature rows. Clipping is functional: bounded image crops and the comparison wipe. There is no card grid or glass treatment.

## Components

### Buttons

Clear, restrained entry actions use the primary button tokens with a minimum height of 52px. Off-white replaces cyan on hover (160ms ease-out background transition); press moves the control down 1px (120ms ease-out). All homepage links and buttons expose a 2px cyan focus outline with a 6px offset. Reduced motion removes transitions and press movement. Keyboard users also receive a skip link, normally positioned above the viewport and shown on focus.

### Preview Switch

Two sentence-case buttons sit inside a raised graphite group, separated by 4px. Each uses 13px type at weight 600 and a minimum height of 44px. The selected state is cyan with graphite text and is exposed through `aria-pressed`; unselected text turns off-white on hover. Mobile options share the full group width.

### Documentary Preview

Use actual, camera-aligned game captures; provenance is recorded in `src/assets/previews/PROVENANCE.md`. A powered base and absolutely positioned blackout layer share the same crop. Natural local scroll progressively reveals the blackout layer using `clip-path: inset(0 calc(100% - var(--blackout-reveal, 0%)) 0 0)`, with a thin amber edge only during transition. Progress is measured over a short viewport-relative window, capped at 420px. Passive listeners batch CSS-property writes through requestAnimationFrame; React updates only when phase/manual/reduced state changes. There is no opacity dissolve, entrance animation, loop, pinning, scroll interception or blank spacer.

Status and caption change through connected, interruption and disconnected phases; neither button is pressed during a partial reveal. A manual endpoint wins until the complete preview leaves the viewport, then automatic behavior resumes on re-entry. Direct `#preview` navigation starts connected and progresses with subsequent natural scroll. Reduced motion stays connected until a manual choice and switches endpoints instantly, with no reveal edge. Resize, visual-viewport change and tab return remeasure. Only preview presentation changes; these components import no game module and do not mount the game or mutate simulation/saves.

One descriptive image supplies the comparison alternative text; the duplicate blackout layer is decorative and hidden from assistive technology. Explicit image dimensions and fixed frame height reserve space. Images are lazy until near the viewport, then both layers are prepared together. Captions distinguish captures from live play.

### Feature List

Open definition-list rows use a quiet top separator, regular vertical spacing and title/body hierarchy. The first row omits its top border and padding. Do not turn these rows into decorative cards.

### Navigation

The wordmark is bold and tightly tracked; navigation is medium weight with 44px minimum link height and width. Entry remains an underlined cyan text link. Other links become cyan with a matching underline on hover (160ms ease-out color and underline-color transitions). Reduced motion removes transitions. The layout adapts at the recorded breakpoints without introducing a replacement menu.

### Closing Invitation and Game Entry

A raised graphite band repeats the two-column editorial rhythm and primary action. Below it, a separate play heading offers a full-screen link. Until requested, the live game is represented by text and a start button. Its same-origin iframe isolates the protected game styles; retain the loading status and accessible frame title.

## Do's and Don'ts

### Do:
- **Do** use strong typography, clean hierarchy and generous spacing.
- **Do** use window cyan for entry, selection and focus.
- **Do** use actual game previews with readable captions and accurate alternative text.
- **Do** keep paired captures aligned in the same bounded crop and let manual choice persist until the preview leaves view.
- **Do** preserve visible keyboard focus, touch target sizes and reduced-motion behavior.
- **Do** keep homepage styles isolated from the approved game system.

### Don't:
- **Don't** introduce generic SaaS cards, glass, decorative glow or ornamental cyberpunk clutter into the homepage.
- **Don't** invent metrics, testimonials, awards or unimplemented gameplay scenarios.
- **Don't** replace the protected game UI, city artwork or game tokens with this landing system.
- **Don't** add tracked eyebrows, section numbers or decorative icon grids to establish hierarchy.
