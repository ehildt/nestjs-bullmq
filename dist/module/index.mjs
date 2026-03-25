import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

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
        BullModule.registerQueueAsync(
          ...options.queues.map((queue) => {
            const queueName = typeof queue === "string" ? queue : queue.name;
            const queueConnection = typeof queue === "object" ? queue.connection : void 0;
            return {
              name: queueName,
              inject: options.inject,
              useFactory: async (...deps) => {
                const config = await options.useBullFactory(...deps);
                return {
                  ...config,
                  ...queueConnection && { connection: queueConnection }
                };
              }
            };
          })
        )
      ]
    };
  }
};
BullMQModule = __decorateClass([
  Module({})
], BullMQModule);

export { BullMQModule };
