import { Router } from "express";
import health from "./health";
import auth from "./auth";
import users from "./users";
import tasks from "./tasks";
import { auth as authMiddleware } from "../middlewares/auth";

const router = Router();

router.use("/health", health);
router.use("/auth", auth);
router.use("/users", users);
router.use("/tasks", authMiddleware, tasks);

export default router;
