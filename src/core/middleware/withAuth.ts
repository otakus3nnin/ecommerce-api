import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

import config from "../config/index.js";
import { ApiError } from "../utils/api/ApiError.js";
import { catchAsync } from "../utils/api/catchAsync.js";
import { verifyToken } from "../utils/token.js";
import store from "../store.js";

const AuthGuard: RequestHandler = catchAsync(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const [scheme, accessToken] = authHeader.split(" ");
    if (scheme !== "Bearer") {
      next(
        new ApiError({
          code: 401,
          message: "Authorization scheme must be Bearer",
        }),
      );
    }
    const payload = verifyToken(accessToken);

    if (payload) {
      res.locals.user = payload;
      const db = store.getStore()!.db;
      await db.query("SET ROLE authenticated");
      return next();
    } else {
      const refreshToken = req.cookies["refresh_token"];
      const payload = verifyToken(refreshToken);

      if (payload) {
        res.locals.user = payload;
        const newRefreshToken = jwt.sign(payload, config.env.JWT_SECRET);
        res.cookie("refresh_token", newRefreshToken);

        const db = store.getStore()!.db;
        await db.query("SET ROLE authenticated");
        return next();
      } else {
        return next(new ApiError({ code: 401, message: "" }));
      }
    }
  } else {
    return next(
      new ApiError({
        code: 401,
        message: "Authentication needed to access resource",
      }),
    );
  }
});
export default AuthGuard;
