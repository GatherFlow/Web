import { LoginForm } from '@/components/LoginForm'
import { Card, CardTitle } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/login')({
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
