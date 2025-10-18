import { createHash } from "crypto";
import { insertSession } from "./daos/auth.dao.js";
import { SessionDTO } from "./types/auth.types.js";

export const createOrUpdateSession = async ({
  userId,
  ip,
  refreshToken,
}: SessionDTO) => {
  const tokenHash = createHash("sha256").update(refreshToken).digest("hex");
  await insertSession({
    ip,
    userId,
    refreshTokenHash: tokenHash,
  });
};
