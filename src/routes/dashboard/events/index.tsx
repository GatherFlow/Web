import { Badge } from '@/core/components/ui/badge'
import { Button } from '@/core/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/core/components/ui/card'
import { Input } from '@/core/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/core/components/ui/table'
import { EventDropdown } from '@/features/events/components/event-dropdown'
import { userEventsOptions } from '@/features/events/queries'
import { fmtDuration, fmtStartTime } from '@/features/events/utils'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Link, createFileRoute } from '@tanstack/react-router'
import { PlusCircle } from 'lucide-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

export const Route = createFileRoute('/dashboard/events/')({
  loader: ({ context: { queryClient }}) => queryClient.ensureQueryData(userEventsOptions()),
  component: RouteComponent,
})

function RouteComponent() {
  const [query, setQuery] = useState('')
  const { data: events } = useSuspenseQuery(userEventsOptions())

  const { t } = useTranslation()

  const filteredEvents = events.data.filter((event) => {
    if (query.trim() === '') return event

    return event.title.trim().toLowerCase().includes(query.trim().toLowerCase())
  })

  return (
    <React.Fragment>
      <div className='inline-flex w-full mb-8 items-center justify-between'>
        <div className='flex flex-col'>
          <h2 className="text-3xl font-bold tracking-tight">
            {t('dashboard.events.title')}
          </h2>
          <p className="text-muted-foreground mt-1">{t('dashboard.events.description')}</p>
        </div>
        <Button asChild>
          <Link to="/dashboard/events/create">
            <PlusCircle />
            Create event
          </Link>
        </Button>
      </div>
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Search through the events'
      />

      <Card>
        <CardHeader className="pb-1 px-6">
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Manage your upcoming events and track registrations</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Likes</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEvents.map((event) => (
                <TableRow key={event.id}>
                  <TableCell className="font-medium">{event.title}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span>{fmtStartTime(event.starting_time)}</span>
                      <span className="text-xs text-muted-foreground">{fmtDuration(event.duration)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{event.likes}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Badge>{event.format}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <EventDropdown event={event} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </React.Fragment>
  )
}
