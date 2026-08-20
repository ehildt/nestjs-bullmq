---
'@ehildt/nestjs-bullmq': patch
---

chore: add prettier as a direct devDependency

- Declare `prettier` (^3.9.6) in devDependencies — it was previously only
  available transitively via `eslint-plugin-prettier`.
- Add the prettier badge to `depbadgerc.yml` and refresh README badges to the
  current dependency versions.
