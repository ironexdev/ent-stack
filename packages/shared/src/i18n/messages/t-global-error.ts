import { LocaleType, t } from "@shared/i18n/t"

export function t_globalErrorTitle(locale: LocaleType): string {
  const messages = {
    en: "Error",
    cs: "Chyba",
  }

  return t(messages, locale)
}

export function t_globalErrorSubtitle(locale: LocaleType): string {
  const messages = {
    en: "We are sorry, but something went wrong.",
    cs: "Omlouváme se, ale něco se pokazilo.",
  }

  return t(messages, locale)
}

export function t_globalErrorDescription1(locale: LocaleType): string {
  const messages = {
    en: "Use the button below to restart the application.",
    cs: "Použijte tlačítko níže pro restart aplikace.",
  }

  return t(messages, locale)
}

export function t_globalErrorDescription2(locale: LocaleType): string {
  const messages = {
    en: "Or try again later please.",
    cs: "Nebo to zkuste později prosím.",
  }

  return t(messages, locale)
}

export function t_globalErrorButton(locale: LocaleType): string {
  const messages = {
    en: "Restart",
    cs: "Restart",
  }

  return t(messages, locale)
}
