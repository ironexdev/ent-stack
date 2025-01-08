"use client"

import { useRouter } from "next/navigation"
import { type LocaleType } from "@shared/i18n/t"
import { i18n } from "@frontend/lib/i18n"
import useLocale from "@frontend/hooks/use-locale"
import MySelect from "@frontend/components/user-input/my-select"
import { t_selectPlaceholder } from "@shared/i18n/messages/common/t-input"
import useRouteName from "@frontend/hooks/use-route-name"
import { getLocalizedPathname } from "@frontend/lib/navigation"

export default function LanguageSwitcher({
  className,
}: {
  className?: string
}) {
  const currentLocale = useLocale()
  const currentRouteName = useRouteName()
  const router = useRouter()

  return (
    <div className={className}>
      <MySelect
        selectedOption={{
          value: currentLocale,
          label: i18n.languages[currentLocale],
        }}
        placeholder={t_selectPlaceholder(currentLocale)}
        options={items()}
        onChange={(selectedOption) => {
          if (selectedOption) {
            changeLocale(selectedOption.value as LocaleType)
          }
        }}
      />
    </div>
  )

  function changeLocale(newLocale: LocaleType) {
    router.replace(getLocalizedPathname(newLocale, currentRouteName))
  }

  function items() {
    return i18n.locales.map((locale) => ({
      label: i18n.languages[locale],
      value: locale,
    }))
  }
}
