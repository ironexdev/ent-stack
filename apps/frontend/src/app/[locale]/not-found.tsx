"use client"

import NotFound from "@frontend/components/site/not-found"
import { usePathname } from "next/navigation"
import useLocale from "@frontend/hooks/use-locale"

export default function LocalizedNotFoundPage() {
  const locale = useLocale()
  const pathname = usePathname()
  const handler = "app/locale/not-found.tsx"

  return (
    <div className="flex h-full flex-col items-center justify-center bg-primary text-primary">
      <NotFound locale={locale} pathname={pathname} handler={handler} />
    </div>
  )
}
