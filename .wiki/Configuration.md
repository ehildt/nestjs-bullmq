# Configuration

## BullMQConfig

Type representing the BullMQ configuration options.

```typescript
import { BullMQConfig, BullMQConfigSchema } from "@ehildt/nestjs-bullmq";
```

This library provides the `BullMQConfig` type and `BullMQConfigSchema` for validation. You can use any config approach - `@ehildt/nestjs-config-factory` is optional but recommended for production apps.

### Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `defaultJobOptions` | `DefaultJobOptions` | Yes | Default options for all jobs in the queue |
| `connection` | `RedisOptions` | Yes | Redis connection configuration |

### DefaultJobOptions

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `delay` | `number` | Yes | Default delay in milliseconds before processing a job |
| `lifo` | `boolean` | Yes | Last In First Out - if true, jobs are processed in LIFO order |
| `priority` | `number` | Yes | Default priority level for jobs |
| `attempts` | `number` | Yes | Number of retry attempts (1-50) |
| `stackTraceLimit` | `number` | Yes | Limit for stack trace storage |
| `removeOnComplete` | `object` | Yes | Options for removing completed jobs |
| `removeOnFail` | `object` | Yes | Options for removing failed jobs |
| `backoff` | `object` | Yes | Backoff strategy for retries |

### RemoveOptions

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `age` | `number` | Yes | Max age in seconds (default: 604800 = 7 days) |
| `count` | `number` | Yes | Max number of jobs to keep (default: 1000) |

### BackoffOptions

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `type` | `"exponential" \| "fixed"` | Yes | Type of backoff strategy |
| `delay` | `number` | Yes | Delay in milliseconds |

### RedisOptions (connection)

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `enableReadyCheck` | `boolean` | No | Enable ready check (default: false) |
| `host` | `string` | Yes | Redis host |
| `password` | `string` | No | Redis password |
| `username` | `string` | No | Redis username |
| `port` | `number` | Yes | Redis port (1-65535) |
| `connectTimeout` | `number` | No | Connection timeout in ms |
| `commandTimeout` | `number` | No | Command timeout in ms |
| `retryStrategy` | `function` | No | Custom retry strategy |
| `tls` | `object` | No | TLS configuration |

### TLSOptions

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `rejectUnauthorized` | `boolean` | Yes | Reject unauthorized certificates |
| `ca` | `Buffer` | No | Certificate Authority |
| `cert` | `Buffer` | Yes | Client certificate |
| `key` | `Buffer` | Yes | Client private key |
| `passphrase` | `string` | No | Certificate passphrase |

---

## Example Usage

```typescript
import { BullMQConfig } from "@ehildt/nestjs-bullmq";

const config: BullMQConfig = {
  defaultJobOptions: {
    delay: 0,
    lifo: false,
    priority: 1,
    attempts: 3,
    stackTraceLimit: 10,
    removeOnComplete: {
      age: 604800,
      count: 1000,
    },
    removeOnFail: {
      age: 0,
      count: 500,
    },
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  },
  connection: {
    enableReadyCheck: false,
    host: "redis.example.com",
    password: "",
    username: "",
    port: 6379,
    connectTimeout: 10000,
    commandTimeout: 5000,
  },
};
```

## Related

- [Usage](./Usage.md) - Setup guide with examples
- [Validation Schemas](./Validation-Schemas.md) - Joi validation schema
