import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ENT Stack",
    short_name: "ENT Stack",
    description: "Express Node.js TRPC Stack",
    start_url: "/",
    display: "standalone",
    background_color: "#171819",
    theme_color: "#171819",
    icons: [
      {
        src: "/static/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/static/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  }
}
