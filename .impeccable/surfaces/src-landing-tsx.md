---
version: 1
slug: "src-landing-tsx"
primary_target: "src/Landing.tsx"
related_targets: ["src/landing.css","index.html"]
---

# Landing-page audit and implementation plan

## Scope and audit

Requested 2026-11-16: a minimal editorial homepage, not an in-game redesign. Inspected React entry, App, global game styles, Vite/Pages base, Playwright navigation and current deployed captures before editing. Main and origin/main start at 0ac6f5a; origin/UI_FIX points to that same commit. No branch merge is needed. User-added skill/config directories are unrelated and must remain intact.

The root currently boots the entire control room, including game styles and Pixi. There is no separate project introduction, preview sequence or final entry CTA. The existing interface is functional and approved; its global header/main/section rules make mounting promotional content in the same document needlessly fragile. Existing tests assume root is the game, so only their navigation destination must change when root becomes the homepage.

Use a second static HTML entry, simulation.html, on the same origin and base path. Keep src/main.tsx and every game component unchanged. Root imports only the landing-page module/styles. Existing home link naturally returns to root. Saved experiments remain on the same origin under the same key. Direct game links and reload work without a SPA rewrite or a deployment-workflow change. This is the recommended placement assumption pending the optional user question, not a new standing preference.

## Design plan

The use scene is a visitor examining a night-city simulation on a laptop or phone; a dark reading surface keeps real city captures visually continuous without simulated HUD chrome.

- Graphite #111418: page ground.
- Raised graphite #191e23: preview controls and final invitation.
- Off-white #eef0eb: primary type.
- Cool grey #abb5b9: secondary copy.
- Window cyan #8bd9d2: entry action and focus.
- Quiet edge #343c43: separators where content changes.

Manrope is the self-hosted display/body family. Its open forms and compact weight progression give the short Ctrl Z name presence without borrowing the game's HUD typography. Use 96px maximum display, 36–48px section titles and 16–20px body, with modest negative tracking and readable measures. Typography and layout stay in landing-only CSS.

Chosen composition (left aligned):

```text
Ctrl Z                           About / Preview / Enter

Ctrl Z                 Undo the World.
                       Infrastructure simulation + clear premise
                       [Enter Simulation]

One switch.            Short concept explanation
A city of consequences.

Inside Meridian        Actual game preview + readable caption
                       [Quiet evening | Power removed]

                       Connected services / Limited responses / Rewind

What would you          [Enter Simulation]
keep running?
```

Compared a centered headline over a full-bleed city hero; rejected it because it makes the image the opening and repeats the cinematic game-site pattern the creator explicitly ruled out. The chosen asymmetric text composition spends its emphasis on the name and premise; screenshots appear as inspectable supporting evidence. No icon cards, fake metrics, glow, decorative grid, clipped geometry, tracked eyebrows or section numbers. Motion is limited to a short user-triggered preview dissolve, with an immediate reduced-motion alternative.

## Direction contract

THESIS: Present the consequences of one electricity decision through editorial text and real game evidence. The city remains the main product.

OWN-WORLD: Graphite, off-white, muted cool grey and restrained window cyan; Manrope; open text blocks, a documentary image figure and clear entry links. No card grid or ornamental cyberpunk chrome.

STORY: Understand the premise, examine Meridian before/after a power cut, learn about dependencies, supplies and rewind, then enter the unchanged game.

FIRST VIEWPORT: Small brand/navigation above a left-aligned 96px Ctrl Z title, offset premise and entry action; the concept begins below generous whitespace. Mobile stacks title, premise and CTA without hiding content.

FORM: seed: none (pinned). Creator's words: "Minimal editorial style", "Strong typography and clean hierarchy", "Dark overall theme with restrained neon accents", "A strong text-led opening section with the title 'Ctrl Z'", and the explicit concept, preview, features and final-CTA sequence. Build from the actual captures; no invented visual reference or standing workflow default.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Checkpoints and validation

1. Audit and documentation: preserve context, record scope/plan. Baseline 100 unit checks and production build pass.
2. Working homepage: two static entries, actual previews, accessible interactions and responsive layout; update game-test destinations only. Verify desktop/mobile entry, navigation, assets, no Pixi on homepage, game actions, minimap, save/resume and production build. Review real captures and independent design findings before commit.
3. Final evidence/documentation: record actual tests, screenshots, reviewer verdict and deployed result. Push every tested checkpoint to origin/main and verify remote SHA. Preserve both workflows and all protected game files.
