import HttpCodes from '@shared/core/HttpCodes';

class AuthenticateError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message: string, statusCode = HttpCodes.Unauthorized) {
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default AuthenticateError;
