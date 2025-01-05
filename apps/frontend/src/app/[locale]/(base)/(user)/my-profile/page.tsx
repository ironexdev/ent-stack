import LogoutButton from "@frontend/components/auth/logout-button"
import Header from "@frontend/components/layout/header"
import Menu from "@frontend/components/navigation/menu"
import { t_myProfileTitle } from "@shared/i18n/messages/t-my-profile"
import { LocaleType } from "@shared/i18n/t"

export default async function MyProfilePage({
  params,
}: {
  params: { locale: LocaleType }
}) {
  const { locale } = await params

  return (
    <>
      <Header>
        <h1 className="text-secondary flex h-full items-center text-sm font-medium uppercase">
          {t_myProfileTitle(locale)}
        </h1>
        <Menu />
      </Header>
      <main className="header-based-pt flex h-full w-full justify-center">
        <div>
          <LogoutButton />
        </div>
      </main>
    </>
  )
}
