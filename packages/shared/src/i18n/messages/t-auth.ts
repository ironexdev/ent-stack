import { type LocaleType, t } from "@shared/i18n/t"

export function t_loginSuccess(locale: LocaleType) {
  const messages = {
    en: "You have been successfully logged in!",
    cs: "Byl jsi úspěšně přihlášen/a!",
  }

  return t(messages, locale)
}

export function t_logoutComplete(locale: LocaleType) {
  const messages = {
    en: "You have been successfully logged out.",
    cs: "Byl jsi úspěšně odhlášen/a.",
  }

  return t(messages, locale)
}

export function t_registrationSuccess(locale: LocaleType) {
  const messages = {
    en: "Welcome! You have been successfully registered!",
    cs: "Vítej! Byl jsi úspěšně zaregistrován/a.",
  }

  return t(messages, locale)
}

export function t_loginTitle(locale: LocaleType) {
  const messages = {
    en: "Login",
    cs: "Přihlášení",
  }

  return t(messages, locale)
}

export function t_loginVerificationTitle(locale: LocaleType) {
  const messages = {
    en: "Verify Login",
    cs: "Ověření Přihlášení",
  }

  return t(messages, locale)
}

export function t_loginRequired(language: LocaleType): string {
  const messages = {
    en: "You must be logged in to view this page.",
    cs: "Pro zobrazení této stránky se musíš přihlásit.",
  }

  return t(messages, language)
}

export function t_loginSubmit(locale: LocaleType) {
  const messages = {
    en: "Let me in!",
    cs: "Pusť mě dovnitř!",
  }

  return t(messages, locale)
}

export function t_registrationTitle(locale: LocaleType) {
  const messages = {
    en: "Registration",
    cs: "Registrace",
  }

  return t(messages, locale)
}

export function t_registrationVerificationTitle(locale: LocaleType) {
  const messages = {
    en: "Verify Registration",
    cs: "Ověření Registrace",
  }

  return t(messages, locale)
}

export function t_registrationSubmit(locale: LocaleType) {
  const messages = {
    en: "Let's go!",
    cs: "Jdeme na to!",
  }

  return t(messages, locale)
}

export function t_loginVerify(locale: LocaleType) {
  const messages = {
    en: "Verify",
    cs: "Ověřit",
  }

  return t(messages, locale)
}

export function t_registrationVerify(locale: LocaleType) {
  const messages = {
    en: "Verify",
    cs: "Ověřit",
  }

  return t(messages, locale)
}

export function t_logout(locale: LocaleType) {
  const messages = {
    en: "Logout",
    cs: "Odhlásit se",
  }

  return t(messages, locale)
}

export function t_alreadyHaveThePin(locale: LocaleType) {
  const messages = {
    en: "Already have the PIN?",
    cs: "Už máš PIN?",
  }

  return t(messages, locale)
}

export function t_verificationPINSent(locale: LocaleType) {
  const messages = {
    en: "Verification PIN has been sent to your e-mail - copy and paste it below.",
    cs: "Ověřovací PIN byl odeslán na tvůj e-mail - zkopíruj ho a vlož sem.",
  }

  return t(messages, locale)
}
