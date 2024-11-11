import AdminDatabaseRepository from '@modules/admins/infra/typeorm/repositories/AdminDatabaseRepository';
import IAdminRepository from '@modules/admins/repositories/IAdminRepository';

import IHashProvider from '@shared/providers/HashProvider/IHashProvider';
import BCryptProvider from '@shared/providers/HashProvider/implementations/BCryptProvider';
import JsonWebTokenProvider from '@shared/providers/TokenProvider/implementations/JsonWebTokenProvider';
import ITokenProvider from '@shared/providers/TokenProvider/ITokenProvider';

import IAbstractFactory from './IAbstractFactory';

class DatabaseFactory implements IAbstractFactory {
  public createAdminRepository(): IAdminRepository {
    return new AdminDatabaseRepository();
  }

  public createHashProvider(): IHashProvider {
    return new BCryptProvider();
  }

  public createTokenProvider(): ITokenProvider {
    return new JsonWebTokenProvider();
  }
}

export default DatabaseFactory;
