import { ApiError } from "@/core/utils/api/ApiError.js";
import { pick } from "@/core/utils/misc.js";
import type { NextFunction, Request, Response } from "express";
import type { ZodSchema } from "zod/v4";

export const validate = <T>(schema: ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(
      pick(req as unknown as Record<string, unknown>, [
        "body",
        "params",
        "query",
      ]),
    );
    if (result.error) {
      console.log(result.error);
      return next(
        new ApiError({
          code: 400,
          message: "Malformed request",
          details: result.error.flatten().fieldErrors,
        }),
      );
    }
    next();
  };
};
