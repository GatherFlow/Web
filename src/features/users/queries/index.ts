import type { PublicUser, UserPrivacy } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"

export const getCurrentUserOptions = () => {
  return queryOptions({
    queryKey: ['current-options'],
    queryFn: async () => {
      const url = '/api/me'

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }

      const user: PublicUser = await response.json()

      return user
    }
  })
}

export const getPrivacyOptions = () => {
  return queryOptions({
    queryKey: ['users', 'privacy'],
    queryFn: async () => {
      const url = '/api/users/privacy'

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }

      const data: UserPrivacy = await response.json()

      return data
    }
  })
}
