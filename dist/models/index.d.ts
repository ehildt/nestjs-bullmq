import { Provider } from '@nestjs/common';
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
type BullMQConfigFactory = (...deps: any[]) => Promise<BullMQConfig>;
type BullMQModuleProps = {
    imports?: any[];
    global?: boolean;
    inject: Array<any>;
    queues: BullMQQueue[];
    processors: Array<Provider>;
    useBullFactory: BullMQConfigFactory;
};
type BullMQQueue = string | BullMQQueueConfig;

export type { BullMQConfig, BullMQConfigFactory, BullMQModuleProps, BullMQQueue, BullMQQueueConfig };
