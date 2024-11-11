import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import validationsMessages from '@shared/validations/messages';

class ValidationSessionsController {
  public create(request: Request, _: Response, next: NextFunction): void {
    const schema = z.object({
      email: z
        .string({
          message: validationsMessages.required,
        })
        .email(validationsMessages.email)
        .min(1, validationsMessages.required),
      password: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required),
    });
    schema.parse(request.body);
    return next();
  }
}

export default new ValidationSessionsController();
