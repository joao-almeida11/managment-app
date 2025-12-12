import { auth as authMiddleware } from "@api/middlewares/auth.middleware.js";
import { Router } from "express";

import auth from "./auth.route.js";
import health from "./health.route.js";
import tasks from "./tasks.route.js";
import users from "./users.route.js";

const router = Router();

router.use("/health", health);
router.use("/auth", auth);
router.use("/users", users);
router.use("/tasks", authMiddleware, tasks);

export default router;
