import { Provider } from "@nestjs/common";
import type { DefaultJobOptions } from "bullmq";
import type { RedisOptions } from "ioredis";

export type BullMQConfig = {
  defaultJobOptions?: DefaultJobOptions;
  connection?: RedisOptions;
};

export type BullMQQueueConfig = {
  name: string;
  connection?: RedisOptions;
};

export type BullMQConfigFactory = (...deps: any[]) => Promise<BullMQConfig> | BullMQConfig;

export type BullMQQueue = string | BullMQQueueConfig;

export type BullMQModuleProps = {
  imports?: any[];
  global?: boolean;
  inject: Array<any>;
  queues: BullMQQueue[];
  processors: Array<Provider>;
  useBullFactory: BullMQConfigFactory;
};
