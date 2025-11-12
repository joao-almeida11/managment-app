import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';
import { z } from 'zod';

const createTaskSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().optional(),
    authorId: z.number().int().positive('authorId must be a positive integer'),
});
type CreateTaskBody = z.infer<typeof createTaskSchema>;

const createTask = async (
    req: Request<{}, {}, CreateTaskBody>,
    res: Response
) => {
    try {
        const { title, description, authorId } = createTaskSchema.parse(
            req.body
        );

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
                message: 'Validation error',
                errors: error.issues,
            });
        }

        console.error(error);
        res.status(500).json({ message: 'Error creating task' });
    }
};

export default createTask;
