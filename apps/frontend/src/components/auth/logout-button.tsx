"use client"

import { trpcClientReact } from "@frontend/trpc/trpc-client-react"
import { t_logout, t_logoutComplete } from "@shared/i18n/messages/t-auth"
import useLocale from "@frontend/hooks/use-locale"
import MyButton from "@frontend/components/user-input/my-button"
import { LogOut } from "lucide-react"
import { cn, toastQueryParams } from "@frontend/lib/utils"
import { ToastEnum } from "@frontend/enums/toast-enum"
import LoaderCircle from "@frontend/components/status-indicator/loader-circle"
import { useState } from "react"
import { getLocalizedPathname } from "@frontend/lib/navigation"

export default function LogoutButton({ className }: { className?: string }) {
  // Async state
  const logoutMutation = trpcClientReact.refreshTokens.delete.useMutation({
    meta: { skipInvalidation: true },
  })
  // Local state
  const [isLoading, setIsLoading] = useState(false)
  // Utils
  const locale = useLocale()

  return (
    <MyButton
      className={cn("", className)}
      onClick={() => logout()}
      variant="menu"
      size="menu"
    >
      {isLoading ? <LoaderCircle /> : <LogOut size="20" />}
      <span className="relative ml-3">{t_logout(locale)}</span>
    </MyButton>
  )

  function logout() {
    setIsLoading(true)

    logoutMutation.mutate(void 0, {
      onError: () => {
        setIsLoading(false)

        // Deleting refresh token failed, but this should never happen unless someone is messing with the cookies
        // This error should be logged by the server
      },
      onSuccess: async () => {
        // Redirect with reload to reset app state
        location.href = getLocalizedPathname(
          locale,
          "/login",
          toastQueryParams(t_logoutComplete(locale), ToastEnum.INFO),
        )
      },
    })
  }
}
