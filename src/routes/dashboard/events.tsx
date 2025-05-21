import { createFileRoute, redirect } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard/events')({
  beforeLoad: ({ context }) => {
    const { isAuthorized } = context.auth

    if (!isAuthorized) {
      return redirect({ to: '/' })
    }
  },
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          Events
        </h2>
        <p className="text-muted-foreground mt-1">Manage your events and track registrations</p>
      </div>
    </React.Fragment>
  )
}
