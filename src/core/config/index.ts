import path from "path";
import { fileURLToPath } from "url";
import { isNumeric } from "@/core/utils/misc.js";
import { z } from "zod";
import { parseEnv } from "util";
import { readFile } from "fs/promises";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "../../..");

const EnvSchema = z.object({
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD_FILE: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.number(),

  SMTP_HOST: z.optional(z.string()),
  SMTP_PORT: z.optional(z.number()),
  EMAIL_USER: z.optional(z.string()),
  EMAIL_PASSWD: z.optional(z.string()),

  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
  JWT_SECRET: z.string(),
});
type Env = z.infer<typeof EnvSchema>;
const envVars = await (async () => {
  // type correct parse and clean
  const _ = {} as Record<string, string | number>;
  let envVarsMap;
  if (process.env.NODE_ENV === "production") envVarsMap = process.env;
  else
    envVarsMap = parseEnv(
      await readFile(path.resolve(projectRoot, ".env"), { encoding: "utf8" }),
    );

  console.log(envVarsMap);
  for (const [k, v] of Object.entries(envVarsMap)) {
    if (v && isNumeric(v)) {
      _[k] = parseInt(v, 10);
    } else {
      _[k] = v as string;
    }
  }
  return _;
})();
const env: Env = EnvSchema.parse(envVars);

export default {
  dir: { root: projectRoot },
  env,
};
