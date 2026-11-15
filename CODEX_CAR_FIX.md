Fix the vehicle orientation bug in Ctrl Z shown in my screenshot.

Problem: Moving cars sometimes travel sideways or perpendicular to their visible orientation. They retain the same facing direction even when following roads in a different direction.

### Required changes

1. Inspect `src/traffic.ts`, `src/CityScene.ts`, `src/pixelArt.ts`, the vehicle sprite atlas, asset-generation pipeline and existing vehicle tests.
2. Determine each vehicle's travel direction from its current route segment, using world-coordinate movement rather than guessing from its screen position.
3. Make every moving courier face the direction it is travelling.
4. Support all four directions along the isometric road axes, including opposite-direction traffic.
5. When a vehicle reaches an intersection and turns, update its orientation to match the new road direction.

### New sprite generation requirement

6. Generate the correct new pixel-art vehicle sprites needed for proper directional rendering.
7. Create separate directional sprites for the moving courier vehicles so that each driving direction has visually correct isometric perspective.
8. Do not rely on crude rotation of a single sprite if that produces incorrect perspective, lighting, wheel placement or body shape.
9. The new sprites must stay consistent with the existing Neon City / pixel-art style, proportions, palette and readability.
10. Preserve the existing identity of each courier vehicle, including its distinguishing colors.
11. Integrate the new directional sprites cleanly into the current atlas / asset pipeline and rendering logic.
12. If needed, update sprite-loading code, atlas definitions and any related metadata so the correct sprite is selected automatically for each movement direction.

### Placement and behavior

13. Keep vehicles aligned with road lanes and their ground-contact points. Do not change their routes or simulation mechanics unless required to fix a verified alignment bug.
14. Ensure orientation stays correct when the simulation pauses, resumes, rewinds, changes speed or switches timeline branches.
15. Check decorative parked cars too. They should face the direction of the street where they are placed.
16. If decorative or ambient moving vehicles also need directional variants, generate and wire up the appropriate sprites for them as well.

### Testing and validation

17. Test vehicles travelling in all four directions.
18. Verify orientation changes correctly at every turn.
19. Check all three couriers.
20. Test at different zoom levels and on mobile.
21. Capture screenshots showing vehicles before and after turns.
22. Verify that the new sprites visually match the city style and do not look blurry, stretched or inconsistent.
23. Preserve the existing simulation, minimap, selection, traffic and rendering performance.

Implement this as a focused fix, run the relevant tests and production build, then commit and push to `origin/main`.

Suggested commit sequence:
- `style: add directional courier vehicle sprites`
- `fix: align vehicle sprites with travel direction`

Do not begin unrelated city redesign work. Fix vehicle orientation first, including creation and integration of the correct directional sprites.
