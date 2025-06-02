import { REQUEST_METHODS } from "@/core/constants"
import type { ApiError, ResetSession } from "@/core/types"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import type { SendResetCodeValues } from "../schemas"
import { useResetSessionStore } from "../stores/session"

export const useSendResetCode = () => {
  const router = useRouter()
  const setSession = useResetSessionStore((select) => select.setSession)
  
  return useMutation({
    mutationFn: async (data: SendResetCodeValues) => {
      const url = '/user/request-password-reset'

      const response = await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify(data),
        headers: getDefaultHeaders(),
        credentials: 'include',
      })

      if (!response.ok) {
        const error: ApiError = await response.json()

        throw new Error(error.title)
      }

      const session: ResetSession = await response.json()

      return session
    },
    onSuccess: (data) => {
      setSession(data)

      router.navigate({ to: '/forgot-password/code' })
    },
  })
}