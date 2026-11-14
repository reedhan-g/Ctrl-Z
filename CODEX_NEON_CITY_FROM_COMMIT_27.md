# Ctrl Z — Antahonist Neon City Rebuild from Commit 27

> Current override: CODEX_CURRENT_TASK.md authorizes tested development commits and pushes directly to `origin/main`, superseding this document's former branch-only/main-integration pause. The commit-27 lineage and rejection of commits 28/29 remain. Prioritize visible changes throughout the opening city and a complete neighborhood; preserve gameplay and the existing Pages workflow.

> **Current top-priority task.** Rebuild the *visual city and world layout* of Ctrl Z using **Neon City: Cyberpunk Pixel Building Kit by Antahonist** as the primary reference. **Begin from commit 27, not commits 28 or 29.** Preserve working gameplay, the expanded map, and the minimap.

## 1. Confirm the exact Git starting point

Repository: `https://github.com/reedhan-g/Ctrl-Z`

The repository had **29 commits** at the time this task was prepared. The intended base is:

| Position | SHA | Commit title | Action |
| --- | --- | --- | --- |
| **27 — base** | `9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f` | `feat: extend pixel city districts and polish mobile navigation` | **Use** |
| 28 | `9a7707fdfe0a580ee6878906cc7832c92c02f164` | `style: rebuild city architecture and authored street composition` | **Do not include** |
| 29 | `b11256d54286eeced3d384091a8ef285cbb94f73` | `feat: integrate city lighting precise picking and finite overview` | **Do not include** |

**Do not interpret “commit 27” as a branch called `27` or `HEAD~27`.** Use the exact SHA above.

Before modifying files:

1. Read the current Git status, branch, remotes, and the commit graph. Identify any uncommitted or untracked work. **Never discard it.** If the working tree is dirty, protect those changes before changing branches, and explain the protection used.
2. Fetch the remote and verify the SHA exists.
3. Create a **new branch pointing directly to commit 27**, named `neon-city-antahonist-from-27` (or switch to it if it already exists). For a clean working tree, the equivalent command is:

   ```bash
   git fetch origin
   git switch -c neon-city-antahonist-from-27 9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f
   ```

4. Verify `git rev-parse HEAD` equals the full commit-27 SHA **before starting development**.
5. Work and commit on this new branch. **Do not cherry-pick, merge, rebase onto, or otherwise import commits 28 and 29**, or use code from them as the foundation for the rebuild.
6. The project `AGENTS.md` normally authorizes tested commits/pushes to `origin/main`. **For this task, that destination is superseded:** automatically commit and push each tested milestone to `origin/neon-city-antahonist-from-27` instead. Preserve every other Git safety rule. Never force-push or rewrite `main`.
7. **Do not merge to `main` or deploy the new branch as the public site automatically.** After the visual result is accepted, propose a safe integration path that keeps unwanted changes from commits 28/29 out of the new implementation. Note that simply merging an old-base branch into current `main` can retain unwanted files from those commits.

## 2. Primary visual and asset references

