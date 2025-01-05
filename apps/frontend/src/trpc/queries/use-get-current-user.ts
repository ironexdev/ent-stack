import { trpcClientReact } from "@frontend/trpc/trpc-client-react"
import { SecondsEnum } from "@shared/enums/seconds-enum"

export default function useGetUser() {
  return trpcClientReact.users.getCurrent.useQuery(undefined, {
    staleTime: SecondsEnum.FIFTEEN_MINUTES * 1000,
    gcTime: SecondsEnum.FIVE_MINUTES * 1000,
  })
}
