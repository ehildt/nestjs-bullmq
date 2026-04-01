# Usage

This guide covers setting up the module, creating processors, and adding jobs to queues.

## Registering the Module

```typescript
// app.module.ts
import { BullMQModule, Queue } from "@ehildt/nestjs-bullmq";
import { Module } from "@nestjs/common";

import { PostsProcessor } from "./processors/posts.processor";

@Module({
  imports: [
    BullMQModule.registerAsync({
      global: true,
      inject: [],
      processors: [PostsProcessor],
      queues: ["broadcast-post"] as Queue[], // or [{ name: "broadcast-post", connection: {...} }]
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

### Queue Configuration

Queues can be defined as strings or configuration objects. Use configuration objects to override the factory connection per queue:

```typescript
BullMQModule.registerAsync({
  queues: [
    "queue-1", // String queue name
    { name: "queue-2", connection: { host: "queue-specific-host" } }, // Per-queue connection
  ],
  useBullFactory: async () => ({
    connection: { host: "default-host" }, // Used for "queue-1"
  }),
})
```

## Why Register Queues?

BullMQModule requires knowing queue names upfront to:
- Create Queue instances so `@InjectQueue("queue-name")` works in services
- Bind processors to their respective queues via `@Processor("queue-name")`
- Register workers with the correct queue names

This is a limitation of NestJS's dependency injection - queues must be declared in the module metadata.

## Creating Processors

```typescript
// processors/posts.processor.ts
import { OnWorkerEvent, Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { Injectable, Logger } from "@nestjs/common";

@Processor("broadcast-post")
@Injectable()
export class PostsProcessor extends WorkerHost {
  private readonly logger = new Logger(PostsProcessor.name);

  async process(job: Job) {
    this.logger.log(`Processing job ${job.id}: ${job.name}`);
  }

  @OnWorkerEvent("completed")
  async onCompleted(job: Job) {
    this.logger.log(`Job ${job.id} completed`);
  }

  @OnWorkerEvent("failed")
  async onFailed(job: Job) {
    this.logger.error(`Job ${job.id} failed`);
  }
}
```

## Configuration

The `useBullFactory` function receives configuration any way you like - from `@nestjs/config`, environment variables, or any config library.

```typescript
BullMQModule.registerAsync({
  inject: [ConfigService],
  useBullFactory: async (configService: ConfigService) => ({
    connection: {
      host: configService.get("REDIS_HOST"),
      port: configService.get("REDIS_PORT"),
    },
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
  }),
})
```

This library provides the `BullMQConfig` type and `BullMQConfigSchema` for validation. See [Configuration](./Configuration.md) for the full type definition and the `Queue` type for queue configuration options.

For production apps, [`@ehildt/nestjs-config-factory`](https://github.com/ehildt/nestjs-config-factory) provides validation and caching helpers:

```typescript
// configs/bullmq-config.service.ts
import { BullMQConfig, BullMQConfigSchema } from "@ehildt/nestjs-bullmq";
import { CacheReturnValue } from "@ehildt/nestjs-config-factory/cache-return-value";
import { Injectable } from "@nestjs/common";

@Injectable()
export class BullMQConfigService {
  @CacheReturnValue(BullMQConfigSchema)
  get bullMQConfig(): BullMQConfig {
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
        host: process.env.REDIS_HOST || "localhost",
        port: parseInt(process.env.REDIS_PORT || "6379", 10),
      },
    };
  }
}
```

Then use it in the module:

```typescript
BullMQModule.registerAsync({
  inject: [BullMQConfigService],
  useBullFactory: async (configService: BullMQConfigService) => configService.bullMQConfig,
})
```

## Adding Jobs to Queue

```typescript
// services/posts.service.ts
import { InjectQueue } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Queue } from "bullmq";

@Injectable()
export class PostsService {
  constructor(
    @InjectQueue("broadcast-post") private readonly queue: Queue,
  ) {}

  async createPost(data: any) {
    await this.queue.add("dispatch", data);
  }
}
```

## Related

- [Configuration](./Configuration.md) - Full config type definition
- [Validation Schemas](./Validation-Schemas.md) - Joi validation schema
