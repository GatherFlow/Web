import { LoginForm } from '@/features/auth/components/LoginForm'
import { Card, CardTitle } from '@/core/components/ui/card'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/login')({
  beforeLoad: async ({ context }) => {
    const { isAuthorized } = context.auth

    if (isAuthorized) {
      throw redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation()

  return (
    <main className='flex flex-col w-full h-dvh items-center justify-center'>
      <Card className='w-[360px] items-center p-4'>
          <CardTitle>{t('auth.login-heading')}</CardTitle>
        <LoginForm />
      </Card>
    </main>
  )
}
