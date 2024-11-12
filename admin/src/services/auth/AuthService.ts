import httpClient from '@services/httpClient';

import ICreateInputData from './dtos/create/InputData';
import ICreateOutputData from './dtos/create/OutputData';
import ISignInInputData from './dtos/signIn/InputData';
import ISignInOutputData from './dtos/signIn/OutputData';
import IAuthRepository from './IAuthRepository';

interface ICreateBody {
  email: string;
  password: string;
}

class AuthService implements IAuthRepository {
  public async create(inputData: ICreateInputData): Promise<ICreateOutputData> {
    const body: ICreateBody = {
      email: inputData.email,
      password: inputData.password,
    };
    const response = await httpClient.post('/sessions', body);

    const outputData: ICreateOutputData = {
      token: response.data.token,
    };
    return outputData;
  }

  public async signIn(inputData: ISignInInputData): Promise<ISignInOutputData> {
    try {
      const body: ICreateBody = {
        email: inputData.email,
        password: inputData.password,
      };

      const postResponse = await httpClient.post('/sessions', body);
      const token = postResponse.data.token;

      const getResponse = await httpClient.get('/sessions');
      const type = getResponse.data.type;

      return { token, type };
    } catch (err) {
      throw new Error('Erro ao realizar login');
    }
  }
}

export default new AuthService();
