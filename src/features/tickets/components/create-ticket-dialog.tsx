import { Button } from "@/core/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/core/components/ui/dialog";
import { Input } from "@/core/components/ui/input";
import { useAppForm } from "@/core/components/ui/tanstack-form";
import { Textarea } from "@/core/components/ui/textarea";
import React from "react";
import { useCreateTicket } from "../mutation/useCreateTicket";

interface Props {
  id: number
}

export const CreateTicketDialog: React.FC<Props> = ({ id }) => {
  const [opened, setOpen] = React.useState(false)

  const { mutateAsync } = useCreateTicket()

  const form = useAppForm({
    defaultValues: {
      title: '',
      quantity: 0,
      price: 0,
      description: ''
    },
    onSubmit: async ({ value }) => {
      await mutateAsync({ ...value, eventId: id }, {
        onSuccess: () => setOpen(false)
      })
    }
  })

  const handleSubmit = React.useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()
    form.handleSubmit()
  }, [form])

  return (
    <Dialog open={opened} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          Create ticket
        </Button>
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
            <Button>
              Create
            </Button>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  )
}