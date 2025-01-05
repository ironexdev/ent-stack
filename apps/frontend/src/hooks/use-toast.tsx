import { toast } from "sonner"
import { LocaleType } from "@shared/i18n/t"
import Notification from "@frontend/components/toast/notification"
import { ReactNode } from "react"
import { Ban, Check, CircleAlert, Info } from "lucide-react"
import {
  t_toastError,
  t_toastInfo,
  t_toastSuccess,
  t_toastWarning,
} from "@shared/i18n/messages/t-toast"
import FrontendConfig from "@frontend/config/frontend-config"

export function useToast({ locale }: { locale: LocaleType }) {
  const defaultDuration = FrontendConfig.defaultToastDuration

  function error(message: string, duration?: number) {
    duration = duration ?? defaultDuration

    toast.custom(
      (id) => {
        return (
          <Notification
            id={id}
            duration={duration}
            message={message}
            icon={<Ban size={16} className="my-[2px]" />}
            className="bg-toast-error"
            label={t_toastError(locale)}
          />
        )
      },
      { duration },
    )
  }

  function info(message: string | ReactNode, duration?: number) {
    duration = duration ?? defaultDuration

    toast.custom(
      (id) => {
        return (
          <Notification
            id={id}
            duration={duration}
            message={message}
            icon={<Info size={16} className="my-[2px]" />}
            className="bg-toast-info"
            label={t_toastInfo(locale)}
          />
        )
      },
      { duration },
    )
  }

  function success(message: string, duration?: number) {
    duration = duration ?? defaultDuration

    toast.custom(
      (id) => {
        return (
          <Notification
            id={id}
            duration={duration}
            message={message}
            icon={<Check size={16} className="my-[2px]" />}
            className="bg-toast-success"
            label={t_toastSuccess(locale)}
          />
        )
      },
      { duration },
    )
  }

  function warning(message: string, duration?: number) {
    duration = duration ?? defaultDuration

    toast.custom(
      (id) => {
        return (
          <Notification
            id={id}
            duration={duration}
            message={message}
            icon={<CircleAlert size={16} className="my-[2px]" />}
            className="bg-toast-warning"
            label={t_toastWarning(locale)}
          />
        )
      },
      { duration },
    )
  }

  return {
    error,
    info,
    success,
    warning,
  }
}
