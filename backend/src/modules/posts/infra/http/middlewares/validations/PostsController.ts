import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

import validationsMessages from '@shared/validations/messages';

class ValidationPostsController {
  public store(request: Request, _: Response, next: NextFunction): void {
    const schema = z.object({
      content: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required),
      title: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required)
        .max(255, validationsMessages.max(255)),
      subtitle: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required)
        .max(255, validationsMessages.max(255)),
      thumbnail: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required)
        .max(255, validationsMessages.max(255)),
      is_active: z.boolean({
        message: validationsMessages.required,
      }),
    });
    schema.parse(request.body);
    return next();
  }

  public update(request: Request, _: Response, next: NextFunction): void {
    const schema = z.object({
      content: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required),
      title: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required)
        .max(255, validationsMessages.max(255)),
      subtitle: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required)
        .max(255, validationsMessages.max(255)),
      thumbnail: z
        .string({
          message: validationsMessages.required,
        })
        .min(1, validationsMessages.required)
        .max(255, validationsMessages.max(255)),
    });
    schema.parse(request.body);
    return next();
  }
}

export default new ValidationPostsController();
