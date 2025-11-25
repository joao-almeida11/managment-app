import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().optional(),
  authorId: z.number().int().positive("authorId must be a positive integer"),
});

export type createTaskBodyType = z.infer<typeof createTaskSchema>;
export default createTaskSchema;
