import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/core/components/ui/alert-dialog"
import type { AdminUser } from "@/core/types"
import { useState, type PropsWithChildren } from "react"
import { useDeleteUser } from "../mutations/useDeleteUser"
import { useTranslation } from "react-i18next"

interface Props {
  user: AdminUser
}

export const DeleteUserAlert: React.FC<PropsWithChildren<Props>> = ({ user, children }) => {
  const [opened, setOpen] = useState(false)
  const { t } = useTranslation()

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
          <AlertDialogTitle>{t('admin.users.alert.title')}</AlertDialogTitle>
          <AlertDialogDescription>{t('admin.users.alert.descriptin')}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t('admin.users.alert.decline')}</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit}>{t('admin.users.alert.accept')}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
