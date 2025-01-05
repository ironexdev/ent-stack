"use client"

import { createContext, type ReactNode, useState } from "react"
import { createAuthStore } from "@frontend/stores/auth-store"

export type AuthStoreApi = ReturnType<typeof createAuthStore>

export const AuthStoreContext = createContext<AuthStoreApi | null>(null)

export type AuthStoreProviderProps = {
  children: ReactNode
}

export function AuthStoreProvider({ children }: AuthStoreProviderProps) {
  const [store] = useState(() => createAuthStore())

  return (
    <AuthStoreContext.Provider value={store}>
      {children}
    </AuthStoreContext.Provider>
  )
}
