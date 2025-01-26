import {
  defaultShouldDehydrateQuery,
  MutationCache,
  QueryCache,
  QueryClient,
} from "@tanstack/react-query"
import SuperJSON from "superjson"
import {
  t_clientError,
  t_serverError,
} from "@shared/i18n/messages/common/t-error"
import { type LocaleType } from "@shared/i18n/t"
import { useToast } from "@frontend/hooks/use-toast"
import { handleTRPCError } from "@frontend/trpc/trpc-error-handler"
import { TRPCClientError } from "@trpc/client"
import { TRPCErrorEnum } from "@shared/enums/trpc-error-enum"
import { useRouter } from "next/navigation"
import { toastQueryParams } from "@frontend/lib/utils"
import { ToastEnum } from "@frontend/enums/toast-enum"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { clientEnv } from "@frontend/env/client-env"
import { getLocalizedPathname } from "@frontend/lib/navigation"

export default function createQueryClient(
  locale: LocaleType,
  toast: ReturnType<typeof useToast>,
  router: ReturnType<typeof useRouter>,
) {
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error: unknown) => {
        if (error instanceof TRPCClientError) {
          handleTRPCError(error, locale, {
            onTRPCServerError: (message) => {
              // Should be logged by the server
              if (
                clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
              ) {
                toast.error(t_serverError(locale))
              } else {
                toast.error(message)
              }
            },
            onClientError: (message) => {
              // Should be logged by the server
              if (
                clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
              ) {
                toast.error(t_clientError(locale))
              } else {
                toast.error(message)
              }
            },
            onUserError: async (message, code) => {
              // Might be logged by the server (as a warning)
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
    }),
    mutationCache: new MutationCache({
      onSuccess: (data, variables, context, mutation) => {
        if (!mutation.options.meta?.skipInvalidation) {
          queryClient.invalidateQueries()
        }
      },
      onError: (error: unknown) => {
        if (error instanceof TRPCClientError) {
          handleTRPCError(error, locale, {
            onTRPCServerError: (message) => {
              // Should be logged by the server
              if (
                clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
              ) {
                toast.error(t_serverError(locale))
              } else {
                toast.error(message)
              }
            },
            onClientError: (message) => {
              // Should be logged by the server
              if (
                clientEnv.NEXT_PUBLIC_NODE_ENV !== EnvironmentEnum.DEVELOPMENT
              ) {
                toast.error(t_clientError(locale))
              } else {
                toast.error(message)
              }
            },
            onUserError: async (message, code) => {
              // Might be logged by the server (as a warning)
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
    }),
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000,
        retry: false,
      },
      mutations: {
        retry: false,
      },
      dehydrate: {
        serializeData: SuperJSON.serialize,
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
      hydrate: {
        deserializeData: SuperJSON.deserialize,
      },
    },
  })

  return queryClient
}
