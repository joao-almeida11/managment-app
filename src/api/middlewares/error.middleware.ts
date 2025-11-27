import { NODE_ENV } from "@config/env.js";
import { Prisma } from "@localPrisma/client/index.js";
import type { Request, Response } from "express";
import { ZodError } from "zod";

const errorHandler = (err: Error, req: Request, res: Response) => {
  let statusCode = 500;
  let message = "Something went wrong";

  // Zod validation error
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    return res.status(statusCode).json({
      message,
      issues: err.flatten(),
    });
  }

  // Prisma errors
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      // unique constraint violation
      statusCode = 409;
      message = "Record already exists";
    } else if (err.code === "P2025") {
      statusCode = 404;
      message = "Record not found";
    }
  }

  // Generic error
  if (err instanceof Error) {
    message = err.message || message;
  }

  const response: Record<string, unknown> = { message };

  if (NODE_ENV === "development" && err instanceof Error) {
    response.stack = err.stack;
  }

  return res.status(statusCode).json(response);
};

export default errorHandler;
