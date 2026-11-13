Review the existing Ctrl Z repository and the local uncommitted changes. Do not overwrite or discard any work.

I have explicitly authorized automatic Git commits and pushes to the existing GitHub repository reedhan-g/Ctrl-Z during development. This authorization supersedes the earlier instructions that prohibited pushes or commits while reviewing documentation.

First:
1. Inspect git status, git diff, the latest commits and all project documentation.
2. Confirm the correct design-image paths, including design/ctrl-z-city-reference.png and the newer pixel-art reference if available.
3. Update AGENTS.md and PROJECT_BRIEF.md to consistently authorize automatic tested commits and pushes. Do not change repository visibility or deploy the game publicly.
4. Preserve and commit PROJECT_VISION.md and the correct reference assets, provided they contain no secrets or unauthorized material.
5. Synchronize DEVELOPMENT_STATUS.md and fix outdated or contradictory documentation.
6. Make a descriptive documentation commit and push it to origin/main after validation.

Next:
7. Review the current source structure and propose a modular architecture for future expansion.
8. Refactor files in small, safe steps. Preserve all working functionality, repair imports, and run tests/build after each meaningful change. Do not restructure solely for cosmetic reasons.
9. Add a GitHub Actions workflow for the unit tests and production build.
10. Implement the remaining gameplay milestones, prioritizing proper time-indexed replay, the electricity scenario, investigation, and the approved dark neon, moderately pixel-art isometric city. Treat the uploaded neon pixel-art reference as the primary visual direction, while retaining the earlier isometric city reference as secondary inspiration. Prioritize matching the handcrafted pixel-art aesthetic over creating generic procedural buildings or AI-style visuals.
11. After EVERY completed and tested logical milestone, create a separate descriptive Conventional Commit and push it to the existing GitHub remote. Verify each push.
12. Continue through the roadmap within the current task; do not stop merely after updating documentation.

Never force-push, rewrite history, commit secrets, remove unrelated work, or silently skip failing tests. If Git operations require elevated approval, request it. Report any blocked operations clearly.

At the end, provide the commit hashes, pushed branch, validation results, and remaining milestones.