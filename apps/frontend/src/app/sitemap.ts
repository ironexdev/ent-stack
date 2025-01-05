import { type MetadataRoute } from "next"
import { routes, type RoutesType } from "@frontend/lib/routes"
import { i18n } from "@frontend/lib/i18n"

export default function sitemap(): MetadataRoute.Sitemap {
  const siteDomain = process.env.NEXT_PUBLIC_FRONTEND_URL!

  return routesToSitemap(routes, siteDomain)
}

function routesToSitemap(
  routes: RoutesType,
  domain: string,
): MetadataRoute.Sitemap {
  const records: MetadataRoute.Sitemap = []

  for (const [key, route] of Object.entries(routes)) {
    if (!route.protected) {
      if (typeof route.pathnames === "string") {
        for (const locale of i18n.locales) {
          const pathname = route.pathnames === "/" ? "" : route.pathnames // Make sure index does not end in /
          records.push({
            url: `${domain}/${locale}${pathname}`,
            lastModified: route.lastModified,
          })
        }
      } else {
        for (const [locale, pathname] of Object.entries(route.pathnames)) {
          records.push({
            url: `${domain}/${locale}${pathname}`,
            lastModified: route.lastModified,
          })
        }
      }
    }
  }

  return records
}
