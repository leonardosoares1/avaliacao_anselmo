import { Router } from 'express';

import IsAdminAuthenticated from '@shared/infra/http/middlewares/IsAdminAuthenticated';

import controller from '../controllers/PostsController';
import validation from '../middlewares/validations/PostsController';

const router = Router();
const isAdminAuthenticated = new IsAdminAuthenticated();

router.post(
  '/',
  [isAdminAuthenticated.execute, validation.create],
  controller.store,
);

router.get('/:id', [isAdminAuthenticated.execute], controller.show);

export default router;
