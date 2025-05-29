import { EditProfileForm } from '@/features/users/components/edit-profile-form'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          Profile
        </h2>
        <p className="text-muted-foreground mt-1">Manage your profile information</p>
      </div>
      <EditProfileForm />
    </React.Fragment>
  )
}
