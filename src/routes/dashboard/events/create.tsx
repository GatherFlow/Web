import { CreateEventForm } from '@/features/events/components/create-event-form'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard/events/create')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <h2 className="text-3xl font-bold tracking-tight">Create event</h2>
      <CreateEventForm />
    </React.Fragment>
  )
}
