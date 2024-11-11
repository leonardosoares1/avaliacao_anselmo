import { Repository } from 'typeorm';

import FindAdminByEmailOutputData from '@modules/admins/repositories/dtos/adminRepository/findByEmail/OutputData';
import FindAdminByIdOutputData from '@modules/admins/repositories/dtos/adminRepository/findById/OutputData';
import IAdminRepository from '@modules/admins/repositories/IAdminRepository';

import databaseAdapter from '@shared/adapters/database';
import DatabaseError from '@shared/errors/DatabaseError';
import CaughtError from '@shared/helpers/CaughtError';

import AdminMapper from '../mappers/AdminMapper';

class AdminDatabaseRepository implements IAdminRepository {
  private adminRepository: Repository<AdminMapper>;

  constructor() {
    const queryRunner = databaseAdapter.getQueryRunner();
    this.adminRepository = queryRunner.manager.getRepository(AdminMapper);
  }

  public async findByEmail(
    email: string,
  ): Promise<FindAdminByEmailOutputData | undefined> {
    try {
      const adminFound = await this.adminRepository.findOne({
        where: {
          email,
        },
      });
      if (!adminFound) {
        return undefined;
      }
      const outputData = new FindAdminByEmailOutputData({
        id: adminFound.id,
        isActive: adminFound.isActive,
        password: adminFound.password,
      });
      return outputData;
    } catch (err) {
      const errorMessage = new CaughtError(err);
      throw new DatabaseError(errorMessage.getMessage());
    }
  }

  public async findById(
    id: number,
  ): Promise<FindAdminByIdOutputData | undefined> {
    try {
      const admin = await this.adminRepository.findOne({
        where: {
          id,
        },
      });
      if (!admin) {
        return undefined;
      }
      const outputData = new FindAdminByIdOutputData({
        email: admin.email,
        id: admin.id,
        name: admin.name,
      });
      return outputData;
    } catch (err) {
      const errorMessage = new CaughtError(err);
      throw new DatabaseError(errorMessage.getMessage());
    }
  }
}

export default AdminDatabaseRepository;
