import type { createTaskBodyType } from "@api/validators/tasks/createTask.schema.js";
import createTaskSchema from "@api/validators/tasks/createTask.schema.js";
import { prisma } from "@lib/prisma.js";
import { Prisma } from "@localPrisma/client/index.js";
import type { Request, Response } from "express";
import { z } from "zod";

const createTask = async (
  req: Request<unknown, unknown, createTaskBodyType>,
  res: Response,
) => {
  try {
    const { title, description, authorId } = createTaskSchema.parse(req.body);

    const result = await prisma.task.create({
      data: {
        title,
        description,
        author: { connect: { id: authorId } },
      },
    });

    res.status(201).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    // Handle Prisma errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return res.status(404).json({
          message: "Author not found",
        });
      }
    }

    console.error(error);
    res.status(500).json({ message: "Error creating task" });
  }
};

export default createTask;
