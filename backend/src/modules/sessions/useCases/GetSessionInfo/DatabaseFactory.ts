import AdminDatabaseRepository from '@modules/admins/infra/typeorm/repositories/AdminDatabaseRepository';
import IAdminRepository from '@modules/admins/repositories/IAdminRepository';

import IAbstractFactory from './IAbstractFactory';

class DatabaseFactory implements IAbstractFactory {
  public createAdminRepository(): IAdminRepository {
    return new AdminDatabaseRepository();
  }
}

export default DatabaseFactory;
