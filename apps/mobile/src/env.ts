import { z } from "zod"
import { createEnv } from "@t3-oss/env-core"

export const env = createEnv({
  clientPrefix: "EXPO_PUBLIC_",
  client: {
    EXPO_PUBLIC_BACKEND_URL: z.string(),
  },
  runtimeEnv: process.env,
  skipValidation: false,
  emptyStringAsUndefined: true,
})
