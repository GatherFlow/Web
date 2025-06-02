import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateTicketValues } from "../schemas"
import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"

export const useUpdateTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ ticketId, quantity, ...rest }: CreateTicketValues & { eventId: number; ticketId: number }) => {
      const url = `/events/event_ticket/update?ticket_id=${ticketId}`

      const response = await fetch(url, {
        method: REQUEST_METHODS.PUT,
        body: JSON.stringify({ 
          id: ticketId,
          amount: quantity,
          ...rest
        }),
        headers: getDefaultHeaders(),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error()
      }
    },
    onSuccess(_, { eventId }) {
      queryClient.invalidateQueries({ queryKey: ['events', eventId, 'tickets']})
    },
  })
}
