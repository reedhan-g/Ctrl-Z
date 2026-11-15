# Curbside parking and landmark polish review

Actual Chromium desktop/mobile captures; all artwork remains original Ctrl Z art inspired by Antahonist Neon City. This is a focused parking/landmark pass, not a city redesign.

The `before/` folder preserves the opening street and three services (hospital, waterworks, delivery hub) in normal, desktop hover and selected states from e9ec4c8. Mobile captures use normal/tapped selection, not synthetic hover. The same UI-driven review can be repeated with `tests/browser/polish-review.spec.ts`.

Parking now uses actual street segments to validate explicit asphalt pockets outside moving lanes, with marked bay ends and a continuous sidewalk behind them. The sparse 31-space layout omits unavailable sites and protects junctions/crossings, service/emergency entrances, depots, occupied/landscaped ground and props. Cars remain stationary and use all four existing directional perspectives parallel to their adjacent street. Courier routes, motion and simulation are unchanged.

| Parking review | Desktop | Mobile |
| --- | --- | --- |
| Opening street, before | [View](before/desktop-opening-street.png) | [View](before/mobile-opening-street.png) |
| Opening street, after | [View](parking/desktop-opening-street.png) | [View](parking/mobile-opening-street.png) |
| Market curb | [View](parking/desktop-parking-market.png) | [View](parking/mobile-parking-market.png) |
| Residential street | [View](parking/desktop-parking-housing.png) | [View](parking/mobile-parking-housing.png) |
| East Exchange | [View](parking/desktop-parking-exchange.png) | [View](parking/mobile-parking-exchange.png) |

Parking checkpoint validation: 96 unit checks, build and 12 focused desktop/mobile browser checks pass. Existing moving-car direction/pause/replay tests and idle rendering checks remain green. Physical phone/Safari behavior remains unverified. The following landmark checkpoint extends this evidence.


## Six-service emphasis and names

The gold atlas is original Ctrl Z art generated offline by `scripts/landmark_art.py` from the union of each service's lit/unlit opaque silhouette. It adds a crisp three-pixel amber ring, one-pixel fringe and gentle cream brightening; it does not change architecture, picking, footprint or world depth. The 768x512 atlas is 5.38 kB compressed / 1.5 MiB decoded, uses nearest sampling and is shared by six retained sprites. No third-party pixels or blur/bloom filters are used.

All six facilities retain subtle gold at rest. Desktop hover strengthens it with a finite 140 ms ease-out; teal click selection remains persistent. Touch selection gets full gold without synthetic mouse hover. Outage status still controls the real facade lighting independently. Reduced motion and Low power use immediate changes. The fade snaps to its exact target and stops requesting frames after settling.

Full real names now use dark, high-contrast CSS-pixel plates (12 px ordinary / 14 px focused). Camera-transformed alpha bounds anchor names above roofs; measured overlays and previously placed names block overlapping candidates. Selected and hovered names have priority, and overview identifiers declutter. Selection framing reserves symmetric roof clearance while retaining the building's center in the measured free viewport. A live accessible selected-name announcement complements the existing keyboard chooser/inspector.

The `after/` captures come from the same UI-driven normal/hover/selection review as `before/`. Mobile uses genuine tap selection. Additional captures exercise the other three identities and an offline hospital with Low power enabled.

| Landmark | Desktop normal | Desktop hover | Desktop selection | Mobile selection |
| --- | --- | --- | --- | --- |
| St. Mira Hospital | [Before](before/desktop-hospital-normal.png) / [After](after/desktop-hospital-normal.png) | [Before](before/desktop-hospital-hover.png) / [After](after/desktop-hospital-hover.png) | [Before](before/desktop-hospital-selected.png) / [After](after/desktop-hospital-selected.png) | [Before](before/mobile-hospital-selected.png) / [After](after/mobile-hospital-selected.png) |
| Waterworks | [Before](before/desktop-water-normal.png) / [After](after/desktop-water-normal.png) | [Before](before/desktop-water-hover.png) / [After](after/desktop-water-hover.png) | [Before](before/desktop-water-selected.png) / [After](after/desktop-water-selected.png) | [Before](before/mobile-water-selected.png) / [After](after/mobile-water-selected.png) |
| East delivery hub | [Before](before/desktop-logistics-normal.png) / [After](after/desktop-logistics-normal.png) | [Before](before/desktop-logistics-hover.png) / [After](after/desktop-logistics-hover.png) | [Before](before/desktop-logistics-selected.png) / [After](after/desktop-logistics-selected.png) | [Before](before/mobile-logistics-selected.png) / [After](after/mobile-logistics-selected.png) |

| Additional identity/state | Desktop | Mobile |
| --- | --- | --- |
| North substation | [Hover](after/desktop-grid-hover.png) | [Selected](after/mobile-grid-focused.png) |
| Maple residences | [Hover](after/desktop-homes-hover.png) | [Selected](after/mobile-homes-focused.png) |
| Meridian telecom | [Hover](after/desktop-telecom-hover.png) | [Selected](after/mobile-telecom-focused.png) |
| Hospital offline, Low power | [Selected](after/desktop-golden-outage-hospital.png) | [Selected](after/mobile-golden-outage-hospital.png) |

Mobile normal states and desktop/mobile opening views are also retained in `after/`. The parking review now targets an interior residential street so ordinary zoom is not constrained by the world boundary; the original parking checkpoint captures remain preserved.


[Interior residential parking, desktop](after/desktop-parking-housing-interior.png) / [mobile](after/mobile-parking-housing-interior.png).

Validation: 100 unit checks, three offline art checks and production build pass. The complete browser run passed 69 cases in 10.3 minutes; all four focused expanded-integration cases then passed after replacing its six-click maximum-zoom assumption with actual zoom-limit detection. All 70 desktop/mobile cases are therefore covered without weakening assertions/timeouts. New regression checks include all six facilities, readable plates above roofs/outside UI, selected/hover/exit states, touch, outage/Low power, finite fades and zero idle draws. A narrow-header mobile label collision and exact fade endpoint rounding were corrected before this gate.

[Desktop benchmark](desktop-metrics.json) / [mobile benchmark](mobile-metrics.json): zero idle draws, 32/30 scripted-drag draws, ready 1101/1159 ms and drag 3040/4203 ms. Software-rendered emulation does not measure physical phone FPS. Physical phone/Safari review and creator feedback remain external follow-ups; existing moving vehicles, gameplay, minimap, inspection, v1 saves and both workflows are preserved.
