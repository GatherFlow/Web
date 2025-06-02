import { queryOptions } from "@tanstack/react-query"

export const getTotalUsersOptions = () => {
  return queryOptions({
    queryKey: ['users', 'count'],
    queryFn: async () => {
      const url = '/user/statistics/total-users'

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }

      const data: { count: number } = await response.json()

      return data.count
    }
  })
}
