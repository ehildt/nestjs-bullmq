import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import Joi from 'joi';

var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (decorator(result)) || result;
  return result;
};
var BullMQModule = class {
  static registerAsync(options) {
    return {
      module: BullMQModule,
      exports: [BullModule],
      global: options.global,
      providers: options.processors,
      imports: [
        ...options.imports ?? [],
        BullModule.registerQueueAsync(
          ...options.queues.map((queue) => {
            const queueName = typeof queue === "string" ? queue : queue.name;
            const queueConnection = typeof queue === "object" ? queue.connection : void 0;
            return {
              name: queueName,
              global: options.global,
              inject: options.inject,
              useFactory: async (...deps) => {
                return {
                  ...await options.useFactory(...deps) ?? {},
                  ...queueConnection && { connection: queueConnection }
                };
              }
            };
          })
        )
      ]?.filter(Boolean)
    };
  }
};
BullMQModule = __decorateClass([
  Module({})
], BullMQModule);
var BullMQConfigSchema = Joi.object({
  defaultJobOptions: Joi.object({
    delay: Joi.number().min(0).optional(),
    lifo: Joi.boolean().optional(),
    priority: Joi.number().min(0).optional(),
    attempts: Joi.number().min(1).max(50).optional(),
    stackTraceLimit: Joi.number().min(1).optional(),
    removeOnComplete: Joi.object({
      age: Joi.number().optional(),
      count: Joi.number().optional()
    }).optional(),
    removeOnFail: Joi.object({
      age: Joi.number().min(0).optional(),
      count: Joi.number().min(0).optional()
    }).optional(),
    backoff: Joi.object({
      type: Joi.string().valid("exponential", "fixed").optional(),
      delay: Joi.number().min(0).optional()
    }).optional()
  }).optional(),
  connection: Joi.object({
    enableReadyCheck: Joi.boolean().optional(),
    host: Joi.string().hostname().optional(),
    password: Joi.string().allow("").optional(),
    username: Joi.string().allow("").optional(),
    port: Joi.number().min(1).max(65535).optional(),
    connectTimeout: Joi.number().min(1e3).optional(),
    commandTimeout: Joi.number().min(1e3).optional(),
    retryStrategy: Joi.any().optional(),
    tls: Joi.object({
      rejectUnauthorized: Joi.boolean().optional(),
      ca: Joi.binary().optional(),
      cert: Joi.binary().optional(),
      key: Joi.binary().optional(),
      passphrase: Joi.string().optional()
    }).optional().allow(null)
  }).optional()
});

export { BullMQConfigSchema, BullMQModule };
