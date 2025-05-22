import { Card, CardTitle } from '@/core/components/ui/card'
import { TITLE_TEMPLATE } from '@/core/constants'
import { canAccessAuth } from '@/core/middlewares/canAccessAuth'
import { LoginForm } from '@/features/auth/components/LoginForm'
import { createFileRoute } from '@tanstack/react-router'
import { Head } from '@unhead/react'
import React from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/(auth)/login')({
  beforeLoad: ({ context }) => canAccessAuth(context.auth),
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <React.Fragment>
      <Head titleTemplate={TITLE_TEMPLATE}>
        <title>Login</title>
      </Head>
      <main className='flex flex-col w-full h-dvh items-center justify-center'>
        <Card className='w-[360px] items-center p-4'>
            <CardTitle>{t('auth.login.heading')}</CardTitle>
          <LoginForm />
        </Card>
      </main>
    </React.Fragment>
  )
}
