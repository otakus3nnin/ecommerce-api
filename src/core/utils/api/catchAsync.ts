import type { NextFunction, Request, RequestHandler, Response } from "express";
export const catchAsync =
  (fn: RequestHandler) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      return await Promise.resolve(fn(req, res, next));
    } catch (err) {
      return next(err);
    }
  };
