import { ManagePrivacyForm } from '@/features/users/components/manage-privacy-form'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/dashboard/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          Privacy
        </h2>
        <p className="text-muted-foreground mt-1">Manage your privacy settings</p>
      </div>
      <ManagePrivacyForm />
    </React.Fragment>
  )
}
