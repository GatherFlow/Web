import i18n from "@/lib/i18n";
import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string({
      required_error: i18n.t('validation.invalid-email')
    })
    .email(i18n.t('validation.incorrect-email')),
  password: z
    .string({
      required_error: i18n.t('validation.invalid-password'),
    })
    .min(6, i18n.t('validation.incorrect-password'))
    .trim(),
})

const signupSchema = loginSchema
  .extend({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    confirmPassword: z
      .string({
        required_error: i18n.t('validation.invalid-password'),
      })
      .min(6, i18n.t('validation.incorrect-password'))
      .trim(),
    language: z.string()
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: i18n.t('validation.paswords-dont-match'),
    path: ['confirmPassword']
  })

type LoginValues = z.infer<typeof loginSchema>
type SignupValues = z.infer<typeof signupSchema>

export { loginSchema, signupSchema }
export type { LoginValues, SignupValues }
