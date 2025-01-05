import QueryToast from "@frontend/components/toast/query-toast"
import NextTopLoader from "nextjs-toploader"
import { i18n } from "@frontend/lib/i18n"
import { LocaleType } from "@shared/i18n/t"
import { notFound } from "next/navigation"
import Providers from "@frontend/components/providers/providers"
import { ReactNode } from "react"
import MyToaster from "@frontend/components/toast/my-toaster"
import AuthService from "@frontend/services/auth-service"
import { Readex_Pro } from "next/font/google"

const font = Readex_Pro({
  subsets: ["latin"],
  display: "swap",
})

type LocaleLayoutPropsType = {
  children: ReactNode
  params: {
    locale: string
  }
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutPropsType) {
  const { locale } = await params

  if (!i18n.locales.includes(locale as unknown as LocaleType)) {
    // Needed to handle requests that don't go through middleware (ie /favicon.ico)
    return notFound()
  }

  const session = await AuthService.getSession()

  return (
    <html lang={locale} className="h-full">
      <body
        className={`h-full bg-primary bg-fixed text-primary ${font.className}`}
      >
        <NextTopLoader
          color="#555555"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFFFFF0 0 5px #FFFFFF"
          template='<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1000}
          showAtBottom={false}
        />
        <Providers session={session}>
          <MyToaster />
          {children}
          <QueryToast locale={locale as LocaleType} />
        </Providers>
      </body>
    </html>
  )
}
