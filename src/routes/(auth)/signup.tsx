import { SignupForm } from '@/features/auth/components/SignupForm'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardTitle } from '@/core/components/ui/card'
import { useTranslation } from 'react-i18next'
import React from 'react'
import { Head } from '@unhead/react'
import { TITLE_TEMPLATE } from '@/core/constants'

export const Route = createFileRoute('/(auth)/signup')({
  beforeLoad: async ({ context }) => {
    const { isAuthorized } = context.auth

    if (isAuthorized) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <Head titleTemplate={TITLE_TEMPLATE}>
        <title>Signup</title>
      </Head>
      <main className='flex flex-col w-full h-dvh items-center justify-center'>
        <Card className='w-[400px] items-center p-4'>
            <CardTitle>{t('auth.signup-heading')}</CardTitle>
          <SignupForm />
        </Card>
      </main>
    </React.Fragment>
  )
}

