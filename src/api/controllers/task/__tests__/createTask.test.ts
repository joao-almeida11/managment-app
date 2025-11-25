import type { createTaskBodyType } from "@api/validators/tasks/createTask.schema.js";
import { prisma } from "@lib/__mocks__/prisma.js";
import { TaskStatus } from "@localPrisma/client/index.js";
import { mockResponse } from "@tests/utils/mockResponse.js";
import type { Request } from "express";
import { expect, test, vi } from "vitest";

// Mock the module that createTask imports
vi.mock("@lib/prisma", async () => {
  const { prisma } = await import("@lib/__mocks__/prisma.js");
  return { prisma };
});

import createTask from "../createTask.controller.js";

test("createTask should return the generated task", async () => {
  const newTask = {
    title: "Fix bug",
    description: "The login form throws a 500 when submitting.",
    authorId: 1,
  };

  const mockTask = {
    id: 1,
    ...newTask,
    status: TaskStatus.TO_DO,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  prisma.task.create.mockResolvedValue(mockTask);

  const req = { body: newTask } as unknown as Request<
    unknown,
    unknown,
    createTaskBodyType
  >;
  const res = mockResponse();

  await createTask(req, res);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith(mockTask);
});
