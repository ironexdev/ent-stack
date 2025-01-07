import { LocaleType, t } from "@shared/i18n/t"

export function t_homeTitle(locale: LocaleType): string {
  const messages = {
    en: `Where <b class="text-x-next">Next.js</b> meets <b class="text-x-express">Express</b>`,
    cs: `Kde <b class="text-x-next">Next.js</b> potkává <b class="text-x-express">Express</b>`,
  }
  return t(messages, locale)
}

export function t_homeSubtitle(locale: LocaleType): string {
  const messages = {
    en: `Together when you want, separate when you need`,
    cs: `Společně když chceš - odděleně, když potřebuješ`,
  }
  return t(messages, locale)
}

export function t_homeSetup(locale: LocaleType): string {
  const messages = {
    en: `Setup`,
    cs: `Setup`,
  }
  return t(messages, locale)
}

export function t_homeDocs(locale: LocaleType): string {
  const messages = {
    en: `Documentation`,
    cs: `Dokumentace`,
  }
  return t(messages, locale)
}

export function t_homeIllustrationAlt(locale: LocaleType): string {
  const messages = {
    en: `ENT Stack Illustration`,
    cs: `ENT Stack Ilustrace`,
  }
  return t(messages, locale)
}
