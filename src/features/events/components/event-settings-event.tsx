import { Switch } from "@/core/components/ui/switch"
import { useAppForm } from "@/core/components/ui/tanstack-form"
import type { EventSettings } from "@/core/types"
import React, { type FC } from "react"
import { useAnnounceEvent } from "../mutations/useAnnounceEvent"
import { useStopGathering } from "../mutations/useStopGathering"

interface Props {
  settings: EventSettings
  id: number
}

interface ChildProps {
  id: number
  defaultValue: boolean
}

export const EventSettingsForm: FC<Props> = ({ settings, id }) => {  
  return (
    <React.Fragment>
      <StopGatheringForm id={id} defaultValue={settings.is_gathering} />
      <AnnouncementForm id={id} defaultValue={settings.is_announced} />
    </React.Fragment>
  )
}

const StopGatheringForm: React.FC<ChildProps> = ({ id, defaultValue }) => {
  const { mutateAsync, isPending } = useStopGathering()

  const form = useAppForm({
    defaultValues: {
      stopGathering: defaultValue
    },
    onSubmit: async () => {
      await mutateAsync(id)
    }
  })
  
  return (
    <form.AppForm>
      <form>
        <form.AppField name="stopGathering">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  Stop gathering
                </field.FormLabel>
                <field.FormDescription>
                  The ability to buy event will be disabled
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

const AnnouncementForm: React.FC<ChildProps> = ({ id, defaultValue }) => {
  const { mutateAsync, isPending } = useAnnounceEvent()

  const form = useAppForm({
    defaultValues: {
      stopGathering: defaultValue
    },
    onSubmit: async () => {
      await mutateAsync(id)
    }
  })
  
  return (
    <form.AppForm>
      <form>
        <form.AppField name="stopGathering">
          {(field) => (
            <field.FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <field.FormLabel className="text-base">
                  Announce
                </field.FormLabel>
                <field.FormDescription>
                  The event will be announced
                </field.FormDescription>
              </div>
              <field.FormControl>
                <Switch
                  checked={field.state.value}
                  onCheckedChange={() => {
                    field.setValue(!field.state.value)
                    form.handleSubmit()
                  }}
                  disabled={isPending || field.state.value === true}
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
      </form>
    </form.AppForm>
  )
}
