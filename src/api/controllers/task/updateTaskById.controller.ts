import taskIdSchema from "@api/validators/tasks/taskId.schema.js";
import type { updateTaskBody } from "@api/validators/tasks/updateTaskById.schema.js";
import updateTaskByIdSchema from "@api/validators/tasks/updateTaskById.schema.js";
import { prisma } from "@lib/prisma.js";
import { Prisma } from "@localPrisma/client/index.js";
import type { Request, Response } from "express";
import { z } from "zod";

const updateTaskById = async (
  req: Request<{ taskId: string }, unknown, updateTaskBody>,
  res: Response,
) => {
  try {
    const taskId = taskIdSchema.parse(Number(req.params.taskId));
    const data = updateTaskByIdSchema.parse(req.body);

    const result = await prisma.task.update({
      where: { id: taskId },
      data: data,
    });

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error?.code === "P2025") {
        return res.status(404).json({ message: "Task not found" });
      }
    }

    console.error(error);
    res.status(500).json({ message: "Error updating task" });
  }
};

export default updateTaskById;
