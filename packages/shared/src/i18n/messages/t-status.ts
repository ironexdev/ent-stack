import { LocaleType, t } from "@shared/i18n/t"

export function t_loading(locale: LocaleType): string {
  const messages = {
    en: "Loading ...",
    cs: "Načítám ...",
  }

  return t(messages, locale)
}
