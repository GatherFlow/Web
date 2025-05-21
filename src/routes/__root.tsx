import type { AuthContext } from '@/features/auth/types'
import type { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import React from 'react'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthContext
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <React.Fragment>
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    
      <TanStackQueryLayout />
    </React.Fragment>
  ),
})
