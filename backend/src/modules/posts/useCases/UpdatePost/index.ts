import UpdatePostInputData from '@modules/posts/repositories/dtos/postRepository/update/InputData';
import IPostRepository from '@modules/posts/repositories/IPostRepository';

import UseCase from '@shared/core/UseCase';
import ConflictError from '@shared/errors/ConflictError';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';

interface IUpdatePost {
  content: string;
  id: number;
  subtitle: string;
  thumbnail: string;
  title: string;
}

class UpdatePost implements UseCase<InputData, void> {
  private postRepository: IPostRepository;

  constructor(repositoryFacade: IAbstractFactory) {
    this.postRepository = repositoryFacade.createPostRepository();
  }

  public async execute(inputData: InputData): Promise<void> {
    await this.verifyPost(inputData.id);
    await this.updatePost({
      content: inputData.content,
      id: inputData.id,
      subtitle: inputData.subtitle,
      thumbnail: inputData.thumbnail,
      title: inputData.title,
    });
  }

  private async verifyPost(id: number): Promise<void> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new ConflictError(`Publicação com #${id} não encontrada`);
    }
  }

  private async updatePost({
    content,
    id,
    subtitle,
    thumbnail,
    title,
  }: IUpdatePost): Promise<void> {
    const inputData = new UpdatePostInputData({
      content,
      id,
      subtitle,
      thumbnail,
      title,
    });
    await this.postRepository.update(inputData);
  }
}

export { DatabaseFactory, InputData };
export default UpdatePost;
