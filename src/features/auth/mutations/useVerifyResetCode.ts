import { useMutation } from "@tanstack/react-query"
import type { VerifyEmailValues } from "../schemas"
import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useRouter } from "@tanstack/react-router"
import { useResetSessionStore } from "../stores/session"
import type { ApiError } from "@/core/types"

export const useVerifyResetCode = () => {
  const router = useRouter()
  const setVerified = useResetSessionStore((select) => select.setVerified)

  return useMutation({
    mutationFn: async ({ otp }: VerifyEmailValues) => {
      const url = '/api/verify-reset-email'

      const response = await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify({ code: otp }),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        const error: ApiError = await response.json()

        throw new Error(error.title)
      }
    },
    onSuccess: () => {
      setVerified()

      router.navigate({ to: '/forgot-password/change' })
    }
  })
}
