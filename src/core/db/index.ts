import { Pool } from "pg";
import config from "../config/index.js";

let db: Pool;
const initDb = (): Pool => {
  if (db instanceof Pool) {
    return db;
  }
  db = new Pool({
    user: config.env.POSTGRES_USER,
    host:
      config.env.NODE_ENV === "development"
        ? "localhost"
        : config.env.POSTGRES_HOST,
    password: "santawithamask",
    database: config.env.POSTGRES_DB,
    port: 5434,
  });
  db.on("error", () => {
    console.log("omo the db glitched");
  });
  db.on("connect", () => {
    console.log("We have launch");
  });
  db.on("release", () => {
    console.log("We don release am");
  });
  return db;
};

export const getDbClient = async () => {
  const db = initDb();
  let client;
  try {
    client = await db.connect();
    await client.query("SET role anon");
    return client;
  } catch (err) {
    console.log(err);
    client?.release();
    throw err;
  }
};
