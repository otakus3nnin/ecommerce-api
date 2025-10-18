import winston, { format } from "winston";

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || "info",
  format: format.combine(format.timestamp(), format.json()),
  transports: [new winston.transports.Console({ level: "info" })],
});
