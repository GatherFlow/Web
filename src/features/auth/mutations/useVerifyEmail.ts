import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import type { VerifyEmailValues } from "../schemas"
import { useAuthStore } from "../stores"

export const useVerifyEmail = () => {
  const router = useRouter()
  const setVerified = useAuthStore((select) => select.setVerified)

  return useMutation({
    mutationFn: async ({ otp }: VerifyEmailValues) => {
      const url = '/api/verify-email'

      const response = await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify({ code: otp }),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }
    },
    onSuccess: () => {
      setVerified()

      router.navigate({ to: '/dashboard' })
    }
  })
}