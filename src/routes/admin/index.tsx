import { Card, CardContent, CardHeader, CardTitle } from '@/core/components/ui/card'
import { formatUptime } from '@/core/utils'
import { systemStatusOptions } from '@/features/admin/queries'
import { getTotalUsersOptions } from '@/features/statistics/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { Activity, Calendar, Users } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/admin/')({
  beforeLoad: ({ context: { queryClient }}) => queryClient.ensureQueryData(getTotalUsersOptions()),
  component: RouteComponent,
})

function RouteComponent() {
  const query = useSuspenseQuery(systemStatusOptions())
  const { data: totalUsers } = useSuspenseQuery(getTotalUsersOptions())
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          {t('admin.dashboard.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('admin.dashboard.description')}</p>
      </div>
      <div className='grid w-full grid-cols-3 gap-x-4'>
        <Card className='gap-4'>
          <CardHeader className="flex flex-row items-center justify-between px-6">
            <CardTitle className="text-sm font-medium">{t('admin.analytics.0')}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUsers}</div>
          </CardContent>
        </Card>
        <Card className='gap-4'>
          <CardHeader className="flex flex-row items-center justify-between px-6">
            <CardTitle className="text-sm font-medium">{t('admin.analytics.1')}</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,420</div>
          </CardContent>
        </Card>
        <Card className='gap-4'>
          <CardHeader className="flex flex-row items-center justify-between px-6">
            <CardTitle className="text-sm font-medium">{t('admin.analytics.2')}</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatUptime(query.data.uptime)}</div>
          </CardContent>
        </Card>
      </div>
    </React.Fragment>
  )
}
