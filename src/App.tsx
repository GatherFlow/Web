import { router } from "./router"
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
import { RouterProvider } from "@tanstack/react-router"
import { useAuthStore } from "./features/auth/stores"

export const InnerApp = () => {
  const auth = useAuthStore()

  return (
    <TanStackQueryProvider.Provider>
      <RouterProvider router={router} context={{ auth }} />
    </TanStackQueryProvider.Provider>
  )
}
