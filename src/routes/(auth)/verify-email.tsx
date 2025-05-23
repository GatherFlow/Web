import { TITLE_TEMPLATE } from '@/core/constants'
import { VerifyEmailForm } from '@/features/auth/components/verify-email-form'
import { Link, createFileRoute, notFound, useRouteContext } from '@tanstack/react-router'
import { Head } from '@unhead/react'
import { ArrowLeft, Mail } from 'lucide-react'
import React from 'react'

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

  return (
    <React.Fragment>
      <Head titleTemplate={TITLE_TEMPLATE}>
        Verify email
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8">
          <Link
            to="/login"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to login
          </Link>
        </div>

        <div className="bg-background rounded-lg border shadow-sm p-8">
          <div className="flex justify-center mb-6">
            <div className="h-12 w-12 rounded-full bg-gold-100 flex items-center justify-center">
              <Mail className="h-6 w-6 text-gold-600" />
            </div>
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">Verify your email</h1>
          <p className="text-muted-foreground text-center mb-6">
            We've sent a 4-digit code to <span className="font-medium">{auth.user?.email}</span>
          </p>
            <VerifyEmailForm />
        </div>
      </div>
    </div>
    </React.Fragment>
  )
}
