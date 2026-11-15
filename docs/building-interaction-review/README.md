# Building interaction render review

Real desktop/mobile Chromium game captures, selected from the interaction tests:

- `desktop-hospital.png`, `mobile-hospital.png`: the original hospital silhouette outlined in cyan with its contextual inspector.
- `desktop-scenery.png`, `mobile-scenery.png`: Lantern Café selected through actual canvas input, with an informational-only panel and original pixel architecture preserved.

The outline is generated from sprite alpha, including roofs/equipment, and remains in the building's own depth layer. Faint hover differs from stronger selection. Powered/unpowered states share a stable mask. No rectangular selection box, bloom filter or perpetual animation is used.

81 unit checks/build pass; 56 browser specs were validated, with startup/timeouts rerun serially and a mobile offscreen test target corrected. Physical Android/iOS/Safari verification and creator visual acceptance are still outstanding. Full temporary captures/traces remain ignored in test-results.

Final benchmark coverage now scrolls the canvas into view and asserts both GPU activity and camera movement. Valid desktop/mobile samples report zero idle draws and 32 scripted-drag draws including hover; they do not measure hardware FPS. Scenery save/resume is tested while its inspector is open, with no scenery ID persisted and the selection cleared after resume.
