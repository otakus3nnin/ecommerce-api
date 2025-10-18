import { Camelize, Snakify } from "@/types.js";

type CliErrorOptions = {
  code?: number; // exit code
  hint?: string;
};
export const cliError = (message: string, options: CliErrorOptions) => {
  const { code = 1, hint } = options;
  console.error(`❌ Error: ${message}`);

  if (hint) {
    console.log(`💡 Hint: ${hint}`);
  }
  process.exit(code);
};

export const isNumeric = (v: string | number) =>
  !isNaN(v as number) && !isNaN(parseFloat(v as string));

const snakeToCamelCase = (str: string) => {
  return str.replace(/_([a-z])/g, (_, letter: string) => letter.toUpperCase());
};

const camelToSnakeCase = (str: string) => {
  return str.replace(
    /([a-z])([A-Z])/g,
    (_, p1, p2) => p1 + "_" + p2.toLowerCase(),
  );
};

export const objectKeysToSnakeCase = <T extends object>(
  obj: T,
): Snakify<T> | null => {
  if (obj === null) return null;
  const _ = {} as Record<string, unknown>;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "object") {
      _[camelToSnakeCase(k)] = camelToSnakeCase(v);
    }
    _[camelToSnakeCase(k)] = v;
  }
  return _ as Snakify<T>;
};

export const objectKeysToCamelCase = <T extends object>(
  obj: T,
): Camelize<T> | null => {
  if (obj === null) return null;
  const _ = {} as Record<string, unknown>;
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v === "object") {
      _[snakeToCamelCase(k)] = v;
    }
    _[snakeToCamelCase(k)] = v;
  }
  return _ as Camelize<T>;
};

export const pick = <T extends Record<string, unknown>>(
  obj: T,
  keys: (keyof T)[],
) => {
  if (obj === null) return null;
  const _ = {} as Record<string, unknown>;
  keys.forEach((k) => {
    if (Object.prototype.hasOwnProperty.call(obj, k)) {
      _[k as string] = obj[k];
    }
  });
  return _;
};

export const omit = <T extends Record<string, unknown>>(
  obj: T,
  keys: (keyof T)[],
) => {
  if (obj === null) return null;
  const _ = {} as Record<string, unknown>;
  for (const [k, v] of Object.entries(obj)) {
    if (keys.includes(k as (typeof keys)[number])) {
      continue;
    }
    _[k] = v;
  }
  return _;
};
