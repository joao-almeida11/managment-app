import taskIdSchema from "@api/validators/tasks/taskId.schema.js";
import type { updateTaskBody } from "@api/validators/tasks/updateTaskById.schema.js";
import updateTaskByIdSchema from "@api/validators/tasks/updateTaskById.schema.js";
import { prisma } from "@lib/prisma.js";
import type { NextFunction, Request, Response } from "express";

// @desc Get task
// @route PUT /tasks/:taskId
// @access Private

const updateTaskById = async (
  req: Request<{ taskId: string }, unknown, updateTaskBody>,
  res: Response,

  next: NextFunction,
) => {
  req.log.info("Task update started");
  try {
    const taskId = taskIdSchema.parse(Number(req.params.taskId));
    const data = updateTaskByIdSchema.parse(req.body);

    const result = await prisma.task.update({
      where: { id: taskId },
      data: data,
    });

    res.status(200).json(result);
  } catch (error) {
    req.log.error({ error }, "Error updating task");
    next(error);
  }
};

export default updateTaskById;
