import { TRPCClientError } from "@trpc/client"
import { createQueryClient as createBaseQueryClient } from "@shared/trpc/create-query-client"
import { TRPCErrorEnum } from "@shared/enums/trpc-error-enum"
import { handleTRPCError } from "@mobile/trpc/trpc-error-handler"

export default function createQueryClient() {
  const queryClient = createBaseQueryClient({
    onQueryError(error) {
      if (error instanceof TRPCClientError) {
        handleTRPCError(error, "en", {
          onTRPCServerError: (message) => {
            console.error("[Expo: Server Error]", message)
          },
          onClientError: (message) => {
            console.error("[Expo: Client Error]", message)
          },
          onUserError: async (message, code) => {
            if (code === TRPCErrorEnum.UNAUTHORIZED) {
              // If you want to navigate, you can do so here.
              const localizedPathname = "xy" // TODO Implement getLocalizedPathname
              console.log("[Expo: Unauthorized]", localizedPathname)
            }
          },
        })
      }
    },
    onMutationError(error) {
      if (error instanceof TRPCClientError) {
        handleTRPCError(error, "en", {
          onTRPCServerError: (message) => {
            console.error("[Expo: Server Error]", message)
          },
          onClientError: (message) => {
            console.error("[Expo: Client Error]", message)
          },
          onUserError: async (message, code) => {
            if (code === TRPCErrorEnum.UNAUTHORIZED) {
              const localizedPathname = "xy" // TODO Implement getLocalizedPathname
              console.log("[Expo: Unauthorized]", localizedPathname)
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
