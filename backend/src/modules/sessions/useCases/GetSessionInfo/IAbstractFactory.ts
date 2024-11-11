import IAdminRepository from '@modules/admins/repositories/IAdminRepository';

interface IAbstractFactory {
  createAdminRepository(): IAdminRepository;
}

export default IAbstractFactory;
