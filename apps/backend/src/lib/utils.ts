import type { NextFunction, Request, Response } from "express"
import type { LocaleType } from "@shared/i18n/t"
import SharedConfig from "@shared/config/shared-config"
import { RequestHeaderEnum } from "@shared/enums/request-header-enum"
import { localeEnumAsArray } from "@shared/enums/locale-enum"
import superjson from "superjson"

export function localeFromReq(req: Request): LocaleType {
  const langHeader = req.headers[RequestHeaderEnum.ACCEPT_LANGUAGE]

  const locale =
    langHeader && localeEnumAsArray.includes(langHeader as LocaleType)
      ? langHeader
      : SharedConfig.defaultLocale

  return locale as LocaleType
}

export function removeWhitespaceFromLineStart(str: string): string {
  return str.replace(/^\s+/gm, "")
}

// Generates 6-digit PIN
export function generatePIN(): string {
  const num = (Math.random() * 1000000) | 0 // Use bitwise OR to truncate decimal

  return String(num).padStart(6, "0") // Pad with leading zeros if necessary
}
