Implement an improved building selection, highlighting and interaction system for Ctrl Z.

**Current situation:** The game already supports selecting its six main infrastructure buildings and displaying a basic inspection panel. Improve this existing system rather than replacing or duplicating it.

### 1. Visual building highlighting

- Clicking a building should clearly highlight the entire structure, not merely its ground footprint.
- Use a tasteful cyan/teal outline, subtle architectural glow, or translucent overlay consistent with the Neon City by Antahonist visual style.
- The highlight must follow the building's actual sprite silhouette and not appear as a large rectangular selection box.
- Consider a subtle hover preview on desktop, distinct from the stronger persistent selected state.
- Only one building should be selected at a time.
- Clicking another building transfers selection.
- Clicking empty land or pressing Escape clears selection.
- Highlighting must respond correctly to panning, zooming, overlapping buildings, outages and mobile touch input.
- Avoid excessive bloom, flashing effects or expensive continuous rendering.

### 2. Detailed building inspection panel

When selecting a building, show a polished contextual panel containing:

- Building name and category.
- Its purpose within the city.
- Current operational status.
- Services it requires, such as electricity, water or communications.
- Upstream dependencies and affected downstream systems.
- Backup reserves, if applicable.
- Current problems or reasons for degraded functionality.
- Available actions the player can perform.

Make the panel contextual, compact and readable. It must not unnecessarily obstruct the selected building or other important map controls.

### 3. Context-sensitive interactions

Different buildings should expose meaningful actions based on their roles.

Examples:

**Hospital:** Inspect emergency power and water reserves, trace dependencies, send backup supplies when permitted, and investigate service failures.

**Power substation:** Inspect grid connectivity, disconnect or restore the electricity supply when allowed.

**Waterworks:** Inspect pumping capacity, water reserves, electricity dependencies and available recovery interventions.

**Telecom facility:** Inspect communications connectivity, battery reserves and affected logistics operations.

**Logistics hub:** Inspect dispatch capacity, delivery delays, fleet dependencies and available recovery actions.

**Residential buildings:** Inspect electricity and water availability, backup reserves and consequences for residents.

Reuse the real simulation state and existing reducer actions. Do not introduce decorative buttons that do nothing or fake operational statistics.

Unavailable actions must be disabled with a clear explanation of the requirement.

Also add this requirement to the current Ctrl Z city/building work:

Buildings of interest must have slightly different designs, while remaining fully consistent with the same Neon City / pixel-art art style.

The goal is to make important buildings easier to distinguish at a glance without breaking immersion.

Requirements:
1. Keep all important buildings in the same overall art world and isometric style as the rest of the city.
2. Give each major building of interest a distinct architectural identity through silhouette, facade design, signage, rooftop details, lighting pattern, entrance treatment, or utility equipment.
3. Do not rely on ugly markers, mismatched colors, or out-of-style icons to differentiate them.
4. Distinction should feel natural and diegetic.
5. At minimum, make the following visually distinct:
   - hospital
   - power substation / grid building
   - waterworks
   - telecom facility
   - logistics hub
   - residences / homes
6. These buildings should be easier to identify both in the main view and during exploration, while still fitting cleanly into the district.
7. Preserve readability on desktop and mobile.
8. If needed, improve lighting/signage around these buildings to help recognition at night.
9. Update the building inspector content to reflect the clearer identities and roles of these locations.
10. Add this to the current development/documentation status and implement it through meaningful tested commits.

This should be implemented as part of the ongoing visual and interaction improvements, not as a completely separate visual style.
Prefer architectural differentiation over UI differentiation.

### 4. Other city buildings

The city also contains decorative residential, commercial and industrial buildings.

Allow players to inspect these where practical, displaying their name, category, purpose and district.

Clearly distinguish informational scenery from actual simulation-connected infrastructure.

Do not pretend decorative buildings have individual simulation mechanics that have not been implemented.

Keep their information concise and avoid clutter.


### 5. User experience

- Smoothly frame the selected building without hiding it behind the inspector.
- Preserve visibility on desktop and mobile.
- On mobile, use a collapsible inspection sheet.
- Show selected-building markers on the minimap.
- Support accessible keyboard navigation and clear focus behavior.
- Preserve camera dragging, zooming and normal click selection.
- Ensure selecting a building doesn't accidentally trigger another interaction.
- Keep the interface consistent with the Neon City aesthetic.

### 6. Implementation and testing

Inspect CityScene.ts, City.tsx, App.tsx, InvestigationPanel.tsx, gameState.ts, worldScenery.ts, the sprite atlas and existing tests.

Extend the current selection architecture while preserving stable entity identities and compatibility with replay, investigation, reporting and saves.

Add tests for selection, highlighting, occlusion, information accuracy, disabled actions, minimap integration, camera movement and mobile layouts.

Capture actual desktop and mobile screenshots demonstrating the selected building and open inspector.

Visually verify that the highlighting is attractive, clearly visible, correctly aligned and does not interfere with the pixel-art architecture.

Implement through small, meaningful, tested commits and push each completed milestone directly to origin/main as currently authorized.

Update DEVELOPMENT_STATUS.md with completed work and remaining limitations.

**Priority:** Make clicking any recognizable building feel informative and satisfying, while making the six critical infrastructure buildings substantially more interactive. Preserve all existing gameplay and the current Neon City design.
