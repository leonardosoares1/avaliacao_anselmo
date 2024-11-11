import { Repository } from 'typeorm';

import CreatePostInputData from '@modules/posts/repositories/dtos/postRepository/create/InputData';
import CreatePostOutputData from '@modules/posts/repositories/dtos/postRepository/create/OutputData';
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
}

export default PostDatabaseRepository;
