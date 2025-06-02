import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { CreateTicketValues } from "../schemas"
import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"

export const useCreateTicket = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async ({ eventId, quantity, ...rest }: CreateTicketValues & { eventId: number }) => {
      const url = `/events/event_ticket/create`

      const response = await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify({
          event_id: eventId,
          amount: quantity,
          stock: 0,
          ...rest
        }),
        credentials: 'include',
        headers: getDefaultHeaders()
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
