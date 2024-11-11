import DiskStorageProvider from '@modules/files/providers/StorageProvider/implementations/DiskStorageProvider';
import IStorageProvider from '@modules/files/providers/StorageProvider/models/IStorageProvider';

import IAbstractFactory from './IAbstractFactory';

class DatabaseFactory implements IAbstractFactory {
  public createStorageProvider(): IStorageProvider {
    return new DiskStorageProvider();
  }
}

export default DatabaseFactory;
