import { Button } from "@/core/components/ui/button"
import { Input } from "@/core/components/ui/input"
import { useAppForm } from "@/core/components/ui/tanstack-form"
import React from "react"
import { useTranslation } from "react-i18next"
import { useSignup } from "../mutations/useSignup"
import { signupSchema } from "../schemas"

export const SignupForm: React.FC = () => {
  const { t, i18n } = useTranslation()
  const { mutateAsync, isPending, isError, error } = useSignup()

  const form = useAppForm({
    validators: { onSubmit: signupSchema },
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      language: i18n.language
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
      <form className="w-full space-y-3" onSubmit={handleSubmit}>
        <div className="inline-flex w-full gap-3">
          <form.AppField name="firstName">
            {(field) => (
              <field.FormItem className="w-1/2">
                <field.FormLabel>{t('auth.first-name-label')}</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={t('auth.first-name-placeholder')}
                    disabled={isPending}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          </form.AppField>
          <form.AppField name="lastName">
            {(field) => (
              <field.FormItem className="w-1/2">
                <field.FormLabel>{t('auth.last-name-label')}</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    placeholder={t('auth.last-name-placeholder')}
                    disabled={isPending}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          </form.AppField>
        </div>
        <form.AppField name="email">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.email-label')}</field.FormLabel>
              <field.FormControl>
                <Input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('auth.email-placeholder')}
                  disabled={isPending}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
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
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        {isError && <p className="text-sm text-destructive">{error.message}</p>}
        <Button
          className="w-full"
          disabled={isPending}
        >
          {isPending ? t('auth.signup.submitting') : t('auth.signup.submit')}
        </Button>
      </form>
    </form.AppForm>
  )
}
