import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { LogLevelEnum } from "@shared/enums/log-level-enum"

export const clientEnv = createEnv({
  client: {
    // Define NODE_ENV in .env, but use NEXT_PUBLIC_NODE_ENV instead
    NEXT_PUBLIC_NODE_ENV: z.nativeEnum(EnvironmentEnum),
    NEXT_PUBLIC_COOKIE_DOMAIN: z.string().min(1),
    NEXT_PUBLIC_FRONTEND_URL: z.string().min(1),
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_LOG_LEVEL: z.nativeEnum(LogLevelEnum),
  },
  runtimeEnv: {
    NEXT_PUBLIC_COOKIE_DOMAIN: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
    NEXT_PUBLIC_NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_LOG_LEVEL: process.env.NEXT_PUBLIC_LOG_LEVEL,
  },
  skipValidation: false,
  emptyStringAsUndefined: true,
})
