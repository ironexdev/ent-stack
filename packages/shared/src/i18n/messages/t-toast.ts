import { LocaleType, t } from "@shared/i18n/t"

export function t_toastError(locale: LocaleType): string {
  const messages = {
    en: "Error",
    cs: "Chyba",
  }

  return t(messages, locale)
}

export function t_toastSuccess(locale: LocaleType): string {
  const messages = {
    en: "Success",
    cs: "Úspěch",
  }

  return t(messages, locale)
}

export function t_toastWarning(locale: LocaleType): string {
  const messages = {
    en: "Warning",
    cs: "Varování",
  }

  return t(messages, locale)
}

export function t_toastInfo(locale: LocaleType): string {
  const messages = {
    en: "Info",
    cs: "Informace",
  }

  return t(messages, locale)
}
