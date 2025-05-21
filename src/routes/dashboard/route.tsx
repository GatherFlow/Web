import { DashboardLayout } from '@/layouts/dashboard'
import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => {
    const { isAuthorized } = context.auth

    if (!isAuthorized) {
      return redirect({ to: '/' })
    }
  },
  component: Page,
})

function Page() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  )
}
