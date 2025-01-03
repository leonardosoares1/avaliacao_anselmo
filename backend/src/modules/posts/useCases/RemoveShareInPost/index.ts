import IPostRepository from '@modules/posts/repositories/IPostRepository';

import UseCase from '@shared/core/UseCase';
import ConflictError from '@shared/errors/ConflictError';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';

class RemoveShareInPost implements UseCase<InputData, void> {
  private postRepository: IPostRepository;

  constructor(repositoryFacade: IAbstractFactory) {
    this.postRepository = repositoryFacade.createPostRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyPost(inputData.id);
    await this.decrement(inputData.id);
  }

  private async verifyPost(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new ConflictError(`Publicação com #${id} não encontrada`);
    }
  }

  private async decrement(id: number): Promise<void> {
    await this.postRepository.decrementShare(id);
  }
}

export { DatabaseFactory, InputData };
export default RemoveShareInPost;
