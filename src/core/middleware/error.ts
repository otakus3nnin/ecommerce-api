import type { ErrorRequestHandler } from "express";
import { ApiError } from "../utils/api/ApiError.js";

// eslint-disable-next-line
export const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  if (err instanceof ApiError) {
    res.status(err.code).json({
      message: err.message,
      errors: err.details,
    });
  }
};
