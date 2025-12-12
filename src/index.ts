"use strict";
import errorHandler from "@api/middlewares/error.middleware.js";
import logger from "@api/middlewares/logger.middleware.js";
import routes from "@api/routes/index.route.js";
import { openAPIRouter } from "@api-docs/openApiRouter.js";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import pinoHttp from "pino-http";
// import env from "@config/env.js";

// for cookies https://www.npmjs.com/package/cookie-parser

// load .env
dotenv.config();

// CONSTANTS
// const isProd = env.NODE_ENV === "production";

const app = express();

// Logging

app.use(
  pinoHttp({
    logger,
    customProps: () => ({
      reqId: crypto.randomUUID(), // request ID track it
    }),
  }),
);

// CORS
app.use(
  cors({
    origin: ["http://localhost:3000"], // restrict in prod; add prod domain
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

// Security headers
app.use(helmet());

// if its behind a proxy or load balancer
// app.enable('trust proxy');

// Rate Limit
// TODO rateLimiter.ts

app.disable("x-powered-by"); // hides Express version info to prevent automated attacks
// app.disable('etag'); // disables automatic ETag generation; used for client-side caching

// Response compression
app.use(compression());

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

// Swagger UI
app.use(openAPIRouter);

app.use(errorHandler);

export default app;
