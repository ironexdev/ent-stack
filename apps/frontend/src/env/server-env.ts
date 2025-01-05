import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const serverEnv = createEnv({
  server: {
    JWT_SECRET: z.string().min(1),
  },
  experimental__runtimeEnv: process.env,
  skipValidation: true,
  emptyStringAsUndefined: true,
})
