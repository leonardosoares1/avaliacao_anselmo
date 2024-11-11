import { Router } from 'express';

import generalConfig from '@config/general';

import sessionsRoutes from '@modules/sessions/infra/http/routes';

import HttpCodes from '@shared/core/HttpCodes';

const routes = Router();

routes.get('/status', (_, response) => {
  return response
    .status(HttpCodes.Ok)
    .json({ name: generalConfig.name, status: true });
});

routes.use('/sessions', sessionsRoutes);

export default routes;
