import { Router } from "express";

import { auth as authMiddleware } from "../middlewares/auth";
import auth from "./auth";
import health from "./health";
import tasks from "./tasks";
import users from "./users";

const router = Router();

router.use("/health", health);
router.use("/auth", auth);
router.use("/users", users);
router.use("/tasks", authMiddleware, tasks);

export default router;
