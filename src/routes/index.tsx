import { PromoPage } from '@/core/components/promo-page/page';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: PromoPage,
})
