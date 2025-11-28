import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dataToValidate = {
      ...req.body,
      ...req.params,
      ...req.query
    };

    try {
      const dtoInstance = plainToInstance(dtoClass, dataToValidate, {
        excludeExtraneousValues: true,
      });

      await validateOrReject(dtoInstance, { skipMissingProperties: false });

      req.body = dtoInstance;
      next();
    } catch (errors) {
      const validationErrors = errors as ValidationError[];
      const message = validationErrors.map(error =>
        Object.values(error.constraints || {})
      ).join(', ');

      next({ statusCode: 400, message: `Validation failed: ${message}` });
    }
  };
}
