# @ehildt/nestjs-bullmq

A NestJS module for BullMQ integration with configuration types and validation schemas.

**Requirements:**
- ESM-only (does not support CommonJS)
- Your project must use ES modules

## Installation

```bash
npm install @ehildt/nestjs-bullmq
```

## Peer Dependencies

```bash
npm install @nestjs/bullmq @nestjs/common bullmq ioredis joi
```

## Optional Helpers

```bash
npm install @ehildt/nestjs-config-factory
```

`@ehildt/nestjs-config-factory` is optional but recommended for production apps - it provides config validation and caching. However, any config approach works (NestJS ConfigModule, environment variables, etc.).

```typescript
// configs/bullmq.config.ts
import { BullMQConfig, BullMQConfigSchema } from "@ehildt/nestjs-bullmq";
import { CacheReturnValue, configFactory } from "@ehildt/nestjs-config-factory";

@configFactory()
class BullMQConfig {
  @CacheReturnValue(BullMQConfigSchema)
  get config(): BullMQConfig {
    return {
      defaultJobOptions: {
        delay: 0,
        lifo: false,
        priority: 1,
        attempts: 3,
        stackTraceLimit: 10,
        removeOnComplete: { age: 604800, count: 1000 },
        removeOnFail: { age: 0, count: 500 },
        backoff: { type: "exponential" as const, delay: 1000 },
      },
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    };
  }
}
```

## Quick Start

```typescript
import { BullMQModule } from "@ehildt/nestjs-bullmq";
import { Module } from "@nestjs/common";
import { TestProcessor } from "./test.processor";

@Module({
  imports: [
    BullMQModule.registerAsync({
      global: true,
      inject: [],
      queues: ["my-queue"],
      processors: [TestProcessor],
      useBullFactory: async () => ({
        connection: {
          host: "localhost",
          port: 6379,
        },
      }),
    }),
  ],
})
export class AppModule {}
```

## Next Steps

For a complete setup with processors and queues, see [Usage](./Usage.md).

For configuration options and types, see [Configuration](./Configuration.md).

## API Overview

| Export | Description |
|--------|-------------|
| `BullMQModule` | Dynamic NestJS module for BullMQ |
| `BullMQConfig` | Type for configuration options |
| `BullMQConfigSchema` | Joi validation schema for config |

## Related

- [Configuration](./Configuration.md)
- [Validation Schemas](./Validation-Schemas.md)
- [Usage](./Usage.md)
- [GitHub](https://github.com/ehildt/nestjs-bullmq)
- [Issues](https://github.com/ehildt/nestjs-bullmq/issues)
