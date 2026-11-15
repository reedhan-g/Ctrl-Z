# Map corrections visual review ? 2026-11-15

Actual Chromium renders from `tests/browser/map-navigation.spec.ts`, with the inspector open. Desktop viewport is 1280?720; mobile emulates iPhone 13 with device-pixel scaling. These are original project assets, retaining the Antahonist-inspired direction. This is a navigation/layout correction, not another art redesign.

| Service | District | World origin | Desktop | Mobile |
| --- | --- | --- | --- | --- |
| North substation | Foundry Ward | 26.65, ?18.65 | [View](desktop-grid.png) | [View](mobile-grid.png) |
| St. Mira Hospital | Civic & Medical | 6.65, 1.65 | [View](desktop-hospital.png) | [View](mobile-hospital.png) |
| Waterworks | Municipal Utilities | ?18.65, 16.65 | [View](desktop-water.png) | [View](mobile-water.png) |
| Maple residences | Maple Heights | ?8.65, 26.65 | [View](desktop-homes.png) | [View](mobile-homes.png) |
| Meridian telecom | Neon Market | ?8.35, ?3.35 | [View](desktop-telecom.png) | [View](mobile-telecom.png) |
| East delivery hub | East Exchange | 26.65, 26.65 | [View](desktop-logistics.png) | [View](mobile-logistics.png) |

Review checks: the silhouette/outline is visible clear of overlays, centered in measured available space; entrances meet continuous road-facing setbacks; neighborhoods and minimap positions differ meaningfully. The hospital remains near the opening civic crossroads. Unit geometry tests check every service footprint/approach, scenery collisions, connected road access, finite interior placement and minimum twelve-tile separation. Renderer checks verify all six alpha picks/highlights at their new coordinates. Browser checks tap each facility after sidebar framing, test minimap keyboard/pointer/chooser paths, repeat selection after manual pan, and check mobile collapse, page-scroll preservation and unchanged canvas dimensions.

The courier loop starts beside the relocated hub's east loading frontage and stays on connected existing roads. Dispatch capacity/progression rules, stable service/vehicle IDs, dependencies, reserves, v1 journals and deployment workflows are preserved. Foundry/Freight destination targets focus open forecourts rather than service lots; remaining district centers retain their old targets. Native SVG touch retargeting outside visible service-marker bounds is ignored.

Screenshots establish Chromium desktop/emulated-mobile presentation. Physical Android/iOS/Safari and real-device performance remain unverified.
