import fs from 'fs';
import path from 'path';

import multerConfig from '@config/multer';

import ThirdPartyError from '@shared/errors/ThirdPartyError';
import CaughtError from '@shared/helpers/CaughtError';

import ISaveFileInputData from '../dtos/ISaveFileInputData';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async save(inputData: ISaveFileInputData): Promise<string> {
    try {
      await fs.promises.rename(
        path.resolve(multerConfig?.tmpFolder as string, inputData.filename),
        path.resolve(multerConfig?.uploadsFolder as string, inputData.filename),
      );
      const url = this.generateUrlFile(inputData.filename);
      return url;
    } catch (err) {
      const errorMessage = new CaughtError(err).getMessage();
      throw new ThirdPartyError(errorMessage);
    }
  }

  private generateUrlFile(filename: string): string {
    const url = `${process.env.URL_PICTURE}/${filename}`;
    return url;
  }
}

export default DiskStorageProvider;
