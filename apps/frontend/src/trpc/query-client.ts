import { TRPCClientError } from "@trpc/client"
import { createQueryClient as createBaseQueryClient } from "@shared/trpc/create-query-client"
import {
  t_clientError,
  t_serverError,
} from "@shared/i18n/messages/common/t-error"
import { type LocaleType } from "@shared/i18n/t"
import { useToast } from "@frontend/hooks/use-toast"
import { TRPCErrorEnum } from "@shared/enums/trpc-error-enum"
import { useRouter } from "next/navigation"
import { toastQueryParams } from "@frontend/lib/utils"
import { ToastEnum } from "@frontend/enums/toast-enum"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { clientEnv } from "@frontend/env/client-env"
import { getLocalizedPathname } from "@frontend/lib/navigation"
import { handleTRPCError } from "@frontend/trpc/trpc-error-handler"

export default function createQueryClient(
  locale: LocaleType,
  toast: ReturnType<typeof useToast>,
  router: ReturnType<typeof useRouter>,
) {
  const queryClient = createBaseQueryClient({
    onQueryError(error) {
      if (error instanceof TRPCClientError) {
        handleTRPCError(error, locale, {
          onTRPCServerError: (message) => {
            if (
              clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
            ) {
              toast.error(t_serverError(locale))
            } else {
              toast.error(message)
            }
          },
          onClientError: (message) => {
            if (
              clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
            ) {
              toast.error(t_clientError(locale))
            } else {
              toast.error(message)
            }
          },
          onUserError: async (message, code) => {
            if (code === TRPCErrorEnum.UNAUTHORIZED) {
              const localizedPathname = getLocalizedPathname(
                locale,
                "/login",
                toastQueryParams(message, ToastEnum.ERROR),
              )
              router.push(localizedPathname)
            }
          },
        })
      }
    },
    onMutationError(error) {
      if (error instanceof TRPCClientError) {
        handleTRPCError(error, locale, {
          onTRPCServerError: (message) => {
            if (
              clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
            ) {
              toast.error(t_serverError(locale))
            } else {
              toast.error(message)
            }
          },
          onClientError: (message) => {
            if (
              clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
            ) {
              toast.error(t_clientError(locale))
            } else {
              toast.error(message)
            }
          },
          onUserError: async (message, code) => {
            if (code === TRPCErrorEnum.UNAUTHORIZED) {
              const localizedPathname = getLocalizedPathname(
                locale,
                "/login",
                toastQueryParams(message, ToastEnum.ERROR),
              )
              router.push(localizedPathname)
            }
          },
        })
      }
    },
    onMutationSuccess(data, variables, context, mutation) {
      if (!mutation.options.meta?.skipInvalidation) {
        queryClient.invalidateQueries()
      }
    },
  })

  return queryClient
}
