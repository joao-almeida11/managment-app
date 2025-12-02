// import { TaskStatus } from "@prisma/client";
// import type { Request } from "express";
// import { expect, test } from "vitest";

// import type { createTaskBodyType } from "@api/controllers/task/createTask";
// import createTask from "@api/controllers/task/createTask";
// import { prisma } from "@lib/__mocks__/prisma";
// import { mockResponse } from "./utils/mockResponse";

// {
//   title: "Write docs",
//   description: "Add API usage examples to the README.",
//   authorId: 42
// }

// {
//   title: "Deploy app",
//   authorId: 7
// }

// // Invalid
// // title too short
// {
//   title: "Hi",
//   description: "Too short title",
//   authorId: 1
// }

// // negative authorId
// {
//   title: "Refactor services",
//   description: "Cleanup structure",
//   authorId: -3
// }

// // missing authorId
// {
//   title: "Ship release"
// }

// TODO mockResolvedValueOnce to add first and second values, with differences

// import { getPosts } from "../script";

// te st("getPosts should return an object with published & un-published posts separated", async () => {
//   const mockPublishedPost = {
//     id: 1,
//     content: "content",
//     published: true,
//     title: "title",
//     authorId: 1,
//   };

//   prisma.post.findMany
//     .mockResolvedValueOnce([mockPublishedPost])
//     .mockResolvedValueOnce([{ ...mockPublishedPost, published: false }]);

//   const posts = await getPosts();
//   expect(posts).toStrictEqual({
//     published: [mockPublishedPost],
//     unpublished: [{ ...mockPublishedPost, published: false }],
//   });
// });
