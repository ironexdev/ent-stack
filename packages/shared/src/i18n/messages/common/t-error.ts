import { type LocaleType, t } from "@shared/i18n/t"

export function t_clientError(locale: LocaleType): string {
  const messages = {
    en: "Something went wrong. Please reload the page and try again.",
    cs: "Něco se pokazilo. Obnov stránku a zkus to znovu prosím.",
  }

  return t(messages, locale)
}

export function t_serverError(locale: LocaleType): string {
  const messages = {
    en: "Something went wrong on the server. Please reload the page and try again.",
    cs: "Něco se pokazilo. Obnov stránku a zkus to znovu prosím.",
  }

  return t(messages, locale)
}
