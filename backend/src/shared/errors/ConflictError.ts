import EHttpCodes from '@shared/core/HttpCodes';

class ConflictError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string) {
    this.message = message;
    this.statusCode = EHttpCodes.Conflict;
  }
}

export default ConflictError;
