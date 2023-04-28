import { NextFunction, Request, Response } from 'express';
import IError from '../Interfaces/IError';

export default class ErrorHandler {
  public static handle(error: IError, _req: Request, res: Response, next: NextFunction) {
    res.status(error.status || 500).json({ message: error.message });
    next();
  }
}
