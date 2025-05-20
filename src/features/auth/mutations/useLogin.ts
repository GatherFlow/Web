import { REQUEST_METHODS } from "@/core/constants"
import type { ApiError } from "@/core/types"
import { getDefaultHeaders } from "@/core/utils"
import { env } from "@/env"
import { useMutation } from "@tanstack/react-query"
import type { LoginValues } from "../schemas"
import { redirect, useRouter } from "@tanstack/react-router"

export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async (data: LoginValues) => {
      const url = `${env.API_BASE_URL}/login`

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
    },
    onSuccess: () => {
      router.navigate({ to: '/' })
    }
  })
}