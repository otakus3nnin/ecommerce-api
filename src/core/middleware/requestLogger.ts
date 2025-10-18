import { RequestHandler } from "express";
import { logger } from "../logger.js";

export const requestLogger: RequestHandler = (req, res, next) => {
  //INFO: Could use the profiliing method provided in the shape of winston.startTimer()
  const startTime = process.hrtime.bigint();
  logger.info(`${req.method} ${req.path}`);
  res.on("finish", () => {
    const endTime = process.hrtime.bigint();

    const duration = Number(endTime - startTime) / 1_000_000;
    logger.log(
      res.statusCode < 400 ? "info" : "error",
      `${req.method} ${req.path} ${res.statusCode} ${duration}ms`,
    );
  });
  return next();
};
