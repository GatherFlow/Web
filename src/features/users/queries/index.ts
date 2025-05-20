import type { PublicUser } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"

export const getCurrentUserOptions = () => {
  return queryOptions({
    queryKey: ['current-options'],
    queryFn: async () => {
      const url = "/api/me"

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        const text = await response.text()

        console.log(text)

        throw new Error()
      }

      const user: PublicUser = await response.json()

      return user
    }
  })
}