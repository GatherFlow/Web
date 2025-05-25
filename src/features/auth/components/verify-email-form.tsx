import { Button } from "@/core/components/ui/button"
import { useAppForm } from "@/core/components/ui/tanstack-form"
import { verifyEmailSchema } from "../schemas"
import { InputOTP, InputOTPSlot } from '@/core/components/ui/input-otp'
import { useVerifyEmail } from "../mutations/useVerifyEmail"
import React from "react"
import { useResendCode } from "../mutations/useResendCode"

export const VerifyEmailForm = () => {
  const { mutateAsync: verifyEmail, isPending } = useVerifyEmail()

  const { mutate: resendCode } = useResendCode()

  const form = useAppForm({
    validators: { onSubmit: verifyEmailSchema },
    defaultValues: {
      otp: ''
    },
    onSubmit: ({ value }) => verifyEmail(value)
  })

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }, [form])

  return (
    <form.AppForm>
      <form onSubmit={handleSubmit}>
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
        <Button type="submit" className="w-full mt-6" disabled={isPending}>
          Verify Email
        </Button>
        <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">Didn't receive a code?</p>
          <Button
            type="button"
            variant="link"
            className="text-gold-600 hover:text-gold-700"
            onClick={() => resendCode()}
          >
            Resend code
          </Button>
        </div>
      </form>
    </form.AppForm>
  )
}