import type { GenericResponse, Member } from "@/core/types"
import { queryOptions } from "@tanstack/react-query"

export const eventMembersOptions = (id: number) => {
  return queryOptions({
    queryKey: ['events', id, 'members'],
    queryFn: async () => {
      const url = `/events/member/many?event_id=${id}`

      const response = await fetch(url, {
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }

      const data: GenericResponse<Member[]> = await response.json()

      return data
    }
  })
}
