import { Request, Response } from 'express';

import AddShareInPost, {
  DatabaseFactory as AddShareInPostDatabaseFactory,
  InputData as AddShareInPostInputData,
} from '@modules/posts/useCases/AddShareInPost';
import RemoveShareInPost, {
  DatabaseFactory as RemoveShareInPostDatabaseFactory,
  InputData as RemoveShareInPostInputData,
} from '@modules/posts/useCases/RemoveShareInPost';

import HttpCodes from '@shared/core/HttpCodes';

interface IStoreRequestParams extends Record<string, string> {
  id: string;
}

interface IDestroyRequestParams extends Record<string, string> {
  id: string;
}

class PostsShareController {
  public async store(
    request: Request<IStoreRequestParams>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new AddShareInPostDatabaseFactory();
    const useCase = new AddShareInPost(databaseFactory);
    const inputData = new AddShareInPostInputData({
      id: Number(request.params.id),
    });
    await useCase.execute(inputData);
    return response.sendStatus(HttpCodes.Created);
  }

  public async destroy(
    request: Request<IDestroyRequestParams>,
    response: Response,
  ): Promise<Response> {
    const databaseFactory = new RemoveShareInPostDatabaseFactory();
    const useCase = new RemoveShareInPost(databaseFactory);
    const inputData = new RemoveShareInPostInputData({
      id: Number(request.params.id),
    });
    await useCase.execute(inputData);
    return response.sendStatus(HttpCodes.NoContent);
  }
}

export default new PostsShareController();
