import IAdminRepository from '@modules/admins/repositories/IAdminRepository';

import IHashProvider from '@shared/providers/HashProvider/IHashProvider';
import ITokenProvider from '@shared/providers/TokenProvider/ITokenProvider';

interface IAbstractFactory {
  createAdminRepository(): IAdminRepository;
  createHashProvider(): IHashProvider;
  createTokenProvider(): ITokenProvider;
}

export default IAbstractFactory;
