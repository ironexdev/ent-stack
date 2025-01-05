import { createStore } from "zustand/vanilla"
import { useContext } from "react"
import { useStore } from "zustand"
import { UserStoreContext } from "@frontend/components/providers/user-store-provider"
import { SessionType } from "@shared/types/session-type"

export type UserStoreType = {
  app: {
    user: {
      session: SessionType | null
    }
    actions: {
      setSession: (session: SessionType | null) => void
    }
  }
}

// Function declaration for creating the app store
export function createUserStore(initialSession: SessionType | null) {
  return createStore<UserStoreType>()((set, get, store) => ({
    app: {
      user: {
        session: initialSession,
      },
      actions: {
        setSession: (session: SessionType | null) => {
          set((state) => ({
            app: {
              ...state.app,
              user: {
                session,
              },
            },
          }))
        },
      },
    },
  }))
}

function useUserStore<T>(selector: (store: UserStoreType) => T): T {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error("useUserStore must be used within UserStoreProvider")
  }

  return useStore(userStoreContext, selector)
}

export function useUserActions() {
  return useUserStore((state) => state.app.actions)
}

export function useUserSession() {
  return useUserStore((state) => state.app.user.session)
}

export function useIsUserAuthenticated() {
  return useUserStore((state) => !!state.app.user.session)
}
