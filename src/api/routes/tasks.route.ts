import createTask from "@api/controllers/task/createTask.controller.js";
import deleteTaskById from "@api/controllers/task/deleteTaskById.controller.js";
import getTaskById from "@api/controllers/task/getTaskById.controller.js";
import updateTaskById from "@api/controllers/task/updateTaskById.controller.js";
import { Router } from "express";

const router = Router();

router.post("/", createTask);
router.get("/:taskId", getTaskById);
router.put("/:taskId", updateTaskById);
router.delete("/:taskId", deleteTaskById);

export default router;
