import { Router } from 'express';

import sessionsRoutes from './sessions.routes';

const router = Router();

router.use(sessionsRoutes);

export default router;
