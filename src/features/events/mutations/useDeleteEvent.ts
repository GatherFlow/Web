import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const url = `/events/?id=${id}`

      await fetch(url, {
        method: REQUEST_METHODS.DELETE,
        body: JSON.stringify({}),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['current-user', 'events']})
    }
  })
}