import Joi from 'joi';
import { BullMQConfig } from '../models/index.js';
import '@nestjs/common';
import 'bullmq';
import 'ioredis';

declare const BullMQConfigSchema: Joi.ObjectSchema<BullMQConfig>;

export { BullMQConfigSchema };
