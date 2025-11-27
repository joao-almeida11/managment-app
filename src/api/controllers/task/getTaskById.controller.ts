import taskIdSchema from "@api/validators/tasks/taskId.schema.js";
import { prisma } from "@lib/prisma.js";
import { Prisma } from "@localPrisma/client/index.js";
import type { Request, Response } from "express";
import { z } from "zod";

// @desc Get task
// @route GET /tasks/:taskId
// @access Private

const getTaskById = async (req: Request<{ taskId: string }>, res: Response) => {
  try {
    const taskId = taskIdSchema.parse(Number(req.params.taskId));

    const result = await prisma.task.findUniqueOrThrow({
      where: { id: taskId },
    });

    if (!result) {
      return res.status(404).json({ message: "Task not found" });
    }

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
    res.status(500).json({ message: "Error fetching task" });
  }
};

export default getTaskById;
