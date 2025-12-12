import { vi } from "vitest";

// Auto-mock prisma everywhere
vi.mock("@lib/prisma");

// to override in a specific file
// import { prisma } from "@lib/prisma";
