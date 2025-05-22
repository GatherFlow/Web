import { z } from "zod";

export const editProfileForm = z.object({
  firstName: z.string(),
  lastName: z.string(),
  dob: z.date()
})