import { isAuthorized } from '@/core/middlewares/isAuthorized'
import { DashboardLayout } from '@/layouts/dashboard'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => isAuthorized(context.auth),
  component: Page,
})

function Page() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
