export type Password = {
  salt: string;
  hash: string;
};
export type User = {
  id: string;
  name: string;
  email: string;
  password: Password;
  phone?: string;
  createdAt: number;
  updatedAt: number;
};
