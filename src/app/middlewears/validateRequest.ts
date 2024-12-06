import express, { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const ValidateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {

    //validations

    //!creating schema validation using zod
    // if ok ? next() else next(error)
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default ValidateRequest;
