import type { Request } from "express"
import type { LocaleType } from "@shared/i18n/t"
import SharedConfig from "@shared/config/shared-config"
import { RequestHeaderEnum } from "@shared/enums/request-header-enum"
import { localeEnumAsArray } from "@shared/enums/locale-enum"
import { fileURLToPath } from "url"
import { dirname } from "path"
import path from "node:path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

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

// Resolves paths consistently between environments
// If `dist` is part of the current `__dirname`, it assumes the application
// is running from the `dist` folder and appends `dist` to `process.cwd()`.
// Otherwise, it uses `process.cwd()` and appends `src`.
export function resolvePath(relativePath: string): string {
  const isInDist = __dirname.includes(path.join("dist"))

  // Determine the base directory based on runtime environment
  const basePath = isInDist
    ? path.join(process.cwd(), "dist") // Add `dist` for
    : path.join(process.cwd(), "src") // Add src

  // Resolve and return the full path
  return path.join(basePath, relativePath)
}
