---
version: 1
slug: "src-landing-tsx"
primary_target: "src/Landing.tsx"
related_targets: ["src/landing.css","index.html"]
---

# Editorial, with consequence — 17 November 2026

UI_REDESIGN.md was read completely. This is a refinement of the existing homepage, with zero game-code/art changes. Main and origin/main began at e60ae32; paused Embarko compatibility work was preserved and tested independently rather than discarded. User skill installations remain unrelated. Frontend Design and Impeccable guide the work; the UI Skills CLI is not locally installed, so no package or registry script is installed.

## Audit and direction

Keep Manrope, graphite #111418, raised graphite #191e23, off-white #eef0eb, cool grey #abb5b9, cyan #8bd9d2 and the open split composition. Add warm amber only for blackout state. Preserve the six-section story and on-demand iframe/full-screen entry. The current phone screenshot is too tall, and the original powered/blackout HUD captures have different heights/overlays. Fresh real world-region captures must have identical camera pan/zoom/origin and bounds before compositing.

The page introduces a systems-thinking game to a first-time visitor/judge: understand a power cut's consequences, then play. Macrostructure stays asymmetric editorial; type stays geometric Manrope; palette stays cool graphite/cyan with consequential amber; motion is restrained and local to the comparison. The memorable element is an aligned powered-to-blackout reveal over a short natural-scroll window. Reject a full-screen cinematic hero or sticky scrollytelling spacer. No new motion dependency.

```text
Ctrl Z + compact city glimpse | Undo the World / action-led premise / Enter
One switch                   | concise cause / consequence / intervention / replay
Inside Meridian              | Quiet evening / Power removed
aligned city scene           | natural local wipe + meaningful power state
Follow the connections       | three short real capabilities
What would you keep running? | final invitation
Play Ctrl Z                  | unchanged, on-demand game / full-screen link
```

## Interaction contract

Only preview presentation changes. Normal scrolling maps the image's passage through the viewport to a clipped blackout layer; no pinning, snapping, scroll interception or spacer. Manual endpoints override scroll until the complete preview leaves view, then scrolling resumes on re-entry. Direct #preview entry starts connected and progresses with the next natural scroll. Reduced motion keeps a stable connected capture and immediate manual switching. Only discrete state changes update caption/pressed state; animation-frame batching writes a CSS custom property without rendering React per pixel. Resize, visual-viewport zoom and tab-return remeasure.

Desktop uses a wide scene; phones use a controlled-height crop from an actual mobile capture. Both layers share dimensions and object position. One accessible image describes the comparison; its duplicate layer is decorative. Lazy images reserve layout space. Scrolling must not load Pixi, mount the iframe, alter storage or advance any game state.

## Tested milestones

A. Capture 390/1440 baseline and paired city states, verify camera/bounds equality and provenance. Record this plan.
B. Strengthen wordmark and CTA, compress phone whitespace, add a restrained authentic city glimpse, refine copy. Review 390/1440 screenshots and commit.
C. Add the local blackout reveal, manual priority/re-entry, reduced motion, state captions and tests. Review powered/half/blackout/manual/reduced screenshots on both devices and commit.
D. Finish touch targets, phone crop and microinteractions; verify 320/360/390/430/768/1280/1440 and landscape, zoom, slow images and keyboard. Commit independently.
E. Run unit/build and complete existing browser regression, verify published Pages, get the fresh finish review, update actual DESIGN/REVIEW receipts and push evidence. Physical phones/Safari remain unverified unless actually tested.

## Direction contract

THESIS: Let one real interruption explain the connected city before play.

OWN-WORLD: Existing Manrope and graphite/cyan editorial system, with amber reserved for the power-cut state. Open sections and truthful city imagery.

STORY: Remove electricity, see consequences, choose help, rewind; enter the unchanged game below.

FIRST VIEWPORT: Left-aligned bold Ctrl Z with a shallow real city glimpse, offset premise and primary CTA. On phones, title and CTA precede the glimpse within a compact opening.

FORM: seed: none (pinned). UI_REDESIGN.md names “Editorial, with consequence”, the retained split composition and the “scroll-driven blackout reveal” as the signature interaction. This extends the approved world, without a replacement identity exercise.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
