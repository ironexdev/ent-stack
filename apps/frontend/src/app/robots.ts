import { type MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  const siteDomain = process.env.NEXT_PUBLIC_FRONTEND_URL!

  return {
    rules: {
      disallow: "/",
    },
    sitemap: siteDomain + "/sitemap.xml",
  }
}
