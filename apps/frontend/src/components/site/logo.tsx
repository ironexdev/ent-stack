import { cn } from "@frontend/lib/utils"
import NavLink from "@frontend/components/navigation/nav-link"

export default function Logo({ className }: { className?: string }) {
  return (
    <NavLink
      data-testid="logo"
      href="/"
      className={cn("flex h-[25px] items-center justify-center", className)}
    >
      <div className="mr-2 text-xl">ENT</div>
      <img
        src="/static/logo.png"
        alt="Logo"
        className="max-h-full max-w-full"
      />
    </NavLink>
  )
}
