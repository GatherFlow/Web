import { REQUEST_METHODS } from "@/core/constants"
import type { ApiError } from "@/core/types"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import { useAuthStore } from "../stores"

export const useLogout = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const reset = useAuthStore((state) => state.reset)

  return useMutation({
    mutationFn: async () => {
      const url = `/api/logout`

      const response = await fetch(url, {
        method: REQUEST_METHODS.DELETE,
        body: JSON.stringify({}),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        const error: ApiError = await response.json()

        throw new Error(error.title)
      }
    },
    onSuccess: async () => {
      reset()

      queryClient.setQueryData(['current-user'], () => null)

      await queryClient.resetQueries()

      router.navigate({ to: '/' })
    }
  })
}
