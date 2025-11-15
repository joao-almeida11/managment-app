import { TaskStatus } from "@prisma/client";
import { mockResponse } from "@tests/utils/mockResponse";
import type { Request } from "express";
import { expect, test, vi } from "vitest";

import type { createTaskBodyType } from "../createTask";

// Mock the module that createTask imports
vi.mock("@lib/prisma", async () => {
  const { prisma } = await import("@lib/__mocks__/prisma");
  return { prisma };
});

import { prisma } from "@lib/__mocks__/prisma";

import createTask from "../createTask";

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
