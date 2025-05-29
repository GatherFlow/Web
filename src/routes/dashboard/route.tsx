import { SidebarProvider } from '@/core/components/ui/sidebar'
import { isAuthorized } from '@/core/middlewares/isAuthorized'
import { DashboardSidebar } from '@/features/users/components/dashboard-sidebar'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  beforeLoad: ({ context }) => isAuthorized(context.auth),
  component: Page,
})

function Page() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col py-5 w-[700px] mx-auto gap-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
