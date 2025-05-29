import { Input } from "@/core/components/ui/input";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import React from "react";
import { Button } from "@/core/components/ui/button";
import { editProfileSchema } from "../schemas";
import { Textarea } from "@/core/components/ui/textarea";
import { useAuthStore } from "@/features/auth/stores";
import { useEditProfile } from "../mutations/useEditProfile";

export const EditProfileForm: React.FC = () => {
  const user = useAuthStore((select) => select.user)

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
                <field.FormLabel>First Name</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
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
                <field.FormLabel>Last Name</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="text"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
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
              <field.FormLabel>Username</field.FormLabel>
              <field.FormControl>
                <Input
                  type="text"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <form.AppField name="bio">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Bio</field.FormLabel>
              <field.FormControl>
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
              </field.FormControl>
              <field.FormMessage />
            </field.FormItem>
          )}
        </form.AppField>
        <Button>
          Update
        </Button>
      </form>
    </form.AppForm>
  )
}