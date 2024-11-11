import { Router } from 'express';

import IsAdminAuthenticated from '@shared/infra/http/middlewares/IsAdminAuthenticated';

import controller from '../controllers/SessionsController';
import validation from '../middlewares/validations/SessionsController';

const router = Router();
const isAdminAuthenticated = new IsAdminAuthenticated();

router.post('/', [validation.create], controller.store);
router.get('/', [isAdminAuthenticated.execute], controller.show);

export default router;
