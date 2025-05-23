import Logo from '@/assets/logo.svg?react'
import { Avatar, AvatarFallback } from '@/core/components/ui/avatar'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/core/components/ui/sidebar"
import { useLogout } from '@/features/auth/mutations/useLogout'
import { useAuthStore } from "@/features/auth/stores"
import { Link } from "@tanstack/react-router"
import { Calendar, Crown, LayoutDashboard, LogOut, Shield, UserRound } from "lucide-react"

export const DashboardSidebar = () => {
  const isAdmin = useAuthStore((select) => select.isAdmin)
  const user = useAuthStore((select) => select.user)

  const { mutate } = useLogout()

  const links = [
    {
      title: 'Dashboard',
      icon: <LayoutDashboard />,
      to: '/dashboard'
    },
    {
      title: 'Events',
      icon: <Calendar />,
      to: '/dashboard/events'
    },
    {
      title: 'Privacy',
      icon: <Shield />,
      to: '/dashboard/privacy'
    },
    {
      title: 'Profile',
      icon: <UserRound />,
      to: '/dashboard/profile'
    }
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-3">
        <Link to="/dashboard" className="flex items-center gap-2">
          <Logo className="size-8" />
          <span className="text-xl font-bold">GatherFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-6">
          <div className="flex items-center gap-3">
            <Avatar className='size-10'>
              <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
        <SidebarMenu>
          {links.map((link, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton asChild>
                <Link to={link.to}>
                  {link.icon}
                  <span>{link.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className='border-t p-4'>
        <SidebarMenu className="pb-4">
          {isAdmin && (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Crown />
                Go to admin panel
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => mutate()}>
              <LogOut />
              Sign out
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}