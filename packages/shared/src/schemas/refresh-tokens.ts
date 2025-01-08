import { type LocaleType } from "@shared/i18n/t"
import { z } from "zod"
import { t_invalidOrExpiredRefreshToken } from "@shared/i18n/messages/common/t-input-error"

export function rtVerifySchema(locale: LocaleType) {
  return z.object({
    refreshToken: z.string().min(1, t_invalidOrExpiredRefreshToken(locale)),
  })
}
