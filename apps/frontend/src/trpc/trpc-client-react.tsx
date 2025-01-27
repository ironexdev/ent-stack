import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import { ReactNode, useState } from "react"
import SuperJSON from "superjson"
import type { AppRouterType } from "@backend/api/trpc/root"
import { useToast } from "@frontend/hooks/use-toast"
import { type LocaleType } from "@shared/i18n/t"
import { useRouter } from "next/navigation"
import useLocale from "@frontend/hooks/use-locale"
import { RequestHeaderEnum } from "@shared/enums/request-header-enum"
import { v4 as uuidv4 } from "uuid"
import { clientEnv } from "@frontend/env/client-env"
import createQueryClient from "@frontend/trpc/query-client"

let cachedQueryClient: QueryClient | null = null

function getQueryClient(
  locale: LocaleType,
  toast: ReturnType<typeof useToast>,
  router: ReturnType<typeof useRouter>,
) {
  if (typeof window === "undefined") {
    // SSR or SSG: always create a fresh instance
    return createQueryClient(locale, toast, router)
  }
  // Use cached query client to keep the same query client when in browser
  return (cachedQueryClient ??= createQueryClient(locale, toast, router))
}

// Used for client-to-server communication
export const trpcClientReact = createTRPCReact<AppRouterType>()

export function TRPCReactProvider(props: { children: ReactNode }) {
  const locale = useLocale()
  const toast = useToast({ locale })
  const router = useRouter()

  const queryClient = getQueryClient(locale, toast, router)

  const [trpcClient] = useState(() =>
    trpcClientReact.createClient({
      links: [
        // There is an issue when setting server-side cookies with unstable_httpBatchStreamLink
        // https://github.com/trpc/trpc/discussions/4800
        httpBatchLink({
          url: `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/trpc`,
          transformer: SuperJSON,
          headers: () => {
            const headers = new Headers()
            headers.set(RequestHeaderEnum.ACCEPT_LANGUAGE, locale)
            headers.set(RequestHeaderEnum.REQUEST_ID, uuidv4())
            return headers
          },
          fetch: async (url, options) =>
            fetch(url, {
              ...options,
              credentials: "include",
            }),
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <trpcClientReact.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </trpcClientReact.Provider>
    </QueryClientProvider>
  )
}
