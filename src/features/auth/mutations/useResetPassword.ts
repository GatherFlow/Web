import { useMutation } from "@tanstack/react-query"
import type { ResetPasswordValues } from "../schemas"
import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import type { ApiError } from "@/core/types"
import { useRouter } from "@tanstack/react-router"

export const useResetPassword = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: ResetPasswordValues) => {
      const url = '/api/reset-password'

      const response = await fetch(url, {
        method: REQUEST_METHODS.PUT,
        body: JSON.stringify(data),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        const error: ApiError = await response.json()

        throw new Error(error.title)
      }
    },
    onSuccess: () => {
      router.navigate({ to: '/login' })
    }
  })
}