import { VerifyEmailCodeForm } from '@/features/auth/components/verify-reset-code-form'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/forgot-password/code')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <p className="text-muted-foreground text-center mb-6">
        {t('auth.forgot-password.verification-step.description')}
      </p>
      <VerifyEmailCodeForm />
    </React.Fragment>
  )
}
