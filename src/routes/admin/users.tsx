import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/admin/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          User Management
        </h2>
        <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
      </div>
    </React.Fragment>
  )
}
