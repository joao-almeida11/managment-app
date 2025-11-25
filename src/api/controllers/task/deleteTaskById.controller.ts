import taskIdSchema from "@api/validators/tasks/taskId.schema.js";
import { prisma } from "@lib/prisma.js";
import { Prisma } from "@localPrisma/client/index.js";
import type { Request, Response } from "express";
import { z } from "zod";

const deleteTaskById = async (
  req: Request<{ taskId: string }>,
  res: Response,
) => {
  try {
    const taskId = taskIdSchema.parse(Number(req.params.taskId));

    await prisma.task.delete({
      where: { id: taskId },
    });

    res.status(204).send();
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
    res.status(500).json({ message: "Error deleting task" });
  }
};

export default deleteTaskById;
