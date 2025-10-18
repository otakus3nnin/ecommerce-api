import { decodeHex, encodeHex } from "./encoding.js";

export const compare = async (
  password: string,
  { hash, salt }: { hash: string; salt: string },
) => {
  return (await hashPassword(password, decodeHex(salt).buffer)) === hash;
};

export const hashPassword = async (password: string, salt: ArrayBuffer) => {
  const importKeyConfig = {
    keyData: new TextEncoder().encode(password),
    algorithm: { name: "PBKDF2" },
    extractable: false,
    keyUsages: ["deriveBits"],
  };
  const key = await crypto.subtle.importKey(
    "raw",
    importKeyConfig.keyData,
    importKeyConfig.algorithm,
    importKeyConfig.extractable,
    importKeyConfig.keyUsages as globalThis.KeyUsage[],
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      salt: salt,
      iterations: 310000,
    },
    key,
    256,
  );

  return encodeHex(new Uint8Array(derivedBits));
};
