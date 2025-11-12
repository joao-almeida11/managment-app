// Setup a minimal Express app with a health route (GET /health → { status: 'ok' })
"use strict";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
// for cookies https://www.npmjs.com/package/cookie-parser
import routes from "./api/routes/index";

// load .env
dotenv.config();

// CONSTANTS
const isProd = process.env.NODE_ENV === "production";

const app = express();

// Logging
app.use(morgan("dev")); // use 'tiny' in production for less verbose logs

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

const port = process.env.PORT || 3001;

app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});

export default app;
