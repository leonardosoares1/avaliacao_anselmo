import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import databaseAdapter from '@shared/adapters/database';
import EHttpCodes from '@shared/core/HttpCodes';
import ResponseError from '@shared/core/ResponseError';
import AuthenticateError from '@shared/errors/AuthenticateError';
import ConflictError from '@shared/errors/ConflictError';

interface IValidationErrors {
  field?: string;
  message: string;
}

class ErrorHandler {
  public async execute(
    err: Error,
    request: Request,
    response: Response<ResponseError | IValidationErrors[]>,
    _: NextFunction,
  ): Promise<Response> {
    await databaseAdapter.rollbackTransaction();

    if (err instanceof z.ZodError) {
      const validationsErrors: IValidationErrors[] = [];
      for (const error of err.issues) {
        if (!error.path.length) {
          break;
        }
        const key = error.path.join('.');
        validationsErrors.push({
          field: key,
          message: error.message,
        });
      }
      return response
        .status(EHttpCodes.UnprocessableEntity)
        .json(validationsErrors);
    }
    if (err instanceof AuthenticateError || err instanceof ConflictError) {
      return response.status(err.statusCode).json({
        error: {
          message: err.message,
        },
      });
    }
    return response.status(EHttpCodes.InternalServerError).json({
      error: {
        message: 'Erro interno no servidor',
        err: err.message,
      },
    });
  }
}

export default ErrorHandler;
