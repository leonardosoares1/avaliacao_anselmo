import HttpClient from '@services/httpClient/HttpClient';

import IGetAllInputData from './dtos/getAll/InputData';
import IGetAllOutputData from './dtos/getAll/OutputData';
import IGetDetailsInputData from './dtos/getDetails/InputData';
import IGetDetailsOutputData from './dtos/getDetails/OutputData';
import ILikeInputData from './dtos/like/InputData';
import IShareInputData from './dtos/share/InputData';
import IPostRepository from './IPostRepository';

interface IGetPostListBodyResponse {
  list: {
    content: string;
    counterLikes: number;
    counterShares: number;
    id: number;
    is_active: boolean;
    subtitle: string;
    thumbnail: string;
    title: string;
  }[];
  pagination: {
    current_page: number;
    total_page: number;
  };
}

interface IGetParamsResponse {
  page?: number;
  rows_per_page?: number;
}

interface IGetDetailsBodyResponse {
  content: string;
  id: number;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

class PostService implements IPostRepository {
  public async getAll(inputData: IGetAllInputData): Promise<IGetAllOutputData> {
    const params: IGetParamsResponse = {
      page: inputData.page,
      rows_per_page: 3,
    };
    const result = await HttpClient.get<IGetPostListBodyResponse>({
      path: '/posts',
      params,
    });
    const response: IGetAllOutputData = {
      list: result.data.list.map((item) => ({
        id: item.id,
        counterLikes: item.counterLikes,
        counterShares: item.counterShares,
        content: item.content,
        isActive: item.is_active,
        subtitle: item.subtitle,
        thumbnail: item.thumbnail,
        title: item.title,
      })),
      pagination: result.data.pagination,
    };
    console.log('response', response.pagination);
    return response;
  }

  public async getDetails(
    inputData: IGetDetailsInputData,
  ): Promise<IGetDetailsOutputData> {
    const response = await HttpClient.get<IGetDetailsBodyResponse>({
      path: `/posts/${inputData.id}`,
    });
    const outputData: IGetDetailsOutputData = {
      content: response.data.content,
      id: response.data.id,
      is_active: response.data.is_active,
      subtitle: response.data.subtitle,
      thumbnail: response.data.thumbnail,
      title: response.data.title,
    };
    return outputData;
  }

  public async like(inputData: ILikeInputData): Promise<void> {
    await HttpClient.post({
      path: `/posts/${inputData.id}/like`,
    });
  }

  public async share(inputData: IShareInputData): Promise<void> {
    await HttpClient.post({
      path: `/posts/${inputData.id}/share`,
    });
  }
}

export default new PostService();
