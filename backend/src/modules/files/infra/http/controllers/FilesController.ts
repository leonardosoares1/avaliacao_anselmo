import { Request, Response } from 'express';

import UploadFile, {
  DatabaseFactory as UploadFileDatabaseFactory,
  InputData as UploadFileInputData,
} from '@modules/files/useCases/UploadFile';

import EHttpCodes from '@shared/core/HttpCodes';

interface ICreateResponse {
  message: string;
  url: string;
}

class FilesController {
  public async create(
    request: Request<unknown, unknown>,
    response: Response<ICreateResponse>,
  ): Promise<Response> {
    const databaseFactory = new UploadFileDatabaseFactory();
    const useCase = new UploadFile(databaseFactory);
    const inputData = new UploadFileInputData({
      filename: request.file?.filename,
      file: request.file,
    });
    const fileUploaded = await useCase.execute(inputData);
    return response.status(EHttpCodes.Created).json({
      url: fileUploaded.url,
      message: 'Upload do arquivo feito com sucesso',
    });
  }
}

export default FilesController;
