import IAdminRepository from '@modules/admins/repositories/IAdminRepository';

import HttpCodes from '@shared/core/HttpCodes';
import UseCase from '@shared/core/UseCase';
import AuthenticateError from '@shared/errors/AuthenticateError';
import IHashProvider from '@shared/providers/HashProvider/IHashProvider';
import ITokenProvider from '@shared/providers/TokenProvider/ITokenProvider';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';
import OutputData from './OutputData';

interface IFindAdminResponse {
  id: number;
  isActive: boolean;
  password: string;
}

interface IVerifyPassword {
  hashed: string;
  raw: string;
}

class CreateSession implements UseCase<InputData, OutputData> {
  private adminRepository: IAdminRepository;

  private hashProvider: IHashProvider;

  private tokenProvider: ITokenProvider;

  constructor(repositoryFacade: IAbstractFactory) {
    this.adminRepository = repositoryFacade.createAdminRepository();
    this.hashProvider = repositoryFacade.createHashProvider();
    this.tokenProvider = repositoryFacade.createTokenProvider();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    const admin = await this.findAdmin(inputData.email);
    this.verifyAdminIsActive(admin.isActive);
    await this.verifyPassword({
      hashed: admin.password,
      raw: inputData.password,
    });
    const token = this.generateToken(admin.id);
    const outputData = new OutputData({
      token,
    });
    return outputData;
  }

  private async findAdmin(email: string): Promise<IFindAdminResponse> {
    const admin = await this.adminRepository.findByEmail(email);
    if (!admin) {
      throw new AuthenticateError(
        'E-mail e/ou senha inválidos',
        HttpCodes.BadRequest,
      );
    }
    return {
      id: admin.id,
      isActive: admin.isActive,
      password: admin.password,
    };
  }

  private verifyAdminIsActive(isActive: boolean): void {
    if (!isActive) {
      throw new AuthenticateError(
        'E-mail e/ou senha inválidos',
        HttpCodes.BadRequest,
      );
    }
  }

  private async verifyPassword({
    hashed,
    raw,
  }: IVerifyPassword): Promise<void> {
    const passwordIsCorrect = await this.hashProvider.compare({
      hashed,
      raw,
    });
    if (!passwordIsCorrect) {
      throw new AuthenticateError(
        'E-mail e/ou senha inválidos',
        HttpCodes.BadRequest,
      );
    }
  }

  private generateToken(id: number): string {
    const token = this.tokenProvider.generate({
      payload: {
        id,
      },
    });
    return token;
  }
}

export { DatabaseFactory, InputData, OutputData };
export default CreateSession;
