import { Router } from 'express';

import generalConfig from '@config/general';

import filesRoutes from '@modules/files/infra/http/routes/files.routes';
import postsRoutes from '@modules/posts/infra/http/routes';
import sessionsRoutes from '@modules/sessions/infra/http/routes';

import HttpCodes from '@shared/core/HttpCodes';

const routes = Router();

routes.get('/status', (_, response) => {
  return response
    .status(HttpCodes.Ok)
    .json({ name: generalConfig.name, status: true });
});

routes.use('/posts', postsRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/files', filesRoutes);

export default routes;
