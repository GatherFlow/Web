import { Switch } from "@/core/components/ui/switch";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import type { UserPrivacy } from "@/core/types";
import React from "react";
import { managePrivacySchema } from "../schemas";
import { useManagePrivacy } from "../mutations/useManagePrivacy";
import { useTranslation } from "react-i18next";

export const ManagePrivacyForm: React.FC<{ privacy: UserPrivacy }> = (
  { privacy }
) => (
  <React.Fragment>
    <ManagePrivateProfile isPrivate={privacy.isPrivate} />
    <ManageOwnedTickets hideOwned={privacy.hideOwned} />
    <ManagePurchasedTickets hidePurchased={privacy.hidePurchased} />
    <ManageAppreciatedTickets hideAppreciated={privacy.hideAppreciated} />
  </React.Fragment>
)

const ManagePrivateProfile: React.FC<Pick<UserPrivacy, 'isPrivate'>> =(
  { isPrivate }
) => {
  const { t } = useTranslation()

  const { mutateAsync, isPending } = useManagePrivacy()

  const form = useAppForm({
    validators: {
      onSubmit: managePrivacySchema
        .pick({ isPrivate: true })
        .required()
    },
    defaultValues: {
      isPrivate
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
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
                  {t('dashboard.privacy.preferences.0.title')}
                </field.FormLabel>
                <field.FormDescription>
                  {t('dashboard.privacy.preferences.0.description')}
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => {
                    field.setValue(!field.state.value)
                    form.handleSubmit()
                  }}
                  disabled={isPending}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}

const ManageOwnedTickets: React.FC<Pick<UserPrivacy, 'hideOwned'>> = (
  { hideOwned }
) => {
  const { t } = useTranslation()

  const { mutateAsync, isPending } = useManagePrivacy()

  const form = useAppForm({
    validators: {
      onSubmit: managePrivacySchema
        .pick({ hideOwned: true })
        .required()
    },
    defaultValues: {
      hideOwned
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="hideOwned">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  {t('dashboard.privacy.preferences.1.title')}
                </field.FormLabel>
                <field.FormDescription>
                  {t('dashboard.privacy.preferences.1.description')}
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => {
                    field.setValue(!field.state.value)
                    form.handleSubmit()
                  }}
                  disabled={isPending}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}

const ManagePurchasedTickets: React.FC<Pick<UserPrivacy, 'hidePurchased'>> = (
  { hidePurchased }
) => {
  const { t } = useTranslation()
  const { mutateAsync, isPending } = useManagePrivacy()

  const form = useAppForm({
    validators: {
      onSubmit: managePrivacySchema
        .pick({ hidePurchased: true })
        .required()
    },
    defaultValues: {
      hidePurchased
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="hidePurchased">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  {t('dashboard.privacy.preferences.2.title')}
                </field.FormLabel>
                <field.FormDescription>
                  {t('dashboard.privacy.preferences.2.description')}
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => {
                    field.setValue(!field.state.value)
                    form.handleSubmit()
                  }}
                  disabled={isPending}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}

const ManageAppreciatedTickets: React.FC<Pick<UserPrivacy, 'hideAppreciated'>> = (
  { hideAppreciated }
) => {
  const { t } = useTranslation()
  const { mutateAsync, isPending } = useManagePrivacy()

  const form = useAppForm({
    validators: {
      onSubmit: managePrivacySchema
        .pick({ hideAppreciated: true })
        .required()
    },
    defaultValues: {
      hideAppreciated
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(value)
    }
  })

  return (
    <form.AppForm>
      <form>
        <form.AppField name="hideAppreciated">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  {t('dashboard.privacy.preferences.3.title')}
                </field.FormLabel>
                <field.FormDescription>
                  {t('dashboard.privacy.preferences.3.description')}
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => {
                    field.setValue(!field.state.value)
                    form.handleSubmit()
                  }}
                  disabled={isPending}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}
