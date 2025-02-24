import { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validateRequest = (schemma: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schemma.parseAsync({
        body: req.body,
        
      });
      next()
    } catch (err) {
      next(err);
    }
  };
};

export default validateRequest;