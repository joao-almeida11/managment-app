// // src/middleware/rateLimiter.ts
// import rateLimit from "express-rate-limit";
// import Redis from "ioredis";
// import RedisStore from "rate-limit-redis";

// // additional ones
// // https://www.npmjs.com/package/express-slow-down
// // https://www.npmjs.com/package/ratelimit-header-parser

// const isProd = process.env.NODE_ENV === "production";

// // TODO redis and connect this to app

// // Redis client (for production)
// let redisClient: Redis | undefined;
// if (isProd) {
//   redisClient = new Redis({
//     host: process.env.REDIS_HOST || "127.0.0.1",
//     port: Number(process.env.REDIS_PORT) || 6379,
//     password: process.env.REDIS_PASSWORD || undefined,
//   });
// }

// // Default rate limiter
// export const defaultLimiter = rateLimit({
//   windowMs: isProd ? 15 * 60 * 1000 : 60 * 1000, // 15 min prod, 1 min dev
//   max: isProd ? 100 : 200, // 100 requests prod, 200 dev
//   message: "Too many requests, please try again later.",
//   standardHeaders: "draft-8", // true -> latest
//   legacyHeaders: false,
//   store: isProd
//     ? new RedisStore({
//         sendCommand: (...args) => redisClient!.call(...args),
//       })
//     : undefined,
// });

// // Example: stricter limiter for sensitive endpoints (login, signup)
// export const authLimiter = rateLimit({
//   windowMs: isProd ? 15 * 60 * 1000 : 60 * 1000, // 15 min prod, 1 min dev
//   max: isProd ? 10 : 50, // stricter for auth endpoints
//   message: "Too many login attempts, try again later.",
//   standardHeaders: "draft-8",
//   legacyHeaders: false,
//   store: isProd
//     ? new RedisStore({
//         sendCommand: (...args) => redisClient!.call(...args),
//       })
//     : undefined,
// });

// // Usage in app.ts / server.ts:
// // import { defaultLimiter, authLimiter } from './middleware/rateLimiter';
// // app.use(defaultLimiter);            // global
// // app.post('/auth/login', authLimiter); // endpoint-specific
