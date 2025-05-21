import { Input } from "@/core/components/ui/input";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import React from "react";
import { editProfileForm } from "../schemas";
import { Button } from "@/core/components/ui/button";

export const EditProfileForm: React.FC = () => {
  // const { t } = useTranslation()

  const form = useAppForm({
    validators: { onSubmit: editProfileForm },
    defaultValues: {
      firstName: '',
      lastName: '',
      dob: new Date()
    }
  })

  return (
    <form.AppForm>
      <form className="space-y-2">
        <div className="inline-flex w-full gap-5">
          <form.AppField name="firstName">
            {(field) => (
              <field.FormItem className="w-1/2">
                <field.FormLabel>First Name</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="email"
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
                    type="email"
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
        </div>
        <Button>
          Update
        </Button>
      </form>
    </form.AppForm>
  )
}