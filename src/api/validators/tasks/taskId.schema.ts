import { z } from "zod";

const taskIdSchema = z.number().int().positive("Task ID is required");

export default taskIdSchema;
