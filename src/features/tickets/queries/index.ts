import type { GenericResponse, Ticket } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"

export const eventTickets = (id: number) => {
  return queryOptions({
    queryKey: ['events', id, 'tickets'],
    queryFn: async () => {
      const url = `/events/event_ticket/many?event_id=${id}`

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }

      const data: GenericResponse<Ticket[]> = await response.json()

      return data
    }
  })
}