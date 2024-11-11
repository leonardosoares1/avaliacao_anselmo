import IAdminRepository from '@modules/admins/repositories/IAdminRepository';

import HttpCodes from '@shared/core/HttpCodes';
import UseCase from '@shared/core/UseCase';
import AuthenticateError from '@shared/errors/AuthenticateError';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';
import OutputData from './OutputData';

interface IGetAdminResponse {
  email: string;
  id: number;
  name: string;
}

class GetSessionInfo implements UseCase<InputData, OutputData> {
  private adminRepository: IAdminRepository;

  constructor(repositoryFacade: IAbstractFactory) {
    this.adminRepository = repositoryFacade.createAdminRepository();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const admin = await this.getAdmin(inputData.id);
    const outputData = new OutputData({
      email: admin.email,
      id: admin.id,
      name: admin.name,
    });
    return outputData;
  }

  private async getAdmin(id: number): Promise<IGetAdminResponse> {
    const admin = await this.adminRepository.findById(id);
    if (!admin) {
      throw new AuthenticateError(
        'Sessão não encontrada',
        HttpCodes.BadRequest,
      );
    }
    return {
      email: admin.email,
      id: admin.id,
      name: admin.name,
    };
  }
}

export { DatabaseFactory, InputData, OutputData };
export default GetSessionInfo;
