import type { AuthContext, ResetSessionContext } from '@/features/auth/types'
import type { QueryClient } from '@tanstack/react-query'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import React from 'react'
import TanStackQueryLayout from '../integrations/tanstack-query/layout.tsx'

interface MyRouterContext {
  queryClient: QueryClient
  auth: AuthContext
  session: ResetSessionContext
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
