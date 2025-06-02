import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { ManagePrivacyValues } from "../schemas"
import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"

export const useManagePrivacy = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (data: ManagePrivacyValues) => {
      const url = '/user/users/privacy'

      const response = await fetch(url, {
        method: REQUEST_METHODS.PUT,
        body: JSON.stringify(data),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users', 'privacy'] })
    }
  })
}
