import { NODE_ENV } from "@config/env.js";
import { PrismaClient } from "@localPrisma/client/index.js";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
