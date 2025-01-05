import { LocaleType } from "@shared/i18n/t"
import { i18n } from "@frontend/lib/i18n"

export type RoutesType = Record<string, RouteType>

type RouteType = {
  pathnames: string | { [K in LocaleType]: string }
  protected: boolean
  lastModified?: Date
}

export const routes: RoutesType = {
  "/": {
    pathnames: "/",
    lastModified: new Date(),
    protected: false,
  },
  "/registration": {
    pathnames: {
      en: "/registration",
      cs: "/registrace",
    },
    lastModified: new Date(),
    protected: false,
  },
  "/registration/verification": {
    pathnames: {
      en: "/registration/verification",
      cs: "/registrace/overeni",
    },
    lastModified: new Date(),
    protected: false,
  },
  "/login": {
    pathnames: {
      en: "/login",
      cs: "/prihlaseni",
    },
    lastModified: new Date(),
    protected: false,
  },
  "/login/verification": {
    pathnames: {
      en: "/login/verification",
      cs: "/prihlaseni/overeni",
    },
    lastModified: new Date(),
    protected: false,
  },
  "/my-profile": {
    pathnames: {
      en: "/my-profile",
      cs: "/muj-profil",
    },
    protected: true,
  },
  "/logout": {
    pathnames: {
      en: "/logout",
      cs: "/odhlasit-se",
    },
    protected: true,
  },
}

export const protectedPages = Object.keys(routes).flatMap((key) => {
  const route = routes[key]!
  if (route.protected) {
    const pathname = route.pathnames
    if (typeof pathname === "string") {
      return [pathname]
    } else {
      return Object.values(pathname)
    }
  }
  return []
})

/**
 * The indexedRoutes object will contain mappings from localized pathnames back to their route keys.
 * Example of indexedRoutes values:
 * {
 *   "/en": "/",
 *   "/cs": "/",
 *   "/en/my-profile": "/my-profile",
 *   "/cs/muj-profil": "/my-profile",
 *   "/en/login": "/login",
 *   "/cs/prihlaseni": "/login",
 * }
 *
 * Usage:
 * indexedRoutes can be used to look up the original route key from a localized pathname.
 * This is particularly useful for routing purposes, where you need to determine the original
 * route definition based on the current URL, regardless of the user's language.
 */
export const indexedRoutes: Record<string, string> = {}

Object.entries(routes).forEach(([key, value]) => {
  if (typeof value.pathnames === "string") {
    i18n.locales.forEach((locale) => {
      if (key === "/") {
        indexedRoutes["/" + locale] = `/`
      } else {
        indexedRoutes["/" + locale + key] = key
      }
    })
  } else {
    Object.entries(value.pathnames).forEach(([lang, pathname]) => {
      indexedRoutes["/" + lang + pathname] = key
    })
  }
})
