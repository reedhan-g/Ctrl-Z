# Ctrl Z - Project Brief

## Product direction

**Ctrl Z - Undo the World.** An interactive browser-based isometric city simulation/investigation game in the fictional city of Meridian. Remove infrastructure or technology, explore causal consequences, inspect dependencies, intervene with limited resources, recover services, and rewind/branch to compare outcomes. Sandbox and hidden-cause Investigation are intended modes; a saved/shareable Resilience Report completes the experience.

Read **PROJECT_VISION.md** for the current consolidated vision. It incorporates the creator's clarified visual requirements and supersedes conflicting older descriptions. CTRL_Z_PROJECT_VISION.md is retained as the original vision source. DEVELOPMENT_STATUS.md distinguishes implemented behavior from planned work.

## Art direction

A dense, handcrafted-looking dark neon 2D isometric city with moderate pixel-art influence. Dark charcoal/black base, cyan, pink, purple and warm yellow highlights. Crisp, readable, slightly pixel-inspired world assets; modern, clean, minimal UI; restrained smooth neon effects. Avoid photorealism, full retro 8-bit styling, generic concept art and glossy vector-dashboard aesthetics.

Primary reference: **design/pixel-city-reference-2.png**. Secondary inspiration: **design/ctrl-z-city-reference.png** (the corrected filename). CODEX_TASK.md establishes this updated priority. Both were opened and inspected. Use them to guide original modular, independently interactive entities, not as a flattened game background. The present repeated procedural prisms are prototype art, not the approved finished style. Compare actual desktop/mobile screenshots with the references before accepting art completion.

## Current foundation

React, TypeScript, Vite, PixiJS and Zustand. Six selectable buildings: substation, hospital, waterworks, residences, telecom and delivery hub. Rule-based electricity/water dependency effects, reserve depletion, two instantaneous supply actions, restore, exact manual-intervention undo, time controls, dependency tracing and an incident log. Pan, anchored zoom/pinch, mobile inspection and accessible building buttons exist.

TypeScript/Vite build, 53 unit/regression checks and 30 desktop/mobile Chromium specifications pass. Preserved-decision replay, branch comparison, two evidence-based investigation cases, reports with JSON export, and validated local saves are implemented. Three courier entities animate with dispatch capacity. See DEVELOPMENT_STATUS.md for current limitations and physical-device QA gaps.

## Development priority

1. Complete and polish the electricity vertical slice, preserving existing working features. Telecom and dispatch capacity now participate in the outage; add believable vehicles and reference-aligned city presentation.
2. Strengthen deterministic causal state, time history, rewind and branch comparison. Scrubbing now reconstructs recorded decisions; response branches preserve prior outcomes.
3. Expand the two working investigation cases and their evidence-based recovery, outcomes and reports.
4. Verify mobile usability, portrait/landscape layouts, reduced motion and measured performance. Validate the existing persistence and rendering optimizations on real devices.
5. Only after the first experience works well, consider internet, GPS/GNSS, digital payments and municipal water disruptions.

The larger city/entity counts in the vision are aspirations. Prior documents' proposed sequence of rushing into additional scenarios is superseded by perfecting electricity first.

## Boundaries and Git authorization

Work in this project; no public deployment or repository-visibility changes without separate approval. Keep simulation separate from rendering. Follow AGENTS.md and CODEX_TASK.md: the user explicitly authorizes automatic tested Conventional Commits and pushes to origin/main in reedhan-g/Ctrl-Z after every completed logical milestone. Review staged files and verify each push; never force-push, rewrite history or discard unrelated work. This supersedes the earlier documentation-review pause. Request elevated permissions when necessary and report blockers.

GitHub Pages clarification: the creator explicitly authorizes preserving the existing .github/workflows/static.yml deployment on every push to main, with workflow_dispatch also available. Do not disable its push trigger or add a duplicate deployment workflow. ci.yml is testing/build only. This supersedes earlier no-deployment wording for this existing Pages setup; repository visibility remains unchanged.
