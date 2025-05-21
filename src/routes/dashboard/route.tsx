import { DashboardLayout } from '@/layouts/DashboardLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: Page,
})

function Page() {
  return (
    <DashboardLayout>
      <p>123</p>
    </DashboardLayout>
  )
}
