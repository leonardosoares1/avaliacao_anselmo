import { Request, Response } from 'express';

import CreatePost, {
  DatabaseFactory as CreatePostDatabaseFactory,
  InputData as CreatePostInputData,
} from '@modules/posts/useCases/CreatePost';

import HttpCodes from '@shared/core/HttpCodes';
import ResponseController from '@shared/core/ResponseController';

interface IStoreRequestBody {
  content: string;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}
interface IStoreResponse extends ResponseController {
  id: number;
}

class PostsController {
  public async store(
    request: Request<unknown, unknown, IStoreRequestBody>,
    response: Response<IStoreResponse>,
  ): Promise<Response> {
    const databaseFactory = new CreatePostDatabaseFactory();
    const useCase = new CreatePost(databaseFactory);
    const inputData = new CreatePostInputData({
      content: request.body.content,
      isActive: request.body.is_active,
      subtitle: request.body.subtitle,
      thumbnail: request.body.thumbnail,
      title: request.body.title,
    });
    const postCreated = await useCase.execute(inputData);
    return response.status(HttpCodes.Created).json({
      id: postCreated.id,
      message: 'Publicação criada com sucesso',
    });
  }
}

export default new PostsController();
