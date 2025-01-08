"use client"

import { useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ToastEnum } from "@frontend/enums/toast-enum"
import { useToast } from "@frontend/hooks/use-toast"
import { type LocaleType } from "@shared/i18n/t"

export default function QueryToast({ locale }: { locale: LocaleType }) {
  const toast = useToast({ locale })
  const searchParams = useSearchParams()
  const base64ToastMessage = searchParams.get("toast")
  const toastType = searchParams.get("toastType")

  useEffect(() => {
    if (typeof window !== "undefined" && base64ToastMessage) {
      const toastMessage = decodeURIComponent(atob(base64ToastMessage))

      switch (toastType) {
        case ToastEnum.SUCCESS:
          toast.success(toastMessage)
          break
        case ToastEnum.ERROR:
          toast.error(toastMessage)
          break
        case ToastEnum.INFO:
          toast.info(toastMessage)
          break
        case ToastEnum.WARNING:
          toast.warning(toastMessage)
          break
        default:
          toast.info(toastMessage) // Default to info if no type is provided
          break
      }

      // Remove the search params from the URL after displaying the toast
      const currentUrl = new URL(window.location.href)
      currentUrl.searchParams.delete("toast")
      currentUrl.searchParams.delete("toastType")
      window.history.replaceState(null, "", currentUrl.toString())
    }
  }, [searchParams])

  return null // This component does not render anything visible
}
