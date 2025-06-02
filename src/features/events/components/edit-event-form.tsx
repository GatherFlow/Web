import { Button } from "@/core/components/ui/button"
import { Calendar } from "@/core/components/ui/calendar"
import { Input } from "@/core/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/core/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/core/components/ui/select"
import { useAppForm } from "@/core/components/ui/tanstack-form"
import { Textarea } from "@/core/components/ui/textarea"
import { TimePickerInput } from "@/core/components/ui/time-picker"
import type { Event } from "@/core/types"
import { useStore } from "@tanstack/react-form"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import React from "react"
import { useEditEvent } from "../mutations/useEditEvent"
import { createEventSchema } from "../schemas"

interface Props {
  event: Event
}

export const EditEventForm: React.FC<Props> = ({ event }) => {
  const { mutateAsync } = useEditEvent()
  
  const form = useAppForm({
    validators: { onSubmit: createEventSchema },
    defaultValues: {
      title: event.title,
      description: event.description,
      tags: event.tags,
      startedAt: new Date(event.starting_time * 1000),
      format: event.format,
      duration: event.duration,
      location: event.location,
      meetingLink: event.meeting_link
    },
    onSubmit: async ({ value }) => {
      await mutateAsync({ ...value, id: event.id })
    }
  })

  const [value, setValue] = React.useState('')

  const handleKeydown = (event: React.KeyboardEvent<HTMLInputElement>, callback: () => void) => {
    event.stopPropagation()

    if (event.key === 'Enter') {
      callback()

      setValue('')
    }
  }

  const eventFormat = useStore(form.store, (state) => state.values.format)

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }, [form])

  return (
    <form.AppForm>
      <form className='space-y-3' onSubmit={handleSubmit}>
        <form.AppField name="title">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Title</field.FormLabel>
              <field.FormControl>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder='Enter event title'
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
        <form.AppField name="description">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Description</field.FormLabel>
              <field.FormControl>
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder='Enter event title'
                  className='resize-none'
                />
              </field.FormControl>
            </field.FormItem>
          )}
        </form.AppField>
        <form.AppField name="tags" mode="array">
          {(field) => (
            <field.FormItem>
              <field.FormLabel>Tags</field.FormLabel>
              <field.FormControl>
                <Input
                  type='text'
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder='Enter event tags'
                  onKeyDown={(e) => {
                    handleKeydown(e, () => {
                      if (!field.state.value.includes(value)) {
                        field.pushValue(value)
                      }
                    })
                  }}
                />
              </field.FormControl>
              <div className='inline-flex gap-2'>
                {field.state.value.map((item, index) => (
                  <div
                    key={index}
                    className='flex px-2 h-7 items-center justify-center rounded-md border border-input box-border min-w-20 w-fit'
                    onClick={() => field.removeValue(index)}
                  >
                    #{item}
                  </div>
                ))}
              </div>
            </field.FormItem>
          )}
        </form.AppField>
        <div className='grid grid-cols-3 w-full gap-4'>
          <form.AppField name="startedAt">
            {(field) => {
            return (
              <field.FormItem>
                <field.FormLabel>Tags</field.FormLabel>
                <Popover>
                  <field.FormControl>
                    <PopoverTrigger asChild>
                      <Button variant='outline' className='justify-start'>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.state.value === new Date() ? (
                          <span>Pick a date</span>
                        ) : (
                          format(field.state.value, 'PPP HH:mm')
                        )}
                      </Button>
                    </PopoverTrigger>
                  </field.FormControl>
                  <PopoverContent>
                    <Calendar
                      mode="single"
                      selected={field.state.value}
                      onSelect={(date) => field.handleChange(date!)} />
                    <div className='inline-flex w-full gap-3 p-3 border-t border-border'>
                      <TimePickerInput
                        picker='hours'
                        date={field.state.value}
                        setDate={(date) => field.handleChange(date!)} />
                      <TimePickerInput
                        picker='minutes'
                        date={field.state.value}
                        setDate={(date) => field.handleChange(date!)} />
                    </div>
                  </PopoverContent>
                </Popover>
              </field.FormItem>
            )
          }}
          </form.AppField>
          <form.AppField name="format">
            {(field) => (
              <field.FormItem>
                <field.FormLabel>Format</field.FormLabel>
                <field.FormControl>
                  <Select value={field.state.value} onValueChange={field.handleChange}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select format' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="hybrid">Hybrid</SelectItem>
                    </SelectContent>
                  </Select>
                </field.FormControl>
              </field.FormItem>
            )}
          </form.AppField>
          <form.AppField name="duration">
            {(field) => (
              <field.FormItem>
                <field.FormLabel>Duration</field.FormLabel>
                <field.FormControl>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(+e.target.value)}
                    placeholder='Enter event duration'
                  />
                </field.FormControl>
              </field.FormItem>
            )}
          </form.AppField>
        </div>
        {eventFormat === 'online' && (
          <form.AppField name='meetingLink'>
            {(field) => (
              <field.FormItem>
                <field.FormLabel>Meeting link</field.FormLabel>
                <field.FormControl>
                  <Input
                    type="url"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Enter event meeting link'
                  />
                </field.FormControl>
              </field.FormItem>
            )}
          </form.AppField>
        )}
        {eventFormat === 'offline' && (
          <form.AppField name='location'>
            {(field) => (
              <field.FormItem>
                <field.FormLabel>Location</field.FormLabel>
                <field.FormControl>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder='Enter event location'
                  />
                </field.FormControl>
              </field.FormItem>
            )}
          </form.AppField>
        )}
        {eventFormat === 'hybrid' && (
          <React.Fragment>
            <form.AppField name='location'>
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>Location</field.FormLabel>
                  <field.FormControl>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder='Enter event location'
                    />
                  </field.FormControl>
                </field.FormItem>
              )}
            </form.AppField>
            <form.AppField name='meetingLink'>
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>Meeting Link</field.FormLabel>
                  <field.FormControl>
                    <Input
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder='Enter event location'
                    />
                  </field.FormControl>
                </field.FormItem>
              )}
            </form.AppField>
          </React.Fragment>
        )}
        <div className='flex justify-end'>
          <Button>Edit</Button>
        </div>
      </form>
    </form.AppForm>
  )
}
