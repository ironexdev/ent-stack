import React, { useState } from "react"
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query"
import { httpBatchLink } from "@trpc/client"
import { createTRPCReact } from "@trpc/react-query"
import SuperJSON from "superjson"
import type { AppRouterType } from "@backend/api/trpc/root"
import { RequestHeaderEnum } from "@shared/enums/request-header-enum"
import { v4 as uuidv4 } from "uuid"
import { env } from "@mobile/env"
import createQueryClient from "@mobile/trpc/query-client"

let cachedQueryClient: QueryClient | null = null

function getQueryClient() {
  if (!cachedQueryClient) {
    cachedQueryClient = createQueryClient()
  }
  return cachedQueryClient
}

export const trpcClientReact = createTRPCReact<AppRouterType>()

type TRPCReactProviderProps = {
  children: React.ReactNode
}

export function TRPCReactProvider({ children }: TRPCReactProviderProps) {
  const queryClient = getQueryClient()

  const [trpcClient] = useState(() =>
    trpcClientReact.createClient({
      links: [
        httpBatchLink({
          transformer: SuperJSON,
          url: `${env.EXPO_PUBLIC_BACKEND_URL}/trpc`,
          headers() {
            const headers = new Headers()
            headers.set(RequestHeaderEnum.ACCEPT_LANGUAGE, "en")
            headers.set(RequestHeaderEnum.REQUEST_ID, uuidv4())
            return headers
          },
          fetch: async (url, options) => {
            return fetch(url, {
              ...options,
              credentials: "include",
            })
          },
        }),
      ],
    }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <trpcClientReact.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpcClientReact.Provider>
    </QueryClientProvider>
  )
}
