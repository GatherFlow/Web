import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import type { EditProfileValues } from "@/features/users/schemas"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useEditUserProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...rest }: EditProfileValues & { id: string }) => {
      const url = `/user/admin/users/${id}/profile`

      const response = await fetch(url, {
        method: REQUEST_METHODS.PUT,
        body: JSON.stringify(rest),
        headers: getDefaultHeaders(),
        credentials: 'include',
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
