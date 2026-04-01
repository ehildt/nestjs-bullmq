# @ehildt/nestjs-bullmq

## 1.1.0

### Minor Changes

- ddfce15: Consolidate exports into single entry point, clean up type names, and extend test coverage

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

## 1.0.4

### Patch Changes

- f956ba0: added global field to queues

## 1.0.2

### Patch Changes

- f1a7810: fixed subpath exports for main

## 1.0.1

### Patch Changes

- 4603c4a: added ignoreDeprecations to tsconfig and updated the package.json

## 1.0.0

### Major Changes

- 8f1eb32: Init release

### Patch Changes

- ea5733f: Add unit tests for BullMQModule and BullMQConfigSchema
