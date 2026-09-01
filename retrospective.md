Stage 1 — Project foundation and safe movement

This stage set up the repository, branching structure, project board, and the core safety layer: wall, self-collision, and other-snake collision checks in safety.ts, along with snake customisation and the ESLint/Prettier/EditorConfig setup. The main challenge was getting the local Git and file setup correctly synced with the GitHub remote — a couple of config files ended up empty after extraction and had to be rewritten by hand. No major changes to the original plan; the safety-first approach (get collision detection solid before building any decision-making on top of it) held up as intended.

Stage 2 — Movement strategy

This stage added the "intelligence" layer on top of the safety checks: Manhattan-distance food-seeking, head-to-head collision handling, and the flood-fill space-evaluation algorithm, along with focused unit tests for each. One change from the original plan: head-to-head avoidance initially treated any nearby snake as a threat, which made the snake overly passive, so it was refined to only avoid strictly longer opponents. Going into Stage 3, the main task was hardening this logic with more edge-case tests and wiring up CI.

Stage 3 — Quality assurance and release

This stage focused on finishing the test suite, confirming coverage stayed above the 50% threshold, configuring GitHub Actions CI (lint, format-check, build, test), completing the README and JSDoc documentation, and fixing a genuine edge case where chooseMove wasn't tested against a minimal 1×1 board. All planned issues were closed and merged into develop, then into main, ahead of tagging the final release. The main problem encountered was compressed timing — most of the process evidence (issues, PRs, retrospectives) had to be completed in a single day rather than spread out, which is noted as a limitation in the accompanying report.