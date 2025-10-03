import path from "path";
import { fileURLToPath } from "url";
import { parseEnv } from "util"
import { readFile } from "fs/promises"
import { isNumeric } from "../utils"
import { z } from "zod"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, "../..")

const envFile = await readFile(path.resolve(projectRoot, ".env"), { encoding: "utf8" })

const EnvSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
})
type Env = z.infer<typeof EnvSchema>
const envVars = (() => {
  const _ = {}
  const envVarsMap = parseEnv(envFile)
  for (let [k, v] of Object.entries(envVarsMap)) {
    if (v && isNumeric(v)) {
      _[k] = parseInt(v, 10)
    } else {
      _[k] = v
    }
  }
  return _ as Env
})()


export default {
  dir: { root: projectRoot },
  env: envVars
}
