import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  DATABASE_URL: z.url(),
  BCRYPT_ENCRYPTION_SALT_ROUNDS: z.enum(["10", "12"]).default("12"),
  JWT_SECRET: z.string().min(6),
  PORT: z.enum(["3001"]).default("3001"),
});

export type Env = z.infer<typeof envSchema>;

// eslint-disable-next-line node/no-process-env
export const getEnv = (): Env => envSchema.parse(process.env);

const env = getEnv;
export default env;
