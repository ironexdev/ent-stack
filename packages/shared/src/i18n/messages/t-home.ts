import { LocaleType, t } from "@shared/i18n/t"

/** Existing translations you already had. */
export function t_homeTitle(locale: LocaleType): string {
  const messages = {
    en: `Where <b class="text-x-next">Next.js</b> meets <b class="text-x-express">Express</b>`,
    cs: `Kde se <b>Next.js</b> setkává s <b>Express</b>`,
  }
  return t(messages, locale)
}

export function t_homeSubtitle(locale: LocaleType): string {
  const messages = {
    en: `Together when you want, separate when you need`,
    cs: `Spolu, když chcete, odděleně, když potřebujete`,
  }
  return t(messages, locale)
}

/** New general homepage strings. */
export function t_homeWhatsInside(locale: LocaleType): string {
  const messages = {
    en: `What's Inside`,
    cs: `Co je uvnitř`,
  }
  return t(messages, locale)
}

export function t_homeDesc1(locale: LocaleType): string {
  const messages = {
    en: `The ENT Stack is a robust, full-stack monorepo that integrates Express, Next.js, and TRPC, offering a streamlined solution for web app development.`,
    cs: `ENT Stack je robustní full-stack monorepo, které propojuje Express, Next.js a TRPC a umožňuje efektivní vývoj webových aplikací.`,
  }
  return t(messages, locale)
}

export function t_homeDesc2(locale: LocaleType): string {
  const messages = {
    en: `It allows you to build and share code between frontend and backend in a single project while maintaining the flexibility to host them independently.`,
    cs: `Umožňuje vyvíjet a sdílet kód mezi frontendem a backendem v jednom projektu a přitom zachovat možnost provozovat je samostatně.`,
  }
  return t(messages, locale)
}

export function t_homeSetup(locale: LocaleType): string {
  const messages = {
    en: `Setup`,
    cs: `Setup`, // Keep same for cs
  }
  return t(messages, locale)
}

export function t_homeDocs(locale: LocaleType): string {
  const messages = {
    en: `Documentation`,
    cs: `Documentation`, // Keep same for cs
  }
  return t(messages, locale)
}

export function t_homeToolTech(locale: LocaleType): string {
  const messages = {
    en: `Tool/Tech`,
    cs: `Tool/Tech`,
  }
  return t(messages, locale)
}

export function t_homeRole(locale: LocaleType): string {
  const messages = {
    en: `Role`,
    cs: `Role`,
  }
  return t(messages, locale)
}

export function t_homeIllustrationAlt(locale: LocaleType): string {
  const messages = {
    en: `ENT Stack Illustration`,
    cs: `ENT Stack Illustration`, // Keep same
  }
  return t(messages, locale)
}

/** Table items (name & role). No need to translate the actual tool names or roles to cs. */
export function t_homeTableExpressName(locale: LocaleType): string {
  const messages = {
    en: "Express 5",
    cs: "Express 5",
  }
  return t(messages, locale)
}
export function t_homeTableExpressRole(locale: LocaleType): string {
  const messages = {
    en: "Backend Framework",
    cs: "Backend Framework",
  }
  return t(messages, locale)
}

export function t_homeTableNextjsName(locale: LocaleType): string {
  const messages = {
    en: "Next.js 15",
    cs: "Next.js 15",
  }
  return t(messages, locale)
}
export function t_homeTableNextjsRole(locale: LocaleType): string {
  const messages = {
    en: "Frontend Framework",
    cs: "Frontend Framework",
  }
  return t(messages, locale)
}

export function t_homeTableTrpcName(locale: LocaleType): string {
  const messages = {
    en: "TRPC 11",
    cs: "TRPC 11",
  }
  return t(messages, locale)
}
export function t_homeTableTrpcRole(locale: LocaleType): string {
  const messages = {
    en: "Typesafe APIs",
    cs: "Typesafe APIs",
  }
  return t(messages, locale)
}

export function t_homeTableCustomI18nName(locale: LocaleType): string {
  const messages = {
    en: "Custom i18n solution",
    cs: "Custom i18n solution",
  }
  return t(messages, locale)
}
export function t_homeTableCustomI18nRole(locale: LocaleType): string {
  const messages = {
    en: "Route & Message Translations",
    cs: "Route & Message Translations",
  }
  return t(messages, locale)
}

