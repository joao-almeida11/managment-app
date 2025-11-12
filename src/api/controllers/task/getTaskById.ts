import { Request, Response } from 'express';
import { prisma } from '../../lib/prisma.ts';
import { z } from 'zod';

const taskIdSchema = z.number().int().positive('User ID is required');

const getTaskById = async (req: Request<{ taskId: string }>, res: Response) => {
    try {
        const taskId = taskIdSchema.parse(Number(req.params.taskId));

        const result = await prisma.task.findUnique({
            where: { id: taskId },
        });

        if (!result) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(result);
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: 'Validation error',
                errors: error.issues,
            });
        }

        console.error(error);
        res.status(500).json({ message: 'Error fetching task' });
    }
};

export default getTaskById;
