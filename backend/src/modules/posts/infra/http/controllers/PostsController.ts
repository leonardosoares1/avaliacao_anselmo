import { Request, Response } from 'express';

import CreateSession, {
  DatabaseFactory as CreateSessionDatabaseFactory,
  InputData as CreateSessionInputData,
} from '@modules/sessions/useCases/CreateSession';
import GetSessionInfo, {
  DatabaseFactory as GetSessionInfoDatabaseFactory,
  InputData as GetSessionInfoInputData,
} from '@modules/sessions/useCases/GetSessionInfo';

import HttpCodes from '@shared/core/HttpCodes';
import ResponseController from '@shared/core/ResponseController';

interface IStoreRequestBody {
  content: string;
  is_active: boolean;
  subtitle: string;
  thumbnail: string;
  title: string;
}
interface IStoreResponse extends ResponseController {
  id: number;
}

class SessionsController {
  public async store(
    request: Request<unknown, unknown, IStoreRequestBody>,
    response: Response<IStoreResponse>,
  ): Promise<Response> {
    const databaseFactory = new CreateSessionDatabaseFactory();
    const useCase = new CreateSession(databaseFactory);
    const inputData = new CreateSessionInputData({
      email: request.body.email,
      password: request.body.password,
    });
    const sessionCreated = await useCase.execute(inputData);
    return response.status(HttpCodes.Created).json({
      token: sessionCreated.token,
    });
  }

  public async show(request: Request, response: Response<IShowResponse>) {
    const databaseFactory = new GetSessionInfoDatabaseFactory();
    const useCase = new GetSessionInfo(databaseFactory);
    const inputData = new GetSessionInfoInputData({
      id: request.admin.id,
    });
    const info = await useCase.execute(inputData);
    return response.status(HttpCodes.Ok).json({
      email: info.email,
      id: info.id,
      name: info.name,
    });
  }
}

export default new SessionsController();
