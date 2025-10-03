import { Pool } from "pg"
import config from "../config"

const pool = new Pool({
  host: config.env.POSTGRES_HOST,
  user: config.env.POSTGRES_USER,
  password: config.env.POSTGRES_PASSWORD,
  database: config.env.POSTGRES_DB
})

pool.on("connect", () => {
  console.log("We on bitches")
})

export { pool }
