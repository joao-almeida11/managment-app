import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// Create a deeply typed mock of Prisma
export const prisma = mockDeep<PrismaClient>();

// Reset mocks before each test
beforeEach(() => {
  mockReset(prisma);
});

// 5) Optional: separate “unit” and “integration” prisma mocks
// tests / mocks / prisma.unit.ts;
// prisma.integration.ts;

// 	•	Unit mocks: super fake, handcrafted responses.
// •	Integration mocks: mimic real Prisma structure more closely.
