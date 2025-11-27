import type { createTaskBodyType } from "@api/validators/tasks/createTask.schema.js";
import createTaskSchema from "@api/validators/tasks/createTask.schema.js";
import { prisma } from "@lib/prisma.js";
import type { NextFunction, Request, Response } from "express";

// @desc Create task
// @route POST /tasks
// @access Private

const createTask = async (
  req: Request<unknown, unknown, createTaskBodyType>,
  res: Response,
  next: NextFunction,
) => {
  req.log.info("Task creation started");
  try {
    const parsed = createTaskSchema.safeParse(req.body);
    if (!parsed.success) return next(parsed.error);
    const { title, description, authorId } = parsed.data;

    const result = await prisma.task.create({
      data: {
        title,
        description,
        author: { connect: { id: authorId } },
      },
    });

    res.status(201).json(result);
  } catch (error) {
    req.log.error({ error }, "Error creating task");
    next(error);
  }
};

export default createTask;
