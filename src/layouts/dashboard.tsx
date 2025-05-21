import { SidebarProvider } from "@/core/components/ui/sidebar"
import { DashboardSidebar } from "@/features/users/components/dashboard-sidebar"
import type React from "react"

export const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="flex flex-col py-5 w-[700px] mx-auto gap-4">
        {children}
      </main>
    </SidebarProvider>
  )
}
