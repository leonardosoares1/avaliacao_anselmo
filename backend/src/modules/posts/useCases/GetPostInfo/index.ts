import IPostRepository from '@modules/posts/repositories/IPostRepository';

import UseCase from '@shared/core/UseCase';
import ConflictError from '@shared/errors/ConflictError';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';
import OutputData from './OutputData';

interface IGetInfoResponse {
  content: string;
  id: number;
  isActive: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

class GetPostInfo implements UseCase<InputData, OutputData> {
  private postRepository: IPostRepository;

  constructor(repositoryFacade: IAbstractFactory) {
    this.postRepository = repositoryFacade.createPostRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const post = await this.getInfo(inputData.id);
    const outputData = new OutputData({
      content: post.content,
      id: post.id,
      isActive: post.isActive,
      subtitle: post.subtitle,
      thumbnail: post.thumbnail,
      title: post.title,
    });
    return outputData;
  }

  private async getInfo(id: number): Promise<IGetInfoResponse> {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new ConflictError(`Publicação com #${id} não encontrada`);
    }
    return {
      content: post.content,
      id: post.id,
      isActive: post.isActive,
      subtitle: post.subtitle,
      thumbnail: post.thumbnail,
      title: post.title,
    };
  }
}

export { DatabaseFactory, InputData, OutputData };
export default GetPostInfo;
