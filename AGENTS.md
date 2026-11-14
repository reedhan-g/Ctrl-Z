
# Ctrl Z — Development Instructions

You are developing Ctrl Z, a browser-based isometric city simulation game.

## Development workflow

1. Inspect the existing code before making changes.
2. Implement features in small, logical units.
3. Run relevant tests and verify the build.
4. Fix any errors before considering a feature complete.
5. Create a Git commit after every successfully completed feature, bug fix, or meaningful improvement.
6. Use descriptive commit messages following Conventional Commits.

### Small, recoverable checkpoints

- Commit more frequently: finish and test one meaningful improvement, then commit it before combining it with further features.
- Prefer separate commits for individual features, visual improvements, bug fixes, refactoring, tests and documentation when they form independent, working changes. Keep a fix and its required regression coverage together when splitting them would leave a broken checkpoint.
- Break larger milestones into independently testable checkpoints. Do not commit broken or incomplete functionality merely to increase the commit count.
- Run relevant checks before every commit; verify the production build for runtime changes. Record actual validation and remaining limitations.
- Use descriptive `feat:`, `fix:`, `style:`, `refactor:`, `test:` and `docs:` messages. Review explicit staged files before committing.
- Push every completed, tested commit to the currently authorized development branch and verify its remote SHA. Never force-push, amend existing commits or rewrite history.
- Preserve existing functionality and unrelated changes. Finish an in-progress operation safely before applying new workflow instructions; never restart, reset or discard progress to adopt them.
- Update DEVELOPMENT_STATUS.md regularly with progress, decisions, unfinished tasks and the next milestone. Keep CODEX_HANDOFF_README.md current so another session/account can resume from the actual branch and tested state.

### Current Neon City branch and baseline

CODEX_NEON_CITY_FROM_COMMIT_27.md defines the current visual task. Its development/publishing destination is `origin/neon-city-antahonist-from-27`, based directly on `9fcac4a4e1e06a549bda4f51b4b1c5f3e09d823f` (commit 27). This overrides the standing `origin/main` destination below for this task. Automatically commit and push tested checkpoints to this development branch; do not automatically merge to main or deploy the branch. Main integration requires the creator's separate approval. Preserve the existing main-triggered Pages workflow.

Use Antahonist Neon City as the primary visual reference and retain design/pixel-city-reference-2.png as secondary inspiration. Do not import rejected commit-28/29 city-design changes. Preserve the large world, minimap, six service identities, gameplay, saves and mobile controls. Build and visually review one authored neighborhood before expanding it. Verify license/provenance before integrating third-party source art; original reference-inspired project art must be identified as original.

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
- The user explicitly authorizes automatic commits and pushes of every completed, tested logical milestone to origin/main in reedhan-g/Ctrl-Z. Verify each push. This supersedes earlier documentation-review pauses.
- Never force-push, rewrite history, change repository visibility or deploy publicly without separate authorization.
- If Git requires approval, request it.

## Project requirements

- Maintain the dark neon isometric art style.
- Prioritize smooth performance on mobile browsers.
- Keep simulation logic separate from rendering.
- Implement real functionality, not decorative mockups.
- Preserve existing working features.
- Keep the architecture modular and maintainable.

GitHub Pages clarification: the creator explicitly authorizes preserving the existing .github/workflows/static.yml deployment on every push to main, with workflow_dispatch also available. Do not disable its push trigger or add a duplicate deployment workflow. ci.yml is testing/build only. This supersedes earlier no-deployment wording for this existing Pages setup; repository visibility remains unchanged.
