import CreatePostInputData from '@modules/posts/repositories/dtos/postRepository/create/InputData';
import IPostRepository from '@modules/posts/repositories/IPostRepository';

import UseCase from '@shared/core/UseCase';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';
import OutputData from './OutputData';

interface ICreatePost {
  content: string;
  isActive: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface ICreatePostResponse {
  id: number;
}

class CreatePost implements UseCase<InputData, OutputData> {
  private postRepository: IPostRepository;

  constructor(repositoryFacade: IAbstractFactory) {
    this.postRepository = repositoryFacade.createPostRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const post = await this.createPost({
      content: inputData.content,
      isActive: inputData.isActive,
      subtitle: inputData.subtitle,
      thumbnail: inputData.thumbnail,
      title: inputData.title,
    });
    const outputData = new OutputData({
      id: post.id,
    });
    return outputData;
  }

  private async createPost({
    content,
    isActive,
    subtitle,
    thumbnail,
    title,
  }: ICreatePost): Promise<ICreatePostResponse> {
    const inputData = new CreatePostInputData({
      content,
      isActive,
      subtitle,
      thumbnail,
      title,
    });
    const post = await this.postRepository.create(inputData);
    return {
      id: post.id,
    };
  }
}

export { DatabaseFactory, InputData, OutputData };
export default CreatePost;
