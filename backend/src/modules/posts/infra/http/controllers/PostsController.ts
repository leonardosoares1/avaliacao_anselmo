import { Request, Response } from 'express';

import CreatePost, {
  DatabaseFactory as CreatePostDatabaseFactory,
  InputData as CreatePostInputData,
} from '@modules/posts/useCases/CreatePost';
import GetAllPosts, {
  DatabaseFactory as GetAllPostsDatabaseFactory,
  InputData as GetAllPostsInputData,
} from '@modules/posts/useCases/GetAllPosts';
import GetPostInfo, {
  DatabaseFactory as GetPostInfoDatabaseFactory,
  InputData as GetPostInfoInputData,
} from '@modules/posts/useCases/GetPostInfo';
import UpdatePost, {
  DatabaseFactory as UpdatePostDatabaseFactory,
  InputData as UpdatePostInputData,
} from '@modules/posts/useCases/UpdatePost';

import HttpCodes from '@shared/core/HttpCodes';
import ResponseController from '@shared/core/ResponseController';

interface IIndexRequestQuery extends Record<string, string | undefined> {
  is_active?: '0' | '1';
  page?: string;
  rows_per_page?: string;
  title?: string;
}

interface IIndexResponse {
  list: {
    counterLikes: number;
    counterShares: number;
    id: number;
    is_active: boolean;
    subtitle: string;
    thumbnail: string;
    title: string;
  }[];
  pagination?: {
    current_page: number;
    total_pages: number;
  };
}

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

interface IShowRequestParams extends Record<string, string> {
  id: string;
}
interface IShowResponse {
  content: string;
  id: number;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface IUpdateRequestParams extends Record<string, string> {
  id: string;
}
interface IUpdateRequestBody {
  content: string;
  subtitle: string;
  thumbnail: string;
  title: string;
}

class PostsController {
  public async index(
    request: Request<unknown, unknown, undefined, IIndexRequestQuery>,
    response: Response<IIndexResponse>,
  ): Promise<Response> {
    const databaseFactory = new GetAllPostsDatabaseFactory();
    const useCase = new GetAllPosts(databaseFactory);
    const inputData = new GetAllPostsInputData({
      isActive: request.query.is_active
        ? !!Number(request.query.is_active)
        : undefined,
      page: request.query.page ? Number(request.query.page) : undefined,
      rowsPerPages: request.query.rows_per_page
        ? Number(request.query.rows_per_page)
        : undefined,
      title: request.query.title,
    });
    const posts = await useCase.execute(inputData);
    if (posts.list.length === 0) {
      return response.sendStatus(HttpCodes.NoContent);
    }
    return response.status(HttpCodes.Ok).json({
      list: posts.list.map(post => ({
        counterLikes: post.counterLikes,
        counterShares: post.counterShared,
        id: post.id,
        is_active: post.isActive,
        subtitle: post.subtitle,
        thumbnail: post.thumbnail,
        title: post.title,
      })),
      pagination:
        !request.query.page || request.query.page === '0'
          ? undefined
          : {
              current_page: Number(request.query.page),
              total_pages: posts.pages || 0,
            },
    });
  }

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

  public async show(
    request: Request<IShowRequestParams>,
    response: Response<IShowResponse>,
  ): Promise<Response> {
    const databaseFactory = new GetPostInfoDatabaseFactory();
    const useCase = new GetPostInfo(databaseFactory);
    const inputData = new GetPostInfoInputData({
      id: Number(request.params.id),
    });
    const post = await useCase.execute(inputData);
    return response.status(HttpCodes.Ok).json({
      content: post.content,
      id: post.id,
      is_active: post.isActive,
      subtitle: post.subtitle,
      thumbnail: post.thumbnail,
      title: post.title,
    });
  }

  public async update(
    request: Request<IUpdateRequestParams, unknown, IUpdateRequestBody>,
    response: Response<ResponseController>,
  ): Promise<Response> {
    const databaseFactory = new UpdatePostDatabaseFactory();
    const useCase = new UpdatePost(databaseFactory);
    const inputData = new UpdatePostInputData({
      content: request.body.content,
      id: Number(request.params.id),
      subtitle: request.body.subtitle,
      thumbnail: request.body.thumbnail,
      title: request.body.title,
    });
    await useCase.execute(inputData);
    return response.status(HttpCodes.Ok).json({
      message: 'Publicação alterada com sucesso',
    });
  }
}

export default new PostsController();
