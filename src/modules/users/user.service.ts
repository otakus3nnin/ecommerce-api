import { PoolClient } from "pg";

import store from "@/core/store.js";
import { ApiError } from "@/core/utils/api/ApiError.js";
import { encodeHex } from "@/core/utils/crypto/encoding.js";
import { hashPassword } from "@/core/utils/crypto/pbkdf.js";

import * as userDao from "./daos/user.dal.js";

export type CreateUserSchema = {
  email: string;
  password: string;
  name: string;
};
export const createUser = async (data: CreateUserSchema) => {
  const db = store.getStore()!.db as PoolClient;
  const result = await db.query(
    "select count(email) from auth.users where email=$1",
    [data.email],
  );
  const isEmailTaken = parseInt(result.rows[0].count);

  if (isEmailTaken)
    throw new ApiError({
      code: 400,
      message: "Email already taken",
    });

  const salt = crypto.getRandomValues(new Uint8Array(20));
  const hash = await hashPassword(data.password, salt.buffer);

  const user = await userDao.create({
    name: data.name,
    email: data.email,
    password: { salt: encodeHex(salt), hash },
  });

  return user;
};

export const getUserById = async (id: string) => {
  const user = await userDao.findById(id);
  if (user === null) {
    throw new ApiError({
      code: 404,
      message: "User not found",
    });
  }
  return user;
};
export const getUserByEmail = async (email: string) => {
  const user = await userDao.findByEmail(email);
  if (user === null) {
    throw new ApiError({
      code: 404,
      message: "User not found",
    });
  }
  return user;
};

export const deleteUserById = async (id: string) => {
  await userDao._delete(id);
};
