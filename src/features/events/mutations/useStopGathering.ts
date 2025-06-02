import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useStopGathering = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const url = '/events/settings/gather'

      await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify({ event_id: id }),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['events', variables, 'settings']})
    },
  })
}
