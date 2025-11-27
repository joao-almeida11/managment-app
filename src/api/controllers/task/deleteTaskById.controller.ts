import taskIdSchema from "@api/validators/tasks/taskId.schema.js";
import { prisma } from "@lib/prisma.js";
import type { NextFunction, Request, Response } from "express";

// @desc delete task
// @route DELETE /tasks/:taskId
// @access Private

const deleteTaskById = async (
  req: Request<{ taskId: string }>,
  res: Response,
  next: NextFunction,
) => {
  req.log.info("Task deletion started");
  try {
    const parsed = taskIdSchema.safeParse(Number(req.params.taskId));
    if (!parsed.success) return next(parsed.error);
    const taskId = parsed.data;

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(204).send();
  } catch (error) {
    req.log.error({ error }, "Error deleting task");
    next(error);
  }
};

export default deleteTaskById;
