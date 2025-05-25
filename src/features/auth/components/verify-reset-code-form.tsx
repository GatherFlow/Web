import { useAppForm } from "@/core/components/ui/tanstack-form";
import React from "react";
import { verifyEmailSchema } from "../schemas";
import { InputOTP, InputOTPSlot } from "@/core/components/ui/input-otp";
import { Button } from "@/core/components/ui/button";
import { useTranslation } from "react-i18next";
import { useVerifyResetCode } from "../mutations/useVerifyResetCode";

export const VerifyEmailCodeForm: React.FC = () => {
  const { t } = useTranslation()
  const { mutateAsync, isPending } = useVerifyResetCode()

  const form = useAppForm({
    validators: { onSubmit: verifyEmailSchema },
    defaultValues: {
      otp: ''
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    }
  })

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }, [form])

  return (
    <form.AppForm>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <form.AppField name="otp">
          {(field) => (
            <field.FormItem>
            <field.FormControl>
              <InputOTP
                value={field.state.value}
                onChange={(value) => field.handleChange(value)}
                maxLength={4}
              >
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTP>
            </field.FormControl>
            <field.FormMessage />
          </field.FormItem>
          )}
        </form.AppField>
        <Button className="w-full">
          {isPending
            ? t('auth.forgot-password.verification-step.submitting')
            : t('auth.forgot-password.verification-step.submit')
          }
        </Button>
      </form>
    </form.AppForm>
  )
}