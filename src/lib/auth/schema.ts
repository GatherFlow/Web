import { z } from "zod";
import i18n from "../i18n";

const loginSchema = z.object({
  identifier: z
    .string({
      required_error: i18n.t('validation.invalid-identifier'),
    })
    .trim()
    .refine(
      (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const loginRegex = /^[a-zA-Z0-9_]+$/
        return emailRegex.test(value) || loginRegex.test(value)
      },
      {
        message: i18n.t('validation.incorrect-identifier'),
      }
    ),
  password: z
    .string({
      required_error: i18n.t('validation.invalid-password'),
    })
    .min(6, i18n.t('validation.incorrect-password'))
    .trim(),
})

export { loginSchema }
