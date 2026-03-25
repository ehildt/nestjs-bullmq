import { DefaultJobOptions } from "bullmq";
import { RedisOptions } from "ioredis";

export type BullMQConfig = {
  defaultJobOptions?: DefaultJobOptions;
  connection?: RedisOptions;
};

export type BullMQQueueConfig = {
  name: string;
  connection?: RedisOptions;
};

export type BullMQQueue = string | BullMQQueueConfig;
