import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    exclude: ["**/node_modules/**", "**/dist/**", "./temp/**"],

    globals: true,
    environment: "node",

    // setupFiles: ["./tests/config/setupEnv.ts", "./tests/config/setupMocks.ts"],
    // globalSetup: ["prisma/seed.ts"], // TODO maybe create a separate one?

    clearMocks: true,
    restoreMocks: true,
    mockReset: true,

    // Prisma mock stability to avoid concurrency issues
    fileParallelism: false,

    environmentOptions: {
      node: {
        require: ["dotenv/config"],
      },
    },
  },
});
