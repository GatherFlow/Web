import { Switch } from "@/core/components/ui/switch";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import React from "react";

export const ManagePrivacyForm: React.FC = () => (
  <React.Fragment>
    <ManagePrivateProfile />
    <ManageOwnedTickets />
    <ManagePurchasedTickets />
    <ManageAppreciatedTickets />
  </React.Fragment>
)

const ManagePrivateProfile = () => {
  const form = useAppForm({
    defaultValues: {
      isPrivate: false
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="isPrivate">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  Private profile
                </field.FormLabel>
                <field.FormDescription>
                  All your data will not be shown to other users
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => field.setValue(!field.state.value)}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}

const ManageOwnedTickets = () => {
  const form = useAppForm({
    defaultValues: {
      areHidden: false
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="areHidden">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  Hide owned tickets
                </field.FormLabel>
                <field.FormDescription>
                  Tickets will not be discovered in search and found in your profile
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => field.setValue(!field.state.value)}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}

const ManagePurchasedTickets = () => {
  const form = useAppForm({
    defaultValues: {
      areHidden: false
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="areHidden">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  Hide purchased tickets
                </field.FormLabel>
                <field.FormDescription>
                  Tickets will not be found in your profile
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => field.setValue(!field.state.value)}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}

const ManageAppreciatedTickets = () => {
  const form = useAppForm({
    defaultValues: {
      areHidden: false
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="areHidden">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  Hide appreciated tickets
                </field.FormLabel>
                <field.FormDescription>
                  Tickets will not be found in your profile
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => field.setValue(!field.state.value)}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}
