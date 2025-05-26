import type { HealthStatus } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"

export const systemStatusOptions = () => {
  return queryOptions({
    queryKey: ['health'],
    queryFn: async () => {
      const response = await fetch('/api/health', {
        credentials: 'include'
      })

      const data: HealthStatus = await response.json()

      return data
    },
    staleTime: Infinity
  })
}