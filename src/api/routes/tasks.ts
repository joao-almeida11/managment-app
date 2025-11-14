import { Router } from "express";

import createTask from "../controllers/task/createTask";
import deleteTaskById from "../controllers/task/deleteTaskById";
import getTaskById from "../controllers/task/getTaskById";
import updateTaskById from "../controllers/task/updateTaskById";

const router = Router();

router.post("/", createTask);
router.get("/:taskId", getTaskById);
router.put("/:taskId", updateTaskById);
router.delete("/:taskId", deleteTaskById);

export default router;
