import { Router } from 'express';

import IsAdminAuthenticated from '@shared/infra/http/middlewares/IsAdminAuthenticated';

import controller from '../controllers/PostsController';
import validation from '../middlewares/validations/PostsController';

const router = Router();
const isAdminAuthenticated = new IsAdminAuthenticated();

router.get('/', controller.index);

router.post(
  '/',
  [isAdminAuthenticated.execute, validation.store],
  controller.store,
);

router.get('/:id', controller.show);

router.put(
  '/:id',
  [isAdminAuthenticated.execute, validation.update],
  controller.update,
);

export default router;
