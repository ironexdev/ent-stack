import { type LocaleType, t } from "@shared/i18n/t"

export function t_notFoundTitle(locale: LocaleType): string {
  const messages = {
    en: "Page Not Found",
    cs: "Stránka Nenalezena",
  }

  return t(messages, locale)
}

export function t_notFoundDescription(locale: LocaleType): string {
  const messages = {
    en: "Go back to the homepage.",
    cs: "Vraťte se na domovskou stránku.",
  }

  return t(messages, locale)
}

export function t_notFoundLink(locale: LocaleType): string {
  const messages = {
    en: "Homepage",
    cs: "Domů",
  }

  return t(messages, locale)
}
