import Menu from "@frontend/components/navigation/menu"
import Header from "@frontend/components/layout/header"
import LoginForm from "@frontend/components/auth/login/login-form"
import Logo from "@frontend/components/site/logo"

export default function LoginPage() {
  return (
    <>
      <Header>
        <Logo />
        <div className="size-[40px]" />
        <Menu />
      </Header>
      <main className="desktop-w-md:px-10 flex min-h-full w-full flex-col items-center px-5 header-based-pt">
        <div className="min-h-10 w-full flex-grow-[1]" />
        <div className="relative min-h-full w-[480px] max-w-full">
          <LoginForm />
        </div>
        <div className="min-h-10 w-full flex-grow-[2]" />
      </main>
    </>
  )
}
