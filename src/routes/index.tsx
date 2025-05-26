import { PromoPage } from '@/core/components/promo-page/page';
import { TITLE_TEMPLATE } from '@/core/constants';
import { currentUserOptions } from '@/features/auth/queries';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { Head } from '@unhead/react';
import React from 'react';

export const Route = createFileRoute('/')({
  beforeLoad: async ({ context }) => {
    const { isAuthorized, setUser } = context.auth

    if (isAuthorized) {
      throw redirect({ to: '/dashboard' })
    } else {
      const data = await context.queryClient.fetchQuery(currentUserOptions())

      if (data) {
        setUser(data)

        throw redirect({ to: '/dashboard' })
      }
    }
  },
  component: Page,
})

function Page() {
  return (
    <React.Fragment>
      <Head titleTemplate={TITLE_TEMPLATE}>
        <title>Home</title>
      </Head>
      <PromoPage />
    </React.Fragment>
  )
}