type SnakeToCamel<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Head}${Capitalize<SnakeToCamel<Tail>>}`
  : S;

type CamelToSnake<S extends string> = S extends `${infer Head}${infer Tail}`
  ? Tail extends Uncapitalize<Tail>
    ? `${Lowercase<Head>}${CamelToSnake<Tail>}`
    : `${Lowercase<Head>}_${CamelToSnake<Uncapitalize<Tail>>}`
  : S;

/**
 * Recursively transform all keys of an object from snake_case → camelCase
 */
export type Camelize<T> =
  T extends Array<infer U>
    ? Array<Camelize<U>>
    : T extends object
      ? {
          [K in keyof T as SnakeToCamel<K & string>]: Camelize<T[K]>;
        }
      : T;

/**
 * Recursively transform all keys of an object from camelCase → snake_case
 */
export type Snakify<T> =
  T extends Array<infer U>
    ? Array<Snakify<U>>
    : T extends object
      ? {
          [K in keyof T as CamelToSnake<K & string>]: Snakify<T[K]>;
        }
      : T;
