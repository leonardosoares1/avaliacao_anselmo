import { Router } from 'express';

import controller from '../controllers/PostsLikeController';

const router = Router();

router.post('/:id/like', controller.store);
router.delete('/:id/like', controller.destroy);

export default router;
