"use client"

import { createContext, useState, ReactNode } from "react"
import { SessionType } from "@shared/types/session-type"
import { createUserStore } from "@frontend/stores/user-store"

type UserStoreApiType = ReturnType<typeof createUserStore>

export const UserStoreContext = createContext<UserStoreApiType | null>(null)

export function UserStoreProvider({
  children,
  session,
}: {
  children: ReactNode
  session: SessionType | null
}) {
  const [store] = useState(() => createUserStore(session))

  return (
    <UserStoreContext.Provider value={store}>
      {children}
    </UserStoreContext.Provider>
  )
}
