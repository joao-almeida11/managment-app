import { Router } from 'express';

import createTask from '../controllers/task/createTask.ts';
import getTaskById from '../controllers/task/getTaskById.ts';
import updateTaskById from '../controllers/task/updateTaskById.ts';
import deleteTaskById from '../controllers/task/deleteTaskById.ts';

const router = Router();

router.post('/', createTask);
router.get('/:taskId', getTaskById);
router.put('/:taskId', updateTaskById);
router.delete('/:taskId', deleteTaskById);

export default router;