export function t_homeTableLucideName(locale: LocaleType): string {
  const messages = {
    en: "Lucide React",
    cs: "Lucide React",
  }
  return t(messages, locale)
}
export function t_homeTableLucideRole(locale: LocaleType): string {
  const messages = {
    en: "Icons",
    cs: "Icons",
  }
  return t(messages, locale)
}

export function t_homeTableDrizzleName(locale: LocaleType): string {
  const messages = {
    en: "Drizzle",
    cs: "Drizzle",
  }
  return t(messages, locale)
}
export function t_homeTableDrizzleRole(locale: LocaleType): string {
  const messages = {
    en: "Database ORM",
    cs: "Database ORM",
  }
  return t(messages, locale)
}

export function t_homeTableMailslurpName(locale: LocaleType): string {
  const messages = {
    en: "Mailslurp",
    cs: "Mailslurp",
  }
  return t(messages, locale)
}
export function t_homeTableMailslurpRole(locale: LocaleType): string {
  const messages = {
    en: "Email Testing",
    cs: "Email Testing",
  }
  return t(messages, locale)
}

export function t_homeTableMysqlName(locale: LocaleType): string {
  const messages = {
    en: "MySQL 8",
    cs: "MySQL 8",
  }
  return t(messages, locale)
}
export function t_homeTableMysqlRole(locale: LocaleType): string {
  const messages = {
    en: "Database",
    cs: "Database",
  }
  return t(messages, locale)
}

export function t_homeTablePinoName(locale: LocaleType): string {
  const messages = {
    en: "Pino",
    cs: "Pino",
  }
  return t(messages, locale)
}
export function t_homeTablePinoRole(locale: LocaleType): string {
  const messages = {
    en: "Logging",
    cs: "Logging",
  }
  return t(messages, locale)
}

export function t_homeTablePlaywrightName(locale: LocaleType): string {
  const messages = {
    en: "Playwright",
    cs: "Playwright",
  }
  return t(messages, locale)
}
export function t_homeTablePlaywrightRole(locale: LocaleType): string {
  const messages = {
    en: "Testing Framework",
    cs: "Testing Framework",
  }
  return t(messages, locale)
}

export function t_homeTableResendName(locale: LocaleType): string {
  const messages = {
    en: "Resend",
    cs: "Resend",
  }
  return t(messages, locale)
}
export function t_homeTableResendRole(locale: LocaleType): string {
  const messages = {
    en: "Email Sending",
    cs: "Email Sending",
  }
  return t(messages, locale)
}

export function t_homeTableT3EnvName(locale: LocaleType): string {
  const messages = {
    en: "T3 Env",
    cs: "T3 Env",
  }
  return t(messages, locale)
}
export function t_homeTableT3EnvRole(locale: LocaleType): string {
  const messages = {
    en: "Environment Variables",
    cs: "Environment Variables",
  }
  return t(messages, locale)
}

export function t_homeTableTanstackName(locale: LocaleType): string {
  const messages = {
    en: "Tanstack Query",
    cs: "Tanstack Query",
  }
  return t(messages, locale)
}
export function t_homeTableTanstackRole(locale: LocaleType): string {
  const messages = {
    en: "Async State Management",
    cs: "Async State Management",
  }
  return t(messages, locale)
}

export function t_homeTableZodName(locale: LocaleType): string {
  const messages = {
    en: "Zod",
    cs: "Zod",
  }
  return t(messages, locale)
}
export function t_homeTableZodRole(locale: LocaleType): string {
  const messages = {
    en: "Validation",
    cs: "Validation",
  }
  return t(messages, locale)
}

export function t_homeTableZustandName(locale: LocaleType): string {
  const messages = {
    en: "Zustand",
    cs: "Zustand",
  }
  return t(messages, locale)
}
export function t_homeTableZustandRole(locale: LocaleType): string {
  const messages = {
    en: "State Management",
    cs: "State Management",
  }
  return t(messages, locale)
}
