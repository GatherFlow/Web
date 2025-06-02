import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import type { DeleteUserValues } from "@/features/users/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id }: DeleteUserValues) => {
      const url = `/user/admin/users/${id}`

      const response = await fetch(url, {
        method: REQUEST_METHODS.DELETE,
        body: JSON.stringify({}),
        credentials: 'include',
        headers: getDefaultHeaders()
      })

      if (!response.ok) {
        throw new Error()
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    }
  })
}
