import { type LocaleType, t } from "@shared/i18n/t"

export function t_inputError(locale: LocaleType): string {
  const messages = {
    en: "Fix the flagged fields to continue.",
    cs: "Opravte označená pole a pokračujte.",
  }

  return t(messages, locale)
}

export function t_invalidEmail(locale: LocaleType): string {
  const messages = {
    en: "Invalid email address.",
    cs: "Neplatná e-mailová adresa.",
  }

  return t(messages, locale)
}

export function t_invalidVerificationAction(locale: LocaleType): string {
  // End-user should never see this message

  const messages = {
    en: "Invalid verification action.",
    cs: "Neplatná akce k ověření.",
  }

  return t(messages, locale)
}

export function t_tooManyVerificationAttempts(
  locale: LocaleType,
  expirationInMinutes: number,
): string {
  const messages = {
    en: "Too many attempts, you need to wait up to {expirationInMinutes, plural, one {# minute} other {# minutes}} - then try again.",
    cs: "Příliš mnoho pokusů, musíte počkat až {expirationInMinutes, plural, one {# minutu} few {# minuty} other {# minut}} a poté to zkuste znovu.",
  }

  return t(messages, locale, expirationInMinutes, { expirationInMinutes })
}

export function t_invalidVerificationPINForLogin(locale: LocaleType): string {
  const messages = {
    en: "The verification PIN is invalid or expired. Please enter your email and try again.",
    cs: "Ověřovací PIN je neplatný nebo vypršel. Zadej svůj e-mail a zkus to znovu prosím.",
  }

  return t(messages, locale)
}

export function t_invalidVerificationPINForRegistration(
  locale: LocaleType,
): string {
  const messages = {
    en: "The verification PIN is invalid or expired. Please enter your email and try again.",
    cs: "Ověřovací PIN je neplatný nebo vypršel. Zadej svůj e-mail a zkus to znovu prosím.",
  }

  return t(messages, locale)
}

export function t_invalidOrExpiredRefreshToken(language: LocaleType): string {
  // End-user should never see this message

  const messages = {
    en: "Invalid or expired refresh token.",
    cs: "Neplatný nebo vypršelý obnovovací token.",
  }

  return t(messages, language)
}

export function t_invalidPIN(locale: LocaleType): string {
  const messages = {
    en: "Wrong PIN.",
    cs: "Špatný PIN.",
  }

  return t(messages, locale)
}
