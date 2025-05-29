import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/core/components/ui/alert-dialog"
import type { AdminUser } from "@/core/types"
import { useState, type PropsWithChildren } from "react"
import { useDeleteUser } from "../mutations/useDeleteUser"

interface Props {
  user: AdminUser
}

export const DeleteUserAlert: React.FC<PropsWithChildren<Props>> = ({ user, children }) => {
  const [opened, setOpen] = useState(false)

  const { mutateAsync } = useDeleteUser()

  const handleSubmit = async () => {
    mutateAsync(
      {
        id: user.id
      },
      {
        onSuccess: () => setOpen(false)
      }
    )
  }

  return (
    <AlertDialog open={opened} onOpenChange={(open) => setOpen(open)}>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure to delete this user?</AlertDialogTitle>
          <AlertDialogDescription>This action cannot be undone</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>Yes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
