import { LocaleType, t } from "@shared/i18n/t"
import { t_loading } from "@shared/i18n/messages/t-status"

export function t_emailLabel(locale: LocaleType) {
  const messages = {
    en: "E-MAIL",
    cs: "E-MAIL",
  }

  return t(messages, locale)
}

export function t_emailPlaceholder(locale: LocaleType) {
  const messages = {
    en: "... @ ...",
    cs: "... @ ...",
  }

  return t(messages, locale)
}

export function t_pinLabel(locale: LocaleType) {
  const messages = {
    en: "PIN",
    cs: "PIN",
  }

  return t(messages, locale)
}

export function t_pinPlaceholder(locale: LocaleType) {
  const messages = {
    en: "Enter PIN from the e-mail",
    cs: "Zadej PIN z e-mailu",
  }

  return t(messages, locale)
}

export function t_selectPlaceholder(locale: LocaleType): string {
  const messages = {
    en: "Select ...",
    cs: "Vyber si ...",
  }

  return t(messages, locale)
}
