import { AxiosResponse } from 'axios';

import EHttpStatusCodes from '@constants/httpStatusCodes';

import httpClient from '@services/httpClient';

import IGetAllInputData from './dtos/getAll/InputData';
import IGetAllOutputData from './dtos/getAll/OutputData';
import IPostRepository from './IPostRepository';

export interface IPost {
  content: string;
  id: number;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface IPostResponse {
  list: IPost[];
  pagination: {
    current: number;
    total: number;
  };
}

class PostService implements IPostRepository {
  public async getAll(inputData: IGetAllInputData): Promise<IGetAllOutputData> {
    const params = {
      isActive: inputData.isActive,
      title: inputData.title,
    };
    const response: AxiosResponse<IPostResponse> = await httpClient.get(
      '/posts',
      { params },
    );
    if (response.status === EHttpStatusCodes.NO_CONTENT) {
      const outputData: IGetAllOutputData = {
        list: [],
        pagination: {
          current: 0,
          total: 0,
        },
      };
      return outputData;
    }
    const outputData: IGetAllOutputData = {
      list: response.data.list.map((post) => ({
        title: post.title,
        content: post.content,
        isActive: post.is_active,
        subtitle: post.subtitle,
        thumbnail: post.thumbnail,
        id: post.id,
      })),
      pagination: response.data.pagination,
    };
    return outputData;
  }
}

export default new PostService();
