import store from "@/core/store.js";
import { ApiError } from "@/core/utils/api/ApiError.js";
import PG from "pg";
import { InsertSessionParams } from "../types/auth.types.js";

export const insertSession = async ({
  userId,
  ip,
  refreshTokenHash,
}: InsertSessionParams) => {
  const db = store.getStore()?.db;
  try {
    await db?.query(
      "insert into auth.sessions (user_id, ip, token_hash) values ($1, $2, $3) " +
        "on conflict (user_id, ip) do update set token_hash = excluded.token_hash, updated_at = now()",
      [userId, ip, refreshTokenHash],
    );
  } catch (e) {
    const err = e as PG.DatabaseError;
    throw new ApiError({
      code: 500,
      message: "Oops, something went wrong on our side",
      details: {
        cause: err.message,
      },
    });
  }
};
