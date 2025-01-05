import { usePathname } from "next/navigation"
import { indexedRoutes } from "@frontend/lib/routes"

export default function useRouteName() {
  const pathname = usePathname()

  return indexedRoutes[pathname]!
}
