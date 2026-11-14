The latest Ctrl Z build still looks almost identical to the earlier city. The current visual progress is insufficient.

**The next priority is a substantial, visible redesign of the actual city—not more planning documents or isolated experiments.**

First, update `AGENTS.md`, `CODEX_HANDOFF_README.md`, and the relevant development instructions to reflect that `main` is now the authorized development branch. Safely synchronize with `origin/main`, preserving any uncommitted work. All subsequent tested milestones should be committed and pushed directly to `main`.

**Visual requirements:**

1. Use **Neon City by Antahonist** as the primary visual reference, with `pixel-city-reference-2.png` as secondary inspiration.
2. Expand the successful Lantern Yard experiment into a complete, polished neighborhood, and bring the same building quality to the central city visible immediately when the game opens.
3. Replace repetitive building sprites and procedural clusters with distinctly designed architecture, correct street-facing entrances, consistent isometric alignment, detailed facades, signage, rooftops, storefronts and architectural lighting.
4. Replace the repetitive road grid with a believable connected street network, including proportionate roads, sidewalks, intersections, access lanes and purposeful courtyards.
5. Give the hospital, substation, telecom, waterworks, residences and logistics hub individually recognizable designs that remain consistent with the surrounding architecture.
6. Fix the default camera framing so the redesign is clearly visible when the website first loads.
7. Maintain the larger explorable map, interactive minimap, simulation, replay, saves and mobile performance.

**Development and validation requirements:**

- Implement genuine visual changes in the game's rendered assets and layout—not just updates to Markdown documents.
- Capture and inspect screenshots of the default opening view, central intersection, important infrastructure, Lantern Yard and mobile viewport.
- Compare the rendered results with the primary visual reference.
- Make separate, meaningful, tested commits for building artwork, street-layout improvements, lighting, infrastructure identities and camera presentation.
- After each milestone, verify that the changes are visible in the actual game.
- Preserve existing gameplay and the GitHub Pages deployment.
- Do not consider the visual overhaul complete until the changes are clearly visible throughout the main playable area.

Prioritize producing a visibly improved, high-quality city over increasing commit count or writing additional plans. Continue developing through tested milestones and push completed work to `origin/main`.