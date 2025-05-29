import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card'
import { UsersTable } from '@/features/admin/components/users-table'
import { usersOptions } from '@/features/admin/queries'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

export const Route = createFileRoute('/admin/users')({
  loader: ({ context: { queryClient }}) => queryClient.ensureQueryData(usersOptions()),
  component: RouteComponent,
})

function RouteComponent() {
  const { data: users } = useSuspenseQuery(usersOptions())

  return (
    <React.Fragment>
      <div className='mb-8'>
        <h2 className="text-3xl font-bold tracking-tight">
          User Management
        </h2>
        <p className="text-muted-foreground mt-1">Manage user accounts and permissions</p>
      </div>
      <Card>
        <CardHeader className='px-6'>
          <CardTitle>Users</CardTitle>
          <CardDescription>A list of all users in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <UsersTable users={users} />
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
