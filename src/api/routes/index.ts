import { Router } from 'express';
import health from './health';
import users from './users';
import tasks from './tasks';

const router = Router();

router.use('/health', health);
router.use('/users', users);
router.use('/tasks', tasks);

export default router;
