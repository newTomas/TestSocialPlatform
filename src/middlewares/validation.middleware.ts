import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validationMiddleware<T extends object>(dtoClass: ClassConstructor<T>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const dtoInstance = plainToInstance(dtoClass, req.body);
      
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
