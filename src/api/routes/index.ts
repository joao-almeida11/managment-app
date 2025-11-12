import { Router } from 'express';
import health from './health.ts';
import users from './users.ts';
import tasks from './tasks.ts';

const router = Router();

router.use('/health', health);
router.use('/users', users);
router.use('/tasks', tasks);

export default router;
