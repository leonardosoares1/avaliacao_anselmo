import { Router } from 'express';

import postsRoutes from './posts.routes';
import postsDisableRoutes from './postsDisable.routes';
import postsEnableRoutes from './postsEnable.routes';
import postsLikeRoutes from './postsLike.routes';
import postsShareRoutes from './postsShare.routes';

const router = Router();

router.use(postsDisableRoutes);
router.use(postsEnableRoutes);
router.use(postsLikeRoutes);
router.use(postsShareRoutes);
router.use(postsRoutes);

export default router;
