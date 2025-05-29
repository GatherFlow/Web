import Logo from '@/assets/logo.svg?react';
import { Avatar, AvatarFallback, AvatarImage } from "@/core/components/ui/avatar";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/core/components/ui/sidebar";
import type { HealthStatus } from '@/core/types';
import { useLogout } from '@/features/auth/mutations/useLogout';
import { useAuthStore } from '@/features/auth/stores';
import { Link } from "@tanstack/react-router";
import { ArrowLeft, LayoutDashboard, LogOut, UsersRound } from "lucide-react";
import React from "react";
import { useTranslation } from 'react-i18next';

interface AdminStatusProps {
  healthStatus: HealthStatus
}

export const AdminSidebar: React.FC<AdminStatusProps> = ({ healthStatus }) => {
  const isAdmin = useAuthStore((select) => select.isAdmin)
  const user = useAuthStore((select) => select.user)

  const { t } = useTranslation()
  const { mutate } = useLogout()

  const links = [
    {
      icon: <LayoutDashboard />,
      to: '/admin'
    },
    {
      icon: <UsersRound />,
      to: '/admin/users'
    }
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-6 py-3">
        <Link to="/admin" className="flex items-center gap-2">
          <Logo className="size-8" />
          <span className="text-xl font-bold">GatherFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-4 py-6 space-y-5">
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
          <div className="rounded-lg bg-red-50 dark:bg-red-950/20 p-3 border border-red-200 dark:border-red-800">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium">{t('admin.sidebar.status')}</span>
                <span className="text-xs bg-green-200 text-green-800 px-1.5 py-0.5 rounded-full">{healthStatus.message}</span>
              </div>
            </div>
        </div>
        <SidebarMenu className='px-2'>
          {links.map((link, i) => (
            <SidebarMenuItem key={i}>
              <SidebarMenuButton asChild>
                <Link to={link.to}>
                  {link.icon}
                  <span>{t(`admin.sidebar.items.${i}`)}</span>
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
                <Link to="/dashboard">
                  <ArrowLeft />
                  {t('admin.sidebar.to-dashboard')}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )}
          <SidebarMenuItem>
            <SidebarMenuButton onClick={() => mutate()}>
              <LogOut />
              {t('auth.sign-out')}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}