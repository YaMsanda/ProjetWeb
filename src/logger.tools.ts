import chalk from 'chalk';
import { NextFunction, Request, Response } from 'express';

/**
 * Logger Middleware
 *
 * Log each api calls.
 *
 * @param req Request
 * @param res Response
 * @param next NextFunction
 */
const logger = (req: Request, res: Response, next: NextFunction) => {
  global.console.log(
    chalk.blue(
      `${req.method.toUpperCase()} - ${req.path} - ${new Date().toISOString()}`,
    ),
  );

  next(); // pour passer à la suite
};

export default logger;
