import "dotenv/config";

import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]),
  DATABASE_URL: z.url(),
  BCRYPT_ENCRYPTION_SALT_ROUNDS: z.enum(["10", "12"]).default("12"),
  JWT_SECRET: z.string().min(6),
  PORT: z.enum(["3000", "3001"]).default("3001"),
  LOG_LEVEL: z.enum(["info"]),
});

export type Env = z.infer<typeof envSchema>;

// eslint-disable-next-line node/no-process-env
const env: Env = envSchema.parse(process.env);

// Safe constants
export const JWT_SECRET: string = env.JWT_SECRET;
export const DATABASE_URL: string = env.DATABASE_URL;
export const NODE_ENV: Env["NODE_ENV"] = env.NODE_ENV;
export const PORT: Env["PORT"] = env.PORT;
export const BCRYPT_ENCRYPTION_SALT_ROUNDS: Env["BCRYPT_ENCRYPTION_SALT_ROUNDS"] =
  env.BCRYPT_ENCRYPTION_SALT_ROUNDS;
export const LOG_LEVEL: Env["LOG_LEVEL"] = env.LOG_LEVEL;
