import { z } from "zod";

export const createEventSchema = z.object({
  title: z.string(),
  description: z.string(),
  tags: z.string().array(),
  startedAt: z.date(),
  format: z.string(),
  duration: z.number(),
  location: z.string(),
  meetingLink: z.string()
})

export type CreateEventValues = z.infer<typeof createEventSchema>
