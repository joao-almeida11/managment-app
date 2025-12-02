import getHealth from "@api/controllers/health/health.controller.js";
import createApiResponse from "@api-docs/openApiResponseBuilders.js";
import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import { Router } from "express";
import { z } from "zod";

const router = Router();

export const healthCheckRegistry = new OpenAPIRegistry();

healthCheckRegistry.registerPath({
  method: "get",
  path: "/health-check",
  tags: ["Health Check"],
  responses: createApiResponse(z.null(), "Success"),
});

router.get("/", getHealth);

export default router;
