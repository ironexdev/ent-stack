import pino from "pino"
import { clientEnv } from "@frontend/env/client-env"

export const logger = pino({
  base: null,
  level: clientEnv.NEXT_PUBLIC_LOG_LEVEL,
})
