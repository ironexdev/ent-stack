import { AuthStoreProvider } from "@frontend/components/providers/auth-store-provider"
import { ReactNode } from "react"

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AuthStoreProvider>{children}</AuthStoreProvider>
    </>
  )
}
