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
          <img
            src="/static/illustration.png"
            alt={t_homeIllustrationAlt(locale)}
            title={t_homeIllustrationAlt(locale)}
            className="mx-auto w-[500px]"
          />
          <h1
            className="desktop-w-lg:text-6xl desktop-w-md:mt-10 desktop-w-md:leading-tight desktop-w-lg:leading-tight mt-10 text-center text-3xl leading-tight tablet-w:text-5xl tablet-w:leading-tight">
            <HTML>{t_homeTitle(locale)}</HTML>
          </h1>
          <h2
            className="desktop-w-lg:text-5xl desktop-w-lg:leading-tight desktop-w-lg:text-10xl mt-5 text-center text-2xl tablet-w:text-3xl">
            <HTML>{t_homeSubtitle(locale)}</HTML>
          </h2>
          <div className="my-16 flex justify-center gap-5">
            <MyButton
              type="button"
              className="min-w-[0] mobile-w-sm:min-w-[160px] px-0"
              variant="default"
            >
              <Link
                href="https://ironexdev.github.io/ent-stack-documentation/ent-stack/setup"
                target="_blank"
                className="flex items-center gap-2 h-full w-full justify-center"
                title={t_homeSetup(locale)}
              >
                <HTML>{t_homeSetup(locale)}</HTML>
                <ExternalLinkIcon className="size-4"/>
              </Link>
            </MyButton>
            <MyButton type="button" variant="menu" className="px-0 w-[200px]">
              <Link
                href="https://ironexdev.github.io/ent-stack-documentation/ent-stack/documentation"
                target="_blank"
                className="flex items-center gap-2 h-full w-full justify-center"
                title={t_homeDocs(locale)}
              >
                <HTML>{t_homeDocs(locale)}</HTML>
                <ExternalLinkIcon className="size-4"/>
              </Link>
            </MyButton>
          </div>
        </div>
      </main>
    </>
  )
}
