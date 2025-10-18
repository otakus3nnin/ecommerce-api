import store from "@/core/store.js";
import { mapRowToUser } from "../dtos/user.dtos.js";
import { ApiError } from "@/core/utils/api/ApiError.js";
import PG from "pg";
import { Snakify } from "@/types.js";
import { User } from "../types/types.js";

type UserRow = Snakify<User>;
export const create = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: { salt: string; hash: string };
  name: string;
}) => {
  const db = store.getStore()!.db;

  console.log(password);
  try {
    const result = await db.query<UserRow>(
      `insert into auth.users (email, password, name) values ($1, $2, $3) returning *`,
      [email, password, name],
    );
    const user = result.rows[0];
    return mapRowToUser(user);
  } catch (e) {
    const err = e as PG.DatabaseError;
    throw new ApiError({
      code: 500,
      message: "Oops, something broke on our side",
      details: {
        ...err,
        cause: err.message,
        stack: err.stack,
      },
    });
  }
};
export const findById = async (id: string) => {
  const db = store.getStore()!.db;
  try {
    const result = await db.query(`select * from auth.users where id=$1`, [id]);
    const user = result.rows[0];
    return mapRowToUser(user);
  } catch (e) {
    const err = e as PG.DatabaseError;
    throw new ApiError({
      code: 500,
      message: "Oops, something broke on our side",
      details: {
        ...err,
        cause: err.message,
        stack: err.stack,
      },
    });
  }
};

export const findByEmail = async (email: string) => {
  const db = store.getStore()!.db;
  try {
    const result = await db.query(`select * from auth.users where email=$1`, [
      email,
    ]);
    const user = result.rows[0];
    return mapRowToUser(user);
  } catch (e) {
    const err = e as PG.DatabaseError;
    throw new ApiError({
      code: 500,
      message: "Oops, something broke on our side",
      details: {
        ...err,
        cause: err.message,
        stack: err.stack,
      },
    });
  }
};

export const _delete = async (id: string) => {
  const db = store.getStore()!.db;
  try {
    await db.query(`delete from auth.users where id=$1`, [id]);
  } catch (e) {
    const err = e as PG.DatabaseError;
    throw new ApiError({
      code: 500,
      message: "Oops, something broke on our side",
      details: {
        ...err,
        cause: err.message,
        stack: err.stack,
      },
    });
  }
};
