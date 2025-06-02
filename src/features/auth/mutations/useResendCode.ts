import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation } from "@tanstack/react-query"

export const useResendCode = () => {
  return useMutation({
    mutationFn: async () => {
      const url = '/user/resend-code'

      const response = await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify({}),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }
    },
  })
}