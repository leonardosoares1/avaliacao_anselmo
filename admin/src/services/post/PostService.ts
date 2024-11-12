import { AxiosResponse } from 'axios';

import EHttpStatusCodes from '@constants/httpStatusCodes';

import httpClient from '@services/httpClient';

import ICreateInputData from './dtos/create/InputData';
import IDisableInputData from './dtos/disable/InputData';
import IEnableInputData from './dtos/enable/InputData';
import IGetAllInputData from './dtos/getAll/InputData';
import IGetAllOutputData from './dtos/getAll/OutputData';
import IGetDetailsInputData from './dtos/getDetails/InputData';
import IGetDetailsOutputData from './dtos/getDetails/OutputData';
import IUpdateInputData from './dtos/update/InputData';
import IPostRepository from './IPostRepository';

interface ICreateBody {
  content: string;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface IGetPostDetailsResponse {
  content: string;
  id: number;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

export interface IPost {
  counterLikes: number;
  counterShares: number;
  id: number;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}

interface IPostResponse {
  list: IPost[];
  pagination: {
    current_page: number;
    total_page: number;
  };
}

interface IUpdateBody {
  content: string;
  subtitle: string;
  thumbnail: string;
  title: string;
}

class PostService implements IPostRepository {
  public async create(inputData: ICreateInputData): Promise<void> {
    const body: ICreateBody = {
      content: inputData.content,
      is_active: inputData.isActive,
      subtitle: inputData.subtitle,
      thumbnail: inputData.thumbnail,
      title: inputData.title,
    };
    await httpClient.post('/posts', body);
  }

  public async disable(inputData: IDisableInputData): Promise<void> {
    await httpClient.post(`/posts/${inputData.id}/disable`);
  }

  public async enable(inputData: IEnableInputData): Promise<void> {
    await httpClient.post(`/posts/${inputData.id}/enable`);
  }

  public async getAll(inputData: IGetAllInputData): Promise<IGetAllOutputData> {
    const params = {
      is_active: inputData.is_active,
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
          current_page: 0,
          total_page: 0,
        },
      };
      return outputData;
    }
    const outputData: IGetAllOutputData = {
      list: response.data.list.map((post) => ({
        title: post.title,
        isActive: post.is_active,
        subtitle: post.subtitle,
        thumbnail: post.thumbnail,
        counterLikes: post.counterLikes,
        counterShares: post.counterShares,
        id: post.id,
      })),
      pagination: response.data.pagination,
    };
    return outputData;
  }

  public async getDetails(
    inputData: IGetDetailsInputData,
  ): Promise<IGetDetailsOutputData | undefined> {
    const response: AxiosResponse<IGetPostDetailsResponse> =
      await httpClient.get(`/posts/${inputData.id}`);
    if (response.status === EHttpStatusCodes.NO_CONTENT) {
      return undefined;
    }
    const outputData: IGetDetailsOutputData = {
      id: response.data.id,
      content: response.data.content,
      isActive: response.data.is_active,
      subtitle: response.data.subtitle,
      thumbnail: response.data.thumbnail,
      title: response.data.title,
    };
    return outputData;
  }

  public async update(inputData: IUpdateInputData): Promise<void> {
    const body: IUpdateBody = {
      content: inputData.content,
      subtitle: inputData.subtitle,
      thumbnail: inputData.thumbnail,
      title: inputData.title,
    };
    await httpClient.put(`/posts/${inputData.id}`, body);
  }
}

export default new PostService();
