"use client"

import {
  t_homeTitle,
  t_homeSubtitle,
  t_homeSetup,
  t_homeDocs,
  t_homeIllustrationAlt,
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
        <div className="flex w-[90px] justify-between">
          <Link
            href="https://github.com/ironexdev/ent-stack"
            target="_blank"
            className="flex size-[40px] items-center justify-center"
          >
            <img
              src="/static/github-icon.png"
              alt="GitHub"
              title="GitHub"
              className="size-[24px]"
            />
          </Link>
          <Menu />
        </div>
      </Header>
      <main
        className="flex min-h-full w-full flex-col items-center px-5 header-based-pt desktop-w-md:px-10"
        data-testid="main"
      >
        <div className="relative min-h-full w-[1280px] max-w-full pt-10">
          <img
            src="/static/illustration.png"
            alt={t_homeIllustrationAlt(locale)}
            title={t_homeIllustrationAlt(locale)}
            className="mx-auto w-[500px] max-w-[90%]"
          />
          <h1 className="mt-8 text-center text-3xl leading-tight tablet-w:text-5xl tablet-w:leading-tight desktop-w-md:leading-tight desktop-w-lg:text-6xl desktop-w-lg:leading-tight">
            <HTML>{t_homeTitle(locale)}</HTML>
          </h1>
          <h2 className="desktop-w-lg:text-10xl mt-5 text-center text-2xl tablet-w:text-3xl desktop-w-lg:text-5xl desktop-w-lg:leading-tight">
            <HTML>{t_homeSubtitle(locale)}</HTML>
          </h2>
          <div className="mb-8 mt-12 flex justify-center gap-5">
            <MyButton
              type="button"
              className="min-w-[120px] px-0 mobile-w-sm:min-w-[160px]"
              variant="default"
            >
              <Link
                href="https://ironexdev.github.io/ent-stack-documentation/ent-stack/setup"
                target="_blank"
                className="flex h-full w-full items-center justify-center gap-2"
                title={t_homeSetup(locale)}
              >
                <HTML>{t_homeSetup(locale)}</HTML>
                <ExternalLinkIcon className="size-4" />
              </Link>
            </MyButton>
            <MyButton type="button" variant="menu" className="w-[200px] px-0">
              <Link
                href="https://ironexdev.github.io/ent-stack-documentation/ent-stack/documentation"
                target="_blank"
                className="flex h-full w-full items-center justify-center gap-2"
                title={t_homeDocs(locale)}
              >
                <HTML>{t_homeDocs(locale)}</HTML>
                <ExternalLinkIcon className="size-4" />
              </Link>
            </MyButton>
          </div>
        </div>
      </main>
    </>
  )
}
