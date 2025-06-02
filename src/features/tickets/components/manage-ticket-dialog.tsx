import { useAppForm } from "@/core/components/ui/tanstack-form"
import { useDeleteTicket } from "../mutation/useDeleteTicket"
import { useUpdateTicket } from "../mutation/useUpdateTicket"
import { createTicketSchema } from "../schemas"
import type { Ticket } from "@/core/types"
import React, { type PropsWithChildren } from "react"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/core/components/ui/dialog"
import { Input } from "@/core/components/ui/input"
import { Textarea } from "@/core/components/ui/textarea"
import { Button } from "@/core/components/ui/button"

interface Props {
  ticket: Ticket
}

export const ManageTicketDialog: React.FC<PropsWithChildren<Props>> = ({ ticket, children }) => {
  const [opened, setOpen] = React.useState(false)

  const { mutateAsync: update } = useUpdateTicket()
  const { mutateAsync: remove } = useDeleteTicket()

  const form = useAppForm({
    validators: { onSubmit: createTicketSchema },
    defaultValues: {
      title: ticket.title,
      quantity: ticket.amount,
      price: ticket.price,
      description: ticket.description
    },
    onSubmit: async ({ value }) => {
      await update({
        ...value,
        eventId: ticket.event_id,
        ticketId: ticket.id
      }, {
        onSuccess: () => {
          setOpen(false)
        }
      })
    }
  })

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }, [form])

  const handleDelete = () => {
    remove({ eventId: ticket.event_id, ticketId: ticket.id}, {
      onSuccess: () => setOpen(false)
    })
  }

  return (
    <Dialog open={opened} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>New ticket</DialogTitle>
        <form.AppForm>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <form.AppField name='title'>
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>Title</field.FormLabel>
                  <field.FormControl>
                    <Input
                      type="text"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter ticket title"
                    />
                  </field.FormControl>
                </field.FormItem>
              )}
            </form.AppField>
            <div className="inline-flex w-full gap-3">
              <form.AppField name="quantity">
                {(field) => (
                  <field.FormItem className="w-1/2">
                    <field.FormLabel>Quantity</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(+e.target.value)}
                        placeholder="Enter tickets quantity"
                      />
                    </field.FormControl>
                  </field.FormItem>
                )}
              </form.AppField>
              <form.AppField name="price">
                {(field) => (
                  <field.FormItem className="w-1/2">
                    <field.FormLabel>Price</field.FormLabel>
                    <field.FormControl>
                      <Input
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(+e.target.value)}
                        placeholder="Enter ticket price"
                      />
                    </field.FormControl>
                  </field.FormItem>
                )}
              </form.AppField>
            </div>
            <form.AppField name="description">
              {(field) => (
                <field.FormItem>
                  <field.FormLabel>Description</field.FormLabel>
                  <field.FormControl>
                    <Textarea
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter ticket description"
                      className="resize-none"
                    />
                  </field.FormControl>
                </field.FormItem>
              )}
            </form.AppField>
            <div className="inline-flex w-full justify-end gap-3">
              <Button
                variant="destructive"
                type="button"
                onClick={handleDelete}>
                Delete
              </Button>
              <Button>
                Edit
              </Button>
            </div>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  )
}