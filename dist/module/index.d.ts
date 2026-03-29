import { DynamicModule } from '@nestjs/common';
import { BullMQModuleProps } from '../models/index.js';
import 'bullmq';
import 'ioredis';

declare class BullMQModule {
    static registerAsync(options: BullMQModuleProps): DynamicModule;
}

export { BullMQModule };
