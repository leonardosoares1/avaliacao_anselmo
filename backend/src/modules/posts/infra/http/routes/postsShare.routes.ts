import { Router } from 'express';

import controller from '../controllers/PostsShareController';

const router = Router();

router.post('/:id/share', controller.store);
router.delete('/:id/share', controller.destroy);

export default router;
