import { LOG_LEVEL } from "@config/env.js";
import { NODE_ENV } from "@config/env.js";
import pino from "pino";

// For more infor see:
// betterstack.com/community/guides/logging/how-to-install-setup-and-use-pino-to-log-node-js-applications/

const logger = pino({
  level: LOG_LEVEL ?? "info",
  //   base: undefined, // remove pid and hostname to save bytes
  timestamp: pino.stdTimeFunctions.isoTime,
  // messageKey: "msg", // smaller output keys = faster parsing
  ...(NODE_ENV !== "production" && {
    transport: {
      target: "pino-pretty",
      options: {
        // colorize: true,
        // levelFirst: true,
        // translateTime: true,
        destination: `${import.meta.dirname}/app.log`,
      },
    },
  }),
  redact: {
    paths: ["user.name", "user.address", "user.passport", "user.phone"],
    censor: "[PINO REDACTED]",
    remove: true,
  },
});

export default logger;
