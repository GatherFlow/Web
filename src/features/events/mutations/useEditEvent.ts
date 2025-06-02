import { useMutation } from "@tanstack/react-query"
import type { CreateEventValues } from "../schemas"
import { REQUEST_METHODS } from "@/core/constants"
import { getDefaultHeaders } from "@/core/utils"
import { useRouter } from "@tanstack/react-router"
import { toTimestamp } from "@/core/utils/time"

export const useEditEvent = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ startedAt, meetingLink, ...rest }: CreateEventValues & { id: number }) => {
      const url = `/events/update`

      const response = await fetch(url, {
        method: REQUEST_METHODS.PUT,
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
