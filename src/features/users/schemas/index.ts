import { z } from "zod";

const editProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  username: z.string(),
  bio: z.string(),
})

type EditProfileValues = z.infer<typeof editProfileSchema>

const deleteUserSchema = z.object({
  id: z.string().uuid()
})

type DeleteUserValues = z.infer<typeof deleteUserSchema>

const managePrivacySchema = z.object({
  isPrivate: z.boolean().optional(),
	hideOwned: z.boolean().optional(),
	hidePurchased: z.boolean().optional(),
	hideAppreciated: z.boolean().optional(),
})

type ManagePrivacyValues = z.infer<typeof managePrivacySchema>

export { editProfileSchema, deleteUserSchema, managePrivacySchema }
export type { EditProfileValues, DeleteUserValues, ManagePrivacyValues }
