import { ModuleMetadata, Provider, DynamicModule } from '@nestjs/common';
import { DefaultJobOptions } from 'bullmq';
import { RedisOptions } from 'ioredis';
import Joi from 'joi';

type BullMQConfig = {
    defaultJobOptions?: DefaultJobOptions;
    connection?: RedisOptions;
};
type QueueConfig = {
    name: string;
    connection?: RedisOptions;
};
type BullMQConfigFactory = (...deps: any[]) => Promise<BullMQConfig> | BullMQConfig;
type Queue = string | QueueConfig;
type BullMQModuleProps = {
    imports?: ModuleMetadata["imports"];
    global?: boolean;
    inject: Array<any>;
    queues: Queue[];
    processors: Array<Provider>;
    useFactory: BullMQConfigFactory;
};

declare class BullMQModule {
    static registerAsync(options: BullMQModuleProps): DynamicModule;
}

declare const BullMQConfigSchema: Joi.ObjectSchema<BullMQConfig>;

export { type BullMQConfig, type BullMQConfigFactory, BullMQConfigSchema, BullMQModule, type BullMQModuleProps, type Queue, type QueueConfig };
