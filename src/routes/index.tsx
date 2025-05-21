import { PromoPage } from '@/core/components/promo-page/page';
import { TITLE_TEMPLATE } from '@/core/constants';
import { createFileRoute } from '@tanstack/react-router';
import { Head } from '@unhead/react';
import React from 'react';

export const Route = createFileRoute('/')({
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
