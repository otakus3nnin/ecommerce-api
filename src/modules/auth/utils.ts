export const generateRefreshToken = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(20));
  return Buffer.from(bytes).toString("base64");
};
