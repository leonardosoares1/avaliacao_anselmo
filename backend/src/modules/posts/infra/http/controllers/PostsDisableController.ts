import { Request, Response } from 'express';

import DisablePost, {
  DatabaseFactory as DisablePostDatabaseFactory,
  InputData as DisablePostInputData,
} from '@modules/posts/useCases/DisablePost';

import HttpCodes from '@shared/core/HttpCodes';
import ResponseController from '@shared/core/ResponseController';

interface IStoreRequestParams extends Record<string, string> {
  id: string;
}

class PostsDisableController {
  public async store(
    request: Request<IStoreRequestParams>,
    response: Response<ResponseController>,
  ): Promise<Response> {
    const databaseFactory = new DisablePostDatabaseFactory();
    const useCase = new DisablePost(databaseFactory);
    const inputData = new DisablePostInputData({
      id: Number(request.params.id),
    });
    await useCase.execute(inputData);
    return response.status(HttpCodes.Ok).json({
      message: 'Publicação desativada com sucesso',
    });
  }
}

export default new PostsDisableController();
