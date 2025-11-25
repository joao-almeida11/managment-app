import { prisma } from "@lib/prisma.js";
import type { Request, Response } from "express";
import { z } from "zod";

// router.get('user/:userId/tasks');

const userIdSchema = z.number().int().positive("User ID is required");

export const getUserTasksByUserId = async (
  req: Request<{ userId: string }>,
  res: Response,
) => {
  try {
    const userId = userIdSchema.parse(Number(req.params.userId));

    const result = await prisma.task.findMany({
      where: { authorId: userId },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Validation error",
        errors: error.issues,
      });
    }

    console.error(error);
    res.status(500).json({ message: "Error fetching user tasks" });
  }
};

// // EDIT
// TODO export { default as editUser } from './edit/edit-user.js';

// // OTHER
// TODO export { default as getUser } from './get-user.js';
// TODO export { default as deleteUser } from './delete-user.js';
