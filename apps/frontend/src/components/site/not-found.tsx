"use client"

import { logger } from "@frontend/lib/logger"
import { LoggerErrorEnum } from "@shared/enums/logger-error-enum"
import Link from "next/link"
import { type LocaleType } from "@shared/i18n/t"
import {
  t_notFoundDescription,
  t_notFoundLink,
  t_notFoundTitle,
} from "@shared/i18n/messages/t-not-found-error"
import MyButton from "@frontend/components/user-input/my-button"

export default function NotFound({
  locale,
  pathname,
  handler,
}: {
  locale: LocaleType
  pathname: string
  handler: string
}) {
  logger.warn({
    msg: "Page Not Found - 404",
    handler,
    pathname,
    type: LoggerErrorEnum.USERLAND_ERROR,
  })

  return (
    <>
      <div className="min-h-10 w-full flex-grow-[1]" />
      <div>
        <h1 className="w-full text-center text-3xl">
          {t_notFoundTitle(locale)}
        </h1>
        <h2 className="mt-10 w-full text-center text-8xl text-secondary">
          404
        </h2>
        <p className="mt-10 w-full text-center">
          {t_notFoundDescription(locale)}
        </p>
        <Link href="/">
          <MyButton className="mx-auto mt-10">
            {t_notFoundLink(locale)}
          </MyButton>
        </Link>
      </div>
      <div className="min-h-10 w-full flex-grow-[2]" />
    </>
  )
}
