"use client"

import {
  t_homeTitle,
  t_homeSubtitle,
  t_homeWhatsInside,
  t_homeDesc1,
  t_homeDesc2,
  t_homeToolTech,
  t_homeRole,
  t_homeSetup,
  t_homeDocs,
  t_homeIllustrationAlt,
  t_homeTableExpressName,
  t_homeTableExpressRole,
  t_homeTableNextjsName,
  t_homeTableNextjsRole,
  t_homeTableTrpcName,
  t_homeTableTrpcRole,
  t_homeTableCustomI18nName,
  t_homeTableCustomI18nRole,
  t_homeTableLucideName,
  t_homeTableLucideRole,
  t_homeTableDrizzleName,
  t_homeTableDrizzleRole,
  t_homeTableMailslurpName,
  t_homeTableMailslurpRole,
  t_homeTableMysqlName,
  t_homeTableMysqlRole,
  t_homeTablePinoName,
  t_homeTablePinoRole,
  t_homeTablePlaywrightName,
  t_homeTablePlaywrightRole,
  t_homeTableResendName,
  t_homeTableResendRole,
  t_homeTableT3EnvName,
  t_homeTableT3EnvRole,
  t_homeTableTanstackName,
  t_homeTableTanstackRole,
  t_homeTableZodName,
  t_homeTableZodRole,
  t_homeTableZustandName,
  t_homeTableZustandRole,
} from "@shared/i18n/messages/t-home"

import Header from "@frontend/components/layout/header"
import Menu from "@frontend/components/navigation/menu"
import Logo from "@frontend/components/site/logo"
import useLocale from "@frontend/hooks/use-locale"
import HTML from "@frontend/components/render/html"
import Link from "next/link"
import MyButton from "@frontend/components/user-input/my-button"
import { ExternalLinkIcon } from "lucide-react"

export default function PageX() {
  const locale = useLocale()

  return (
    <>
      <Header>
        <Logo />
        <div className="size-[40px]" />
        <Menu />
      </Header>
      <main
        className="desktop-w-md:px-10 flex min-h-full w-full flex-col items-center px-5 header-based-pt"
        data-testid="main"
      >
        <div className="relative min-h-full w-[1280px] max-w-full">
          <h1 className="desktop-w-lg:text-6xl desktop-w-md:mt-20 desktop-w-md:leading-tight desktop-w-lg:leading-tight mt-10 text-center text-3xl leading-tight tablet-w:text-5xl tablet-w:leading-tight">
            <HTML>{t_homeTitle(locale)}</HTML>
          </h1>
          <h2 className="desktop-w-lg:text-5xl desktop-w-lg:leading-tight desktop-w-lg:text-10xl mt-5 text-center text-2xl tablet-w:text-3xl">
            <HTML>{t_homeSubtitle(locale)}</HTML>
          </h2>
          <img
            src="/static/illustration.png"
            alt={t_homeIllustrationAlt(locale)}
            title={t_homeIllustrationAlt(locale)}
            className="mx-auto mt-20 w-[200px]"
          />
          <div className="my-20 flex justify-center gap-5">
            <MyButton
              type="button"
              className="min-w-[0] mobile-w-sm:min-w-[160px]"
              variant="default"
            >
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2"
                title={t_homeSetup(locale)}
              >
                <HTML>{t_homeSetup(locale)}</HTML>
                <ExternalLinkIcon className="size-4" />
              </Link>
            </MyButton>
            <MyButton type="button" variant="menu">
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2"
                title={t_homeDocs(locale)}
              >
                <HTML>{t_homeDocs(locale)}</HTML>
                <ExternalLinkIcon className="size-4" />
              </Link>
            </MyButton>
          </div>
          <div className="mx-auto mb-10 max-w-[960px]">
            <h3 className="desktop-w-lg:text-4xl text-2xl tablet-w:text-3xl">
              <HTML>{t_homeWhatsInside(locale)}</HTML>
            </h3>
            <p className="text-muted desktop-w-lg:text-lg text-md mt-5 text-left">
              <HTML>{t_homeDesc1(locale)}</HTML>
            </p>
            <p className="text-muted desktop-w-lg:text-lg text-md mt-5 text-left">
              <HTML>{t_homeDesc2(locale)}</HTML>
            </p>
            <table className="mt-10 w-full">
              <thead>
                <tr className="border-primary border-b">
                  <th className="w-[50%] p-3">
                    <HTML>{t_homeToolTech(locale)}</HTML>
                  </th>
                  <th className="w-[50%] p-3">
                    <HTML>{t_homeRole(locale)}</HTML>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://expressjs.com"
                      title={t_homeTableExpressName(locale)}
                    >
                      <HTML>{t_homeTableExpressName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted text-center">
                    <HTML>{t_homeTableExpressRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://nextjs.org"
                      title={t_homeTableNextjsName(locale)}
                    >
                      <HTML>{t_homeTableNextjsName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted text-center">
                    <HTML>{t_homeTableNextjsRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://trpc.io"
                      title={t_homeTableTrpcName(locale)}
                    >
                      <HTML>{t_homeTableTrpcName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableTrpcRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableCustomI18nName(locale)}</HTML>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableCustomI18nRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://lucide.dev/guide/packages/lucide-react"
                      title={t_homeTableLucideName(locale)}
                    >
                      <HTML>{t_homeTableLucideName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableLucideRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://orm.drizzle.team"
                      title={t_homeTableDrizzleName(locale)}
                    >
                      <HTML>{t_homeTableDrizzleName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableDrizzleRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://mailslurp.com"
                      title={t_homeTableMailslurpName(locale)}
                    >
                      <HTML>{t_homeTableMailslurpName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableMailslurpRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://www.mysql.com"
                      title={t_homeTableMysqlName(locale)}
                    >
                      <HTML>{t_homeTableMysqlName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableMysqlRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://getpino.io"
                      title={t_homeTablePinoName(locale)}
                    >
                      <HTML>{t_homeTablePinoName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTablePinoRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://playwright.dev"
                      title={t_homeTablePlaywrightName(locale)}
                    >
                      <HTML>{t_homeTablePlaywrightName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTablePlaywrightRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://resend.com"
                      title={t_homeTableResendName(locale)}
                    >
                      <HTML>{t_homeTableResendName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableResendRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://env.t3.gg"
                      title={t_homeTableT3EnvName(locale)}
                    >
                      <HTML>{t_homeTableT3EnvName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableT3EnvRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://tanstack.com/query"
                      title={t_homeTableTanstackName(locale)}
                    >
                      <HTML>{t_homeTableTanstackName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableTanstackRole(locale)}</HTML>
                  </td>
                </tr>
                <tr className="border-primary border-b">
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://zod.dev"
                      title={t_homeTableZodName(locale)}
                    >
                      <HTML>{t_homeTableZodName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableZodRole(locale)}</HTML>
                  </td>
                </tr>
                <tr>
                  <td className="p-3 text-center">
                    <Link
                      className="text-muted hover:text-primary hover:underline"
                      target="_blank"
                      href="https://zustand-demo.pmnd.rs"
                      title={t_homeTableZustandName(locale)}
                    >
                      <HTML>{t_homeTableZustandName(locale)}</HTML>
                    </Link>
                  </td>
                  <td className="text-muted p-3 text-center">
                    <HTML>{t_homeTableZustandRole(locale)}</HTML>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </>
  )
}
