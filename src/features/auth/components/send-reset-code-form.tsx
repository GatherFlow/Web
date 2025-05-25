import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import React from "react";
import { useTranslation } from "react-i18next";
import { sendResetCodeSchema } from "../schemas";
import { useSendResetCode } from "../mutations/useSendResetCode";

export const SendResetCodeForm: React.FC = () => {
  const { t } = useTranslation()
  const { mutateAsync, isPending } = useSendResetCode()

  const form = useAppForm({
    validators: { onSubmit: sendResetCodeSchema },
    defaultValues: {
      email: ''
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
        <form.AppField name="email">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.email-label')}</field.FormLabel>
              <field.FormControl>
                <Input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder={t('auth.email-placeholder')}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <Button className="w-full">
          {isPending ? t('auth.forgot-password.email-step.submit') : t('auth.forgot-password.email-step.submit')}
        </Button>
      </form>
    </form.AppForm>
  )
}