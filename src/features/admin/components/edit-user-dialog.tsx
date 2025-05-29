import { Button } from "@/core/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import { Textarea } from "@/core/components/ui/textarea";
import type { AdminUser } from "@/core/types";
import { editProfileSchema } from "@/features/users/schemas";
import React, { type PropsWithChildren } from "react";
import { useEditUserProfile } from "../mutations/useEditUserProfile";
import { useTranslation } from "react-i18next";

interface Props {
  user: AdminUser
}

export const EditUserDialog: React.FC<PropsWithChildren<Props>> = ({ user, children }) => {
  const { t } = useTranslation()
  const [opened, setOpen] = React.useState(false)
  const { mutateAsync } = useEditUserProfile()

  const bio = user.bio ?? ''

  const form = useAppForm({
    validators: { onSubmit: editProfileSchema },
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      bio,
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(
        {
          id: user.id,
          ...value
        },
        {
          onSuccess: () => setOpen(false)
        }
      )
    }
  })

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }, [form])
  
  return (
    <Dialog open={opened} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit user</DialogTitle>
        </DialogHeader>
        <form.AppForm>
          <form className="flex flex-col gap-y-4" onSubmit={handleSubmit}>
            <div className="inline-flex gap-4">
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
                      className="resize-none"
                      placeholder={t('auth.bio-placeholder')}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <Button>{t('admin.users.form.submit')}</Button>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  )
}