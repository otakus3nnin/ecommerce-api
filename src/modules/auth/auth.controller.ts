import { Request, RequestHandler } from "express";

import { REFRESH_TOKEN_EXP } from "@/core/constants.js";
import { ApiError } from "@/core/utils/api/ApiError.js";
import { compare } from "@/core/utils/crypto/pbkdf.js";
import { generateToken } from "@/core/utils/token.js";

import userModule from "../users/user.module.js";
import { createOrUpdateSession } from "./auth.service.js";
import { ISigninSchema, ISignupSchema } from "./schema/auth.schema.js";
import { generateRefreshToken } from "./utils.js";

export const signup: RequestHandler = async (
  req: Request<object, object, ISignupSchema["body"]>,
  res,
) => {
  const user = await userModule.service.createUser(req.body);
  const accessToken = await generateToken(user!, "access_token");
  const refreshToken = generateRefreshToken();

  await createOrUpdateSession({
    userId: user!.id,
    ip: req.ip!,
    refreshToken,
  });

  res
    .cookie("refresh_token", refreshToken, {
      maxAge: REFRESH_TOKEN_EXP * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(201)
    .json({
      ok: true,
      token: accessToken,
      data: {
        user: userModule.service.userToPublicDTO(user!),
      },
    });
};

export const signin: RequestHandler = async (
  req: Request<object, object, ISigninSchema["body"]>,
  res,
) => {
  const { email, password } = req.body;
  const user = await userModule.service.getUserByEmail(email);
  const passwordIsValid = await compare(password, {
    ...user.password,
  });
  if (!passwordIsValid) {
    throw new ApiError({
      code: 400,
      message: "Incorrect Password",
    });
  }

  const accessToken = await generateToken(user!, "access_token");
  const refreshToken = generateRefreshToken();
  await createOrUpdateSession({ userId: user.id, refreshToken, ip: req.ip! });
  res
    .cookie("refresh_token", refreshToken, {
      maxAge: REFRESH_TOKEN_EXP * 1000,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    })
    .status(201)
    .json({
      ok: true,
      token: accessToken,
      data: {
        user: userModule.service.userToPublicDTO(user!),
      },
    });
};
