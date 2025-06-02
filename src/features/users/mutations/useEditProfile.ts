import { useMutation } from "@tanstack/react-query"
import type { EditProfileValues } from "../schemas"
import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useAuthStore } from "@/features/auth/stores"

export const useEditProfile = () => {
  const setUser = useAuthStore((select) => select.setUser)
  const user = useAuthStore((select) => select.user)

  return useMutation({
    mutationFn: async (data: EditProfileValues) => {
      const url = '/user/users/profile'

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
    onSuccess(_, variables) {
      setUser({ ...user!, ...variables })
    },
  })
}