import { ManagePrivacyForm } from '@/features/users/components/manage-privacy-form'
import { getPrivacyOptions } from '@/features/users/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/dashboard/privacy')({
  loader: ({ context: { queryClient }}) => queryClient.ensureQueryData(getPrivacyOptions()),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()
  const { data: privacy } = useSuspenseQuery(getPrivacyOptions())

  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          {t('dashboard.privacy.title')}
        </h2>
        <p className="text-muted-foreground mt-1">{t('dashboard.privacy.description')}</p>
      </div>
      <ManagePrivacyForm privacy={privacy} />
    </React.Fragment>
  )
}
