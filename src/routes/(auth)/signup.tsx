import { Card, CardTitle } from '@/core/components/ui/card'
import { TITLE_TEMPLATE } from '@/core/constants'
import { canAccessAuth } from '@/core/middlewares/canAccessAuth'
import { SignupForm } from '@/features/auth/components/SignupForm'
import { createFileRoute } from '@tanstack/react-router'
import { Head } from '@unhead/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/signup')({
  beforeLoad: ({ context }) => canAccessAuth(context.auth),
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
          <CardTitle>{t('auth.signup.heading')}</CardTitle>
          <SignupForm />
        </Card>
      </main>
    </React.Fragment>
  )
}
