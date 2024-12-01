// Error Handler
import { Request, Response, NextFunction } from 'express';
const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.statusCode === 404) {
    res.status(404).json({
      message: err._message,
      success: false,
      error: err.message || err,
    });
  } else {
    res.status(500).json({
      message: err._message,
      success: false,
      error: err || 'Something went wrong',
    });
  } // next()
};
export default errorHandler;
