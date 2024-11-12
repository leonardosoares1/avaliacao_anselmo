import { FindOptionsWhere, Repository } from 'typeorm';

import CountPostsInputData from '@modules/posts/repositories/dtos/postRepository/count/InputData';
import CreatePostInputData from '@modules/posts/repositories/dtos/postRepository/create/InputData';
import CreatePostOutputData from '@modules/posts/repositories/dtos/postRepository/create/OutputData';
import FindPostByIdOutputData from '@modules/posts/repositories/dtos/postRepository/findById/OutputData';
import GetPostsInputData from '@modules/posts/repositories/dtos/postRepository/get/InputData';
import GetPostsOutputData from '@modules/posts/repositories/dtos/postRepository/get/OutputData';
import UpdatePostInputData from '@modules/posts/repositories/dtos/postRepository/update/InputData';
import IPostRepository from '@modules/posts/repositories/IPostRepository';

import databaseAdapter from '@shared/adapters/database';
import DatabaseError from '@shared/errors/DatabaseError';
import CaughtError from '@shared/helpers/CaughtError';

import PostMapper from '../mappers/PostMapper';

class PostDatabaseRepository implements IPostRepository {
  private postRepository: Repository<PostMapper>;

  constructor() {
    const queryRunner = databaseAdapter.getQueryRunner();
    this.postRepository = queryRunner.manager.getRepository(PostMapper);
  }

  public async count(inputData: CountPostsInputData): Promise<number> {
    try {
      const whereConditions: FindOptionsWhere<PostMapper> = {};
      if (inputData.filterIsActive !== undefined) {
        whereConditions.isActive = inputData.filterIsActive;
      }
      if (inputData.filterTitle) {
        whereConditions.title = inputData.filterTitle;
      }
      const counter = await this.postRepository.count({
        where: whereConditions,
      });
      return counter;
    } catch (err) {
      const caughtError = new CaughtError(err);
      throw new DatabaseError(caughtError.getMessage());
    }
  }

  public async create(
    inputData: CreatePostInputData,
  ): Promise<CreatePostOutputData> {
    try {
      const postToSave = this.postRepository.create({
        content: inputData.content,
        isActive: inputData.isActive,
        subtitle: inputData.subtitle,
        thumbnail: inputData.thumbnail,
        title: inputData.title,
      });
      const postSaved = await this.postRepository.save(postToSave);
      const output = new CreatePostOutputData({
        id: postSaved.id,
      });
      return output;
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async decrementLike(id: number): Promise<void> {
    try {
      const post = await this.postRepository.findOneBy({ id });
      if (!post) {
        throw new DatabaseError(`Publicação #${id} não encontrada`);
      }
      if (post.countLikes === 0) {
        return;
      }
      await this.postRepository.update(
        {
          id,
        },
        {
          countLikes: post.countLikes - 1,
        },
      );
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async decrementShare(id: number): Promise<void> {
    try {
      const post = await this.postRepository.findOneBy({ id });
      if (!post) {
        throw new DatabaseError(`Publicação #${id} não encontrada`);
      }
      if (post.countShares === 0) {
        return;
      }
      await this.postRepository.update(
        {
          id,
        },
        {
          countShares: post.countShares - 1,
        },
      );
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async disable(id: number): Promise<void> {
    try {
      await this.postRepository.update(
        {
          id,
        },
        {
          isActive: false,
        },
      );
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async enable(id: number): Promise<void> {
    try {
      await this.postRepository.update(
        {
          id,
        },
        {
          isActive: true,
        },
      );
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async findById(
    id: number,
  ): Promise<FindPostByIdOutputData | undefined> {
    try {
      const post = await this.postRepository.findOneBy({
        id,
      });
      if (!post) {
        return undefined;
      }
      const output = new FindPostByIdOutputData({
        content: post.content,
        id: post.id,
        isActive: post.isActive,
        subtitle: post.subtitle,
        thumbnail: post.thumbnail,
        title: post.title,
      });
      return output;
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async get(inputData: GetPostsInputData): Promise<GetPostsOutputData> {
    try {
      const whereConditions: FindOptionsWhere<PostMapper> = {};
      if (inputData.filterIsActive !== undefined) {
        whereConditions.isActive = inputData.filterIsActive;
      }
      if (inputData.filterTitle) {
        whereConditions.title = inputData.filterTitle;
      }
      const posts = await this.postRepository.find({
        where: whereConditions,
        take: inputData.paginationLimit,
        skip: inputData.paginationOffset,
      });
      const output = new GetPostsOutputData({
        list: posts.map(post => ({
          counterLikes: post.countLikes,
          counterShares: post.countShares,
          id: post.id,
          isActive: post.isActive,
          subtitle: post.subtitle,
          thumbnail: post.thumbnail,
          title: post.title,
        })),
      });
      return output;
    } catch (err) {
      const caughtError = new CaughtError(err);
      throw new DatabaseError(caughtError.getMessage());
    }
  }

  public async incrementLike(id: number): Promise<void> {
    try {
      const post = await this.postRepository.findOneBy({ id });
      if (!post) {
        throw new DatabaseError(`Publicação #${id} não encontrada`);
      }
      await this.postRepository.update(
        {
          id,
        },
        {
          countLikes: post.countLikes + 1,
        },
      );
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async incrementShare(id: number): Promise<void> {
    try {
      const post = await this.postRepository.findOneBy({ id });
      if (!post) {
        throw new DatabaseError(`Publicação #${id} não encontrada`);
      }
      await this.postRepository.update(
        {
          id,
        },
        {
          countShares: post.countShares + 1,
        },
      );
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }

  public async update(inputData: UpdatePostInputData): Promise<void> {
    try {
      await this.postRepository.update(
        {
          id: inputData.id,
        },
        {
          content: inputData.content,
          subtitle: inputData.subtitle,
          thumbnail: inputData.thumbnail,
          title: inputData.title,
        },
      );
    } catch (err) {
      const error = new CaughtError(err);
      throw new DatabaseError(error.getMessage());
    }
  }
}

export default PostDatabaseRepository;
