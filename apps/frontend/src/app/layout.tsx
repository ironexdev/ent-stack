import "@frontend/styles/globals.css"
import { Metadata, Viewport } from "next"
import { ReactNode } from "react"

type RootLayoutPropsType = {
  children: ReactNode
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: "ENT Stack",
  description:
    "Full-stack monorepo that integrates Express, Next.js, and TRPC, offering a streamlined solution for web app development.",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        url: "/static/favicon.png",
        sizes: "96x96",
      },
      {
        rel: "icon",
        type: "image/svg+xml",
        url: "/static/favicon.svg",
      },
      {
        rel: "shortcut icon",
        url: "/static/favicon.ico",
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: "/static/apple-touch-icon.png",
      },
    ],
    other: [
      {
        rel: "manifest",
        url: "/static/manifest.webmanifest",
      },
    ],
  },
  appleWebApp: {
    title: "ENT Stack",
  },
}

export default function RootLayout({ children }: RootLayoutPropsType) {
  return children
}
