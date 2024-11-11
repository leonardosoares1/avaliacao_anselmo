import ISaveFileInputData from '../dtos/ISaveFileInputData';

interface IStorageProvider {
  save(inputData: ISaveFileInputData): Promise<string>;
}

export default IStorageProvider;
