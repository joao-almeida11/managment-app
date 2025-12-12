import { z } from "zod";

const updateTaskByIdSchema = z.object({
  title: z.string().min(3, "Title is required"),
  description: z.string().optional(),
  status: z.enum(["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"]).optional(),
});

export type updateTaskBody = z.infer<typeof updateTaskByIdSchema>;
export default updateTaskByIdSchema;
