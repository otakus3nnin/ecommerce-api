import { Router } from "express";
import * as userController from "./user.controllers.js";
import AuthGuard from "@/core/middleware/withAuth.js";
import { catchAsync } from "@/core/utils/api/catchAsync.js";

const userRouter: Router = Router();
userRouter.get(
  "/:id",
  AuthGuard,
  catchAsync(userController.getAuthenticatedUser),
);

userRouter.delete("/:id", AuthGuard, catchAsync(userController.deleteUser));
export default userRouter;
