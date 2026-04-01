---
"@ehildt/nestjs-bullmq": minor
---

Consolidate exports into single entry point, clean up type names, and extend test coverage

- Consolidate exports into single entry point (`src/index.ts`)
- Delete old index files (`src/models/index.ts`, `src/module/index.ts`, `src/schema/index.ts`)
- Rename `BullMQQueueConfig` to `QueueConfig`
- Rename `BullMQQueue` to `Queue`
- Change `imports?: any[]` to `imports?: ModuleMetadata["imports"]`
- Update `BullMQConfigFactory` to allow sync return (`Promise<BullMQConfig> | BullMQConfig`)
- Fix factory output to handle null with nullish coalescing (`?? {}`)
- Add `reflect-metadata` dev dependency for testing
- Extend test coverage with 8 new tests using `@nestjs/testing`
- Update `tsup.config.ts` to use single entry point
- Update `package.json` exports to single entry point
