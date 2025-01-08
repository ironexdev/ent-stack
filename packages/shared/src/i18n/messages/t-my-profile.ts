import { type LocaleType, t } from "@shared/i18n/t"

export function t_myProfileTitle(locale: LocaleType): string {
  const messages = {
    en: "MY PROFILE",
    cs: "MŮJ PROFIL",
  }

  return t(messages, locale)
}
