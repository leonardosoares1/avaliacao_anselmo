import IStorageProvider from '@modules/files/providers/StorageProvider/models/IStorageProvider';

interface IAbstractFactory {
  createStorageProvider(): IStorageProvider;
}

export default IAbstractFactory;
