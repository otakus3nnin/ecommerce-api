import { objectKeysToCamelCase, pick } from "@/core/utils/misc.js";

import { type UserRow, User } from "../types/types.js";

export const mapRowToUser = (userRow: UserRow): User | null => {
  if (userRow === null) return null;
  return objectKeysToCamelCase(userRow);
};

export const userToPublicDTO = (user: User) => {
  if (user === null) return null;
  return pick(user, ["name", "email", "createdAt", "updatedAt"]);
};
