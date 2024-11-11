import IStorageProvider from '@modules/files/providers/StorageProvider/models/IStorageProvider';

import IUseCase from '@shared/core/UseCase';
import ConflictError from '@shared/errors/ConflictError';

import DatabaseFactory from './DatabaseFactory';
import IAbstractFactory from './IAbstractFactory';
import InputData from './InputData';
import OutputData from './OutputData';

class UploadFile implements IUseCase<InputData, OutputData> {
  private storageProvider: IStorageProvider;

  constructor(repositoryFacade: IAbstractFactory) {
    this.storageProvider = repositoryFacade.createStorageProvider();
  }

  public async execute(inputData: InputData): Promise<OutputData> {
    this.verifyFilename(inputData.filename);
    this.verifyFile(inputData.file);
    const url = await this.storageProvider.save({
      filename: inputData.filename as string,
      file: inputData.file as Express.Multer.File,
    });
    const outputData = new OutputData({
      url,
    });
    return outputData;
  }

  private verifyFilename(filename?: string): void {
    if (!filename) {
      throw new ConflictError('Arquivo não informado');
    }
  }

  private verifyFile(file?: Express.Multer.File): void {
    if (!file) {
      throw new ConflictError('Arquivo não informado');
    }
  }
}

export { DatabaseFactory, InputData };
export default UploadFile;
