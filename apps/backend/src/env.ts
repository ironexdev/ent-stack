import { createEnv } from "@t3-oss/env-core"
import { z } from "zod"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { LogLevelEnum } from "@shared/enums/log-level-enum"
import { configDotenv } from "dotenv"

configDotenv()

// Use coercion to convert string to number, bcs by default .env contains strings https://github.com/react-hook-form/resolvers/issues/73
export const env = createEnv({
  server: {
    SITE_NAME: z.string().min(1),
    BACKEND_URL: z.string().url(),
    FRONTEND_URL: z.string().url(),
    NODE_ENV: z.nativeEnum(EnvironmentEnum),
    PORT: z.coerce.number().int().min(1).max(65535),
    MYSQL_HOST: z.string().min(1),
    MYSQL_PORT: z.coerce.number().int().min(1).max(65535),
    MYSQL_USER: z.string().min(1),
    MYSQL_PASSWORD: z.string().min(1),
    MYSQL_DATABASE: z.string().min(1),
    JWT_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    SERVICE_EMAIL: z.string().email(),
    SECURITY_EMAIL: z.string().email(),
    COOKIE_DOMAIN: z.string().min(1),
    LOG_LEVEL: z.nativeEnum(LogLevelEnum),
    MAILSLURP_INBOX_ID: z.string().min(1),
    MAILSLURP_EMAIL: z.string().email(),
  },
  runtimeEnv: process.env,
  skipValidation: false,
  emptyStringAsUndefined: true,
})
