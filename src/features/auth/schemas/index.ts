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

const verifyEmailSchema = z.object({
  otp: z.string().length(4)
})

const sendResetCodeSchema = z.object({
  email: z
    .string({
      required_error: i18n.t('validation.invalid-email') 
    })
    .email(i18n.t('validation.incorrect-email'))
})

const resetPasswordSchema = z
  .object({
    password: z
      .string({
        required_error: i18n.t('validation.invalid-password'),
      })
      .min(6, i18n.t('validation.incorrect-password'))
      .trim(),
    confirmPassword: z
      .string({
        required_error: i18n.t('validation.invalid-password'),
      })
      .min(6, i18n.t('validation.incorrect-password'))
      .trim(),
  }).refine((data) => data.password === data.confirmPassword, {
    message: i18n.t('validation.paswords-dont-match'),
    path: ['confirmPassword']
  })

type LoginValues = z.infer<typeof loginSchema>
type SignupValues = z.infer<typeof signupSchema>
type VerifyEmailValues = z.infer<typeof verifyEmailSchema>
type SendResetCodeValues = z.infer<typeof sendResetCodeSchema>
type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export { loginSchema, signupSchema, verifyEmailSchema, sendResetCodeSchema, resetPasswordSchema }
export type { LoginValues, SignupValues, VerifyEmailValues, SendResetCodeValues, ResetPasswordValues }
