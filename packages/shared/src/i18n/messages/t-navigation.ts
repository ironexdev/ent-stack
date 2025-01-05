import { LocaleType, t } from "@shared/i18n/t"

export function t_navHome(language: LocaleType): string {
  const messages = {
    en: "Home",
    cs: "Domů",
  }

  return t(messages, language)
}

export function t_navLogin(language: LocaleType): string {
  const messages = {
    en: "Login",
    cs: "Přihlásit se",
  }

  return t(messages, language)
}

export function t_navRegistration(language: LocaleType): string {
  const messages = {
    en: "Registration",
    cs: "Registrace",
  }

  return t(messages, language)
}

export function t_navMyProfile(language: LocaleType): string {
  const messages = {
    en: "My Profile",
    cs: "Můj Profil",
  }

  return t(messages, language)
}

export function t_navMainMenu(language: LocaleType): string {
  const messages = {
    en: "MAIN MENU",
    cs: "HLAVNÍ MENU",
  }

  return t(messages, language)
}

export function t_navUserMenu(language: LocaleType): string {
  const messages = {
    en: "User menu",
    cs: "Uživatelské menu",
  }

  return t(messages, language)
}

export function t_languageSwitcherTitle(language: LocaleType) {
  const messages = {
    en: "LANGUAGE",
    cs: "JAZYK",
  }

  return t(messages, language)
}
