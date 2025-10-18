import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { requestLogger } from "./core/middleware/requestLogger.js";
import apiRouter from "./modules/api.router.js";
import { errorHandler } from "./core/middleware/error.js";

const app: express.Application = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(requestLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "Access the api at http://localhost:3000/api",
  });
});
app.use("/api", apiRouter);
app.use(errorHandler);

export default app;
