# Ctrl Z - Project Brief

## Product direction

**Ctrl Z - Undo the World.** An interactive browser-based isometric city simulation/investigation game in the fictional city of Meridian. Remove infrastructure or technology, explore causal consequences, inspect dependencies, intervene with limited resources, recover services, and rewind/branch to compare outcomes. Sandbox and hidden-cause Investigation are intended modes; a saved/shareable Resilience Report completes the experience.

Read **PROJECT_VISION.md** for the current consolidated vision. It incorporates the creator's clarified visual requirements and supersedes conflicting older descriptions. CTRL_Z_PROJECT_VISION.md is retained as the original vision source. DEVELOPMENT_STATUS.md distinguishes implemented behavior from planned work.

## Art direction

A readable, detailed dark neon pixel-art isometric city: individually distinguishable facades, entrances, storefront signs, roof equipment, stairs and visible intersections. Dark charcoal/purple mass with selective cyan, pink, lavender and amber light. Contemporary minimal UI; no generic vector towers, photorealism, full retro 8-bit styling or glossy dashboard aesthetic. Architectural quality and street breathing room take priority over building count.

Primary reference: **[Neon City by Antahonist](https://antahonist.itch.io/neon-city-cyberpunk-pixel-building-kit)**. Secondary: **design/pixel-city-reference-2.png**. Other local references remain supplementary. This supersedes the earlier visual-overhaul ranking; Mekai Games is not the governing reference. The locally authored atlas is original artwork, not purchased-kit art. No licensed Antahonist archive has been verified. The authored Lantern Yard plan is in **docs/NEON_NEIGHBORHOOD_PLAN.md**; actual new neighborhood art remains to be implemented and reviewed on desktop/mobile.

## Current foundation

React, TypeScript, Vite, PixiJS and Zustand. Six selectable buildings: substation, hospital, waterworks, residences, telecom and delivery hub. Rule-based electricity/water dependency effects, reserve depletion, two instantaneous supply actions, restore, exact manual-intervention undo, time controls, dependency tracing and an incident log. Pan, anchored zoom/pinch, mobile inspection and accessible building buttons exist.

The finite 60x60 world contains five visual districts, 284 scenery buildings, 144 shared ground sprites and six outer destinations with distinct block compositions. Six simulated services, three dispatch-driven couriers, both investigation cases, replay/comparison, report JSON and v1 saves are preserved. Camera/minimap navigation never advances simulation. Local textures use nearest filtering and retained culling; normal zoom shows architecture, City overview offers wider navigation. DEVELOPMENT_STATUS.md records current validation and device gaps.

## Development priority

1. Complete and polish the electricity vertical slice, preserving existing working features. Telecom and dispatch capacity now participate in the outage; refine the three working couriers and reference-aligned city presentation.
2. Strengthen deterministic causal state, time history, rewind and branch comparison. Scrubbing now reconstructs recorded decisions; response branches preserve prior outcomes.
3. Expand the two working investigation cases and their evidence-based recovery, outcomes and reports.
4. Verify mobile usability, portrait/landscape layouts, reduced motion and measured performance. Validate the existing persistence and rendering optimizations on real devices.
5. Only after the first experience works well, consider internet, GPS/GNSS, digital payments and municipal water disruptions.

The Antahonist neighborhood plan takes priority over the earlier expansion-count target. Continue from approved baseline `9fcac4a`; do not reintroduce rejected commit-28/29 city designs. The existing atlas and expanded world are implemented; the new authored neighborhood is planned. Reference refinement and real-device measurement precede additional scenarios. Named scenery destinations do not claim new dependency mechanics.

## Boundaries and Git authorization

For the current Antahonist task, commit and push small, completed, tested checkpoints to `origin/neon-city-antahonist-from-27`, based directly on commit 27. This supersedes the standing main destination below. No automatic main merge or branch deployment. See AGENTS.md and CODEX_NEON_CITY_FROM_COMMIT_27.md for the active workflow; keep the handoff and status current.

Work in this project; no public deployment or repository-visibility changes without separate approval. Keep simulation separate from rendering. Follow AGENTS.md and CODEX_TASK.md: the user explicitly authorizes automatic tested Conventional Commits and pushes to origin/main in reedhan-g/Ctrl-Z after every completed logical milestone. Review staged files and verify each push; never force-push, rewrite history or discard unrelated work. This supersedes the earlier documentation-review pause. Request elevated permissions when necessary and report blockers.

GitHub Pages clarification: the creator explicitly authorizes preserving the existing .github/workflows/static.yml deployment on every push to main, with workflow_dispatch also available. Do not disable its push trigger or add a duplicate deployment workflow. ci.yml is testing/build only. This supersedes earlier no-deployment wording for this existing Pages setup; repository visibility remains unchanged.
