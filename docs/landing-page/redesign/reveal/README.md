# Blackout reveal checkpoint

17 November 2026. Actual Chromium screenshots at 1440×900 and 390×844 (phone DPR 3), taken at each natural scroll position. Viewport captures deliberately retain scroll position; full-page capture changes the viewport and can misrepresent a scroll-linked state.

| State | Desktop | Mobile |
| --- | --- | --- |
| Connected, entering preview | [Powered](desktop-powered.png) | [Powered](mobile-powered.png) |
| Halfway, reverse-scroll capable | [Halfway](desktop-halfway.png) | [Halfway](mobile-halfway.png) |
| Grid disconnected | [Blackout](desktop-blackout.png) | [Blackout](mobile-blackout.png) |
| Keyboard/manual priority | [Manual](desktop-manual.png) | [Manual](mobile-manual.png) |
| Reduced motion, stable capture | [Reduced](desktop-reduced-motion.png) | [Reduced](mobile-reduced-motion.png) |

All ten images were opened. Geometry remains aligned; original game light changes provide the effect. The powered arrival capture shows only the top of the scene because the transition begins as it enters view. Status is outside the screenshot as accessible live text; the duplicate capture is decorative. No sticky stage, scroll interception, runtime dependency or game mutation.

Validation: 13 passing reveal and existing landing cases, one deliberate duplicate mobile matrix skip (1.4m), plus production build. Covers forward/reverse scroll, manual persistence/re-entry, keyboard/touch, reduced motion, repeated/direct anchors, no eager game load/storage change, embedded minimap/inspection/save/home/full-screen flow, direct #simulation and start control. Phone/Safari hardware remains untested. Full regression and complete width matrix follow in D/E.
