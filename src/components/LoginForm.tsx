
import { loginSchema } from "@/lib/auth/schema"
import React from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useAppForm } from "./ui/tanstack-form"
import { useTranslation } from "react-i18next"

export const LoginForm = () => {
  const { t } = useTranslation()

  const form = useAppForm({
    validators: { onSubmit: loginSchema },
    defaultValues: {
      identifier: '',
      password: ''
    },
    onSubmit: ({ value }) => console.log(value)
  })

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }, [form])

  return (
    <form.AppForm>
      <form className="w-full space-y-3" onSubmit={handleSubmit}>
        <form.AppField name="identifier">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.identifier-label')}</field.FormLabel>
              <field.FormControl>
                <Input
                  type="email"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('auth.identifier-placeholder')}
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
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <Button className="w-full">{t('auth.login-submit')}</Button>
      </form>
    </form.AppForm>
  )
}