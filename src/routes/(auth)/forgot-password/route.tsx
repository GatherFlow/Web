import { TITLE_TEMPLATE } from '@/core/constants'
import { Link, Outlet, createFileRoute, useRouteContext } from '@tanstack/react-router'
import { Head } from '@unhead/react'
import { ArrowLeft, KeyRound } from 'lucide-react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/forgot-password')({
  component: RouteComponent,
})

function RouteComponent() {
  const { auth } = useRouteContext({ from: '/(auth)/forgot-password' })
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
              <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center">
                <KeyRound className="h-6 w-6 text-gold-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center mb-2">{t('auth.forgot-password.title')}</h1>
            
            <Outlet />
          </div>
        </div>
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link to="/login" className="text-gold-600 hover:text-gold-700">
              {t('auth.back-to-login')}
            </Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  )
}
