import { router } from "./router"
import * as TanStackQueryProvider from './integrations/tanstack-query/root-provider.tsx'
import { RouterProvider } from "@tanstack/react-router"
import { useAuthStore } from "./features/auth/stores"
import { createHead, UnheadProvider } from '@unhead/react/client'
import { useResetSessionStore } from "./features/auth/stores/session.ts"
import { ThemeProvider } from "./core/components/theme-provider.tsx"

export const InnerApp = () => {
  const auth = useAuthStore()
  const session = useResetSessionStore()
  const head = createHead()

  return (
    <TanStackQueryProvider.Provider>
      <UnheadProvider head={head}>
        <ThemeProvider>
          <RouterProvider router={router} context={{ auth, session }} />
        </ThemeProvider>
      </UnheadProvider>
    </TanStackQueryProvider.Provider>
  )
}
