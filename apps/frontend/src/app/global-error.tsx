"use client"

import { i18n } from "@frontend/lib/i18n"
import {
  t_globalErrorButton,
  t_globalErrorDescription1,
  t_globalErrorDescription2,
  t_globalErrorSubtitle,
  t_globalErrorTitle,
} from "@shared/i18n/messages/t-global-error"
import { LoggerErrorEnum } from "@shared/enums/logger-error-enum"
import { logger } from "@frontend/lib/logger"
import MyButton from "@frontend/components/user-input/my-button"
import { Readex_Pro } from "next/font/google"

const font = Readex_Pro({
  subsets: ["latin"],
  display: "swap",
})

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const locale = i18n.defaultLocale // Error before locale is resolved

  logger.error({
    msg: "Unhandled error caught by the global error handler",
    handler: "app/global-error.tsx",
    type: LoggerErrorEnum.CLIENT_ERROR,
    error,
  })

  return (
    <html className="h-full">
      <body
        className={`flex h-full flex-col items-center justify-center bg-primary text-primary ${font.className}`}
      >
        <div className="min-h-10 w-full flex-grow-[1]" />
        <div>
          <h1 className="w-full text-center text-3xl">
            {t_globalErrorTitle(locale)}
          </h1>
          <p className="mt-10 w-full text-center">
            {t_globalErrorSubtitle(locale)}
          </p>
          <p className="mt-2 w-full text-center">
            {t_globalErrorDescription1(locale)}
          </p>
          <p className="mt-2 w-full text-center">
            {t_globalErrorDescription2(locale)}
          </p>
          <MyButton className="mx-auto mt-10" onClick={() => reset()}>
            {t_globalErrorButton(locale)}
          </MyButton>
        </div>
        <div className="min-h-10 w-full flex-grow-[2]" />
      </body>
    </html>
  )
}
