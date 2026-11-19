# Ctrl Z development

Ctrl Z is a browser-based isometric city simulation. Start with the [handoff](docs/handoff/CODEX_HANDOFF_README.md) and [development status](docs/DEVELOPMENT_STATUS.md) for the current baseline, completed work and remaining checks. The [project brief](docs/PROJECT_BRIEF.md), [vision](docs/PROJECT_VISION.md), [architecture](docs/ARCHITECTURE.md) and [performance notes](docs/PERFORMANCE.md) explain the product and runtime.

## Current scope

- **Gameplay.** Use the [upgrade brief](docs/gameplay/CODEX_GAMEPLAY_UPGRADE.md), [gameplay specification](docs/gameplay/README.md) and [verification captures](docs/gameplay/verification/). Preserve the approved gameplay UI, map and art, renderer and camera, routes, six service identities and gold labels, minimap, mobile controls, simulation and saves.
- **Landing page.** Use the [animated brief](docs/landing-page/CTRL_Z_ANIMATED_LANDING_PAGE.md), [exact-reference brief](docs/landing-page/CTRL_Z_EXACT_REPLICA_OPTIMIZATION.md), [visual reference captures](docs/landing-page/animated/reference/) and [implementation plan](docs/landing-page/ANIMATED_PLAN.md). Preserve the six-service schematic, original hero and ticker, narrative beats, aligned HUD-free city captures, reversible blackout with manual and reduced-motion controls, direct full-screen play and optional lazy embed. Match the approved desktop layout and preserve the mobile refinements. Keep changes out of game code, art and UI during landing-only work. Check actual desktop and mobile entry and screenshots for affected visual states.
- **City art.** The current city is approved. For separately authorized city work, use the [visual overhaul record](docs/city-art/VISUAL_OVERHAUL.md) and [Lantern Yard plan](docs/city-art/NEON_NEIGHBORHOOD_PLAN.md). The approved runtime lineage begins at commit 27 (9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f) and excludes the rejected designs in commits 28?29. Use Antahonist Neon City as the primary visual reference and [pixel-city-reference-2.png](design/pixel-city-reference-2.png) as secondary inspiration. Verify third-party licenses and provenance, and identify original reference-inspired art. For city redesigns, build and visually review one authored neighborhood before expansion. Test building alignment, connected streets, signage, lighting, infrastructure identities and default framing across the opening area. Review real desktop/mobile opening, intersection, infrastructure and neighborhood captures at each visual milestone.
- The [archive](docs/handoff/archive/) contains superseded briefs for historical context. Use the current task and handoff for authorization and next steps.

## Workflow and verification

- Inspect the existing code and Git state before changes. Fetch and inspect upstream before synchronizing. Preserve unrelated and in-flight work, and finish any current operation safely.
- Make small, independently testable milestones. Commit each completed feature, bug fix or meaningful improvement with a descriptive Conventional Commit. Split independent work when it can stand on its own, and keep required regression coverage with its fix.
- Run relevant checks before every commit. Use targeted checks during implementation and run the production build and appropriate regression gate at the end of a runtime milestone. Fix errors before committing. Diagnose failed checks before rerunning, avoid repeating successful checks without relevant changes, and avoid duplicate captures, unnecessary rereads, excessive planning, and unrelated cleanup. Mandatory checks and core-game regressions take priority.
- Record actual checks, decisions, open issues, deferred validation and the next step in the [development status](docs/DEVELOPMENT_STATUS.md). Keep the [handoff](docs/handoff/CODEX_HANDOFF_README.md) current.
- Maintain the dark neon isometric art and smooth mobile performance. Keep real simulation logic separate from rendering, and keep the architecture modular and maintainable.

## Git and deployment

- Review the explicit staged file list and diff. Keep dependencies, caches, build output and secrets out of Git.
- The creator authorizes automatic commits and verified pushes to **origin/main** in **reedhan-g/Ctrl-Z** for each completed, tested milestone. Verify the remote SHA after pushing and request approval if Git requires it. Preserve history and unrelated changes. Never force-push, amend, rewrite history or reset away work.
- Retain the existing [Pages workflow](.github/workflows/static.yml) on pushes to main and manual dispatch. [CI](.github/workflows/ci.yml) is for testing and building. Keep repository visibility and additional public deployments or Embarko claims separately authorized.
