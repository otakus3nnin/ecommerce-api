export type RefreshToken = {
  id: string;
  userId: string;
  sessionId: string;
  token: string;
  revoked: string;
};

export type SessionDTO = {
  userId: string;
  ip: string;
  refreshToken: string;
};
export type InsertSessionParams = Omit<SessionDTO, "refreshToken"> & {
  refreshTokenHash: string;
};