**Primary:** [Neon City: Cyberpunk Pixel Building Kit by Antahonist](https://antahonist.itch.io/neon-city-cyberpunk-pixel-building-kit)

**Secondary atmospheric inspiration:** `design/pixel-city-reference-2.png`

**Additional layout context:** `design/ctrl-z-city-reference.png`, if useful.

Save an Antahonist preview image under `design/neon-city-antahonist-reference.png` **only when an actual image has been legitimately provided or obtained**. Do not assume the image or a purchased pack exists, invent paths, or fabricate an inspection.

The Antahonist kit offers a **consistent 2:1 isometric grid**, modular floors and roofs, recognizable ground-floor uses, standalone street props, and animated night lighting. Study the artwork's real proportions, footprints, pivots, roof heights, and street-facing facades. Do not mix incompatible projections or scales.

**Rights / asset handling:** The reference page permits use in games but does not authorize reselling the files as an asset pack. The game's GitHub repository is public: **do not commit paid or proprietary source sprites/atlases without confirming the applicable redistribution terms**. If the actual licensed asset files are not available locally, create an original, coherent implementation based on the design principles or stop at the integration boundary and report the exact files required. Do not claim to have used the purchased sprites when you have not.

## 3. Visual objective — a believable, polished, explorable town

Replace the current repetitive procedural blocks with a designed city that reads as a **real neighborhood**, not a collection of disconnected building columns on a road grid.

- Make the **entire explorable city visually coherent with Antahonist Neon City**: attractive storefronts, apartments, offices, signage, rooftop props, realistic sidewalk edges, road markings, transit and street furniture.
- Build **several thoughtfully composed blocks**, with clear corners, sensible access, a mix of commercial and residential frontage, building height variety, and useful landmarks.
- Roads should follow a **purposeful street network**; avoid a full map of repeating five-tile crosshatch roads and giant intersections. Narrow or widen streets based on their role, not uniformly.
- Buildings must face and align with their actual street frontages. Their base footprints, door directions, sidewalks, road boundaries, camera projection, hit areas, and shadows must agree.
- Do not fill every parcel with towers, but do not leave **random unused vacant lots**. Courtyards, plazas, parking, loading zones and small parks are acceptable only when deliberately composed and visibly purposeful.
- Use the approved dark navy/charcoal palette with bright **cyan, pink, violet and warm yellow** neon, without excessive blur or oversaturated bloom.
- Aim for **crisp, detailed pixel artwork**, not coarse magnified pixels or simplistic prisms. Use consistent scale and sharp sampling; do not mix wildly different pixel densities.
- Properly illuminate **street lamps, shopfronts, signs, windows and road junctions**. Nighttime should be lively and readable. Lighting should respond sensibly to the existing electricity simulation; powered and unpowered conditions must be distinct.
- **Important buildings must be easy to recognize**: substation, hospital, waterworks, residences, telecom, delivery hub. Give each a distinctive but cohesive silhouette, identifiable frontage/roof details and appropriate signage/lighting. Preserve accurate selection and state indicators.
- The **opening camera** should show a compelling intersection and distinct buildings, not a repetitive wall of structures.

## 4. Map size, navigation and visible edges

Keep the actual world **substantially larger than the fixed viewport** and allow free horizontal and vertical panning, zooming and mobile gestures.

- Preserve the existing expanded-world architecture unless there is a specific, tested reason to alter its bounds.
- Keep the minimap, camera footprint, landmark navigation and offscreen persistent simulation state.
- Make it possible to reach and understand **all four corners and boundaries** of the map. Test actual edge views at normal and overview zoom, with no camera clipping traps, inaccessible tiles or unexplained blank bands.
- **Do not try to show the entire larger city in the ordinary gameplay view.** Maintain a useful architectural zoom by default and provide a genuine overview/minimap for orientation.
- Correct anchor/pivot handling so sprites do not float into roads or overlap incorrect depth layers while moving the camera.
- Render offscreen scenery efficiently with culling and batching as appropriate; retain the existing low-power path.

## 5. Implementation strategy — do not spam procedural filler

1. Inspect commit 27's `src/world.ts`, `src/worldScenery.ts`, city model/rendering files, projection, geometry, scene picking, camera and tests. Identify the current lot/road mismatch and repetitive-generation sources.
2. Decide on a single consistent asset/pivot grid. Prefer **authored road and parcel data** (e.g. Tiled-exported JSON or explicit world data) rather than random rows of repeated filler buildings.
3. Build and render **one polished neighborhood first**: a convincing crossroads, buildings on aligned street frontages, sidewalk continuity, street props, signage, lit windows and readable POIs.
4. Capture desktop and mobile screenshots. Compare them *directly* with Antahonist's actual reference and the user's secondary city image; fix differences before replicating the neighborhood language elsewhere.
5. Expand the same coherent approach throughout the larger map, with distinct districts and purposeful roads. Preserve world coordinates and all existing simulated service entities.
6. Retest minimap mapping, bounds/corners, picking, occlusion, panning/pinch/zoom, traffic routes, light-state changes, investigation mode, time history/replay, saves and reports.

It is acceptable to replace most of the **city scenery/map rendering code** if needed. It is **not** acceptable to rewrite the simulation or remove existing gameplay merely to make artwork easier.

## 6. Acceptance criteria

The task is **not complete** until:

- A player can identify a realistic street network and see attractive aligned buildings at normal zoom.
- The map has no arbitrary checkerboard road layout, misaligned facades, or visually unexplained vacant lots.
- The art is significantly closer to **Antahonist Neon City** than the previous procedural model, at a consistent scale.
- Distinctive simulated facilities are easy to find and select.
- Signs, windows and streetlights look convincingly lit; an electricity outage visibly affects dependent lighting.
- The large world remains navigable, the minimap stays accurate, and each corner can be reached.
- Desktop **and mobile** real rendered screenshots were inspected, not merely tests or code review.
- The existing game features pass tests and a production build; browser and visual-regression checks cover layout, picking and camera behavior.
- Each completed milestone is committed and pushed **to the new branch** with a descriptive message, and remote SHA is verified.

## 7. Handoff and integration

Update `PROJECT_VISION.md` and `DEVELOPMENT_STATUS.md` **on this new branch** to reflect the new primary visual reference and the actual completed work, without claiming incomplete tasks are finished.

Report:

- the branch name and its exact base SHA
- which files were changed
- assets used (original vs legally obtained third-party assets)
- screenshot evidence from default view, other districts, all four corners and mobile
- tests/build results
- remaining visual gaps
- a **non-destructive** strategy to promote the approved branch into production while excluding the substance of commits 28 and 29

**Do not merge into `main`, force-push, or alter the live deployment without separate approval.**
