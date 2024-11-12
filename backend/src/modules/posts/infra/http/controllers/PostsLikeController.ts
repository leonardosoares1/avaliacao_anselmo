import { Request, Response } from 'express';

import AddLikeInPost, {
  DatabaseFactory as AddLikeInPostDatabaseFactory,
  InputData as AddLikeInPostInputData,
} from '@modules/posts/useCases/AddLikeInPost';
import RemoveLikeInPost, {
  DatabaseFactory as RemoveLikeInPostDatabaseFactory,
  InputData as RemoveLikeInPostInputData,
} from '@modules/posts/useCases/RemoveLikeInPost';

import HttpCodes from '@shared/core/HttpCodes';

interface IStoreRequestParams extends Record<string, string> {
  id: string;
}

interface IDestroyRequestParams extends Record<string, string> {
  id: string;
}

class PostsLikeController {
  public async store(
    request: Request<IStoreRequestParams>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new AddLikeInPostDatabaseFactory();
    const useCase = new AddLikeInPost(databaseFactory);
    const inputData = new AddLikeInPostInputData({
      id: Number(request.params.id),
    });
    await useCase.execute(inputData);
    return response.sendStatus(HttpCodes.Created);
  }

  public async destroy(
    request: Request<IDestroyRequestParams>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new RemoveLikeInPostDatabaseFactory();
    const useCase = new RemoveLikeInPost(databaseFactory);
    const inputData = new RemoveLikeInPostInputData({
      id: Number(request.params.id),
    });
    await useCase.execute(inputData);
    return response.sendStatus(HttpCodes.NoContent);
  }
}

export default new PostsLikeController();
