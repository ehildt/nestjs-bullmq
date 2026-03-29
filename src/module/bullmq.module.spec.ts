import { BullModule } from "@nestjs/bullmq";
import { describe, expect, it, vi } from "vitest";

import { BullMQModule } from "./bullmq.module.ts";

vi.mock("@nestjs/bullmq", () => ({
  BullModule: {
    registerQueueAsync: vi.fn((...args: unknown[]) => ({
      module: "BullModule",
      imports: args,
    })),
  },
}));

describe("BullMQModule", () => {
  describe("registerAsync", () => {
    it("should create a dynamic module", async () => {
      const mockConfig = { connection: { host: "localhost" } };
      const module = BullMQModule.registerAsync({
        imports: [],
        inject: [],
        queues: ["test-queue"],
        processors: [],
        useBullFactory: async () => mockConfig,
      });

      expect(module.module).toBe(BullMQModule);
      expect(module.imports).toBeDefined();
      expect(Array.isArray(module.imports)).toBe(true);
    });

    it("should set global option when provided", () => {
      const module = BullMQModule.registerAsync({
        inject: [],
        imports: [],
        queues: ["test-queue"],
        processors: [],
        useBullFactory: async () => ({}),
        global: true,
      });

      expect(module.global).toBe(true);
    });

    it("should not set global when not provided", () => {
      const module = BullMQModule.registerAsync({
        inject: [],
        imports: [],
        queues: ["test-queue"],
        processors: [],
        useBullFactory: async () => ({}),
      });

      expect(module.global).toBeUndefined();
    });

    it("should export BullModule", () => {
      const module = BullMQModule.registerAsync({
        inject: [],
        imports: [],
        queues: ["test-queue"],
        processors: [],
        useBullFactory: async () => ({}),
      });

      expect(module.exports).toEqual([BullModule]);
    });

    it("should include processors in providers", () => {
      const mockProcessor = { provide: "TEST_PROCESSOR", useValue: {} };
      const module = BullMQModule.registerAsync({
        inject: [],
        imports: [],
        queues: ["test-queue"],
        processors: [mockProcessor],
        useBullFactory: async () => ({}),
      });

      expect(module.providers).toContain(mockProcessor);
    });

    it("should handle queue as string", () => {
      const module = BullMQModule.registerAsync({
        inject: ["CONFIG_TOKEN"],
        imports: [],
        queues: ["my-queue"],
        processors: [],
        useBullFactory: async () => ({}),
      });

      expect(module.imports).toBeDefined();
    });

    it("should handle queue as object with connection", () => {
      const queueConfig = {
        name: "my-queue",
        connection: { host: "queue-host" },
      };
      const module = BullMQModule.registerAsync({
        inject: ["CONFIG_TOKEN"],
        imports: [],
        queues: [queueConfig],
        processors: [],
        useBullFactory: async () => ({}),
      });

      expect(module.imports).toBeDefined();
    });

    it("should handle multiple queues", () => {
      const module = BullMQModule.registerAsync({
        inject: [],
        imports: [],
        queues: ["queue-1", "queue-2", "queue-3"],
        processors: [],
        useBullFactory: async () => ({}),
      });

      expect(module.imports).toBeDefined();
    });

    it("should pass inject to queue config", () => {
      const inject = ["ConfigService"];
      const module = BullMQModule.registerAsync({
        inject,
        imports: [],
        queues: ["test-queue"],
        processors: [],
        useBullFactory: async () => ({}),
      });

      expect(module.imports).toBeDefined();
    });
  });
});
