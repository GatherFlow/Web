import type { PublicUser } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"

export const currentUserOptions = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: async () => {
      const url = '/api/me'

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        return null
      }

      const data: PublicUser = await response.json()

      return data
    }
  })
}
