import { PrismaClient } from "@prisma/client";
import { beforeEach } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";

// Create a deeply typed mock of Prisma
export const prisma = mockDeep<PrismaClient>();

// Reset mocks before each test
beforeEach(() => {
  mockReset(prisma);
});
