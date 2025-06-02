import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "@tanstack/react-router"
import type { CreateEventValues } from "../schemas"
import { toTimestamp } from "@/core/utils/time"

export const useCreateEvent = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ startedAt, meetingLink, ...rest }: CreateEventValues) => {
      const url = `/events/create`

      const response = await fetch(url, {
        method: REQUEST_METHODS.POST,
        body: JSON.stringify({
          ...rest,
          meeting_link: meetingLink,
          starting_time: toTimestamp(startedAt)
        }),
        headers: getDefaultHeaders(),
        credentials: 'include'
      })

      if (!response.ok) {
        throw new Error()
      }
    },
    onSuccess: () => {
      router.navigate({ to: '/dashboard/events' })
    }
  })
}