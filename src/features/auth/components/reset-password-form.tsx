import { useAppForm } from "@/core/components/ui/tanstack-form";
import React from "react";
import { resetPasswordSchema } from "../schemas";
import { useTranslation } from "react-i18next";
import { Input } from "@/core/components/ui/input";
import { useResetPassword } from "../mutations/useResetPassword";
import { Button } from "@/core/components/ui/button";

export const ResetPasswordForm: React.FC = () => {
  const { t } = useTranslation()

  const { mutateAsync, isPending } = useResetPassword()

  const form = useAppForm({
    validators: { onSubmit: resetPasswordSchema },
    defaultValues: {
      password: '',
      confirmPassword: '',
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
        <form.AppField name="password">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.password-label')}</field.FormLabel>
              <field.FormControl>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('auth.password-placeholder')}
                  disabled={isPending}
                  autoComplete="current-password"
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <form.AppField name="confirmPassword">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.confirm-password-label')}</field.FormLabel>
              <field.FormControl>
                <Input
                  type="password"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('auth.confirm-password-placeholder')}
                  disabled={isPending}
                  autoComplete="current-password"
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <Button className="w-full">
        {isPending
            ? t('auth.forgot-password.reset-step.submitting')
            : t('auth.forgot-password.reset-step.submit')
          }
        </Button>
      </form>
    </form.AppForm>
  )
}