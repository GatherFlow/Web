import { TITLE_TEMPLATE } from '@/core/constants'
import { VerifyEmailForm } from '@/features/auth/components/verify-email-form'
import { Link, createFileRoute, notFound, useRouteContext } from '@tanstack/react-router'
import { Head } from '@unhead/react'
import { ArrowLeft, Mail } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/verify-email')({
  beforeLoad: ({ context }) => {
    const { user, isAuthorized } = context.auth

    if (user?.isVerified || !isAuthorized) {
      throw notFound()
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = useRouteContext({ from: '/(auth)/verify-email' })
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <Head titleTemplate={TITLE_TEMPLATE}>
        {t('auth.verify-email.title')}
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('auth.back-to-login')}
          </Link>
        </div>

        <div className="bg-background rounded-lg border shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-full bg-gold-100 dark:bg-gold-950 flex items-center justify-center">
              <Mail className="h-6 w-6 text-gold-600 dark:text-gold-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">{t('auth.verify-email.title')}</h1>
          <p className="text-muted-foreground text-center mb-6">
            {t('auth.verify-email.description')} <span className="font-medium">{auth.user?.email}</span>
          </p>
            <VerifyEmailForm />
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}
