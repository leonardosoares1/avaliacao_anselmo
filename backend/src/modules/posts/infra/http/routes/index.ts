import { Router } from 'express';

import postsRoutes from './posts.routes';
import postsDisableRoutes from './postsDisable.routes';
import postsEnableRoutes from './postsEnable.routes';

const router = Router();

router.use(postsDisableRoutes);
router.use(postsEnableRoutes);
router.use(postsRoutes);

export default router;
