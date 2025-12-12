import taskIdSchema from "@api/validators/tasks/taskId.schema.js";
import { prisma } from "@lib/prisma.js";
import type { NextFunction, Request, Response } from "express";

// @desc Get task
// @route GET /tasks/:taskId
// @access Private

const getTaskById = async (
  req: Request<{ taskId: string }>,
  res: Response,
  next: NextFunction,
) => {
  req.log.info("GET Task started");
  try {
    const parsed = taskIdSchema.safeParse(Number(req.params.taskId));
    if (!parsed.success) return next(parsed.error);
    const taskId = parsed.data;

    const result = await prisma.task.findUniqueOrThrow({
      where: { id: taskId },
    });

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    req.log.error({ error }, "Error fetching task");
    next(error);
  }
};

export default getTaskById;
