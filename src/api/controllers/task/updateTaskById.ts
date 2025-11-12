import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';
import { prisma } from '../../lib/prisma';
import { z } from 'zod';

const taskIdSchema = z.number().int().positive('Task ID is required');

const updateTaskByIdSchema = z.object({
    title: z.string().min(3, 'Title is required'),
    description: z.string().optional(),
    status: z.enum(['TO_DO', 'IN_PROGRESS', 'IN_REVIEW', 'DONE']).optional(),
});

type UpdateTaskBody = z.infer<typeof updateTaskByIdSchema>;

const updateTaskById = async (
    req: Request<{ taskId: string }, {}, UpdateTaskBody>,
    res: Response
) => {
    try {
        const taskId = taskIdSchema.parse(Number(req.params.taskId));
        const data = updateTaskByIdSchema.parse(req.body);

        const result = await prisma.task.update({
            where: { id: taskId },
            data: data,
        });

        res.status(200).json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.issues,
            });
        }

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error?.code === 'P2025') {
                return res.status(404).json({ message: 'Task not found' });
            }
        }

        console.error(error);
        res.status(500).json({ message: 'Error updating task' });
    }
};

export default updateTaskById;
