import CountPostsInputData from '@modules/posts/repositories/dtos/postRepository/count/InputData';
import GetPostsInputData from '@modules/posts/repositories/dtos/postRepository/get/InputData';
import IPostRepository from '@modules/posts/repositories/IPostRepository';

import UseCase from '@shared/core/UseCase';
import Pagination from '@shared/helpers/Pagination';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';
import OutputData from './OutputData';

interface IGetPosts {
  filterIsActive?: boolean;
  filterTitle?: string;
  paginationLimit?: number;
  paginationOffset?: number;
}

interface IPost {
  counterLikes: number;
  counterShares: number;
  id: number;
  isActive: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface IGetPostsResponse {
  list: IPost[];
}

interface ICountTotalPages {
  filterIsActive?: boolean;
  filterTitle?: string;
  pagination: Pagination;
}

class GetAllPosts implements UseCase<InputData, OutputData> {
  private readonly postRepository: IPostRepository;

  constructor(repositoryFacade: IAbstractFactory) {
    this.postRepository = repositoryFacade.createPostRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const pagination = new Pagination({
      page: inputData.page,
      rowsPerPage: inputData.rowsPerPages,
    });
    const posts = await this.getPosts({
      filterIsActive: inputData.isActive,
      filterTitle: inputData.title,
      paginationLimit: pagination.getRowsPerPage(),
      paginationOffset: pagination.calculateSkip(),
    });
    const totalPages = await this.countTotalPages({
      filterIsActive: inputData.isActive,
      filterTitle: inputData.title,
      pagination,
    });
    const outputData = new OutputData({
      list: posts.list.map(post => ({
        counterLikes: post.counterLikes,
        counterShared: post.counterShares,
        id: post.id,
        isActive: post.isActive,
        subtitle: post.subtitle,
        thumbnail: post.thumbnail,
        title: post.title,
      })),
      pages: totalPages,
    });
    return outputData;
  }

  private async getPosts({
    filterIsActive,
    filterTitle,
    paginationLimit,
    paginationOffset,
  }: IGetPosts): Promise<IGetPostsResponse> {
    const inputData = new GetPostsInputData({
      filterIsActive,
      filterTitle,
      paginationLimit,
      paginationOffset,
    });
    const posts = await this.postRepository.get(inputData);
    return {
      list: posts.list.map(post => ({
        counterLikes: post.counterLikes,
        counterShares: post.counterShares,
        id: post.id,
        isActive: post.isActive,
        subtitle: post.subtitle,
        title: post.title,
        thumbnail: post.thumbnail,
      })),
    };
  }

  private async countTotalPages({
    filterIsActive,
    filterTitle,
    pagination,
  }: ICountTotalPages): Promise<number | undefined> {
    if (pagination.getPage() === 0) {
      return undefined;
    }
    const inputData = new CountPostsInputData({
      filterIsActive,
      filterTitle,
    });
    const counter = await this.postRepository.count(inputData);
    const totalPages = pagination.calculateTotalPages(counter);
    return totalPages;
  }
}

export { DatabaseFactory, InputData, OutputData };
export default GetAllPosts;
