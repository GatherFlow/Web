import { REQUEST_METHODS } from "@/core/constants"
import type { ApiError } from "@/core/types"
import { getDefaultHeaders } from "@/core/utils"
import { getCurrentUserOptions } from "@/features/users/queries"
import { useAuthStore } from "@/features/auth/stores"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import type { LoginValues } from "../schemas"

export const useLogin = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const setUser = useAuthStore((state) => state.setUser)

  return useMutation({
    mutationFn: async (data: LoginValues) => {
      const url = `/api/login`

      const response = await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify(data),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        const error: ApiError = await response.json()

        throw new Error(error.title)
      }

      console.log(response.headers)
    },
    onSuccess: async () => {
      const data = await queryClient.fetchQuery(getCurrentUserOptions())

      setUser(data)

      router.navigate({ to: '/' })
    }
  })
}