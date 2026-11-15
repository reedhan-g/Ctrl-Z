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

Parking checkpoint validation: 96 unit checks, build and 12 focused desktop/mobile browser checks pass. Existing moving-car direction/pause/replay tests and idle rendering checks remain green. Physical phone/Safari behavior remains unverified. Golden landmark hover, persistent glow and readable-name evidence follow in the next checkpoint.
