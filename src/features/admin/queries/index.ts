import type { AdminUser, HealthStatus } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"

const systemStatusOptions = () => {
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

const usersOptions = () => {
  return queryOptions({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('/api/admin/users', {
        credentials: 'include'
      })

      const users: AdminUser[] = await response.json()

      return users
    }
  })
}

export { systemStatusOptions, usersOptions }
