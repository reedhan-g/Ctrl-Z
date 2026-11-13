
# Ctrl Z — Development Instructions

You are developing Ctrl Z, a browser-based isometric city simulation game.

## Development workflow

1. Inspect the existing code before making changes.
2. Implement features in small, logical units.
3. Run relevant tests and verify the build.
4. Fix any errors before considering a feature complete.
5. Create a Git commit after every successfully completed feature, bug fix, or meaningful improvement.
6. Use descriptive commit messages following Conventional Commits.

Examples:
- feat: add isometric camera controls
- feat: implement electricity outage simulation
- feat: add interactive hospital inspection
- fix: correct mobile pinch zoom
- perf: optimize city sprite rendering
- style: improve neon city lighting

## Git rules

- Commit automatically after each completed logical change.
- Do not commit broken or untested code.
- Do not commit node_modules, caches, build artifacts, or secrets.
- Review staged files before committing.
- Do not overwrite unrelated changes or amend existing commits.
- Never push to GitHub without explicit permission.
- If Git requires approval, request it.

## Project requirements

- Maintain the dark neon isometric art style.
- Prioritize smooth performance on mobile browsers.
- Keep simulation logic separate from rendering.
- Implement real functionality, not decorative mockups.
- Preserve existing working features.
- Keep the architecture modular and maintainable.
