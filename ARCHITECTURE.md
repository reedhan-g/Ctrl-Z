# Ctrl Z architecture

Keep modules separated by responsibility; move files only when an actual dependency or ownership problem warrants it.

| Boundary | Modules | Rule |
| --- | --- | --- |
| Domain and scenario rules | simulation.ts, dependencies.ts | Pure TypeScript; no React, Pixi, DOM or storage dependencies |
| Decisions and history | gameState.ts, replay.ts | Pure transitions; replay decisions by time; retain branches and exact undo checkpoints |
| Evidence and outcomes | investigation.ts; future report/case modules | Derive evidence and outcomes from domain state; no independent scripted failure timeline |
| State adapter | game.ts | Zustand actions delegate to domain transitions; UI does not mutate snapshots |
| Playback UI | Timeline.tsx | Time, replay and comparison controls; never implement service rules here |
| Inspection and app UI | InvestigationPanel.tsx, App.tsx | Present state and dispatch actions; extract case/inspection/report components as gameplay grows |
| Rendering | City.tsx, CityScene.ts | Lifecycle/input binding versus persistent scene presentation; consume state without advancing simulation |
| Interaction geometry | geometry.ts, camera.ts, keyboard.ts | Shared projection/picking and independently tested input policies |

Next useful boundaries are a deterministic clock adapter, scenario/entity configuration, modular city art, investigation case state, and report/persistence adapters. Keep these incremental. A worker, generalized ECS, large directory migration or additional state library is not justified by the current small district.

The initial extraction puts playback UI in its own component so branch/comparison work can proceed independently of inspection, onboarding and the city shell. Existing controls, accessible names and state transitions remain unchanged. CI will run the dependency-free domain checks and the TypeScript/Vite production build; Playwright remains the browser interaction gate for gameplay milestones.
