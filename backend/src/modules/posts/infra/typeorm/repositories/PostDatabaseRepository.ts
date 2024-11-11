import { Repository } from 'typeorm';

import CreatePostInputData from '@modules/posts/repositories/dtos/postRepository/create/InputData';
import CreatePostOutputData from '@modules/posts/repositories/dtos/postRepository/create/OutputData';
import FindPostByIdOutputData from '@modules/posts/repositories/dtos/postRepository/findById/OutputData';
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
}

export default PostDatabaseRepository;
