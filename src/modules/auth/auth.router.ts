import { Router } from "express";

import { validate } from "@/core/middleware/validate.js";
import { catchAsync } from "@/core/utils/api/catchAsync.js";

import * as authController from "./auth.controller.js";
import { signupSchema, SigninSchema } from "./schema/auth.schema.js";

const authRouter: Router = Router();

authRouter.post(
  "/register",
  validate(signupSchema),
  catchAsync(authController.signup),
);

authRouter.post(
  "/authenticate",
  validate(SigninSchema),
  catchAsync(authController.signin),
);

export default authRouter;
