import { createTRPCClient, httpBatchLink } from "@trpc/client"
import type { AppRouterType } from "@backend/api/trpc/root"
import SuperJSON from "superjson"
import { LocaleType } from "@shared/i18n/t"
import { RequestHeaderEnum } from "@shared/enums/request-header-enum"
import { v4 as uuidv4 } from "uuid"
import { clientEnv } from "@frontend/env/client-env"

// Used for server-to-server communication (middleware/RSC)
export default function trpcClient(locale: LocaleType) {
  return createTRPCClient<AppRouterType>({
    links: [
      httpBatchLink({
        transformer: SuperJSON,
        url: `${clientEnv.NEXT_PUBLIC_BACKEND_URL}/trpc`,
        headers: {
          [RequestHeaderEnum.ACCEPT_LANGUAGE]: locale,
          [RequestHeaderEnum.REQUEST_ID]: uuidv4(),
        },
        fetch: async (url, options): Promise<Response> => {
          return await fetch(url, {
            ...options,
            // This client is to be used for requesting public resources from server (middleware/RSC)
            // Since it is server-to-server communication, the API server can't set cookies
            // It is also not possible to set cookies in RSC (https://www.youtube.com/watch?v=ejO8V5vt-7I)
            // It is possible to set cookies in middleware - this should be done by extracting value from response body and then setting it to the middleware NextResponse
            // There is not much benefit to calling protected resources from server (middleware/RSC) since they are not cached anyway
            credentials: "omit",
          })
        },
      }),
    ],
  })
}
