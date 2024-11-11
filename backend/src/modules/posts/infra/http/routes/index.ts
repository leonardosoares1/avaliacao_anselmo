import { Router } from 'express';

import postsRoutes from './posts.routes';

const router = Router();

router.use(postsRoutes);

export default router;
