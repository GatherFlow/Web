import Logo from '@/assets/logo.svg?react'
import { LanguageDropdown } from '@/core/components/promo-page/language-dropdown'
import { Avatar, AvatarFallback, AvatarImage } from '@/core/components/ui/avatar'
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/core/components/ui/sidebar"
import { useLogout } from '@/features/auth/mutations/useLogout'
import { useAuthStore } from "@/features/auth/stores"
import { Link } from "@tanstack/react-router"
import { Calendar, Crown, LayoutDashboard, LogOut, Shield, UserRound } from "lucide-react"
import { useTranslation } from 'react-i18next'

export const DashboardSidebar = () => {
  const isAdmin = useAuthStore((select) => select.isAdmin)
  const user = useAuthStore((select) => select.user)

  const { t } = useTranslation()
  const { mutate } = useLogout()

  const links = [
    {
      icon: <LayoutDashboard />,
      to: '/dashboard'
    },
    {
      icon: <Calendar />,
      to: '/dashboard/events'
    },
    {
      icon: <Shield />,
      to: '/dashboard/privacy'
    },
    {
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
            {user?.avatar !== '/' ? (
              <Avatar className='size-10'>
                <AvatarImage src={user?.avatar} />
              </Avatar>
            ) : (
              <Avatar className='size-10'>
                <AvatarFallback>{user?.firstName[0]}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
        <SidebarMenu className='px-2'>
          {links.map((link, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton asChild>
                <Link to={link.to}>
                  {link.icon}
                  <span>{t(`dashboard.sidebar.items.${i}`)}</span>
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
              <SidebarMenuButton asChild>
                <Link to='/admin'>
                  <Crown />
                  {t('dashboard.sidebar.to-admin-panel')}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <div className='inline-flex gap-3 w-full mt-4'>
            <LanguageDropdown />
            <SidebarMenuItem className='w-full'>
              <SidebarMenuButton onClick={() => mutate()}>
                <LogOut />
                {t('auth.sign-out')}
              </SidebarMenuButton>
            </SidebarMenuItem>
          </div>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}