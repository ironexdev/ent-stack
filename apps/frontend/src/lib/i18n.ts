import SharedConfig from "@shared/config/shared-config"
import {
  localeEnumAsArray,
  localeEnumAsLanguages,
} from "@shared/enums/locale-enum"

export const i18n = {
  defaultLocale: SharedConfig.defaultLocale,
  locales: localeEnumAsArray,
  languages: localeEnumAsLanguages,
} as const
