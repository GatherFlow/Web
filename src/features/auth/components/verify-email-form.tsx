import { Button } from "@/core/components/ui/button"
import { useAppForm } from "@/core/components/ui/tanstack-form"
import { verifyEmailSchema } from "../schemas"
import { InputOTP, InputOTPSlot } from '@/core/components/ui/input-otp'

export const VerifyEmailForm = () => {
  const form = useAppForm({
    validators: { onSubmit: verifyEmailSchema },
    defaultValues: {
      otp: ''
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="otp">
          {(field) => (
            <field.FormItem>
              <field.FormControl>
                <InputOTP maxLength={4}>
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
        <Button type="submit" className="w-full mt-6">
          Verify Email
        </Button>
        <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">Didn't receive a code?</p>
          <Button
            type="button"
            variant="link"
            className="text-gold-600 hover:text-gold-700"
          >
            Resend code
          </Button>
        </div>
      </form>
    </form.AppForm>
  )
}