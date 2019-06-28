import { NextFunction, Request, Response } from 'express';

export type ExpressMiddlewareFn = (
  req: Request,
  res: Response,
  next?: NextFunction,
) => any;

export interface IRouteInterface {
  actions: ExpressMiddlewareFn[];
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
}
