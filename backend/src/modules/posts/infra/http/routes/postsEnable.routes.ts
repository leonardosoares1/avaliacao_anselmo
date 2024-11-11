import { Router } from 'express';

import IsAdminAuthenticated from '@shared/infra/http/middlewares/IsAdminAuthenticated';

import controller from '../controllers/PostsEnableController';

const router = Router();
const isAdminAuthenticated = new IsAdminAuthenticated();

router.post('/:id/enable', [isAdminAuthenticated.execute], controller.store);

export default router;
