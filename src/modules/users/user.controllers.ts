import { RequestHandler } from "express";

import { userToPublicDTO } from "./dtos/user.dtos.js";
import { deleteUserById, getUserById } from "./user.service.js";

export const getAuthenticatedUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  const user = await getUserById(userId);
  res.status(200).json({
    ok: true,
    data: {
      user: userToPublicDTO(user),
    },
  });
};

export const deleteUser: RequestHandler = async (req, res) => {
  const userId = req.params.id;
  await deleteUserById(userId);

  res.status(204).json({
    ok: true,
    data: {},
  });
};
