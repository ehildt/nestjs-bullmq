import { Provider, DynamicModule } from '@nestjs/common';
import { BullMQQueue, BullMQConfig } from '../models/index.js';
import 'bullmq';
import 'ioredis';

type BullMQConfigFactory = (...deps: any[]) => Promise<BullMQConfig>;
type BullMQModuleProps = {
    imports?: any[];
    global?: boolean;
    inject: Array<any>;
    queues: BullMQQueue[];
    processors: Array<Provider>;
    useBullFactory: BullMQConfigFactory;
};
declare class BullMQModule {
    static registerAsync(options: BullMQModuleProps): DynamicModule;
}

export { BullMQModule };
