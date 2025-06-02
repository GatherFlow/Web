import { z } from "zod";

const createTicketSchema = z.object({
  title: z.string(),
  quantity: z.number().int(),
  price: z.number().int(),
  description: z.string()
})

type CreateTicketValues = z.infer<typeof createTicketSchema>

export { createTicketSchema }
export type { CreateTicketValues }