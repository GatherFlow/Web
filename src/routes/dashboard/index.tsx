import { useAuthStore } from '@/features/auth/stores'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  const user = useAuthStore((select) => select.user)

  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          Welcome back, {user?.firstName}!
        </h2>
      </div>
    </React.Fragment>
  )
}
