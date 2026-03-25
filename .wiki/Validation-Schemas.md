# Validation Schemas

Joi validation schemas for BullMQ configuration and arguments.

## BullMQConfigSchema

Validates `BullMQConfig` objects.

```typescript
import { BullMQConfigSchema } from "@ehildt/nestjs-bullmq";
```

### Schema Structure

```typescript
Joi.object({
  defaultJobOptions: Joi.object({
    delay: Joi.number().min(0).required(),
    lifo: Joi.boolean().required(),
    priority: Joi.number().min(0).required(),
    attempts: Joi.number().min(1).max(50).required(),
    stackTraceLimit: Joi.number().min(1).required(),
    removeOnComplete: Joi.object({
      age: Joi.number().default(604_800),
      count: Joi.number().default(1000),
    }).required(),
    removeOnFail: Joi.object({
      age: Joi.number().min(0).required(),
      count: Joi.number().min(0).required(),
    }).required(),
    backoff: Joi.object({
      type: Joi.string().valid("exponential", "fixed").required(),
      delay: Joi.number().min(0).required(),
    }).required(),
  }).required(),
  connection: Joi.object({
    enableReadyCheck: Joi.boolean().default(false),
    host: Joi.string().hostname().required(),
    password: Joi.string().allow("").optional(),
    username: Joi.string().allow("").optional(),
    port: Joi.number().min(1).max(65535).required(),
    connectTimeout: Joi.number().min(1000).optional(),
    commandTimeout: Joi.number().min(1000).optional(),
    retryStrategy: Joi.any().optional(),
    tls: Joi.object({
      rejectUnauthorized: Joi.boolean().required(),
      ca: Joi.binary().optional(),
      cert: Joi.binary().required(),
      key: Joi.binary().required(),
      passphrase: Joi.string().optional(),
    })
      .optional()
      .allow(null),
  }).required(),
})
```

### Field Validations

| Field | Validation Rules |
|-------|------------------|
| `defaultJobOptions.delay` | Number, minimum 0 |
| `defaultJobOptions.lifo` | Boolean, required |
| `defaultJobOptions.priority` | Number, minimum 0 |
| `defaultJobOptions.attempts` | Number, minimum 1, maximum 50 |
| `defaultJobOptions.stackTraceLimit` | Number, minimum 1 |
| `defaultJobOptions.removeOnComplete.age` | Number, default 604800 |
| `defaultJobOptions.removeOnComplete.count` | Number, default 1000 |
| `defaultJobOptions.removeOnFail.age` | Number, minimum 0 |
| `defaultJobOptions.removeOnFail.count` | Number, minimum 0 |
| `defaultJobOptions.backoff.type` | String, "exponential" or "fixed" |
| `defaultJobOptions.backoff.delay` | Number, minimum 0 |
| `connection.enableReadyCheck` | Boolean, default false |
| `connection.host` | String, valid hostname, required |
| `connection.password` | String, allows empty |
| `connection.username` | String, allows empty |
| `connection.port` | Number, 1-65535 |
| `connection.connectTimeout` | Number, minimum 1000 |
| `connection.commandTimeout` | Number, minimum 1000 |
| `connection.tls.rejectUnauthorized` | Boolean, required |
| `connection.tls.ca` | Binary |
| `connection.tls.cert` | Binary, required |
| `connection.tls.key` | Binary, required |
| `connection.tls.passphrase` | String, optional |

---

## Usage Example

```typescript
import Joi from "joi";
import { BullMQConfigSchema } from "@ehildt/nestjs-bullmq";

const config = {
  defaultJobOptions: {
    delay: 0,
    lifo: false,
    priority: 1,
    attempts: 3,
    stackTraceLimit: 10,
    removeOnComplete: { age: 604800, count: 1000 },
    removeOnFail: { age: 0, count: 500 },
    backoff: { type: "exponential", delay: 1000 },
  },
  connection: {
    host: "localhost",
    port: 6379,
  },
};

const { error } = BullMQConfigSchema.validate(config);
if (error) {
  console.error("Validation error:", error.details);
}
```
