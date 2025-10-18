export const encodeBase64 = (arr: Uint8Array) => {
  return btoa(String.fromCharCode(...arr));
};

export const encodeHex = (arr: Uint8Array) => {
  let str = "";
  for (let i = 0; i < arr.length; i++) {
    str += arr[i].toString(16).padStart(2, "0");
  }
  return str;
};

export const decodeHex = (str: string) => {
  const arr = new Uint8Array(str.length / 2);
  for (let i = 0; i < str.length; i += 2) {
    arr[i / 2] = parseInt(str.substring(i, i + 2), 16);
  }
  return arr;
};
