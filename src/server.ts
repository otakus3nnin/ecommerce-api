import express from "express"
import { pool } from "./daos"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}))

app.get("/", (req, res) => {
  return res.end("<h1>Welcome To PCS API v1</h1>")
})

export default app
