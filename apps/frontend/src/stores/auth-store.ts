import { createStore } from "zustand/vanilla"
import { useContext } from "react"
import { useStore } from "zustand"
import { AuthStoreContext } from "@frontend/components/providers/auth-store-provider"

export type AuthStoreType = {
  email: string | null
  actions: {
    setEmail: (email: string) => void
  }
}

// Function declaration for creating the auth store
export function createAuthStore() {
  return createStore<AuthStoreType>()((set, get, store) => ({
    email: null,
    actions: {
      setEmail: (email: string) => {
        set({ email })
      },
    },
  }))
}

function useAuthStore<T>(selector: (store: AuthStoreType) => T): T {
  const authStoreContext = useContext(AuthStoreContext)

  if (!authStoreContext) {
    throw new Error("useAuthStore must be used within AuthStoreProvider")
  }

  return useStore(authStoreContext, selector)
}

export function useAuthActions() {
  return useAuthStore((state) => state.actions)
}

export function useAuthEmail() {
  return useAuthStore((state) => state.email)
}
