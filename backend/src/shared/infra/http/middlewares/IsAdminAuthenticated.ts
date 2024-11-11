import { NextFunction, Request, Response } from 'express';

import EHttpCodes from '@shared/core/HttpCodes';
import AuthenticateError from '@shared/errors/AuthenticateError';
import JsonWebTokenProvider from '@shared/providers/TokenProvider/implementations/JsonWebTokenProvider';

class IsAdminAuthenticated {
  public execute(request: Request, _: Response, next: NextFunction): void {
    try {
      if (!request.headers.authorization) {
        throw new AuthenticateError(
          'JWT Token inválido',
          EHttpCodes.Unauthorized,
        );
      }
      const [, token] = request.headers.authorization.split(' ');
      if (!token) {
        throw new AuthenticateError(
          'JWT Token inválido',
          EHttpCodes.Unauthorized,
        );
      }
      const jsonWebTokenProvider = new JsonWebTokenProvider();
      const tokenDecoded = jsonWebTokenProvider.decode(token);
      request.admin = {
        id: tokenDecoded.id,
      };
      next();
    } catch (error) {
      throw new AuthenticateError(
        'JWT Token inválido',
        EHttpCodes.Unauthorized,
      );
    }
  }
}

export default IsAdminAuthenticated;
