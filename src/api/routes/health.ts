import { Router } from 'express';

import getHealth from '../controllers/health/index.ts';

const router = Router();

router.get('/', getHealth);

export default router;
