"use client"

import { i18n } from "@frontend/lib/i18n"
import NotFound from "@frontend/components/site/not-found"
import { Readex_Pro } from "next/font/google"
import { usePathname } from "next/navigation"

const font = Readex_Pro({
  subsets: ["latin"],
  display: "swap",
})

export default function NotFoundPage() {
  const locale = i18n.defaultLocale
  const pathname = usePathname()
  const handler = "app/not-found.tsx"

  return (
    <html lang={locale} className="h-full">
      <body
        className={`flex h-full flex-col items-center justify-center bg-primary text-primary ${font.className}`}
      >
        <NotFound locale={locale} pathname={pathname} handler={handler} />
      </body>
    </html>
  )
}
