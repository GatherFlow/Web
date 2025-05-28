import { Button } from "@/core/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import { Textarea } from "@/core/components/ui/textarea";
import type { AdminUser } from "@/core/types";
import React, { type PropsWithChildren } from "react";

interface Props {
  user: AdminUser
}

export const EditUserDialog: React.FC<PropsWithChildren<Props>> = ({ user, children }) => {
  const [opened, setOpen] = React.useState(false)

  const form = useAppForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      bio: user.bio
    }
  })
  
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
          <form className="flex flex-col gap-y-4">
            <div className="inline-flex gap-4">
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
            <form.AppField name="bio">
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>Bio</field.FormLabel>
                  <field.FormControl>
                    <Textarea
                      className="resize-none"
                      placeholder="Enter your bio"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            </form.AppField>
            <Button>Edit</Button>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  )
}