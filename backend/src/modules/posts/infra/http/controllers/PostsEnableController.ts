import { Request, Response } from 'express';

import EnablePost, {
  DatabaseFactory as EnablePostDatabaseFactory,
  InputData as EnablePostInputData,
} from '@modules/posts/useCases/EnablePost';

import HttpCodes from '@shared/core/HttpCodes';
import ResponseController from '@shared/core/ResponseController';

interface IStoreRequestParams extends Record<string, string> {
  id: string;
}

class PostsEnableController {
  public async store(
    request: Request<IStoreRequestParams>,
    response: Response<ResponseController>,
  ): Promise<Response> {
    const databaseFactory = new EnablePostDatabaseFactory();
    const useCase = new EnablePost(databaseFactory);
    const inputData = new EnablePostInputData({
      id: Number(request.params.id),
    });
    await useCase.execute(inputData);
    return response.status(HttpCodes.Ok).json({
      message: 'Publicação ativada com sucesso',
    });
  }
}

export default new PostsEnableController();
