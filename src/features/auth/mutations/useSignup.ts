import { REQUEST_METHODS } from "@/core/constants"
import { env } from "@/env"
import { useMutation } from "@tanstack/react-query"
import type { SignupValues } from "../schemas"
import { getDefaultHeaders } from "@/core/utils"
import type { ApiError } from "@/core/types"
import { useRouter } from "@tanstack/react-router"

export const useSignup = () => {
  const router = useRouter()
  
  return useMutation({
    mutationFn: async (data: SignupValues) => {
      const url = `${env.API_BASE_URL}/signup`

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
