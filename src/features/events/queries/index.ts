import type { Event, EventSettings, Maybe } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"
import { EventNotFoundError } from "../erorrs"

type GenericResponse<T> = {
  status: string
  description: Maybe<string>
  data: T
}

export const userEventsOptions = () => {
  return queryOptions({
    queryKey: ['current-user', 'events'],
    queryFn: async () => {
      const url = '/events/mine'

      const response = await fetch(url, {
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error()
      }

      const data: GenericResponse<Event[]> = await response.json()

      return data
    }
  })
}

export const eventOptions = (id: number) => {
  return queryOptions({
    queryKey: ['events', id],
    queryFn: async () => {
      const url = `/events/?id=${id}`

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new EventNotFoundError()
      }

      const data: GenericResponse<Event> = await response.json()

      return data
    }
  })
}

export const eventSettiongsOptions = (id: number) => {
  return queryOptions({
    queryKey: ['events', id, 'settings'],
    queryFn: async () => {
      const url = `/events/settings/?event_id=${id}`

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }

      const data: GenericResponse<EventSettings> = await response.json()

      return data
    }
  })
}
