import jwt from "jsonwebtoken";
import config from "../config/index.js";
import { ACCESS_TOKEN_EXP, REFRESH_TOKEN_EXP } from "../constants.js";

export const verifyToken = async (token: string) => {
  const decoded = jwt.verify(token, config.env.JWT_SECRET, {
    algorithms: ["HS256"],
  });
  if (decoded) return decoded;
  else return null;
};

type Token = "access_token" | "refresh_token";
export const generateToken = async (payload: object, type: Token) => {
  let ttl = 0;
  if (type === "access_token") ttl = ACCESS_TOKEN_EXP;
  else if (type === "refresh_token") ttl = REFRESH_TOKEN_EXP;

  return jwt.sign(payload, config.env.JWT_SECRET, {
    expiresIn: ttl,
  });
};
