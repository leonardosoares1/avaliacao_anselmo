import axios, { AxiosInstance, AxiosResponse, isAxiosError } from 'axios';

import HttpClientError from '@errors/HttpClientError';

type ResponseWrapped<T> = T & {
  erro?: string;
};

class HttpClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3333',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // timeout: 1000 * 90,
      timeoutErrorMessage: 'Servidor indisponível',
    });
  }

  public async post<T, S = unknown>({
    body,
    path,
  }: {
    body?: S;
    path: string;
  }): Promise<AxiosResponse<T>> {
    try {
      const response = await this.instance.post<ResponseWrapped<T>>(path, body);
      if (response.data.erro) {
        throw new Error(response.data.erro);
      }
      return response;
    } catch (err) {
      if (isAxiosError(err)) {
        throw new HttpClientError({
          body: err.response?.data,
          message: `${err.response?.status} = ${err.response?.statusText}`,
          response: err.response,
        });
      }
      throw new Error('Erro não tratado');
    }
  }

  public async get<T = unknown>({
    params,
    path,
  }: {
    params?: Record<string, any>;
    path: string;
  }): Promise<AxiosResponse<T>> {
    try {
      const response = await this.instance.get<ResponseWrapped<T>>(path, {
        params,
      });
      if (response.data.erro) {
        throw new Error(response.data.erro);
      }
      return response;
    } catch (err) {
      if (isAxiosError(err)) {
        throw new HttpClientError({
          body: err.response?.data,
          message: `${err.response?.status} = ${err.response?.statusText}`,
          response: err.response,
        });
      }
      throw new Error('Erro não tratado');
    }
  }

  public getHeaders(): any {
    return this.instance.defaults.headers.common;
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance;
  }
}

export default new HttpClient();
