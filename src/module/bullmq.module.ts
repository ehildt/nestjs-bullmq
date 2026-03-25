import { BullModule } from "@nestjs/bullmq";
import { DynamicModule, Module, Provider } from "@nestjs/common";

import { BullMQConfig, BullMQQueue } from "../models/bullmq.model.ts";

type BullMQConfigFactory = (...deps: any[]) => Promise<BullMQConfig>;

type BullMQModuleProps = {
  global?: boolean;
  inject: Array<any>;
  queues: BullMQQueue[];
  processors: Array<Provider>;
  useBullFactory: BullMQConfigFactory;
};

@Module({})
export class BullMQModule {
  static registerAsync(options: BullMQModuleProps): DynamicModule {
    return {
      module: BullMQModule,
      exports: [BullModule],
      global: options.global,
      providers: options.processors,
      imports: [
        BullModule.registerQueueAsync(
          ...options.queues.map((queue) => {
            const queueName = typeof queue === "string" ? queue : queue.name;
            const queueConnection = typeof queue === "object" ? queue.connection : undefined;

            return {
              name: queueName,
              inject: options.inject,
              useFactory: async (...deps: any[]) => {
                const config = await options.useBullFactory(...deps);
                return {
                  ...config,
                  ...(queueConnection && { connection: queueConnection }),
                };
              },
            };
          }),
        ),
      ],
    };
  }
}
