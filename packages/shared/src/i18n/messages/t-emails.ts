import { LocaleType, t } from "@shared/i18n/t"

export function t_emailGreeting(locale: LocaleType): string {
  const messages = {
    en: "Hello",
    cs: "Ahoj",
  }

  return t(messages, locale)
}

export function t_emailGoodbye(locale: LocaleType): string {
  const messages = {
    en: "Have a nice day",
    cs: "Měj se",
  }

  return t(messages, locale)
}

export function t_emailLoginAttemptSubject(locale: LocaleType): string {
  const messages = {
    en: "Login Attempt Detected",
    cs: "Zjištěn pokus o přihlášení",
  }

  return t(messages, locale)
}

export function t_emailLoginAttemptTextSentence1(locale: LocaleType): string {
  const messages = {
    en: "A login attempt was made on your account even though you don't have an account on your site yet.",
    cs: "Někdo se pokusil přihlásit s tvojí e-mailovou adresou i když u nás ještě nemáš účet.",
  }

  return t(messages, locale)
}

export function t_emailLoginAttemptTextSentence2(
  locale: LocaleType,
  registrationLink: string,
): string {
  const messages = {
    en: `If this was you, then you can use the following <a href="{registrationLink}">link</a> to create a new account.`,
    cs: `Pokud jsi to byl/a ty, tak použij následující <a href="{registrationLink}">odkaz</a> a vytvoř si nový účet.`,
  }

  return t(messages, locale, 1, { registrationLink })
}

export function t_emailLoginAttemptTextSentence3(
  locale: LocaleType,
  securityEmail: string,
): string {
  const messages = {
    en: `If this wasn't you, and this happened multiple times, then please let us know at <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
    cs: `Pokud to nebyl/a ty a to se stalo vícekrát, tak nám dej vědět na <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
  }

  return t(messages, locale, 1, { securityEmail })
}

export function t_emailRegistrationAttemptSubject(locale: LocaleType): string {
  const messages = {
    en: "Registration Attempt Detected",
    cs: "Zjištěn pokus o registraci",
  }

  return t(messages, locale)
}

export function t_emailRegistrationAttemptTextSentence1(
  locale: LocaleType,
): string {
  const messages = {
    en: "A registration attempt was made using your e-mail address even though you already have an account on our site.",
    cs: "Někdo se pokusil zaregistrovat s tvojí e-mailovou adresou i když už u nás máš účet.",
  }

  return t(messages, locale)
}

export function t_emailRegistrationAttemptTextSentence2(
  locale: LocaleType,
  loginLink: string,
): string {
  const messages = {
    en: `If this was you, then you can use the following <a href="{loginLink}">link</a> to request login verification link.`,
    cs: `Pokud jsi to byl/a ty, tak použij následující <a href="{loginLink}">odkaz</a> a požádej o ověřovací odkaz pro přihlášení.`,
  }

  return t(messages, locale, 1, { loginLink })
}

export function t_emailRegistrationAttemptTextSentence3(
  locale: LocaleType,
  securityEmail: string,
): string {
  const messages = {
    en: `If this wasn't you, and this happened multiple times, then please let us know at <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
    cs: `Pokud to nebyl/a ty a to se stalo vícekrát, tak nám dej vědět na <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
  }

  return t(messages, locale, 1, { securityEmail })
}

export function t_emailLoginSubject(locale: LocaleType): string {
  const messages = {
    en: "Login",
    cs: "Přihlášení",
  }

  return t(messages, locale)
}

export function t_emailLoginTextSentence1(
  locale: LocaleType,
  pin: string,
): string {
  const messages = {
    en: `Here is the requested verification PIN <b>{pin}</b>, use it for login.`,
    cs: `Tady je požadovaný ověřovací PIN <b>{pin}</b>, použij ho pro přihlášení.`,
  }

  return t(messages, locale, 1, { pin })
}

export function t_emailLoginTextSentence2(
  locale: LocaleType,
  securityEmail: string,
): string {
  const messages = {
    en: `If this wasn't you, and this happened multiple times, then please let us know at <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
    cs: `Pokud to nebyl/a ty a to se stalo vícekrát, tak nám dej vědět na <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
  }

  return t(messages, locale, 1, { securityEmail })
}

export function t_emailRegistrationSubject(locale: LocaleType): string {
  const messages = {
    en: "Registration",
    cs: "Registrace",
  }

  return t(messages, locale)
}

export function t_emailRegistrationTextSentence1(
  locale: LocaleType,
  pin: string,
): string {
  const messages = {
    en: `Here is the requested verification PIN <b>{pin}</b>, use it for registration.`,
    cs: `Tady je požadovaný ověřovací PIN <b>{pin}</b>, použij ho pro registraci.`,
  }

  return t(messages, locale, 1, { pin })
}

export function t_emailRegistrationTextSentence2(
  locale: LocaleType,
  securityEmail: string,
): string {
  const messages = {
    en: `If this wasn't you, and this happened multiple times, then please let us know at <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
    cs: `Pokud to nebyl/a ty a to se stalo vícekrát, tak nám dej vědět na <a href="mailto:{securityEmail}">{securityEmail}</a>.`,
  }

  return t(messages, locale, 1, { securityEmail })
}
