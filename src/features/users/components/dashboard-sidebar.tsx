import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/core/components/ui/sidebar"
import { useAuthStore } from "@/features/auth/stores"
import { Calendar, Cog, Crown, LogOut, SquareActivity } from "lucide-react"

export const DashboardSidebar = () => {
  const user = useAuthStore((select) => select.user)
  const isAdmin = useAuthStore((select) => select.isAdmin)

  const links = [
    {
      title: 'Dashboard',
      icon: <SquareActivity />
    },
    {
      title: 'Events',
      icon: <Calendar />
    },
    {
      title: 'Settings',
      icon: <Cog />
    }
  ]

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {links.map((link, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton>
                    {link.icon}
                    <span>{link.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          {isAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Crown />
                Go to admin panel
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton>
              <LogOut />
              Sign out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}