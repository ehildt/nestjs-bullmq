---
'@ehildt/nestjs-bullmq': patch
---

chore: modernize CI/CD and migrate husky hooks

- Extract shared lint/build/test pipeline into a reusable `ci.yml` workflow
  used by both the non-release and release pipelines (mirrors ckir-helpers).
- Bump GitHub Actions to latest majors (checkout@v7, setup-node@v7,
  pnpm/action-setup@v6, upload/download-artifact, codecov@v7) and Node 24.
- Pin pnpm via `packageManager` (pnpm@11.22.0) and approve required build
  scripts in `pnpm-workspace.yaml`.
- `ncu-update` now syncs the lockfile and regenerates README badges.
- Migrate `.husky` hooks from ckir.io-visions (shared `prepare.sh`, depcheck
  in pre-push, commit message format/length checks).
