import { SignupForm } from '@/features/auth/components/SignupForm'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { Card, CardTitle } from '@/core/components/ui/card'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/signup')({
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
      <Card className='w-[400px] items-center p-4'>
          <CardTitle>{t('auth.signup-heading')}</CardTitle>
        <SignupForm />
      </Card>
    </main>
  )
}

