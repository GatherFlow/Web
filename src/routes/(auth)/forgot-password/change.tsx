import { ResetPasswordForm } from '@/features/auth/components/reset-password-form'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/forgot-password/change')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <p className="text-muted-foreground text-center mb-6">
        {t('auth.forgot-password.reset-step.description')}
      </p>
      <ResetPasswordForm />
    </React.Fragment>
  )
}
