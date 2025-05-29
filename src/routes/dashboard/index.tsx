import { createFileRoute, useRouteContext } from '@tanstack/react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const ctx = useRouteContext({ from: '/dashboard' })
  
  const { user } = ctx.auth
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          {t('dashboard.main.greetings')}, {user?.firstName}!
        </h2>
      </div>
    </React.Fragment>
  )
}
