import { Button } from '@/core/components/ui/button'
import { Input } from '@/core/components/ui/input'
import { Label } from '@/core/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/core/components/ui/tabs'
import { EditEventForm } from '@/features/events/components/edit-event-form'
import { EventSettingsForm } from '@/features/events/components/event-settings-event'
import { SetAlbumForm } from '@/features/events/components/set-album-form'
import { EventNotFoundError } from '@/features/events/erorrs'
import { useDeleteEvent } from '@/features/events/mutations/useDeleteEvent'
import { eventOptions, eventSettiongsOptions } from '@/features/events/queries'
import { CreateTicketDialog } from '@/features/tickets/components/create-ticket-dialog'
import { eventTickets } from '@/features/tickets/queries'
import { useQueryErrorResetBoundary, useSuspenseQuery } from '@tanstack/react-query'
import { ErrorComponent, createFileRoute, useRouter, type ErrorComponentProps } from '@tanstack/react-router'
import { Cog, Edit2, Ticket, UsersRound } from 'lucide-react'
import React from 'react'

export const Route = createFileRoute('/dashboard/events/$id')({
  loader: ({ context: { queryClient }, params: { id }}) => {
    queryClient.ensureQueryData(eventOptions(+id))
    queryClient.ensureQueryData(eventSettiongsOptions(+id))
    queryClient.ensureQueryData(eventTickets(+id))
  },
  component: RouteComponent,
  errorComponent: EventErrorComponent
})

export function EventErrorComponent({ error }: ErrorComponentProps) {
  if (error instanceof EventNotFoundError) {
    return <div>{error.message}</div>
  }
  const queryErrorResetBoundary = useQueryErrorResetBoundary()

  React.useEffect(() => {
    queryErrorResetBoundary.reset()
  }, [queryErrorResetBoundary])

  return (
    <div>
      <ErrorComponent error={error} />
    </div>
  )
}

function RouteComponent() {
  const { id } = Route.useParams()
  const router = useRouter()

  const { data: event } = useSuspenseQuery(eventOptions(+id))
  const { data: settings } = useSuspenseQuery(eventSettiongsOptions(+id))
  const { data: tickets } = useSuspenseQuery(eventTickets(+id))

  const { mutate } = useDeleteEvent()

  const handleDrop = () => {
    mutate(+id, {
      onSuccess: () => router.navigate({ to: '/dashboard/events' })
    })
  }

  return (
    <React.Fragment>
      <h2 className="text-3xl font-bold tracking-tight">Manage event</h2>
      <Tabs defaultValue="edit">
        <TabsList>
          <TabsTrigger value="edit">
            <Edit2 />
            Edit
          </TabsTrigger>
          <TabsTrigger value="tickets">
            <Ticket />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="members">
            <UsersRound />
            Members
          </TabsTrigger>
          <TabsTrigger value="settings">
            <Cog />
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent className="flex flex-col gap-4 pt-4" value="edit">
          <SetAlbumForm event={event.data} />
          <EditEventForm event={event.data} />
        </TabsContent>
        <TabsContent className="flex flex-col gap-4 pt-4" value="tickets">
          <div className='flex w-full gap-4'>
            <Input placeholder='Search through tickets' />
            <CreateTicketDialog id={event.data.id} />
          </div>
          <div className='flex flex-col gap-3'>
            {tickets.map((ticket, index) => (
              <div key={index}>{ticket.title}</div>
            ))}
          </div>
        </TabsContent>
        <TabsContent className="flex flex-col gap-4 pt-4" value="settings">
          <EventSettingsForm id={event.data.id} settings={settings.data} />
          <div className='flex items-center justify-between p-4 w-full rounded-lg border border-red-800 dark:bg-red-950 bg-red-50'>
            <Label>Drop event</Label>
            <Button variant="destructive" onClick={handleDrop}>
              Drop
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </React.Fragment>
  )
}
