import { SendResetCodeForm } from '@/features/auth/components/send-reset-code-form'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/forgot-password/')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <p className="text-muted-foreground text-center mb-6">
        {t('auth.forgot-password.email-step.description')}
      </p>
      <SendResetCodeForm />
    </React.Fragment>
  )
}
