import { LocaleType } from "@shared/i18n/t"
import { z } from "zod"
import {
  t_invalidEmail,
  t_invalidPIN,
  t_invalidVerificationAction,
} from "@shared/i18n/messages/common/t-input-error"
import { VerificationActionEnum } from "@shared/enums/verification-action-enum"

export function vtCreateSchema(locale: LocaleType) {
  return z.object({
    action: z.nativeEnum(VerificationActionEnum, {
      message: t_invalidVerificationAction(locale),
    }),
    email: z.string().email(t_invalidEmail(locale)),
    loginLink: z.string().url(), // No need to translate, this is would be client error, not user error
    registrationLink: z.string().url(), // No need to translate, this is would be client error, not user error
  })
}

export function vtVerifySchema(locale: LocaleType) {
  return z.object({
    action: z.nativeEnum(VerificationActionEnum, {
      message: t_invalidVerificationAction(locale),
    }),
    email: z.string().email(t_invalidEmail(locale)),
    pin: z.string().min(1, t_invalidPIN(locale)),
  })
}
