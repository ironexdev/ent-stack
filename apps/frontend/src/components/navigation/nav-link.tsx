"use client"

import { cn } from "@frontend/lib/utils"
import Link from "next/link"
import type { ComponentProps } from "react"
import useLocale from "@frontend/hooks/use-locale"
import { getLocalizedPathname } from "@frontend/lib/navigation"
import useRouteName from "@frontend/hooks/use-route-name"

type NavLinkType = ComponentProps<typeof Link> & {
  activeClassName?: string
}

export default function NavLink({
  href,
  activeClassName,
  children,
  ...props
}: NavLinkType) {
  const isActive = href === useRouteName()
  const className = cn(
    "select-none text-primary hover:underline",
    props.className,
    {
      [activeClassName ?? ""]: isActive,
    },
  )
  const locale = useLocale()
  const localizedHref =
    typeof href === "string"
      ? `${getLocalizedPathname(locale, href)}`
      : {
          ...href,
          pathname: `${getLocalizedPathname(locale, href.pathname!)}`,
        }

  return (
    <Link href={localizedHref} {...props} className={className}>
      {children}
    </Link>
  )
}
