import { SidebarProvider } from '@/core/components/ui/sidebar'
import { AdminSidebar } from '@/features/admin/components/admin-sidebar'
import { systemStatusOptions } from '@/features/admin/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/admin')({
  loader: ({ context: { queryClient }}) => queryClient.ensureQueryData(systemStatusOptions()),
  component: RouteComponent,
})

function RouteComponent() {
  const statusQuery = useSuspenseQuery(systemStatusOptions())
  
  return (
    <SidebarProvider>
      <AdminSidebar healthStatus={statusQuery.data} />
      <main className="flex flex-col py-5 w-[700px] mx-auto gap-4">
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
