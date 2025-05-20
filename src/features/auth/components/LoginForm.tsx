import { useAppForm } from "@/core/components/ui/tanstack-form"
import React from "react"
import { useTranslation } from "react-i18next"
import { loginSchema } from "../schemas"
import { Input } from "@/core/components/ui/input"
import { Button } from "@/core/components/ui/button"
import { useLogin } from "../mutations/useLogin"
import { Link } from "@tanstack/react-router"

export const LoginForm: React.FC = () => {
  const { t } = useTranslation()
  const { mutateAsync, isPending, isError, error } = useLogin()

  const form = useAppForm({
    validators: { onSubmit: loginSchema },
    defaultValues: {
      email: '',
      password: ''
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
        <form.AppField name="email">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.email-label')}</field.FormLabel>
              <field.FormControl>
                <Input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('auth.email-placeholder')}
                  disabled={isPending}
                  autoComplete="username"
                  autoFocus
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
                  autoComplete="current-password"
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
          {isPending ? t('auth.login-submitting') : t('auth.login-submit')}
        </Button>
        <div className="inline-flex justify-center w-full gap-1 text-muted-foreground">
          <p>{t('auth.signup-offer')}</p>
          <Link className="underline" to="/signup">{t('auth.signup-submit')}</Link>
        </div>
      </form>
    </form.AppForm>
  )
}