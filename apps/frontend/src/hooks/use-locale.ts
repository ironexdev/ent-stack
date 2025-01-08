import { usePathname } from "next/navigation"
import { i18n } from "@frontend/lib/i18n"
import { type LocaleType } from "@shared/i18n/t"

// Always returns locale, if no locale is found then the default locale is returned
export default function useLocale() {
  const pathname = usePathname()

  // Split the pathname by "/" and filter out empty segments (leading slash results in empty first segment)
  const segments = pathname.split("/").filter(Boolean)

  // Assume the first segment might be the locale
  const firstSegment = segments[0]

  return (
    i18n.locales.includes(firstSegment as LocaleType)
      ? firstSegment
      : i18n.defaultLocale
  ) as LocaleType
}
