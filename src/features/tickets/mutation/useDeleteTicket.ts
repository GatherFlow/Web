import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteTicket = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ ticketId }: { eventId: number, ticketId: number }) => {
      const url = `/events/event_ticket/delete?id=${ticketId}`

      const response = await fetch(url, {
        method: REQUEST_METHODS.DELETE,
        body: JSON.stringify({}),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response) {
        throw new Error()
      }
    },
    onSuccess: (_, { eventId }) => {
      queryClient.invalidateQueries({ queryKey: ['events', eventId, 'tickets']})
    },
  })
}
