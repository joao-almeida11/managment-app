"use strict";
import { HOST, NODE_ENV, PORT } from "@config/env.js";
import { pino } from "pino";

import app from "./index.js";
const logger = pino({ name: "server start" });

const port = (PORT as string) || 3001;

const server = app.listen(port, (err) => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server ${NODE_ENV} is running on http://${HOST}:${port}`);
});

const onCloseSignal = () => {
  logger.info("sigint received, shutting down");
  server.close(() => {
    logger.info("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
