import { LocaleType } from "@shared/i18n/t"
import { clientEnv } from "@frontend/env/client-env"
import { routes } from "@frontend/lib/routes"

export function getLocalizedPathname(
  locale: LocaleType,
  pathname: string,
  queryObject?: Record<string, string>,
): string {
  let localizedPath

  if (!(pathname in routes)) {
    throw new Error(
      `Pathname "${pathname}" was not found in routes. It must be a key, not translated pathname.`,
    )
  }

  if (typeof routes[pathname]!.pathnames === "string") {
    localizedPath = "/" + locale + routes[pathname]!.pathnames
  } else {
    localizedPath = "/" + locale + routes[pathname]!.pathnames[locale]
  }

  if (queryObject) {
    const queryString = new URLSearchParams(queryObject).toString()
    localizedPath = `${localizedPath}?${queryString}`
  }

  return localizedPath
}

export function getLocalizedLoginPathname(locale: LocaleType): string {
  return getLocalizedPathname(locale, "/login")
}

export function getLocalizedRegistrationPathname(locale: LocaleType): string {
  return getLocalizedPathname(locale, "/registration")
}

export function getLocalizedMyProfilePathname(locale: LocaleType): string {
  return getLocalizedPathname(locale, "/my-profile")
}

export function getLocalizedLoginLink(locale: LocaleType): string {
  return `${clientEnv.NEXT_PUBLIC_FRONTEND_URL}/${getLocalizedLoginPathname(locale)}`
}

export function getLocalizedRegistrationLink(locale: LocaleType): string {
  return `${clientEnv.NEXT_PUBLIC_FRONTEND_URL}/${getLocalizedRegistrationPathname(locale)}`
}
