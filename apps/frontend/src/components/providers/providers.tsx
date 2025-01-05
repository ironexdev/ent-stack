"use client"

import { TRPCReactProvider } from "@frontend/trpc/trpc-client-react"
import { ReactNode } from "react"
import { UserStoreProvider } from "@frontend/components/providers/user-store-provider"
import { SessionType } from "@shared/types/session-type"

export default function Providers({
  children,
  session,
}: {
  children: ReactNode
  session: SessionType | null
}) {
  return (
    <TRPCReactProvider>
      <UserStoreProvider session={session}>{children}</UserStoreProvider>
    </TRPCReactProvider>
  )
}
