import PostDatabaseRepository from '@modules/posts/infra/typeorm/repositories/PostDatabaseRepository';
import IPostRepository from '@modules/posts/repositories/IPostRepository';

import IAbstractFactory from './IAbstractFactory';

class DatabaseFactory implements IAbstractFactory {
  public createPostRepository(): IPostRepository {
    return new PostDatabaseRepository();
  }
}

export default DatabaseFactory;
