import { cn } from "@frontend/lib/utils"
import { ReactNode } from "react"

export default function Header({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <header
      data-testid="header"
      className={cn(
        "fixed left-0 right-0 top-0 z-30 mx-auto flex w-full max-w-one-col justify-center bg-primary header-based-h border-fade-header",
        className,
      )}
    >
      <div className="relative flex w-full max-w-full items-center justify-between px-5">
        <>{children}</>
      </div>
    </header>
  )
}
