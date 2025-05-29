import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/dashboard/events')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          {t('dashboard.events.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('dashboard.events.description')}</p>
      </div>
    </React.Fragment>
  )
}
