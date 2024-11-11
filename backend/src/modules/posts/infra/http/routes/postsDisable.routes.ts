import { Router } from 'express';

import IsAdminAuthenticated from '@shared/infra/http/middlewares/IsAdminAuthenticated';

import controller from '../controllers/PostsDisableController';

const router = Router();
const isAdminAuthenticated = new IsAdminAuthenticated();

router.post('/:id/disable', [isAdminAuthenticated.execute], controller.store);

export default router;
