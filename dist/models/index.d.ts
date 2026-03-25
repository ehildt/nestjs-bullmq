import { DefaultJobOptions } from 'bullmq';
import { RedisOptions } from 'ioredis';

type BullMQConfig = {
    defaultJobOptions?: DefaultJobOptions;
    connection?: RedisOptions;
};
type BullMQQueueConfig = {
    name: string;
    connection?: RedisOptions;
};
type BullMQQueue = string | BullMQQueueConfig;

export type { BullMQConfig, BullMQQueue, BullMQQueueConfig };
