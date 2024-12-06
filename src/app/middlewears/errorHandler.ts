/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

import { ErrorRequestHandler } from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSources } from '../interface/error';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import handleValidationError from '../errors/handleValidationErrors';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  //setting default values
  let statusCode = error.statusCode || 500;
  let message = error.message || 'Something went wrong';

  let errorSources: TErrorSources = [
    { path: '', message: 'Something went wrong!' },
  ];

  //checking errors
  //for zod
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(error?.name === 'CastError'){
    const simplifiedError = handleCastError(error);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if(error?.code === 11000){
    const simplifiedError = handleDuplicateError(error);

    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.NODE_ENV === 'development' ? error?.stack : null,
    // error: error,
  });
};
export default errorHandler;
