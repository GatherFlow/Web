import { Input } from "@/core/components/ui/input";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import React from "react";
import { Button } from "@/core/components/ui/button";
import { editProfileSchema } from "../schemas";
import { Textarea } from "@/core/components/ui/textarea";
import { useAuthStore } from "@/features/auth/stores";
import { useEditProfile } from "../mutations/useEditProfile";
import { useTranslation } from "react-i18next";

export const EditProfileForm: React.FC = () => {
  const user = useAuthStore((select) => select.user)

  const { t } = useTranslation()
  const { mutateAsync } = useEditProfile()

  const form = useAppForm({
    validators: { onSubmit: editProfileSchema },
    defaultValues: {
      firstName: user?.firstName as string,
      lastName: user?.lastName as string,
      username: user?.username as string,
      bio: user?.bio as string
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
      <form className="space-y-2" onSubmit={handleSubmit}>
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
                    autoFocus
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
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          </form.AppField>
        </div>
        <form.AppField name="username">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.username-label')}</field.FormLabel>
              <field.FormControl>
                <Input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('auth.username-placeholder')}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <form.AppField name="bio">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>{t('auth.bio-label')}</field.FormLabel>
              <field.FormControl>
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder={t('auth.bio-placeholder')}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <Button>
          {t('dashboard.profile.update-action')}
        </Button>
      </form>
    </form.AppForm>
  )
}